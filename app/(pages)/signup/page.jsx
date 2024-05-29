import { BG_LOGIN } from "@/app/utils/assets";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import SignUpFormComponent from "./components/SignUpFormComponent";

const SignUpPage = () => {
  return (
    <Stack direction={"row"} className="min-h-[100dvh]">
      <Box className="flex-1 flex max-sm:hidden">
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
        className="flex-1 px-6"
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
