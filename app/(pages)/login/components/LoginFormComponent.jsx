"use client";

import { loginUser } from "@/app/api/repository/UserRepository";
import PasswordInput from "@/app/components/PasswordInputComponent";
import {
  changeEmailLogin,
  changeOTPToken,
} from "@/app/redux/slices/LoginSlice";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import {
  Button,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

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
        toast.success(`Success login!, ${res.message}`, {
          position: "top-center",
          autoClose: 5000,
        });
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
        <TextField
          placeholder="email@domain.com"
          type="email"
          InputProps={{ sx: { borderRadius: 2 } }}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email address",
            },
          })}
        />
        {errors && errors["email"]?.type === "required" && (
          <span className="text-red-500 text-sm">
            {errors["email"]?.message}
          </span>
        )}
        {errors && errors["email"]?.type === "pattern" && (
          <span className="text-red-500 text-sm">
            {errors["email"]?.message}
          </span>
        )}
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
