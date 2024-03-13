import { BG_LOGIN } from "@/app/utils/assets";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import SignUpFormComponent from "./components/SignUpFormComponent";

const SignUpPage = () => {
  return (
    <Stack direction={"row"}>
      <Box className="flex-1 flex">
        <Image
          src={BG_LOGIN}
          alt="login background"
          width={1000}
          height={1000}
          className="w-full h-screen object-cover"
        />
      </Box>
      <Stack
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        spacing={6}
        className="flex-1"
      >
        <Box>
          <Typography
            variant="h1"
            className="mb-3 text-5xl text-center font-medium text-[#0F172A]"
          >
            Sign Up
          </Typography>
          <Typography variant="p" className="text-center text-[#828282]">
            Begin your journey with us by signing up for the app!
          </Typography>
        </Box>
        <SignUpFormComponent />
      </Stack>
    </Stack>
  );
};

export default SignUpPage;
