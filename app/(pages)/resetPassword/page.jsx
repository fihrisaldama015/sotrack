import { BG_NEW_PASSWORD } from "@/app/utils/assets";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import ResetPasswordForm from "./components/ResetPasswordFormComponent";

const ResetPasswordPage = () => {
  return (
    <Stack direction={"row"} className="min-h-[100svh]">
      <Box className="flex-1 flex items-center justify-end">
        <Image
          src={BG_NEW_PASSWORD}
          alt="login background"
          width={2000}
          height={2000}
          className="w-auto h-[80vh] object-cover"
        />
      </Box>
      <Stack
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        spacing={6}
        className="flex-1"
      >
        <Box className="max-w-[26rem]">
          <Typography
            variant="h1"
            className="mb-3 text-[52px] font-medium text-[#0F172A]"
          >
            New Password
          </Typography>
          <Typography variant="p" className="text-center text-[#828282]">
            Please enter your new password to login again
          </Typography>
        </Box>
        <ResetPasswordForm />
      </Stack>
    </Stack>
  );
};

export default ResetPasswordPage;
