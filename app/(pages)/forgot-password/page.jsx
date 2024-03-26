import { BG_FORGOT } from "@/app/utils/assets";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import ForgotPasswordForm from "./components/ForgotPasswordFormComponent";

const ForgotPasswordPage = () => {
  return (
    <Stack direction={"row"} className="min-h-[100svh]">
      <Box className="flex-1 flex items-center justify-end">
        <Image
          src={BG_FORGOT}
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
            Forgot Password
          </Typography>
          <Typography variant="p" className="text-center text-[#828282]">
            Enter your email address and we will send a link to reset your
            password
          </Typography>
        </Box>
        <ForgotPasswordForm />
      </Stack>
    </Stack>
  );
};

export default ForgotPasswordPage;
