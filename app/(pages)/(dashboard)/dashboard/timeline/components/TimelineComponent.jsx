"use client";
import { getUserFilterByPlatformId } from "@/app/api/repository/FilterRepository";
import { getPageList } from "@/app/api/repository/SourceTrackerRepository";
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
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "./TimelineCardComponent";
import TimelinePlatform from "./TimelinePlatformComponent";
import { getCookie } from "cookies-next";
import { getTimelineByPlatform } from "@/app/api/repository/TimelineRepository";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import dayjs from "dayjs";

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
  const [timelineData, setTimelineData] = useState(DATA);
  const [selectedPlatform, setSelectedPlatform] = useState("facebook");
  const [selectedPlatformId, setSelectedPlatformId] = useState(
    "ad897bd4-fa88-4742-a664-39a0f2826d89"
  );

  const [parameter, setParameter] = useState("newest");
  const [showParameter, setShowParameter] = useState(false);

  const [hashtagFilterList, setHashtagFilterList] = useState([]);
  const [hashtagFilter, setHashtagFilter] = useState([""]);
  const [mentionsFilter, setMentionsFilter] = useState([""]);
  const [showFilter, setShowFilter] = useState(false);

  const [pageList, setPageList] = useState([]);
  const [pageFilter, setPageFilter] = useState("");

  const getTimelineData = async (pageId, filterList) => {
    try {
      console.log(filterList.length === 0);
      console.log("🚀 ~ getTimelineData ~ filterList:", filterList);
      console.log(
        filterList.length === 0 ? "true" : joinSelectedFilter(mentionsFilter)
      );
      setIsLoading(true);
      const res = await getTimelineByPlatform(
        accessToken,
        selectedPlatform,
        pageFilter,
        filterList.length === 0 ? "true" : joinSelectedFilter(mentionsFilter),
        joinSelectedFilter(hashtagFilter),
        pageId
      );
      const output = res.map((item, id) => {
        return {
          id,
          date: dayjs(item.date).format("MMM DD, YYYY"),
          fullName:
            selectedPlatform === "facebook"
              ? "Facebook User"
              : "Instagram User",
          username: "@username",
          message: item.mention,
          avatar: "/assets/images/polda_logo.png",
        };
      });
      setTimelineData(output);
      console.log("🚀 ~ getTimelineData ~ res:", output);
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
    setHashtagFilterList(res);
    console.log("🚀 ~ getFilterData ~ res:", res);
    return res;
  };

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
      setHashtagFilter((prev) => prev.filter((item) => item !== value));
    } else {
      setHashtagFilter((prev) => [...prev, value]);
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

  // useEffect(() => {
  //   if (selectedPlatform === "facebook" || selectedPlatform === "instagram") {
  //     if (pageFilter !== "") {
  //       getTimelineData();
  //     }
  //   } else {
  //     getTimelineData();
  //   }
  // }, [pageFilter, selectedPlatform]);

  useEffect(() => {
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
            getTimelineData(pageIdFromSavedState, filterData);
          }
        }
      }
    })();
  }, [selectedPlatformId]);
  useEffect(() => {
    if (hashtagFilter.length > 0) {
      const joinedHashtag = joinSelectedFilter(hashtagFilter);
      console.log("🚀 ~ useEffect ~ joinedHashtag:", joinedHashtag);
    }
  }, [hashtagFilter]);
  return (
    <Stack direction={"column"} className="space-y-4 h-screen">
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
          <MentionFilter
            filter={mentionsFilter}
            handler={handleMentionsFilter}
            data={MENTION_DATA}
          />
          {(selectedPlatform == "facebook" ||
            selectedPlatform == "instagram") && (
            <PageFilter
              filter={pageFilter}
              handler={handlePageFilter}
              data={pageList}
            />
          )}
        </form>

        <Box className="flex flex-1 h-full">
          <Stack spacing={1.25} className="flex-1 h-full overflow-hidden">
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
                  date={post.date}
                  fullName={post.fullName}
                  username={post.username}
                  message={post.message}
                  post_url={post.post_url}
                  avatar={post.avatar}
                />
              ))}
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
};

export default Timeline;

