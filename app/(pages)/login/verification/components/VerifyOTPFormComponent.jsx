"use client";

import { refreshOTP, verifyOTP } from "@/app/api/repository/UserRepository";
import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import RotateRightIcon from "@mui/icons-material/RotateRight";

const VerifyOTPForm = () => {
  const [isResendingOTP, setIsResendingOTP] = useState(false);
  const { emailLogin, otp_token } = useSelector((state) => state.loginReducer);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const router = useRouter();

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
        toast.success(`Success Verify! ${res.message}`, {
          position: "top-center",
          autoClose: 5000,
        });
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error(
        `${
          error?.error
            ? error?.error
            : "Terjadi kesalahan dari server, coba lagi"
        }`,
        {
          position: "top-center",
          autoClose: 5000,
        }
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
        toast.success(`${res.message}! Please Check your Email.`, {
          position: "top-center",
          autoClose: 5000,
        });
        // router.push("/dashboard");
      }
    } catch (error) {
      toast.error(
        `${
          error?.error
            ? error?.error
            : "Terjadi kesalahan dari server, coba lagi"
        }`,
        {
          position: "top-center",
          autoClose: 5000,
        }
      );
      console.log({ error: error });
    }
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
            onPaste="return false;"
            {...register("first", { required: true })}
          />
          <input
            className="bg-[#F1F2F4] ring-2 ring-slate-200 shadow-sm border-none outline-none focus:ring-primary-500 h-20 w-20 text-center text-3xl rounded-md"
            type="number"
            id="second"
            maxLength="1"
            disabled={isSubmitting}
            onPaste="return false;"
            {...register("second", { required: true })}
          />
          <input
            className="bg-[#F1F2F4] ring-2 ring-slate-200 shadow-sm border-none outline-none focus:ring-primary-500 h-20 w-20 text-center text-3xl rounded-md"
            type="number"
            id="third"
            maxLength="1"
            disabled={isSubmitting}
            onPaste="return false;"
            {...register("third", { required: true })}
          />
          <input
            className="bg-[#F1F2F4] ring-2 ring-slate-200 shadow-sm border-none outline-none focus:ring-primary-500 h-20 w-20 text-center text-3xl rounded-md"
            type="number"
            id="fourth"
            maxLength="1"
            disabled={isSubmitting}
            onPaste="return false;"
            {...register("fourth", { required: true })}
          />
        </div>
        <Typography
          variant="p"
          className="text-primary-500 cursor-pointer"
          onClick={handleResendOTP}
        >
          Resend Code
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
