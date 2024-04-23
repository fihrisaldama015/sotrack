"use client";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useState } from "react";

const TopicSelect = ({ topic, setTopic }) => {
  const [showDropDown, setShowDropDown] = useState(false);

  const handleTopicChange = async (topic) => {
    setTopic(topic);
    setShowDropDown(false);
  };
  return (
    <Box className="relative md:w-[40%] lg:w-[30%]">
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        spacing={0.5}
        onClick={() => setShowDropDown(!showDropDown)}
        className="w-full rounded-[20px] ring-1 bg-white ring-[#F0F0F0] hover:ring-slate-500 transition-all pl-4 py-3 pr-4 cursor-pointer hover:bg-slate-50"
      >
        <Stack direction={"row"} spacing={1}>
          <Typography className="text-base font-semibold text-[rgba(0,0,0,0.7)]">
            Topic:
          </Typography>
          <Typography className="text-base font-semibold first-letter:capitalize">
            {topic}
          </Typography>
        </Stack>
        <ArrowDropDown
          sx={{ width: 18 }}
          className={`${showDropDown ? "rotate-180" : ""} transition-all`}
        />
      </Stack>
      <form
        className="absolute right-1/2 top-12 bg-slate-50 p-1 z-10 shadow-lg rounded-xl transition-all text-base ring-1 ring-slate-200"
        style={{
          visibility: showDropDown ? "visible" : "hidden",
          opacity: showDropDown ? 1 : 0,
        }}
      >
        <Stack direction={"column"} spacing={0}>
          {TOPIC.map((item, index) => (
            <Box
              key={index}
              onClick={() => handleTopicChange(item.toLowerCase())}
              className="bg-slate-50 px-3 py-1 hover:bg-slate-200 transition-all rounded-lg cursor-pointer"
            >
              {item}
            </Box>
          ))}
        </Stack>
      </form>
    </Box>
  );
};

export default TopicSelect;

const TOPIC = [
  "All",
  "Murder",
  "Fraud",
  "Theft",
  "Shooting",
  "Threat",
  "Abuse",
  "Drugs",
  "Kidnapping",
  "Sexual Harrasment",
  "Accidents",
  "Demonstrate",
];
