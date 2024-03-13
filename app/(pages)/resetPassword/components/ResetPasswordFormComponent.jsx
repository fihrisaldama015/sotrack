"use client";
import { resetPassword } from "@/app/api/repository/UserRepository";
import PasswordInput from "@/app/components/PasswordInputComponent";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import { Button, FormControl, Stack, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const password = useRef({});
  const router = useRouter();
  const searchParams = useSearchParams();

  password.current = watch("password", "");
  const resetToken = searchParams.get("reset") || "";
  const onSubmit = async (data) => {
    if (data.password !== data.passwordConfirm) {
      toast.error(`Password and Confirm Password must be same`, {
        position: "top-center",
        autoClose: 5000,
      });
      return;
    }
    if (!resetToken) {
      toast.error(
        `Reset token not found!, try using the link from your email`,
        {
          position: "top-center",
          autoClose: 5000,
        }
      );
      return;
    }
    try {
      const res = await resetPassword(
        {
          password: data.password,
        },
        {
          reset: resetToken,
        }
      );
      if (res) {
        toast.success(
          `Congratulations you're new password has been successfully created!. ${res.message}`,
          {
            position: "top-center",
            autoClose: 5000,
          }
        );

        router.push("/login");
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
          New Password
        </Typography>
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
        <Stack
          direction="row"
          alignItems={"center"}
          spacing={1}
          className="mt-2"
        >
          {password.current.length < 6 ? (
            <CheckBoxOutlineBlankIcon sx={{ width: "16px" }} />
          ) : (
            <CheckBoxIcon color="primary" sx={{ width: "16px" }} />
          )}

          <Typography className="text-[#333333] text-xs">
            Must be at least 6 characters.
          </Typography>
        </Stack>
      </FormControl>
      <FormControl>
        <Typography className="mb-3 font-medium text-base">
          Confirm Password
        </Typography>

        <PasswordInput
          name="passwordConfirm"
          register={register}
          validationSchema={{
            required: "Confirm Password Is Required",
            minLength: {
              value: 6,
              message: "Please enter a minimum of 6 characters",
            },
            validate: (value) =>
              value === password.current || "The passwords do not match",
          }}
          errors={errors}
        />
      </FormControl>
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
          "Reset Password"
        )}
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
