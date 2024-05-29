"use client";
import { getPageList } from "@/app/api/repository/SourceTrackerRepository";
import { AlertWarning } from "@/app/components";
import { BASE_URL } from "@/app/utils/constants";
import { SocialDistance } from "@mui/icons-material";
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
  const socialens_user_id = getCookie("socialens_user_id");
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [pageList, setPageList] = useState([]);
  const logout = () => {
    deleteCookie("facebook_user_id");
    setIsLoading(true);
    router.refresh();
  };

  const getPageListData = async () => {
    try {
      const pageListResult = await getPageList();
      setPageList(pageListResult);
      setIsLoading(false);
    } catch (error) {
      console.log("🚀 ~ error - Get Page List:", error);
    }
  };

  useEffect(() => {
    // if (facebook_id != "") {
    //   setIsLoading(false);
    // }
    getPageListData();
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

          <a
            href={`${BASE_URL}/auth/facebook?id=${socialens_user_id}`}
            className="no-underline"
          >
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              spacing={2}
              className={`py-4 px-8 rounded-md transition-all ${
                !isLoading || socialens_user_id === ""
                  ? "bg-slate-200 cursor-not-allowed"
                  : "cursor-pointer bg-[#3D5A98] hover:bg-[#2E4A7D] "
              }"
              }`}
            >
              <Image
                src={"/assets/icon/facebook.svg"}
                width={16}
                height={16}
                alt="facebook"
              />
              <Typography
                className={`font-semibold text-sm lg:text-base xl:text-xl ${
                  !isLoading || socialens_user_id === ""
                    ? "text-slate-400"
                    : "text-white"
                }`}
              >
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
            {!isLoading
              ? pageList.map((page, id) => (
                  <Stack
                    key={id}
                    direction={"row"}
                    alignItems={"center"}
                    className="px-4 py-1 text-[#404040] border-0 border-b-[1px] border-solid border-slate-200"
                  >
                    <Typography className="text-sm w-[70px]">
                      {id + 1}
                    </Typography>
                    <Typography>{page.name}</Typography>
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
                ))
              : null}
          </Stack>
        </Box>
      </Stack>
    </>
  );
};

export default ConnectFacebook;
