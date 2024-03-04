import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { BOTTOM_ARROW } from "../utils/assets";
import { useState } from "react";

const AccordionItemComponent = ({ children, label }) => {
  const [isOpened, setIsOpened] = useState(true);
  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        onClick={() => setIsOpened(!isOpened)}
        className="py-2.5 px-3 hover:bg-neutral-200 rounded-lg cursor-pointer"
      >
        <Typography className="text-sm text-neutral-600 font-bold">
          {label}
        </Typography>
        <Image
          src={BOTTOM_ARROW}
          width={16}
          height={16}
          alt="bottom_arrow"
          className={`${isOpened ? "rotate-180" : ""} transition-all`}
        />
      </Box>
      <div
        className={`${
          isOpened ? "h-[4rem]" : "h-[0px] opacity-0 invisible"
        } flex flex-col gap-2 transition-all duration-200`}
      >
        {children}
      </div>
    </>
  );
};

export default AccordionItemComponent;
