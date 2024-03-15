"use client";
import { addFilter } from "@/app/api/repository/FilterRepository";
import { openPopUpError, openPopUpSuccess } from "@/app/utils/extensions";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const PlatformCategoryForm = ({ token, category, platformName }) => {
  const [categoryId, setCategoryId] = useState("");
  const [parameter, setParameter] = useState("");
  const dispatch = useDispatch();
  const { platformId } = useSelector((state) => state.platformReducer);

  const CATEGORY_COLOR = new Map()
    .set("Keyword", "#3E3AFF")
    .set("Mention", "#F4C41A")
    .set("Topic", "#1B59F8");

  const handleSubmitFilter = async (e) => {
    e.preventDefault();
    try {
      await addFilter(
        {
          category_id: categoryId,
          parameter,
          platform_id: platformId,
        },
        token
      );
      openPopUpSuccess(dispatch, "Success Add Filter");
      location.reload();
    } catch (error) {
      openPopUpError(dispatch, `${error.error}: ${error.message}`);
    }
    setCategoryId("");
    setParameter("");
  };

  const resetFilter = () => {
    setCategoryId("");
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
          value={categoryId}
          label="Select Category"
          onChange={(e) => setCategoryId(e.target.value)}
          className="rounded-lg"
        >
          {category?.map((item) => (
            <MenuItem
              key={item.id}
              value={item.id}
              className={`font-bold`}
              sx={{ color: `${CATEGORY_COLOR.get(item.name)}` }}
            >
              {item.name}
            </MenuItem>
          ))}
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

export default PlatformCategoryForm;
