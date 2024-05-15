"use client";
import { POLDA_LOGO } from "@/app/utils/assets";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";

const Navbar = () => {
  return (
    <>
      <nav className="sticky top-0 h-[10svh] border-none z-10 transition-all duration-500">
        <Box
          display={"flex"}
          className="py-5 px-7 space-x-2 rounded-tr-2xl justify-start"
        >
          <Image
            src={POLDA_LOGO}
            alt="logo polda"
            width={244}
            height={172}
            className="w-14 h-auto object-contain"
          />
          <Stack direction={"column"}>
            <Typography className="text-xl font-black tracking-wide transition-all duration-500 w-[13ch] h-min opacity-100">
              SOCIALENS
            </Typography>
            <Typography className="text-xs transition-all duration-500 w-[21ch] h-min opacity-100">
              Social Media Monitoring
            </Typography>
          </Stack>
        </Box>
      </nav>
    </>
  );
};

export default Navbar;
