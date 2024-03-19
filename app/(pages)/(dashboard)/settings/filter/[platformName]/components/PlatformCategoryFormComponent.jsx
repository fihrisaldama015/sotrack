"use client";
import {
  addFilter,
  editUserFilter,
} from "@/app/api/repository/FilterRepository";
import { openPopUpError, openPopUpSuccess } from "@/app/utils/extensions";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RotateRightOutlined } from "@mui/icons-material";

const PlatformCategoryForm = ({
  token,
  category,
  edit,
  filterId,
  refreshPage,
}) => {
  const [categoryId, setCategoryId] = useState("");
  const [parameter, setParameter] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { platformId } = useSelector((state) => state.platformReducer);
  const { filterData } = useSelector((state) => state.filterReducer);
  const router = useRouter();

  useEffect(() => {
    if (edit) {
      setCategoryId(filterData.category_id);
      setParameter(filterData.parameter);
    }
  }, []);

  const CATEGORY_COLOR = new Map()
    .set("Keyword", "#3E3AFF")
    .set("Mention", "#F4C41A")
    .set("Topic", "#1B59F8");

  const handleSubmitFilter = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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
      setCategoryId("");
      setParameter("");
      // location.reload();
      refreshPage();
    } catch (error) {
      openPopUpError(dispatch, `${error.error}: ${error.message}`);
    }

    setIsLoading(false);
  };

  const handleEditFilter = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await editUserFilter(
        filterId,
        {
          category_id: categoryId,
          parameter,
          platform_id: platformId,
          is_active: isActive,
        },
        token
      );
      openPopUpSuccess(dispatch, "Success Edit Filter");
      router.back();
      setCategoryId("");
      setParameter("");
    } catch (error) {
      openPopUpError(dispatch, `${error.error}: ${error.message}`);
    }

    setIsLoading(false);
  };

  const resetFilter = () => {
    setCategoryId("");
    setParameter("");
  };

  return (
    <form
      style={{ width: 440 }}
      className="flex flex-col gap-3"
      onSubmit={edit ? handleEditFilter : handleSubmitFilter}
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
      {edit && (
        <FormControl>
          <FormLabel id="is_active_group">Is Active</FormLabel>
          <RadioGroup
            aria-labelledby="is_active_group"
            name="is_active"
            value={isActive}
            onChange={setIsActive}
          >
            <FormControlLabel value={true} control={<Radio />} label="Active" />
            <FormControlLabel
              value={false}
              control={<Radio />}
              label="Not Active"
            />
          </RadioGroup>
        </FormControl>
      )}
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
        <Button
          disabled={isLoading}
          type="submit"
          variant="contained"
          className="rounded-lg"
        >
          {isLoading ? <RotateRightOutlined className="animate-spin" /> : ""}
          {edit ? "Edit Filter" : "Apply Filter"}
        </Button>
      </Stack>
    </form>
  );
};

export default PlatformCategoryForm;
