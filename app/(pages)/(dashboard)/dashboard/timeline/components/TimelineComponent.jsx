"use client";
import { PLATFORM_ICON } from "@/app/utils/constants";
import FilterListIcon from "@mui/icons-material/FilterList";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";

const Timeline = ({ platform }) => {
  return (
    <Stack direction={"column"} className="space-y-4">
      <Stack direction={"row"} spacing={1}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          className="p-2 bg-white rounded-lg ring-1 ring-[#E0E0E0]"
        >
          <FilterListIcon
            sx={{ width: 20, height: 20 }}
            className="text-[#797777]"
          />
        </Stack>
        {platform?.map((item, id) => (
          <TimelinePlatform key={id} platform={item} />
        ))}
      </Stack>
      <Stack className="bg-white p-6 rounded-[10px]">test</Stack>
    </Stack>
  );
};

export default Timeline;

const TimelinePlatform = ({ platform }) => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      spacing={1}
      className="py-2.5 px-4 bg-white rounded-lg ring-1 ring-[#E0E0E0] hover:ring-[#1B59F8CC] group cursor-pointer transition-all"
    >
      <Image
        src={`/assets/icon/outline_${platform?.name.toLowerCase()}.svg`}
        alt={platform?.name}
        width={16}
        height={16}
        className="group-hover:stroke-[#1B59F8CC] transition-all"
      />
      <TimelinePlatformIcon platform={"facebook"} className="stroke-[black]" />
      <Typography className="text-[#0000004c] text-sm font-medium group-hover:text-[#1B59F8CC] transition-all">
        {platform?.name}
      </Typography>
    </Stack>
  );
};

const TimelinePlatformIcon = ({ color, platform }) => {
  if (platform == "facebook") {
    return <FacebookIcon color={color} />;
  }
};

const FacebookIcon = ({ color }) => (
  <svg
    width="13"
    height="14"
    viewBox="0 0 13 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_1412_572)">
      <path
        d="M0.464279 12.1072V1.89293C0.464279 1.64665 0.562111 1.41047 0.736251 1.23633C0.910392 1.06219 1.14658 0.964355 1.39285 0.964355H11.6071C11.8534 0.964355 12.0896 1.06219 12.2637 1.23633C12.4379 1.41047 12.5357 1.64665 12.5357 1.89293V12.1072C12.5357 12.3535 12.4379 12.5897 12.2637 12.7638C12.0896 12.938 11.8534 13.0358 11.6071 13.0358H8.82142V8.63436H9.48071C9.63093 8.63436 9.77501 8.57468 9.88123 8.46845C9.98746 8.36223 10.0471 8.21815 10.0471 8.06793V7.35293C10.0469 7.20278 9.98713 7.05885 9.88096 6.95267C9.77479 6.8465 9.63086 6.78674 9.48071 6.7865H8.85856V5.91364C8.85856 5.13364 9.21142 5.13364 9.56428 5.13364H10.0193C10.094 5.13672 10.1685 5.12335 10.2375 5.09446C10.3065 5.06558 10.3683 5.0219 10.4186 4.9665C10.4725 4.91513 10.5152 4.85311 10.544 4.78439C10.5728 4.71566 10.587 4.64171 10.5857 4.56721V3.88007C10.5884 3.8044 10.5762 3.72893 10.5496 3.65802C10.523 3.58711 10.4827 3.52217 10.4309 3.46692C10.3791 3.41168 10.3169 3.36723 10.2478 3.33615C10.1788 3.30506 10.1043 3.28794 10.0286 3.28578H8.96071C8.64912 3.27407 8.33871 3.33013 8.05091 3.4501C7.7631 3.57007 7.50478 3.75108 7.29376 3.98064C7.08275 4.21019 6.92408 4.48282 6.82872 4.77968C6.73335 5.07654 6.70357 5.39057 6.74142 5.70007V6.7865H6.14714C6.07197 6.78527 5.99732 6.79901 5.92752 6.82692C5.85772 6.85483 5.79418 6.89636 5.74059 6.94908C5.68701 7.0018 5.64445 7.06466 5.61541 7.134C5.58637 7.20333 5.57141 7.27775 5.57142 7.35293V8.06793C5.57141 8.1431 5.58637 8.21752 5.61541 8.28686C5.64445 8.35619 5.68701 8.41905 5.74059 8.47177C5.79418 8.52449 5.85772 8.56602 5.92752 8.59393C5.99732 8.62185 6.07197 8.63559 6.14714 8.63436H6.74142V13.0358H1.39285C1.14658 13.0358 0.910392 12.938 0.736251 12.7638C0.562111 12.5897 0.464279 12.3535 0.464279 12.1072Z"
        stroke={color}
        stroke-opacity="1"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1412_572">
        <rect
          width="13"
          height="13"
          fill="white"
          transform="translate(0 0.5)"
        />
      </clipPath>
    </defs>
  </svg>
);
