"use client";
import LogoutIcon from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { setCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { POLDA_LOGO, UNION } from "../utils/assets";
import AccordionItem from "./AccordionItemComponent";
import AlertWarning from "./AlertWarningComponent";

const SidebarComponent = () => {
  const pathname = usePathname();
  const [isMinimized, setIsMinimized] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const router = useRouter();
  const Logout = () => {
    setCookie("accessToken", "", {
      path: "/",
      maxAge: -1,
    });
    setCookie("socialens_user_id", "", {
      path: "/",
      maxAge: -1,
    });
    router.push("/login");
  };

  return (
    <>
      <AlertWarning
        isOpen={isAlertOpen}
        close={() => setIsAlertOpen(false)}
        action={Logout}
        message={"Are you sure want to log out?"}
      />
      <nav
        className="bg-white sticky top-0 h-[100dvh] border-none rounded-tr-2xl rounded-br-2xl ring-2 ring-neutral-300 z-10 transition-all duration-500 flex flex-col justify-between"
        style={{ width: isMinimized ? "80px" : "350px" }}
      >
        <Box
          display={"flex"}
          className="py-5 space-x-2 rounded-tr-2xl justify-center"
          paddingX={isMinimized ? "12px" : "29px"}
        >
          <Image
            src={POLDA_LOGO}
            alt="logo polda"
            width={244}
            height={172}
            className="w-14 h-auto object-contain"
          />
          <Stack direction={"column"}>
            <Typography
              className={`text-xl font-black tracking-wide transition-all duration-500 ${
                isMinimized
                  ? "w-[0px] h-[0px] opacity-0 invisible"
                  : "w-[13ch] h-min opacity-100"
              }`}
            >
              SOCIALENS
            </Typography>
            <Typography
              className={`text-xs transition-all duration-500 ${
                isMinimized
                  ? "w-[0px] h-[0px] opacity-0 invisible"
                  : "w-[21ch] h-min opacity-100"
              }`}
            >
              Social Media Monitoring
            </Typography>
          </Stack>
        </Box>
        <Divider className="border-none h-[2px] bg-neutral-300" />
        <Box position={"relative"} className="z-50">
          <Box
            position={"absolute"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            onClick={() => setIsMinimized(!isMinimized)}
            className="w-7 h-7 p-1.5 right-0 top-0 -translate-y-3/4 translate-x-1/2 bg-white hover:bg-neutral-100 ring-2 ring-neutral-300 rounded-lg cursor-pointer transition-all"
          >
            <Image src={UNION} width={14} height={8} alt="Union Icon" />
          </Box>
        </Box>
        <Stack className="overflow-y-auto flex flex-1 h-full mb-[5.5rem] z-20">
          <Box
            display={isMinimized ? "none" : "flex"}
            flexDirection={"column"}
            className="p-6 gap-2"
          >
            <Typography
              marginLeft={"12px"}
              className="text-[10px] text-neutral-600 tracking-wider font-medium"
            >
              DASHBOARD
            </Typography>
            <AccordionItem label={"SOCIALENS"}>
              <AccordionItemLink
                color="#F2994A"
                label="Analytics"
                path="/dashboard"
                pathname={pathname}
              />
              <AccordionItemLink
                color="#F25E4A"
                label="Timeline"
                path="/dashboard/timeline"
                pathname={pathname}
              />
              <AccordionItemLink
                color={"#F25E4A"}
                label={"Public Report"}
                path={"/dashboard/public-report"}
                pathname={pathname}
              />
              <AccordionItemLink
                color={"#F25E4A"}
                label={"Media Broadcast Hub"}
                path={"/dashboard/media-broadcast-hub"}
                pathname={pathname}
              />
            </AccordionItem>
          </Box>
          <Box
            display={isMinimized ? "none" : "flex"}
            flexDirection={"column"}
            className="p-6 gap-2"
          >
            <Typography
              marginLeft={"12px"}
              className="text-[10px] text-neutral-600 tracking-wider font-medium"
            >
              SETTINGS
            </Typography>
            <AccordionItem label="Settings">
              <AccordionItemLink
                color={"#4AF26F"}
                label={"Filter Settings"}
                path={"/settings/filter"}
                pathname={pathname}
              />
              <AccordionItemLink
                color="#4AF26F"
                label="Connect Account"
                path="/connect/facebook"
                pathname={pathname}
              />
            </AccordionItem>
          </Box>
        </Stack>
        <Box className="absolute flex flex-col w-full h-[5.5rem] bottom-0 bg-[#FAFAFA] rounded-br-2xl">
          <Divider className="border-none h-[2px] bg-neutral-300" />
          <Box
            display={"flex"}
            className="py-5 space-x-2 rounded-br-2xl justify-center"
            paddingX={isMinimized ? "12px" : "29px"}
          >
            <Stack
              direction={"row"}
              alignItems={"center"}
              borderRadius={2}
              justifyContent={isMinimized ? "center" : "flex-start"}
              onClick={() => setIsAlertOpen(true)}
              className="py-2.5 px-3 w-full bg-[#FFEDED] hover:bg-red-100 cursor-pointer transition-all"
            >
              <LogoutIcon color="error" sx={{ width: 18 }} />
              <Typography
                color={"error"}
                marginLeft={isMinimized ? "0px" : "15px"}
                className={`text-sm font-semibold transition-all duration-500 ${
                  isMinimized
                    ? "w-[0px] h-[0px] opacity-0 invisible"
                    : "h-min opacity-100"
                }`}
              >
                Keluar
              </Typography>
            </Stack>
          </Box>
        </Box>
      </nav>
    </>
  );
};

export default SidebarComponent;

const AccordionItemLink = ({ label, path, color, pathname }) => {
  let active = false;
  if (path == "/dashboard") {
    active = pathname == path;
  } else {
    active = pathname.includes(path);
  }
  return (
    <Link href={path} className="no-underline">
      <Box
        display={"flex"}
        alignItems={"center"}
        className={`py-2.5 px-3 gap-2 hover:bg-[#EEF3FF] rounded-lg cursor-pointer ${
          active ? "bg-[#EEF3FF]" : "bg-white"
        }`}
      >
        <Box
          className="w-2 h-2 rounded-full"
          sx={{ backgroundColor: `${color}` }}
        ></Box>
        <Typography
          className="text-sm tracking-wide text-neutral-600"
          fontWeight={active ? 600 : 500}
        >
          {label}
        </Typography>
      </Box>
    </Link>
  );
};
