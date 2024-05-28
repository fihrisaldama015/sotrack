"use client";
import { sendMediaBroadCastEmail } from "@/app/api/repository/MediaBroadcastRepository";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DatePickerComponent from "./DatePickerComponent";
import dayjs from "dayjs";
import { openPopUpError, openPopUpSuccess } from "@/app/utils/extensions";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const AddNewBroadcastForm = ({ recipient, action }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [date, setDate] = useState(dayjs());
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (action.reset == true) {
      console.log("reset component");
      setFiles([]);
      reset();
    }
    return () => {
      action.close();
    };
  }, [action.reset]);

  const handleFile = (e) => {
    const newFiles = [];
    for (let i = 0; i < e.target.files.length; i++) {
      newFiles.push(e.target.files[i]);
    }
    setFiles(newFiles);
  };

  const onSubmit = async (data) => {
    const token = getCookie("accessToken");
    const { title, city, broadcast, file } = data;
    const formattedDate = dayjs(date).format("YYYY-MM-DD");

    try {
      const res = await sendMediaBroadCastEmail(
        token,
        recipient,
        title,
        `<p>${broadcast}</p>`,
        formattedDate,
        city,
        files
      );
      if (res) {
        openPopUpSuccess(dispatch, `${res.message}`);
        router.push("/dashboard/media-broadcast-hub");
      }
    } catch (error) {
      console.log("🚀 ~ onSubmit - AddNewBroadcastForm ~ error:", error);
      openPopUpError(
        dispatch,
        error?.error ? error?.error : "Terjadi kesalahan dari server, coba lagi"
      );
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
            setDate={setDate}
            date={date}
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
          onChange={(e) => handleFile(e)}
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
          onClick={() => action.open()}
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
};

export default AddNewBroadcastForm;
