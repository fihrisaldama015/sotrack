"use client";
import { forgotPassword } from "@/app/api/repository/UserRepository";
import InputEmail from "@/app/components/InputEmailComponent";
import { openPopUpError, openPopUpSuccess } from "@/app/utils/extensions";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const res = await forgotPassword({
        email: data.email,
      });
      if (res) {
        openPopUpSuccess(
          dispatch,
          `${res.message}! If not present, please check spam folder also.`
        );
      }
    } catch (error) {
      console.log("🚀 ~ onSubmit - ForgotPasswordForm ~ error:", error);
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
          name={"email"}
          register={register}
          validationSchema={{
            required: "Email is required",
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
