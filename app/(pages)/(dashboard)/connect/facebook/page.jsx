"use client";
import { AlertWarning } from "@/app/components";
import { BASE_URL } from "@/app/utils/constants";
import LogoutIcon from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { deleteCookie, getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ConnectFacebook = () => {
  const facebook_id = getCookie("facebook_user_id") ?? "";
  const [isLoading, setIsLoading] = useState(true);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const router = useRouter();

  const logout = () => {
    deleteCookie("facebook_user_id");
    setIsLoading(true);
    router.refresh();
  };

  useEffect(() => {
    if (facebook_id != "") {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      <AlertWarning
        isOpen={isAlertOpen}
        close={() => setIsAlertOpen(false)}
        action={logout}
        message={"Are you sure want to log out?"}
      />
      <Stack
        className="flex-col lg:flex-row gap-16 justify-between"
        spacing={15}
      >
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

          <a href={`${BASE_URL}/auth/facebook`} className="no-underline">
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              spacing={2}
              className={`py-4 px-8 rounded-md transition-all ${
                !isLoading
                  ? "bg-slate-200 cursor-not-allowed text-slate-400"
                  : "cursor-pointer bg-[#3D5A98] hover:bg-[#2E4A7D] text-white"
              }`}
            >
              <Image
                src={"/assets/icon/facebook.svg"}
                width={16}
                height={16}
                alt="facebook"
              />
              <Typography className=" font-semibold text-sm lg:text-base xl:text-xl">
                Log in with Facebook
              </Typography>
            </Stack>
          </a>
        </Stack>
        <Box className="my-0 h-full flex flex-1 flex-col justify-start">
          <Typography className=" text-base font-semibold text-[#343A40]">
            Connected Account
          </Typography>
          <Stack direction={"column"}>
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
                <Typography>{facebook_id}</Typography>
                <Stack
                  direction={"row"}
                  justifyContent={"flex-end"}
                  spacing={2}
                  alignItems={"center"}
                  className=" w-full"
                >
                  <Stack width={80}>
                    <Typography className="text-sm font-medium text-[#34D399]">
                      Connected
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
    </>
  );
};

export default ConnectFacebook;
