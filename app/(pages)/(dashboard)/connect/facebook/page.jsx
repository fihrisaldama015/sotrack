import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Image from "next/image";
import { BASE_URL } from "@/app/utils/constants";

const ConnectFacebook = () => {
  return (
    <Stack className="flex-col xl:flex-row gap-16 justify-between" spacing={15}>
      <Stack
        alignItems={"center"}
        direction={"column"}
        justifyContent={"center"}
        spacing={4}
        className="flex-1 ring-1 ring-[#343A40] rounded-[10px] p-8 h-[300px] w-[300px]"
      >
        <Typography className="text-center text-xl text-[#343A40]">
          Click the button below and please login to your Facebook account
        </Typography>
        <a href={`${BASE_URL}/auth/facebook`} className="no-underline">
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            spacing={2}
            className="py-4 lg:px-28 px-8 bg-[#3D5A98] rounded-md cursor-pointer hover:bg-[#2E4A7D] transition-all"
          >
            <Image
              src={"/assets/icon/facebook.svg"}
              width={16}
              height={16}
              alt="facebook"
            />
            <Typography className="text-white font-semibold text-sm lg:text-xl">
              Log in with Facebook
            </Typography>
          </Stack>
        </a>
      </Stack>
      <Box className="my-0 h-full flex flex-1 flex-col justify-start">
        <Typography className=" text-base font-semibold text-[#343A40]">
          Account Connect
        </Typography>
        <Stack direction={"column"} className="">
          <Stack
            direction={"row"}
            alignItems={"center"}
            className="px-4 py-1 text-[#404040]"
          >
            <Typography width={70} className="text-base font-bold">
              1
            </Typography>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              className=" w-full"
            >
              <Typography>Test</Typography>
              <Stack alignItems={"flex-end"}>
                <Typography className="text-lg font-black">12</Typography>
                <Typography className="text-xs">Mentions</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default ConnectFacebook;
