"use client";

import { registerUser } from "@/app/api/repository/UserRepository";
import InputEmail from "@/app/components/InputEmailComponent";
import PasswordInput from "@/app/components/PasswordInputComponent";
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

const SignUpFormComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const res = await registerUser({
        email: data.email,
        password: data.password,
      });
      if (res) {
        openPopUpSuccess(
          dispatch,
          `Congratulation, your account has been successfully created!`
        );
        router.push("/login");
      }
    } catch (error) {
      openPopUpError(
        dispatch,
        error?.error ? error?.error : "Terjadi kesalahan dari server, coba lagi"
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
        <InputEmail
          name={"email"}
          errors={errors}
          register={register}
          validationSchema={{
            required: "Email is required",
          }}
        />
      </FormControl>
      <FormControl>
        <Typography className="mb-3 font-medium text-base">Password</Typography>
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
            "Sign Up"
          )}
        </Button>

        <Typography className="text-center text-[#4F4F4F]">
          Already have an account?{" "}
          <Link href={"/login"} className="no-underline text-primary-800">
            Login here.
          </Link>
        </Typography>
      </Stack>
    </form>
  );
};

export default SignUpFormComponent;
