import { Box, Typography } from "@mui/material";
import Link from "next/link";

const TabItemComponent = ({ label, href, currentRoute }) => {
  return (
    <Link href={href} className="no-underline">
      <Box
        className="px-5 pb-2.5 cursor-pointer hover:border-black group transition-all"
        borderBottom={"2px solid"}
        borderColor={currentRoute === href ? "black" : "transparent"}
      >
        <Typography
          className="text-sm font-medium group-hover:text-black transition-all"
          color={currentRoute === href ? "black" : "#868E96"}
        >
          {label}
        </Typography>
      </Box>
    </Link>
  );
};

export default TabItemComponent;
