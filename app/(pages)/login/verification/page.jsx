import { BG_OTP } from "@/app/utils/assets";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import VerifyOTPForm from "./components/VerifyOTPFormComponent";

const VerificationPage = () => {
  return (
    <Stack direction={"row"} className="min-h-[100svh]">
      <Box className="flex-1 flex items-center max-sm:hidden">
        <Image
          src={BG_OTP}
          alt="OTP background"
          priority
          width={2000}
          height={2000}
          quality={50}
          className="w-full h-[80vh] object-contain"
        />
      </Box>
      <Stack
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        className="flex-1 px-6"
      >
        <Box className="max-w-[26rem]">
          <Typography
            variant="h1"
            className="mb-3 text-[52px] font-medium text-primary-800"
          >
            Verification Your Code
          </Typography>
        </Box>
        <VerifyOTPForm />
      </Stack>
    </Stack>
  );
};

export default VerificationPage;
