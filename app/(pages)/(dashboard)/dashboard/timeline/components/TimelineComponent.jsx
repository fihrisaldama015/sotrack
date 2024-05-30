"use client";
import { getUserFilterByPlatformId } from "@/app/api/repository/FilterRepository";
import { getPageList } from "@/app/api/repository/SourceTrackerRepository";
import { getTimelineByPlatform } from "@/app/api/repository/TimelineRepository";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { changeFacebookPageList } from "@/app/redux/slices/FacebookPageSlice";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "./TimelineCardComponent";
import TimelinePlatform from "./TimelinePlatformComponent";
import { getAllPlatform } from "@/app/api/repository/PlatformRepository";
import useSWR from "swr";
import { changeIsPopUpOpen } from "@/app/redux/slices/PopupSlice";
import { changeTimelineData } from "@/app/redux/slices/TimelineDataSlice";
import TimelineContainerComponent from "./TimelineContainerComponent";
import TimelineContainer from "./TimelineContainerComponent";

const checkConnectedInstagramFromFacebook = (pageList) => {
  const connectedPage = pageList.find(
    (page) => "instagram_business_account" in page
  );
  if (connectedPage) {
    return connectedPage.id;
  }
  return pageList[0]?.id;
};

const joinSelectedFilter = (filter) => {
  const join = filter.join(",");
  return join;
};

const getAllPlatformList = async (token) => {
  const res = await getAllPlatform(token);
  return res;
};

