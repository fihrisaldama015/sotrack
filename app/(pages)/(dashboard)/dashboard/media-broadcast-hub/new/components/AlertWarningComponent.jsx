import HelpOutline from "@mui/icons-material/HelpOutline";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const AlertWarning = ({ isOpen, action, message, close }) => {
  return (
    <Box
      className="fixed w-96 flex flex-col items-center shadow-xl rounded-xl bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
      sx={{
        opacity: isOpen ? "1" : "0",
        visibility: isOpen ? "visible" : "hidden",
      }}
    >
      <Box
        className={`p-12 pb-7 flex flex-col gap-2 justify-center items-center w-full rounded-t-xl bg-[#E0E0E0]`}
      >
        <Box className="my-4">
          <HelpOutline className="text-black scale-[2.5]" fontSize="medium" />
        </Box>
        <Typography className="font-semibold text-2xl text-black">
          Cancel Broadcast
        </Typography>
      </Box>
      <Stack
        spacing={2.5}
        justifyContent={"center"}
        className="w-full p-12 pt-7"
      >
        <Typography className="text-xl font-semibold text-neutral-600 text-center">
          {message}
        </Typography>
        <Stack direction={"row"} spacing={2}>
          <Button
            variant="contained"
            color={"error"}
            size="large"
            onClick={() => action()}
            className="py-3 px-5 rounded-lg w-full text-black text-lg font-medium"
          >
            Yes
          </Button>
          <Button
            variant="contained"
            color={"inherit"}
            size="large"
            onClick={() => close()}
            className="py-3 px-5 rounded-lg w-full text-black text-lg font-medium"
          >
            No
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default AlertWarning;
