"use client";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead } from "@mui/material";
import { TableRow } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const SocialMentionTracker = () => {
  const [parameter, setParameter] = useState("monthly");
  const [showParameter, setShowParameter] = useState(false);

  const handleParameterChange = (type) => {
    setParameter(type);
    setShowParameter(false);
  };
  return (
    <Box className="p-6 bg-white flex flex-col gap-6 lg:max-w-[400px] rounded-xl shadow-lg shadow-slate-100">
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Stack direction={"column"} gap={1}>
          <Typography className="text-xs text-grey-800">
            Overall Mentions Source
          </Typography>
          <Typography className="text-base font-semibold text-primary-800">
            Mention Source Tracker
          </Typography>
        </Stack>
        <Box className="relative">
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={0.5}
            onClick={() => setShowParameter(!showParameter)}
            className="rounded-lg ring-1 ring-slate-50 hover:ring-slate-200 transition-all pl-3 py-1 pr-2 cursor-pointer hover:bg-slate-50"
          >
            <Typography className="text-xs font-normal first-letter:capitalize">
              {parameter}
            </Typography>
            <ExpandMore color="grey" sx={{ width: 16 }} />
          </Stack>
          <form
            className="absolute right-0 top-8 bg-slate-50 p-1 z-10 shadow-lg rounded-xl transition-all text-sm"
            style={{
              visibility: showParameter ? "visible" : "hidden",
              opacity: showParameter ? 1 : 0,
            }}
          >
            <Stack direction={"column"} spacing={0}>
              <Box
                onClick={() => handleParameterChange("monthly")}
                className="bg-slate-50 px-3 py-1 hover:bg-slate-200 transition-all rounded-lg cursor-pointer"
              >
                Month
              </Box>
              <Box
                onClick={() => handleParameterChange("yearly")}
                className="bg-slate-50 px-3 py-1 hover:bg-slate-200 transition-all rounded-lg cursor-pointer"
              >
                Year
              </Box>
              <Box
                onClick={() => handleParameterChange("weekly")}
                className="bg-slate-50 px-3 py-1 hover:bg-slate-200 transition-all rounded-lg cursor-pointer"
              >
                Week
              </Box>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="text-xs text-[#636669] font-medium">
              Source
            </TableCell>
            <TableCell className="text-xs text-[#636669] font-medium">
              Mentions
            </TableCell>
            <TableCell className="text-xs text-[#636669] font-medium">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {SOCIAL_MENTION_DATA.map((data, id) => (
            <TableRow key={id}>
              <TableCell className="text-xs text-[#64748B]">
                <Stack direction={"row"} gap={1}>
                  <Image src={data.icon} width={16} height={16} alt="twitter" />
                  {data.source}
                </Stack>
              </TableCell>
              <TableCell className="text-xs text[#64748b]">
                {data.mentions}
              </TableCell>
              <TableCell>
                <Link
                  href={`/source/${data.slug}`}
                  className="no-underline text-xs"
                >
                  See Details
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default SocialMentionTracker;

const SOCIAL_MENTION_DATA = [
  {
    source: "Tiktok",
    mentions: 901,
    slug: "tiktok",
    icon: "/assets/icon/tiktok.svg",
  },
  {
    source: "Instagram",
    mentions: 810,
    slug: "instagram",
    icon: "/assets/icon/instagram.svg",
  },
  {
    source: "Facebook",
    mentions: 721,
    slug: "facebook",
    icon: "/assets/icon/facebook.svg",
  },
  {
    source: "Twitter",
    mentions: 612,
    slug: "twitter",
    icon: "/assets/icon/twitter.svg",
  },
  {
    source: "Detik.com",
    mentions: 512,
    slug: "detik",
    icon: "/assets/icon/news.svg",
  },
  {
    source: "Kompas.com",
    mentions: 412,
    slug: "kompas",
    icon: "/assets/icon/news.svg",
  },
  {
    source: "CNN Indonesia",
    mentions: 312,
    slug: "cnn",
    icon: "/assets/icon/news.svg",
  },
  {
    source: "Liputan6.com",
    mentions: 212,
    slug: "liputan6",
    icon: "/assets/icon/news.svg",
  },
  {
    source: "Metro TV",
    mentions: 112,
    slug: "metro",
    icon: "/assets/icon/news.svg",
  },
];