const Timeline = ({ category, platform }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [parameter, setParameter] = useState("newest");
  const [showParameter, setShowParameter] = useState(false);

  const [hashtagFilter, setHashtagFilter] = useState([""]);
  const [mentionsFilter, setMentionsFilter] = useState([""]);
  const [keywordFilter, setKeywordFilter] = useState([""]);
  const [showFilter, setShowFilter] = useState(false);

  const [pageList, setPageList] = useState([]);
  const [pageFilter, setPageFilter] = useState("");

  const { facebookPageList } = useSelector((state) => state.facebookReducer);
  const { selectedPlatform } = useSelector(
    (state) => state.timelineDataReducer
  );
  const selectedPlatformId =
    platform?.find((item) => item.name.toLowerCase() == selectedPlatform)?.id ??
    "";
  const dispatch = useDispatch();
  const accessToken = getCookie("accessToken");

  const getTimelineData = async (pageId) => {
    try {
      setIsLoading(true);
      // const res = await getTimelineByPlatform(
      //   accessToken,
      //   selectedPlatform,
      //   pageId,
      //   hashtagFilter[0] == "" ? "true" : "",
      //   joinSelectedFilter(hashtagFilter),
      //   parameter
      // );
      // dispatch(
      //   changeTimelineData({
      //     timelineData: res,
      //   })
      // );
      setIsLoading(false);
    } catch (error) {
      console.log("🚀 ~ getTimelineData - Timeline ~ error:", error);
    }
  };

  const getPageListData = async () => {
    try {
      const pageListResult = await getPageList();
      const pageId = checkConnectedInstagramFromFacebook(pageListResult);
      setPageFilter(pageId);
      setPageList(pageListResult);
      dispatch(
        changeFacebookPageList({
          facebookPageList: pageListResult,
        })
      );
    } catch (error) {
      console.log("🚀 ~ error - Get Page List - Timeline:", error);
      setIsLoading(false);
      dispatch(
        changeIsPopUpOpen({
          isPopUpOpen: true,
          popUpMessage:
            "Please go to connect account before you can see social media dashboard",
          popUpType: "FACEBOOK_NOT_CONNECTED",
        })
      );
      dispatch(
        changeTimelineData({
          timelineData: [],
        })
      );
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setHashtagFilter([""]);
    setMentionsFilter([""]);
    setKeywordFilter([""]);
    setShowFilter(false);
    (async () => {
      if (selectedPlatform === "facebook" || selectedPlatform === "instagram") {
        if (facebookPageList.length === 0) {
          getPageListData();
        } else {
          const pageIdFromSavedState =
            checkConnectedInstagramFromFacebook(facebookPageList);
          setPageList(facebookPageList);
          setPageFilter(pageIdFromSavedState);
          if (pageIdFromSavedState !== "") {
            getTimelineData(pageIdFromSavedState);
          }
        }
      } else if (selectedPlatform === "news") {
        getTimelineData("");
      }
    })();
  }, [selectedPlatform]);

  const handleMentionsFilter = (event) => {
    const value = event.target.value;
    const isChecked = !event.target.checked;
    if (isChecked) {
      setMentionsFilter((prev) => prev.filter((item) => item !== value));
    } else {
      setMentionsFilter((prev) => [...prev, value]);
    }
    setShowFilter(false);
  };

  const handleHashtagFilter = (event) => {
    const value = event.target.value;
    const isChecked = !event.target.checked;
    if (isChecked) {
      hashtagFilter.length == 1
        ? setHashtagFilter([""])
        : setHashtagFilter((prev) => prev.filter((item) => item !== value));
    } else {
      hashtagFilter.length == 1
        ? setHashtagFilter([value])
        : setHashtagFilter((prev) => [...prev, value]);
    }
    setShowFilter(false);
  };

  const handleKeywordFilter = (event) => {
    const value = event.target.value;
    const isChecked = !event.target.checked;
    if (isChecked) {
      keywordFilter.length == 1
        ? setKeywordFilter([""])
        : setKeywordFilter((prev) => prev.filter((item) => item !== value));
    } else {
      keywordFilter.length == 1
        ? setKeywordFilter([value])
        : setKeywordFilter((prev) => [...prev, value]);
    }
    setShowFilter(false);
  };

  const handleSortFilter = (event) => {
    const value = event.target.value;
    setParameter(value);
    setShowParameter(false);
  };

  const { data: platforms, error } = useSWR(
    "/api/platform",
    () => getAllPlatformList(accessToken),
    {
      refreshInterval: 0, // Disable automatic refreshing
      revalidateOnFocus: false, // Disable revalidation on window focus
      staleTime: 60000, // Set a longer stale time (in milliseconds)
    }
  );
  const { data: hashtag, errorHashtag } = useSWR(
    `filter-user?platform=${selectedPlatformId}`,
    () => getUserFilterByPlatformId(selectedPlatformId, accessToken),
    {
      refreshInterval: 0, // Disable automatic refreshing
      revalidateOnFocus: false, // Disable revalidation on window focus
      staleTime: 60000, // Set a longer stale time (in milliseconds)
    }
  );

  if (error) return <div>Error loading platform data...</div>;
  if (errorHashtag) return <div>Error loading hashtag data...</div>;
  if (!platforms) return <div>Loading platform data...</div>;
  if (!hashtag) return <div>Loading hashtag data...</div>;

  return (
    <Stack direction={"column"} className="space-y-4 h-full">
      <Stack direction={"row"} spacing={1}>
        <Box className="relative">
          <Stack
            alignItems={"center"}
            onClick={() => setShowFilter((prev) => !prev)}
            className="p-2 bg-white rounded-lg ring-1 ring-[#E0E0E0] hover:ring-[#1B59F8CC] cursor-pointer"
          >
            <FilterListIcon
              sx={{ width: 20, height: 20 }}
              className="text-[#797777]"
            />
          </Stack>
        </Box>
        {platforms?.map((item, id) => (
          <TimelinePlatform key={id} platform={item} />
        ))}
        <Box
          className={`relative flex flex-1 justify-end items-center ${
            selectedPlatform != "instagram" || hashtagFilter[0] == ""
              ? "hidden"
              : ""
          }`}
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={0.5}
            onClick={() => setShowParameter(!showParameter)}
            className="pl-3 py-1 pr-2 rounded-lg hover:bg-slate-50 bg-white shadow-lg shadow-slate-100 ring-1 ring-slate-200 hover:ring-slate-200 transition-all cursor-pointer"
          >
            <Typography className="text-sm font-normal first-letter:capitalize">
              {parameter}
            </Typography>
            <ExpandMore color="grey" sx={{ width: 16 }} />
          </Stack>
          <form
            className="absolute top-12 right-0 bg-white p-5 z-20 shadow-lg rounded-xl transition-all text-sm"
            style={{
              visibility: showParameter ? "visible" : "hidden",
              opacity: showParameter ? 1 : 0,
            }}
          >
            {" "}
            <Typography className="font-semibold text-xs text-[#9098A3]">
              Filter
            </Typography>
            <RadioGroup
              aria-labelledby="filter"
              name="filter-time"
              value={parameter}
              onChange={handleSortFilter}
            >
              <Stack direction={"column"} flexWrap={"wrap"} spacing={0}>
                <FormControlLabel
                  value="newest"
                  control={
                    <Radio
                      checked={parameter == "newest"}
                      onChange={handleSortFilter}
                      defaultChecked
                    />
                  }
                  label="Newest"
                />
                <FormControlLabel
                  value="most popular"
                  control={
                    <Radio
                      checked={parameter == "most popular"}
                      onChange={handleSortFilter}
                    />
                  }
                  label="Most Popular"
                />
              </Stack>
            </RadioGroup>
          </form>
        </Box>
      </Stack>
      <Box className="relative flex flex-col h-full">
        <form
          className="absolute top-0 left-0 w-full bg-white p-6 z-10 shadow-lg rounded-xl transition-all text-sm"
          style={{
            visibility: showFilter ? "visible" : "hidden",
            opacity: showFilter ? 1 : 0,
          }}
        >
          {selectedPlatform == "instagram" && (
            <HashtagFilter
              filter={hashtagFilter}
              handler={handleHashtagFilter}
              data={hashtag.filter(
                (item) =>
                  item.category_id ==
                  category.find((cat) => cat.name == "Hashtag").id
              )}
            />
          )}
          {selectedPlatform == "instagram" ? (
            <MentionFilter
              filter={mentionsFilter}
              handler={handleMentionsFilter}
              hashtagFilter={hashtagFilter}
              selectedPlatform={selectedPlatform}
              data={hashtag.filter(
                (item) =>
                  item.category_id ==
                  category.find((cat) => cat.name == "Mention").id
              )}
            />
          ) : (
            selectedPlatform == "facebook" && (
              <MentionFilter
                filter={pageFilter}
                handler={handleMentionsFilter}
                hashtagFilter={hashtagFilter}
                selectedPlatform={selectedPlatform}
                data={hashtag.filter(
                  (item) =>
                    item.category_id ==
                    category.find((cat) => cat.name == "Mention").id
                )}
              />
            )
          )}

          {selectedPlatform == "news" && (
            <KeywordFilter
              filter={keywordFilter}
              handler={handleKeywordFilter}
              data={hashtag.filter(
                (item) =>
                  item.category_id ==
                  category.find((cat) => cat.name == "Keyword").id
              )}
            />
          )}

          {/* {selectedPlatform == "instagram" && (
            <>
              <Typography className="mt-8 font-semibold text-xs text-[#9098A3]">
                Mentions
              </Typography>
              <Stack direction={"row"} flexWrap={"wrap"} spacing={0}>
                {hashtagFilter[0] !== "" ? (
                  <Typography className="text-xs mt-2">
                    If one or more Hashtag is selected, mention can't be used
                  </Typography>
                ) : (
                  <FormControlLabel
                    control={<Checkbox readOnly defaultChecked />}
                    label={`@this account`}
                  />
                )}
              </Stack>
            </>
          )} */}
          {/* {(selectedPlatform == "facebook" ||
            selectedPlatform == "instagram") && (
            <PageFilter
              filter={pageFilter}
              handler={handlePageFilter}
              data={pageList}
            />
          )} */}
        </form>
        <Stack spacing={1.25} className="h-[70svh] overflow-auto">
          {/* {!isLoading &&
            timelineData.map((post, id) => (
              <Card
                key={id}
                date={post.timestamp}
                fullName={
                  selectedPlatform === "facebook"
                    ? "Facebook User"
                    : selectedPlatform === "instagram"
                    ? "Instagram User"
                    : post.source
                }
                username={"@username"}
                message={post.caption}
                post_url={post.permalink}
                avatar={
                  selectedPlatform === "facebook" ||
                  selectedPlatform == "instagram"
                    ? "/assets/images/polda_logo.png"
                    : `/assets/icon/${post.source}.png`
                }
                comment={post.comments_count ?? 0}
                like={post.like_count ?? 0}
              />
            ))} */}

          {selectedPlatform == "instagram" ? (
            <TimelineContainer
              filterData={hashtag}
              hashtagSelected={hashtagFilter}
              mentionSelected={
                hashtagFilter[0] == ""
                  ? hashtag.find(
                      (item) =>
                        item.category_id ==
                        category.find((cat) => cat.name == "Mention").id
                    ).parameter
                  : ""
              }
              pageSelected={pageFilter}
              orderSelected={parameter.split(" ").join("")}
            />
          ) : selectedPlatform == "facebook" ? (
            <TimelineContainer
              filterData={hashtag}
              hashtagSelected=""
              mentionSelected={pageFilter}
              pageSelected={pageFilter}
            />
          ) : (
            <TimelineContainer
              filterData={hashtag}
              hashtagSelected=""
              mentionSelected=""
              keywordSelected={keywordFilter}
            />
          )}
        </Stack>
      </Box>
    </Stack>
  );
};

