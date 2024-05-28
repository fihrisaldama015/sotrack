"use client";
import {
  getCategory,
  getCity,
  getProvince,
  sendPublicReport,
} from "@/app/api/repository/PublicReportRepository";
import { InputEmail } from "@/app/components";
import { openPopUpError, openPopUpSuccess } from "@/app/utils/extensions";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const PublicReportForm = ({ params }) => {
  const [province, setProvince] = useState([]);
  const [city, setCity] = useState([]);
  const [category, setCategory] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();
  const instance_id = params.instance_id;
  const dispatch = useDispatch();
  let selected_province = watch("province");
  const accessToken = getCookie("accessToken");

  const getProvinceList = async () => {
    const data = await getProvince();
    setProvince(data);
  };

  const getCityList = async () => {
    const data = await getCity(selected_province);
    setCity(data);
  };

  const getCategoryList = async () => {
    const data = await getCategory();
    setCategory(data);
  };

  const onSubmit = async (data) => {
    const province_name = province.find(
      (item) => item.province_id == data.province
    ).province;
    data.province = province_name;
    try {
      const response = await sendPublicReport(data, instance_id, accessToken);
      if (response) {
        openPopUpSuccess(dispatch, `${response.message}!`);
      }
    } catch (error) {
      openPopUpError(
        dispatch,
        error?.error ? error?.error : "Terjadi kesalahan dari server, coba lagi"
      );
      console.log("🚀 ~ onSubmit - PublicReportForm ~ error:", error);
    }
  };

  useEffect(() => {
    getProvinceList();
    getCategoryList();
  }, []);

  useEffect(() => {
    if (selected_province != undefined && selected_province != "") {
      getCityList();
    }
  }, [selected_province]);

  return (
    <Box className="p-20 pt-5 flex flex-col justify-center items-center gap-3">
      <Typography className="font-extrabold text-4xl text-center">
        Public Report
      </Typography>
      <Stack direction={"column"} gap={4}>
        <Typography className="font-medium text-base text-center">
          Please write your complaints or suggestions to the relevant
          institution. Use proper language so that your complaints or
          suggestions can be well received.
        </Typography>
        <form
          className="py-7 px-20 flex flex-col gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography className="text-xl font-semibold">
            Public Report
          </Typography>
          <FormControl>
            <Typography className="mb-3 font-medium text-base">Name</Typography>
            <TextField
              placeholder="Name"
              type={"text"}
              InputProps={{
                sx: { borderRadius: 2 },
              }}
              {...register("name", {
                required: "Email is required",
              })}
            />
            {errors && errors["name"]?.type === "required" && (
              <span className="text-red-500 text-sm">
                {errors["name"]?.message}
              </span>
            )}
          </FormControl>
          <FormControl>
            <Typography className="mb-3 font-medium text-base">
              Email Address
            </Typography>
            <InputEmail
              name={"email"}
              errors={errors}
              register={register}
              validationSchema={{
                required: "Email is required",
              }}
            />
          </FormControl>
          <Stack direction={"row"} spacing={2}>
            <FormControl className="flex flex-1">
              <Typography className="mb-3 font-medium text-base">
                Phone Number
              </Typography>
              <TextField
                placeholder="Phone Number"
                type={"text"}
                InputProps={{
                  sx: { borderRadius: 2 },
                }}
                {...register("phone", {
                  required: "Phone Number is required",
                })}
              />
              {errors && errors["phone"]?.type === "required" && (
                <span className="text-red-500 text-sm">
                  {errors["phone"]?.message}
                </span>
              )}
            </FormControl>
            <FormControl className="flex flex-1">
              <Typography className="mb-3 font-medium text-base">
                Category
              </Typography>
              <Select
                labelId="category_select"
                id="category_select"
                className="rounded-lg w-full"
                defaultValue={""}
                {...register("category_id", {
                  required: "Category is required",
                })}
              >
                {category?.length > 0 &&
                  category?.map((item, id) => (
                    <MenuItem key={id} value={item.id} className={`font-bold`}>
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
              {errors && errors["category"]?.type === "required" && (
                <span className="text-red-500 text-sm">
                  {errors["category"]?.message}
                </span>
              )}
            </FormControl>
          </Stack>
          <Stack direction={"row"} spacing={2}>
            <FormControl className="flex flex-1">
              <Typography className="mb-3 font-medium text-base">
                Province
              </Typography>
              <Select
                labelId="province_select"
                id="province_select"
                className="rounded-lg w-full"
                defaultValue={""}
                {...register("province", {
                  required: "Province is required",
                })}
              >
                {province?.length > 0 &&
                  province?.map((item, id) => (
                    <MenuItem
                      key={id}
                      value={item.province_id}
                      className={`font-bold`}
                    >
                      {item.province}
                    </MenuItem>
                  ))}
              </Select>
              {errors && errors["province"]?.type === "required" && (
                <span className="text-red-500 text-sm">
                  {errors["province"]?.message}
                </span>
              )}
            </FormControl>
            <FormControl className="flex flex-1">
              <Typography className="mb-3 font-medium text-base">
                City/Regency
              </Typography>
              <Select
                labelId="city_select"
                id="city-select"
                className="rounded-lg w-full"
                defaultValue={""}
                disabled={
                  selected_province == undefined || selected_province == ""
                }
                {...register("city", {
                  required: "City/Regency is required",
                })}
              >
                {city?.length > 0 &&
                  city?.map((item, id) => (
                    <MenuItem
                      key={id}
                      value={item.city_name}
                      className={`font-bold`}
                    >
                      {item.type == "Kota" && "Kota"} {item.city_name}
                    </MenuItem>
                  ))}
              </Select>
              {errors && errors["city"]?.type === "required" && (
                <span className="text-red-500 text-sm">
                  {errors["city"]?.message}
                </span>
              )}
            </FormControl>
          </Stack>
          <FormControl>
            <Typography className="mb-3 font-medium text-base">
              Report
            </Typography>
            <TextField
              placeholder="Report Guideline"
              {...register("message", {
                required: "Report is required",
              })}
            />
            {errors && errors["report"]?.type === "required" && (
              <span className="text-red-500 text-sm">
                {errors["report"]?.message}
              </span>
            )}
            {/* <input
              type="file"
              name="file"
              id="file"
              {...register("attachment")}
              multiple
            /> */}
          </FormControl>
          <Stack
            spacing={2}
            direction={"row"}
            justifyContent={"flex-end"}
            className="w-full mb-16"
          >
            <Button
              type="button"
              variant="contained"
              size="large"
              color="error"
              className="px-10 py-3 rounded-md font-semibold text-white text-base"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isSubmitting}
              className="px-10 py-3 rounded-md font-semibold text-white text-base"
            >
              {isSubmitting ? (
                <>
                  <RotateRightIcon className="animate-spin" />
                  Sending
                </>
              ) : (
                "Send"
              )}
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
};

export default PublicReportForm;
