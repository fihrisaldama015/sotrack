"use client";
import { Box, Stack, Typography } from "@mui/material";
import TwitterCategoryFormComponent from "./components/TwitterCategoryFormComponent";
import TwitterFilterTableComponent from "./components/TwitterFilterTableComponent";

const FilterTwitterPage = () => {
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
        <TwitterFilterTableComponent />
      </Box>
    </Stack>
  );
};

export default FilterTwitterPage;
