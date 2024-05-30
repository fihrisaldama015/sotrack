"use client";
import {
  addFilter,
  editUserFilter,
} from "@/app/api/repository/FilterRepository";
import { openPopUpError, openPopUpSuccess } from "@/app/utils/extensions";
import { RotateRightOutlined } from "@mui/icons-material";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const PlatformCategoryForm = ({
  token,
  category,
  edit,
  filterId,
  refreshPage,
  platformName,
}) => {
  const [categoryId, setCategoryId] = useState("");
  const [parameter, setParameter] = useState("");
  const [isActive, setIsActive] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { platformId } = useSelector((state) => state.platformReducer);
  const { filterData } = useSelector((state) => state.filterReducer);
  const router = useRouter();

  useEffect(() => {
    if (edit) {
      setCategoryId(filterData.category_id);
      setParameter(filterData.parameter);
      setIsActive(filterData.is_active ? "active" : "not_active");
    }
  }, []);

  const handleRadio = (e) => {
    setIsActive(e.target.value);
  };

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
          is_active: isActive === "active",
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
      style={{ width: 300 }}
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
            onChange={handleRadio}
          >
            <FormControlLabel
              value="active"
              control={<Radio />}
              label="Active"
            />
            <FormControlLabel
              value="not_active"
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
          disabled={isLoading || platformName == "facebook"}
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
