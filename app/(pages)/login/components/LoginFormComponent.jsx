"use client";

import { loginUser } from "@/app/api/repository/UserRepository";
import InputEmail from "@/app/components/InputEmailComponent";
import PasswordInput from "@/app/components/PasswordInputComponent";
import {
  changeEmailLogin,
  changeOTPToken,
} from "@/app/redux/slices/LoginSlice";
import { openPopUpError, openPopUpSuccess } from "@/app/utils/extensions";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const LoginFormComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const res = await loginUser({
        email: data.email,
        password: data.password,
      });
      if (res) {
        openPopUpSuccess(dispatch, `Success login!, ${res.message}`);
        dispatch(
          changeEmailLogin({
            emailLogin: data.email,
          })
        );
        dispatch(
          changeOTPToken({
            otp_token: res.data.otp_token,
          })
        );
        router.push("/login/verification");
      }
    } catch (error) {
      console.log("🚀 ~ onSubmit - LoginForm ~ error:", error);
      openPopUpError(
        dispatch,
        error?.error ? error?.error : "Terjadi kesalahan dari server, coba lagi"
      );
    }
  };

  return (
    <form
      style={{ width: 420 }}
      className="flex flex-col gap-7"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormControl>
        <Typography className="mb-3 font-medium text-base">
          Email Address
        </Typography>
        <InputEmail
          errors={errors}
          name={"email"}
          register={register}
          validationSchema={{
            required: "Email is required",
          }}
        />
      </FormControl>
      <FormControl>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography className="mb-3 font-medium text-base">
            Password
          </Typography>
          <Link
            href="/forgot-password"
            className="no-underline text-primary-500"
          >
            Forgot Password
          </Link>
        </Stack>
        <PasswordInput
          name="password"
          register={register}
          validationSchema={{
            required: "Password Is Required",
            minLength: {
              value: 6,
              message: "Please enter a minimum of 6 characters",
            },
          }}
          errors={errors}
        />
      </FormControl>
      <Stack direction={"column"}>
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={isSubmitting}
          className="mt-3 mb-5 py-3 rounded-lg font-semibold tracking-wide text-xl"
        >
          {isSubmitting ? (
            <RotateRightIcon className="animate-spin" />
          ) : (
            "Login"
          )}
        </Button>

        <Typography className="text-center text-[#4F4F4F]">
          Don’t have an account?{" "}
          <Link href={"/signup"} className="no-underline text-primary-800">
            Register here.
          </Link>
        </Typography>
      </Stack>
    </form>
  );
};

export default LoginFormComponent;
