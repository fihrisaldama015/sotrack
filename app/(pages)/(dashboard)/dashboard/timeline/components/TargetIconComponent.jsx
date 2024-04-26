import { Box } from "@mui/material";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";

const TargetIcon = () => {
  return (
    <Box className="flex items-center gap-2 bg-[#F5F5F5] p-2 rounded-full">
      <ZoomOutMapIcon sx={{ width: 16, height: 16 }} className="rotate-45" />
    </Box>
  );
};
export default TargetIcon;
