const { Stack, Typography } = require("@mui/material");

const MediaBroadcastDetail = () => {
  return (
    <Stack gap={3} direction={"column"} className="bg-white p-6 rounded-lg">
      <Typography className="text-xl text-[#343A40] font-semibold">
        Detail Broadcast
      </Typography>
      <Typography className="text-base text-black">Polisi</Typography>
    </Stack>
  );
};

export default MediaBroadcastDetail;
