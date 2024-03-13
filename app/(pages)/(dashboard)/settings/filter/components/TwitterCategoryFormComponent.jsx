"use client";
import {
  Box,
  Button,
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const styles = () => ({
  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: `#ff0 !important`,
    },
  },

  cssFocused: {},

  notchedOutline: {
    borderWidth: "1px",
    borderColor: "green !important",
  },
});

const TwitterCategoryFormComponent = () => {
  const [category, setCategory] = useState("");
  const [parameter, setParameter] = useState("");

  const handleSubmitFilter = (e) => {
    e.preventDefault();
    console.log({ category, parameter });
    setCategory("");
    setParameter("");
  };

  const resetFilter = () => {
    setCategory("");
    setParameter("");
  };

  return (
    <form
      style={{ width: 440 }}
      className="flex flex-col gap-3"
      onSubmit={handleSubmitFilter}
    >
      <Typography className="font-semibold text-sm">Category</Typography>
      <FormControl required>
        <InputLabel id="category-select-label">Select Category</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={category}
          label="Select Category"
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg"
        >
          <MenuItem value={"keyword"} className="text-[#3E3AFF] font-bold">
            Keyword
          </MenuItem>
          <MenuItem value={"mention"} className="text-[#F4C41A] font-bold">
            Mention
          </MenuItem>
          <MenuItem value={"topic"} className="text-[#1B59F8] font-bold">
            Topic
          </MenuItem>
        </Select>
      </FormControl>
      <Typography className="mt-2 font-semibold text-sm">Parameter</Typography>
      <FormControl>
        <TextField
          label="Input Parameter"
          onChange={(e) => setParameter(e.target.value)}
          value={parameter}
          required
          InputProps={{ sx: { borderRadius: 2 } }}
        />
      </FormControl>
      <Stack
        direction={"row"}
        justifyContent={"flex-end"}
        spacing={2}
        className="mt-8"
      >
        <Button
          type="button"
          variant="outlined"
          className="rounded-lg"
          onClick={resetFilter}
          style={{ border: "2px solid" }}
        >
          Reset Filter
        </Button>
        <Button type="submit" variant="contained" className="rounded-lg">
          Apply Filter
        </Button>
      </Stack>
    </form>
  );
};

export default TwitterCategoryFormComponent;
