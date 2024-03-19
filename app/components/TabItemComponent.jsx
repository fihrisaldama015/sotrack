import { Box, Typography } from "@mui/material";

const TabItemComponent = ({ label, href, currentRoute, onClick }) => {
  return (
    <div className="no-underline" onClick={onClick}>
      <Box
        className="px-5 pb-2.5 cursor-pointer hover:border-black group transition-all"
        borderBottom={"2px solid"}
        borderColor={currentRoute.includes(href) ? "black" : "transparent"}
      >
        <Typography
          className="text-sm font-medium group-hover:text-black transition-all"
          color={currentRoute.includes(href) ? "black" : "#868E96"}
        >
          {label}
        </Typography>
      </Box>
    </div>
  );
};

export default TabItemComponent;
