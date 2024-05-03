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

const checkConnectedInstagramFromFacebook = (pageList) => {
  const connectedPage = pageList.find(
    (page) => "instagram_business_account" in page
  );
  if (connectedPage) {
    return connectedPage.id;
  }
  return "";
};

const joinSelectedFilter = (filter) => {
  const join = filter.join(",");
  return join;
};

const Timeline = ({ platform }) => {
  const { facebookPageList } = useSelector((state) => state.facebookReducer);
  const dispatch = useDispatch();
  const accessToken = getCookie("accessToken");
  const [isLoading, setIsLoading] = useState(false);
  const [timelineData, setTimelineData] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState("news");
  const [selectedPlatformId, setSelectedPlatformId] = useState(
    "c3751388-805f-49e1-a4f2-33151e454047"
  );

  const [parameter, setParameter] = useState("newest");
  const [showParameter, setShowParameter] = useState(false);

  const [hashtagFilterList, setHashtagFilterList] = useState([]);
  const [hashtagFilter, setHashtagFilter] = useState([""]);
  const [mentionsFilter, setMentionsFilter] = useState([""]);
  const [showFilter, setShowFilter] = useState(false);

  const [pageList, setPageList] = useState([]);
  const [pageFilter, setPageFilter] = useState("");

  const getTimelineData = async (pageId) => {
    try {
      setIsLoading(true);
      const res = await getTimelineByPlatform(
        accessToken,
        selectedPlatform,
        pageId,
        hashtagFilter[0] == "" ? "true" : "",
        joinSelectedFilter(hashtagFilter),
        parameter
      );
      setTimelineData(res);
      setIsLoading(false);
    } catch (error) {
      console.log("🚀 ~ getTimelineData ~ error:", error);
    }
  };

  const getFilterData = async () => {
    const res = await getUserFilterByPlatformId(
      selectedPlatformId,
      accessToken
    );
    if (res) {
      setHashtagFilterList(res);
      return res;
    } else {
      return [];
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
      console.log("🚀 ~ error - Get Page List:", error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const filterData = await getFilterData();
      if (selectedPlatform === "facebook" || selectedPlatform === "instagram") {
        if (facebookPageList.length === 0) {
          getPageListData();
        } else {
          const pageIdFromSavedState =
            checkConnectedInstagramFromFacebook(facebookPageList);
          setPageList(facebookPageList);
          setPageFilter(pageIdFromSavedState);
          if (pageFilter !== "") {
            getTimelineData(pageIdFromSavedState);
          }
        }
      } else if (selectedPlatform === "news") {
        getTimelineData("");
      }
    })();
  }, [selectedPlatformId]);

  useEffect(() => {
    if (hashtagFilter.length > 0) {
      const joinedHashtag = joinSelectedFilter(hashtagFilter);
      console.log("🚀 ~ useEffect ~ joinedHashtag:", joinedHashtag);
      setShowFilter(false);
      const pageIdFromSavedState =
        checkConnectedInstagramFromFacebook(facebookPageList);
      getTimelineData(pageIdFromSavedState);
    }
  }, [hashtagFilter]);

  const handleMentionsFilter = (event) => {
    const value = event.target.value;
    const isChecked = !event.target.checked;
    if (isChecked) {
      setMentionsFilter((prev) => prev.filter((item) => item !== value));
    } else {
      setMentionsFilter((prev) => [...prev, value]);
    }
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
  };

  const handlePageFilter = (event) => {
    const value = event.target.value;
    setPageFilter(value);
  };

  const handleSortFilter = (event) => {
    const value = event.target.value;
    setParameter(value);
  };
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
        {platform?.map((item, id) => (
          <TimelinePlatform
            key={id}
            platform={item}
            selected={selectedPlatform}
            setSelected={setSelectedPlatform}
            setSelectedId={setSelectedPlatformId}
          />
        ))}
        <Box className="relative flex flex-1 justify-end items-center">
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
                  value="most_popular"
                  control={
                    <Radio
                      checked={parameter == "most_popular"}
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
          <HashtagFilter
            filter={hashtagFilter}
            handler={handleHashtagFilter}
            data={hashtagFilterList}
          />

          {selectedPlatform == "instagram" && (
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
          )}
          {(selectedPlatform == "facebook" ||
            selectedPlatform == "instagram") && (
            <PageFilter
              filter={pageFilter}
              handler={handlePageFilter}
              data={pageList}
            />
          )}
        </form>
        <Stack spacing={1.25} className="h-[70svh] overflow-auto">
          {isLoading && (
            <div className="w-full h-48 flex justify-center items-center">
              <LoadingSpinner />
              Loading
            </div>
          )}
          {!isLoading &&
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
            ))}
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
      <Stack direction={"row"} flexWrap={"wrap"} spacing={0}>
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

const MentionFilter = React.memo(({ filter, handler, data }) => {
  return (
    <>
      <Typography className="mt-8 font-semibold text-xs text-[#9098A3]">
        Mentions
      </Typography>
      <Stack direction={"row"} flexWrap={"wrap"} spacing={0}>
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
            label={`@${item.parameter}`}
          />
        ))}
      </Stack>
    </>
  );
});

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
