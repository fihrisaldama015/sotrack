"use client";
import FilterListIcon from "@mui/icons-material/FilterList";
import Stack from "@mui/material/Stack";
import TimelinePlatform from "./TimelinePlatformComponent";
import { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  FormGroup,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { useSelector } from "react-redux";

const checkConnectedInstagramFromFacebook = (pageList) => {
  const connectedPage = pageList.find(
    (page) => "instagram_business_account" in page
  );
  if (connectedPage) {
    return connectedPage.id;
  }
  return "";
};

const Timeline = ({ platform }) => {
  const [showFilter, setShowFilter] = useState(false);

  const [pageList, setPageList] = useState([]);

  const [selectedPlatform, setSelectedPlatform] = useState("facebook");

  const [hashtagFilter, setHashtagFilter] = useState(["PoldaJatim"]);
  const [mentionsFilter, setMentionsFilter] = useState(["Polda_Jatim"]);
  const [pageFilter, setPageFilter] = useState("");

  const { facebookPageList } = useSelector((state) => state.facebookReducer);

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
    const isChecked = !event.target.checked;
    setPageFilter(value);
  };

  useEffect(() => {
    if (selectedPlatform === "facebook" || selectedPlatform === "instagram") {
      if (facebookPageList.length === 0) {
        alert("Please connect your Facebook account first");
      } else {
        setPageList(facebookPageList);
        setPageFilter(checkConnectedInstagramFromFacebook(facebookPageList));
      }
    }
  }, []);
  return (
    <Stack direction={"column"} className="space-y-4">
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
          />
        ))}
      </Stack>
      <Box className="relative min-h-[20rem]">
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
            data={HASHTAG_DATA}
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

        <Stack className="bg-white p-6 rounded-[10px]">test</Stack>
      </Box>
    </Stack>
  );
};

export default Timeline;

const HashtagFilter = ({ filter, handler, data }) => {
  return (
    <>
      <Typography className="font-semibold text-xs text-[#9098A3]">
        Hashtag
      </Typography>
      <Stack direction={"row"} flexWrap={"wrap"} spacing={0}>
        {data.map((item, id) => (
          <FormControlLabel
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
};

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
