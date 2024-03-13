"use client";
import { forgotPassword } from "@/app/api/repository/UserRepository";
import InputEmail from "@/app/components/InputEmailComponent";
import { Button, FormControl, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import RotateRightIcon from "@mui/icons-material/RotateRight";

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await forgotPassword({
        email: data.email,
      });
      if (res) {
        toast.success(
          `${res.message}! If not present, please check spam folder also.`,
          {
            position: "top-center",
            autoClose: 5000,
          }
        );
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
        <InputEmail
          name={"email"}
          register={register}
          validationSchema={{
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email address",
            },
          }}
          errors={errors}
        />
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={isSubmitting}
        className="mt-3 py-3 rounded-lg font-semibold tracking-wide text-xl"
      >
        {isSubmitting ? (
          <RotateRightIcon className="animate-spin" />
        ) : (
          "Send Link"
        )}
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
