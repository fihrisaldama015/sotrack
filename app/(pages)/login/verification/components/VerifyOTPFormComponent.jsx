"use client";

import { refreshOTP, verifyOTP } from "@/app/api/repository/UserRepository";
import {
  FormatCountDown,
  openPopUpError,
  openPopUpSuccess,
} from "@/app/utils/extensions";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { getCookie, getCookies, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const VerifyOTPForm = () => {
  const [isResendingOTP, setIsResendingOTP] = useState(false);
  const [timerCountDown, setTimerCountdown] = useState(240);
  const { emailLogin, otp_token } = useSelector((state) => state.loginReducer);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (timerCountDown > 0) {
        setTimerCountdown((prev) => prev - 1);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, []);

  const onSubmit = async (data) => {
    const joinedOTP = `${data.first}${data.second}${data.third}${data.fourth}`;
    try {
      const res = await verifyOTP(
        {
          otp_code: joinedOTP,
        },
        otp_token
      );
      if (res) {
        openPopUpSuccess(dispatch, `Success Verify! ${res.message}`);
        setCookie("accessToken", res.data.accessToken, {
          path: "/",
          maxAge: 60 * 15,
        });
        const allCookies = getCookies();
        const cookieHeaders = res;
        // cookieHeaders.split("; ");
        console.log("🚀 ~ onSubmit ~ cookieHeaders:", cookieHeaders);

        console.log("🚀 ~ onSubmit ~ allCookies:", allCookies);
        // const refreshToken = getCookie("refresh_token");
        // setCookie("refresh_token", refreshToken, {
        //   path: "/",
        //   maxAge: 60 * 60 * 24 * 7,
        // });

        router.push("/dashboard");
      }
    } catch (error) {
      openPopUpError(
        dispatch,
        error?.error ? error?.error : "Terjadi kesalahan dari server, coba lagi"
      );
      console.log({ error: error });
    }
  };

  useEffect(() => {
    OTPInput();
  }, []);

  const handleResendOTP = async () => {
    setIsResendingOTP(true);
    try {
      const res = await refreshOTP({}, otp_token);
      if (res) {
        openPopUpSuccess(dispatch, `${res.message}! Please Check your Email.`);
        setTimerCountdown(240);
      }
    } catch (error) {
      openPopUpError(
        dispatch,
        error?.error ? error?.error : "Terjadi kesalahan dari server, coba lagi"
      );
      console.log({ error: error });
    }
    reset();
    setIsResendingOTP(false);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction={"column"} gap={2.5} className="max-w-[26rem]">
        <Typography variant="p" className="mb-10 text-[#828282]">
          Please enter the code we sent to your email address{" "}
          <span className="font-bold">{emailLogin}</span>
        </Typography>
        <div id="otp" className="flex flex-row justify-start text-center gap-7">
          <input
            className="bg-[#F1F2F4] ring-2 ring-slate-200 shadow-sm border-none outline-none focus:ring-primary-500 h-20 w-20 text-center text-3xl rounded-md"
            type="number"
            id="first"
            maxLength="1"
            disabled={isSubmitting}
            autoFocus={true}
            {...register("first", { required: true })}
          />
          <input
            className="bg-[#F1F2F4] ring-2 ring-slate-200 shadow-sm border-none outline-none focus:ring-primary-500 h-20 w-20 text-center text-3xl rounded-md"
            type="number"
            id="second"
            maxLength="1"
            disabled={isSubmitting}
            {...register("second", { required: true })}
          />
          <input
            className="bg-[#F1F2F4] ring-2 ring-slate-200 shadow-sm border-none outline-none focus:ring-primary-500 h-20 w-20 text-center text-3xl rounded-md"
            type="number"
            id="third"
            maxLength="1"
            disabled={isSubmitting}
            {...register("third", { required: true })}
          />
          <input
            className="bg-[#F1F2F4] ring-2 ring-slate-200 shadow-sm border-none outline-none focus:ring-primary-500 h-20 w-20 text-center text-3xl rounded-md"
            type="number"
            id="fourth"
            maxLength="1"
            disabled={isSubmitting}
            {...register("fourth", { required: true })}
          />
        </div>
        <Typography
          variant="p"
          className="text-primary-500 cursor-pointer w-fit"
          onClick={handleResendOTP}
        >
          Resend Code {"("}
          {FormatCountDown(timerCountDown)}
          {")"}
        </Typography>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={isSubmitting || isResendingOTP}
          className="mt-5 rounded-lg py-3 font-semibold tracking-wide text-xl"
        >
          {isSubmitting || isResendingOTP ? (
            <RotateRightIcon className="animate-spin" />
          ) : (
            "Confirm"
          )}
        </Button>
      </Stack>
    </form>
  );
};

export default VerifyOTPForm;

const OTPInput = () => {
  const inputs = document.querySelectorAll("#otp > *[id]");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("keydown", function (event) {
      if (event.key === "Backspace") {
        inputs[i].value = "";
        if (i !== 0) inputs[i - 1].focus();
      } else {
        if (i === inputs.length - 1 && inputs[i].value !== "") {
          return true;
        } else if (event.keyCode > 47 && event.keyCode < 58) {
          inputs[i].value = event.key;
          if (i !== inputs.length - 1) inputs[i + 1].focus();
          event.preventDefault();
        }
      }
    });
  }
};
