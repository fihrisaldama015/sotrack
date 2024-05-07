"use client";
import { sendMediaBroadCastEmail } from "@/app/api/repository/MediaBroadcastRepository";
import { getCookie } from "cookies-next";
import React from "react";
import { useForm } from "react-hook-form";

const page = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const token = getCookie("accessToken");
    console.log("submit");
    const file = data.file[0];
    console.log("🚀 ~ onSubmit ~ file:", file);
    try {
      const res = await sendMediaBroadCastEmail(
        token,
        "fihrisaldama06@gmail.com, fihrisaldama05@gmail.com",
        "test",
        "<b>AOWKOAKW</b>",
        "2024-5-01",
        "Surabaya",
        [file]
      );
      console.log("🚀 ~ onSubmit ~ res:", res);
    } catch (e) {
      console.log("🚀 ~ onSubmit ~ e:", e);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="file" {...register("file")} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default page;
