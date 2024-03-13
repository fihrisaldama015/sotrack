"use client";
import { Box, Divider, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { POLDA_LOGO, UNION } from "../utils/assets";
import AccordionItemComponent from "./AccordionItemComponent";

const SidebarComponent = () => {
  const pathname = usePathname();
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <nav
      className="bg-white sticky top-0 h-[100dvh] border-none rounded-tr-2xl rounded-br-2xl ring-2 ring-neutral-300 z-10 transition-all duration-500"
      style={{ width: isMinimized ? "80px" : "350px" }}
    >
      <Box
        display={"flex"}
        className="py-5 space-x-2 rounded-tr-2xl justify-center"
        paddingX={isMinimized ? "12px" : "29px"}
      >
        <Image src={POLDA_LOGO} alt="logo polda" width={40} height={53} />
        <Typography
          className={`text-xl font-extrabold transition-all duration-500 ${
            isMinimized
              ? "w-[0px] h-[0px] opacity-0 invisible"
              : "w-[13ch] h-min opacity-100"
          }`}
        >
          POLISI DAERAH JAWA TIMUR
        </Typography>
      </Box>
      <Divider className="border-none h-[2px] bg-neutral-300" />
      <Box position={"relative"}>
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
        <AccordionItemComponent label={"POLDA JATIM"}>
          <Link href="/dashboard" className="no-underline">
            <Box
              display={"flex"}
              alignItems={"center"}
              className={`py-2.5 px-3 gap-2 hover:bg-[#EEF3FF]  rounded-lg cursor-pointer ${
                pathname == "/dashboard" ? "bg-[#EEF3FF]" : "bg-white"
              }`}
            >
              <Box className="w-2 h-2 bg-[#F2994A] rounded-full"></Box>
              <Typography
                className="text-sm text-neutral-600"
                fontWeight={pathname === "/dashboard" ? 600 : 500}
              >
                Analytics
              </Typography>
            </Box>
          </Link>
          <Link href="/dashboard/timeline" className="no-underline">
            <Box
              display={"flex"}
              alignItems={"center"}
              className={`py-2.5 px-3 gap-2 hover:bg-[#EEF3FF] rounded-lg cursor-pointer ${
                pathname == "/dashboard/timeline" ? "bg-[#EEF3FF]" : "bg-white"
              }`}
            >
              <Box className="w-2 h-2 bg-[#F25E4A] rounded-full"></Box>
              <Typography
                className="text-sm text-neutral-600"
                fontWeight={pathname === "/dashboard/timeline" ? 600 : 500}
              >
                Timeline
              </Typography>
            </Box>
          </Link>
        </AccordionItemComponent>
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
        <AccordionItemComponent label="Settings">
          <Link href="/settings/filter" className="no-underline">
            <Box
              display={"flex"}
              alignItems={"center"}
              className={`py-2.5 px-3 gap-2 hover:bg-[#EEF3FF] rounded-lg cursor-pointer ${
                pathname == "/settings/filter" ? "bg-[#EEF3FF]" : "bg-white"
              }`}
            >
              <Box className="w-2 h-2 bg-[#4AF26F] rounded-full"></Box>
              <Typography
                className="text-sm text-neutral-600"
                fontWeight={pathname === "/settings/filter" ? 600 : 500}
              >
                Filter Settings
              </Typography>
            </Box>
          </Link>
        </AccordionItemComponent>
      </Box>
    </nav>
  );
};

export default SidebarComponent;
