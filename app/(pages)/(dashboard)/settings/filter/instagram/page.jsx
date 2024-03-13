"use client";
import { Box, Stack, Typography } from "@mui/material";
import TwitterCategoryFormComponent from "../components/TwitterCategoryFormComponent";
import InstagramFilterTableComponent from "./components/InstagramFilterTableComponent";

const FilterInstagramPage = () => {
  return (
    <Stack direction={"row"} spacing={15}>
      <Box>
        <Typography className="mb-6 text-base font-semibold text-[#343A40]">
          Filter Settings
        </Typography>
        <TwitterCategoryFormComponent />
      </Box>
      <Box>
        <Typography className="mb-6 text-base font-semibold text-[#343A40]">
          Filter is Running
        </Typography>
        <InstagramFilterTableComponent />
      </Box>
    </Stack>
  );
};

export default FilterInstagramPage;
