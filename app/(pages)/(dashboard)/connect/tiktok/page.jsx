"use client";
import { BASE_URL } from "@/app/utils/constants";
import LogoutIcon from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { deleteCookie, getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ConnectTiktok = () => {
  const twitter_id = getCookie("twitter_user_id") ?? "";
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const logout = () => {
    deleteCookie("twitter_user_id");
    setIsLoading(true);
    router.refresh();
  };

  useEffect(() => {
    if (twitter_id != "") {
      setIsLoading(false);
    }
  }, []);

  return (
    <Stack className="flex-col xl:flex-row gap-16 justify-between" spacing={15}>
      <Stack
        alignItems={"center"}
        direction={"column"}
        justifyContent={"center"}
        spacing={4}
        className="flex-1 ring-1 ring-[#E0E0E0] rounded-[10px] p-8 h-[300px] w-[300px]"
      >
        <Typography className="text-center text-xl text-[#343A40]">
          Click the button below and please login to your Facebook account
        </Typography>
        <a href={`${BASE_URL}/auth/twitter`} className="no-underline">
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            spacing={2}
            className="py-4 lg:px-28 px-8 bg-[#000] rounded-md cursor-pointer hover:bg-[#111] transition-all"
          >
            <Image
              src={"/assets/icon/tiktok.png"}
              width={16}
              height={16}
              alt="facebook"
            />
            <Typography className="text-white font-semibold text-sm lg:text-xl">
              Log in with Tiktok
            </Typography>
          </Stack>
        </a>
      </Stack>
      <Box className="my-0 h-full flex flex-1 flex-col justify-start">
        <Typography className=" text-base font-semibold text-[#343A40]">
          Connected Account
        </Typography>
        <Stack direction={"column"} className="">
          <Stack
            direction={"row"}
            alignItems={"center"}
            className="px-4 py-1 text-[#404040] border-0 border-b-[1px] border-solid border-slate-200"
          >
            <Typography width={60} className="text-sm">
              No
            </Typography>
            <Typography>Id</Typography>
            <Stack
              direction={"row"}
              justifyContent={"flex-end"}
              alignItems={"center"}
              spacing={2}
              className=" w-full"
            >
              <Stack width={80}>
                <Typography className="text-sm">Status</Typography>
              </Stack>
              <Stack alignItems={"flex-end"}>
                <Typography className="text-sm">Action</Typography>
              </Stack>
            </Stack>
          </Stack>
          {!isLoading ? (
            <Stack
              direction={"row"}
              alignItems={"center"}
              className="px-4 py-1 text-[#404040] border-0 border-b-[1px] border-solid border-slate-200"
            >
              <Typography width={70} className="text-sm">
                1
              </Typography>
              <Typography>{twitter_id}</Typography>
              <Stack
                direction={"row"}
                justifyContent={"flex-end"}
                spacing={2}
                alignItems={"center"}
                className=" w-full"
              >
                <Stack width={80}>
                  <Typography className="text-sm text-[#34D399]">
                    Connect
                  </Typography>
                </Stack>
                <Stack alignItems={"flex-end"}>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    borderRadius={2}
                    onClick={logout}
                    justifyContent={"center"}
                    className="py-2.5 px-3 w-full bg-[#FFEDED] hover:bg-red-100 cursor-pointer transition-all"
                  >
                    <LogoutIcon color="error" sx={{ width: 18 }} />
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          ) : null}
        </Stack>
      </Box>
    </Stack>
  );
};

export default ConnectTiktok;
