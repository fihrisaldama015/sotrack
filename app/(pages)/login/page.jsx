import { BG_LOGIN } from "@/app/utils/assets";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import LoginFormComponent from "./components/LoginFormComponent";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const LoginPage = () => {
  const token = cookies().get("accessToken")?.value;

  if (token) {
    redirect("/dashboard");
  }

  return (
    <Stack direction={"row"} className="min-h-[100dvh]">
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
            Login
          </Typography>
          <Typography variant="p" className="text-center text-[#828282]">
            Enter your credential to access your account.
          </Typography>
        </Box>
        <LoginFormComponent />
      </Stack>
      <Box className="flex-1 flex max-sm:hidden">
        <Image
          src={BG_LOGIN}
          alt="login background"
          width={1000}
          height={1000}
          className="w-full h-screen object-cover"
        />
      </Box>
    </Stack>
  );
};

export default LoginPage;