const DATA = [
  {
    id: "1",
    date: "May 19, 2023",
    fullName: "Tania Nursafitri ",
    username: "@nursafitritan7",
    message:
      "INFO ORANG HILANG\nNama: SALSA CAHYA BELLA\nUmur: 16 Tahun\nJenis Kelamin: Perempuan\nPekerjaan: Pelajar\nAlamat: Kendalrejo, RT 001/003, Kendalrejo, Bagor, Nganjuk, Jatim\n\n@Polda_Jatim",
    avatar:
      "https://s3-alpha-sig.figma.com/img/f127/01bd/073e2bc1cd36ec23f693b57248587006?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bU0ZAeBAQt829peBwCpvdfU~lJiNB9hrverUCZYGy1FmxvecWC8UxfELb1K2QoiAA23FHd3W7RFzJgH74COoWj4eDzT1ZKZglfnQB~155kC5B3N87nrpRxf8KukBsAYRz~qCYAhXbRfjpKUsOUqG9FbLAGEdUGAexfo1VZ96z7suONLjO-sVecIjh3gTfd2bfUz8opTARIc~4b~81iCU9-1thhxx~jD-Faxff30XogoAyjlFu1U19vQ~QIhvb050WIp1El5QCrEnkyw5zzntPCSAcCvc155joZYspCX5GAiR99goRLOgKisc2rgpKRg6EGihDOuqS7CkLx8QkwlWyQ__",
  },
  {
    id: "2",
    date: "Nov 15, 2021",
    fullName: "HUMAS POLDA JATIM",
    username: "@HumasPoldaJatim",
    message:
      "Dalam rangka mengamankan perhelatan FIFA U-17 World Cup Indonesia 2023, Polri melalui Korpolairud Baharkam Polri telah menyiapkan dua helikopter AW169 dengan nomor register 3307 sebagai kru medis dan sarana evakuasi\n\nSinergi Demi Keamanan\n#PialaDuniaLancar",
    post_url:
      "https://s3-alpha-sig.figma.com/img/24aa/0e3c/b6e3d32ee0c415f3c72e7869c43b60d3?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BrG6q2f7rrRiCJ01xqm7npBohfe-mAgFyGlZvkViek~FPZRohHZgqRZYB7VJykIITguavrn61MLuY~Ssby0J9-uuCF5uiNhxC8v859gPfJU4zzeXy-8m4Dr7ZO44srad9VEOHhts0Ao-OoTgbmb7EkJSMgy-I4aH7OWz3KxetxQpWmTVEXBipVsVorVSI2BdsjnqDEL~XhIEjBRsnFM1A~zS2Jz50AJlzGWhWDgsO0s~ISFnK5COnN7Dv6h2~~say6JfUPgRFubzOGW1yLca9j36aamg~myBLoknpAwDz5f2bO3AniITrPZPU4HdoNfwmT8TYlB5d4DbtJYvEWBVyw__",
    avatar:
      "https://s3-alpha-sig.figma.com/img/5b9e/3b44/8bd019e1a79d63426254153cff55342f?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZLhereTR96Fgvouvpt9Tpf79nguCQxH95d9jGWnWceeWgxrJyBtTmRRBjZcmJo-LLrRtaMuvOWexhRe0QDouF0NpqYChwfQv7ma4n2LuGoU4uw3wPHj8aLXxQeHUgHta2Mna0H-Q8wNfOAq-voAfDmcWGPPEPXihUD7UMg1zwCWrSuwh~6IKAmJNkf6577j8cm6vtZ5eme4g79aIYpV-wxB3JZORyLWpsju1MCc-dPY9dMkFMg57gi7JMCyg8hoOJOv8dMZ~SfISSCmHEcfmv7el-mXIBU9-ybiBJryfIog-E~pl3YyxJ92A8Zb-eC2zvCRbEaWPB2ZQxPUG88mSSw__",
  },
];

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

const MentionFilter = ({ filter, handler, data }) => {
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
};

const PageFilter = ({ filter, handler, data }) => {
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
};

const MENTION_DATA = [
  {
    parameter: "Polda_Jatim",
  },
  {
    parameter: "HumasPoldaJatim",
  },
];

const HASHTAG_DATA = [
  {
    parameter: "PoldaJatim",
  },
  {
    parameter: "PolisiDaerahJawaTimur",
  },
  {
    parameter: "PolsekSurabaya",
  },
];
