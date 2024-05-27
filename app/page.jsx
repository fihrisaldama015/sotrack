import { Box, Button, Stack, Typography } from "@mui/material";
import Navbar from "./Navbar";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col bg-[#F9F9F9]">
      <Navbar />
      <Stack
        direction={"column"}
        alignItems={"center"}
        gap={4.5}
        className="bg-[#F9F9F9] py-6 px-8 w-full"
      >
        <Box className="xl:px-72 md:px-36 py-5 flex flex-col justify-center items-center gap-7">
          <Typography className="font-bold text-4xl text-center max-w-[25ch]">
            Real-Time Monitoring Your Social Media With Us
          </Typography>
          <Typography className="text-lg text-center">
            Get insights from your social media more easily, simplify your
            social media monitoring, gather feedback and suggestions from the
            community more easily, and share emails efficiently with our
            broadcast feature.
          </Typography>
          <Link href={"/login"}>
            <Button
              type="button"
              variant="contained"
              size="medium"
              className="px-24 py-4 rounded-lg font-medium tracking-wide text-lg"
            >
              Get Started
            </Button>
          </Link>
        </Box>
        <Box className="flex justify-center items-center w-full">
          <Image
            src={"/assets/images/hero_image.svg"}
            alt="hero"
            width={1072}
            height={386}
            className="object-contain h-auto drop-shadow-lg"
          />
        </Box>
      </Stack>
    </div>
  );
}