export default Timeline;

const HashtagFilter = React.memo(({ filter, handler, data }) => {
  return (
    <>
      <Typography className="font-semibold text-xs text-[#9098A3]">
        Hashtag
      </Typography>
      <Stack direction={"row"} flexWrap={"wrap"} spacing={0} className="mb-6">
        {data && data?.length == 0 && (
          <Typography className="text-xs mt-2">
            No filter applied, go to Filter Settings
          </Typography>
        )}
        {data.map((item, id) => (
          <FormControlLabel
            key={id}
            control={
              <Checkbox
                value={item.parameter}
                checked={filter.includes(item.parameter)}
                onChange={handler}
                defaultChecked
              />
            }
            label={`#${item.parameter}`}
          />
        ))}
      </Stack>
    </>
  );
});

const KeywordFilter = React.memo(({ filter, handler, data }) => {
  return (
    <>
      <Typography className="font-semibold text-xs text-[#9098A3]">
        Keyword
      </Typography>
      <Stack direction={"row"} flexWrap={"wrap"} spacing={0} className="mb-6">
        {data && data?.length == 0 && (
          <Typography className="text-xs mt-2">
            No Keyword applied, go to Filter Settings
          </Typography>
        )}
        {data.map((item, id) => (
          <FormControlLabel
            key={id}
            control={
              <Checkbox
                value={item.parameter}
                checked={filter.includes(item.parameter)}
                onChange={handler}
                defaultChecked
              />
            }
            label={`${item.parameter}`}
          />
        ))}
      </Stack>
    </>
  );
});

