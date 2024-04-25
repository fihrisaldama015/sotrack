import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TargetIcon from "./TargetIconComponent";

const MostDiscussed = () => {
  return (
    <Stack className="w-80 bg-white rounded-[10px] p-5 space-y-4">
      <Stack spacing={2.5} direction={"row"}>
        <Box className="flex items-center">
          <TargetIcon />
        </Box>
        <Stack gap={0.5}>
          <Typography className="text-base font-semibold text-[#343A40]">
            Jawa Timur
          </Typography>
          <Typography className="text-sm text-[#868E96]">
            Kota Malang
          </Typography>
        </Stack>
      </Stack>
      <Divider className="border-none h-[3px] bg-[#ECF0F2]" />
      <Typography className="text-sm font-semibold text-[#868E96]">
        Most Discussed
      </Typography>
      {MOST_DISCUSSED.map((discussed, index) => (
        <Box key={index}>
          <Typography className="text-sm font-light text-[#868E96]">
            Most Discussed in Malang
          </Typography>
          <Typography className="text-sm font-bold text-[#868E96]">
            {discussed.topic}
          </Typography>
          <Typography className="text-xs font-light text-[#868E96]">
            {discussed.post}
          </Typography>
        </Box>
      ))}
    </Stack>
  );
};

export default MostDiscussed;
const MOST_DISCUSSED = [
  {
    topic: "Gangster Tidar",
    post: "8,4rb post",
  },
  {
    topic: "Tabrak Lari Sawojajar",
    post: "7,2rb post",
  },
  {
    topic: "Pencurian Motor",
    post: "6,5rb post",
  },
  {
    topic: "Pembunuhan",
    post: "5,8rb post",
  },
];
