"use client";
import { sendMediaBroadCastEmail } from "@/app/api/repository/MediaBroadcastRepository";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { getCookie } from "cookies-next";
import React from "react";
import { useForm } from "react-hook-form";
import DatePickerComponent from "./DatePickerComponent";

const AddNewBroadcastForm = React.memo(({ recipient }) => {
  console.log("🚀 ~ AddNewBroadcastForm ~ recipient:", recipient);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    const token = getCookie("accessToken");
    const { title, city, broadcast, date, file } = data;
    try {
      const res = await sendMediaBroadCastEmail(
        token,
        recipient,
        title,
        `<p>${broadcast}</p>`,
        date,
        city,
        [file]
      );
      console.log("🚀 ~ onSubmit ~ res:", res);
    } catch (e) {
      console.log("🚀 ~ onSubmit ~ e:", e);
    }
  };
  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <Typography className="mb-[14px] text-base">Title</Typography>
        <TextField
          placeholder="Title"
          type={"text"}
          InputProps={{
            sx: { borderRadius: 2 },
          }}
          {...register("title", { required: "Title is required" })}
        />
        {errors && errors["title"]?.type === "required" && (
          <span className="text-red-500 text-sm">
            {errors["title"]?.message}
          </span>
        )}
      </FormControl>
      <Stack spacing={2} direction={"row"} className="w-full">
        <FormControl className="w-full">
          <Typography className="mb-[14px] text-base">City</Typography>
          <TextField
            placeholder="City"
            type={"text"}
            InputProps={{
              sx: { borderRadius: 2 },
            }}
            {...register("city", { required: "City is required" })}
          />
          {errors && errors["city"]?.type === "required" && (
            <span className="text-red-500 text-sm">
              {errors["city"]?.message}
            </span>
          )}
        </FormControl>
        <FormControl className="w-full">
          <Typography className="mb-[14px] text-base">Date</Typography>
          <DatePickerComponent
            errors={errors}
            name={"date"}
            register={register}
            validationSchema={{
              required: "Date is required",
            }}
          />
        </FormControl>
      </Stack>
      <FormControl>
        <Typography className="mb-[14px] text-base">Broadcast</Typography>
        <TextField
          placeholder="Title"
          type={"text"}
          InputProps={{
            sx: { borderRadius: 2 },
          }}
          {...register("broadcast", { required: "broadcast is required" })}
        />
        {errors && errors["broadcast"]?.type === "required" && (
          <span className="text-red-500 text-sm">
            {errors["broadcast"]?.message}
          </span>
        )}
        <input
          type="file"
          name="file"
          id="file"
          {...register("file")}
          multiple
        />
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
  );
});

export default AddNewBroadcastForm;