const MentionFilter = React.memo(
  ({ filter, handler, data, hashtagFilter, selectedPlatform }) => {
    return (
      <>
        <Typography className="font-semibold text-xs text-[#9098A3]">
          Mentions
        </Typography>
        <Stack direction={"row"} flexWrap={"wrap"} spacing={0} className="mb-6">
          {data && data?.length == 0 && (
            <Typography className="text-xs mt-2">
              No Mention applied, go to Filter Settings
            </Typography>
          )}
          {hashtagFilter[0] !== "" && (
            <Typography className="text-xs mt-2">
              If one or more Hashtag is selected, mention can't be used
            </Typography>
          )}
          {data.map((item, id) => (
            <FormControlLabel
              key={id}
              control={
                <Checkbox
                  value={item.parameter}
                  disabled={hashtagFilter[0] !== ""}
                  checked={
                    selectedPlatform == "instagram" && hashtagFilter[0] == ""
                      ? true
                      : filter == item.id
                  }
                  onChange={handler}
                  defaultChecked
                />
              }
              label={`@${item.parameter}`}
            />
          ))}
        </Stack>
      </>
    );
  }
);

const PageFilter = React.memo(({ filter, handler, data }) => {
  return (
    <>
      <Typography className="mt-8 font-semibold text-xs text-[#9098A3]">
        Facebook Page
      </Typography>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={filter}
        onChange={handler}
      >
        <Stack direction={"row"} flexWrap={"wrap"} spacing={0}>
          {data.map((item, id) => (
            <FormControlLabel
              key={id}
              value={item.id}
              control={
                <Radio
                  checked={filter === item.id}
                  onChange={handler}
                  defaultChecked
                />
              }
              label={`${item.name}`}
            />
          ))}
        </Stack>
      </RadioGroup>
    </>
  );
});

const MENTION_DATA = [
  {
    parameter: "Polda_Jatim",
  },
  {
    parameter: "HumasPoldaJatim",
  },
];
