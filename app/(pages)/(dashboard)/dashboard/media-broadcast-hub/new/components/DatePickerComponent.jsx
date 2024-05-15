"use client";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";

const DatePickerComponent = ({
  name,
  register,
  errors,
  validationSchema,
  date,
  setDate,
}) => {
  return (
    <Box className="w-full">
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label=""
            value={date}
            onChange={(newValue) => setDate(newValue)}
            className="w-full"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "6px",
              },
            }}
            // {...register(name, {
            //   ...validationSchema,
            // })}
          />
        </LocalizationProvider>
      </Stack>
      {/* {errors && errors[name]?.type === "required" && (
        <span className="text-red-500 text-sm">{errors[name]?.message}</span>
      )} */}
    </Box>
  );
};

export default DatePickerComponent;
