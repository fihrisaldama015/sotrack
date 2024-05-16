"use client";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { changeIsPopUpOpen } from "../redux/slices/PopupSlice";
import { useRouter } from "next/navigation";

const AlertContainer = () => {
  const { isPopUpOpen, popUpMessage, popUpType } = useSelector(
    (state) => state.popupReducer
  );

  return (
    <div
      className={`fixed h-[100svh] w-screen z-20 top-0 left-0 ${
        isPopUpOpen ? "bg-[#3333334c]" : "bg-transparent invisible"
      } transition-all`}
    >
      {isPopUpOpen && <Alert type={popUpType} message={popUpMessage} />}
    </div>
  );
};

export default AlertContainer;

const Alert = ({ type, message }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const closePopUp = () => {
    dispatch(
      changeIsPopUpOpen({
        isPopUpOpen: false,
        popUpMessage: "",
        popUpType: "",
      })
    );
  };
  return (
    <Box className="fixed w-96 flex flex-col items-center shadow-xl rounded-xl bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
      <Box
        className={`p-12 pb-7 flex flex-col gap-2 justify-center items-center w-full rounded-t-xl ${
          type == "error" ? "bg-[#FF7575]" : "bg-[#34D399]"
        }`}
      >
        <Box className="my-4">
          {type === "error" ? (
            <ErrorOutlineIcon
              className="text-white scale-[2.5]"
              fontSize="large"
            />
          ) : type === "success" ? (
            <CheckCircleOutline
              className="text-white scale-[2.5]"
              fontSize="large"
            />
          ) : (
            <ArrowCircleUpIcon
              className="text-white scale-[2.5] rotate-90"
              fontSize="large"
            />
          )}
        </Box>
        <Typography className="font-semibold text-2xl text-white">
          {type === "error"
            ? "ERROR"
            : type === "success"
            ? "SUCCESS"
            : "WELCOME"}
        </Typography>
      </Box>
      <Stack
        spacing={2.5}
        justifyContent={"center"}
        className="w-full p-12 pt-7"
      >
        <Typography className="text-base font-medium text-neutral-600 text-center">
          {message}
        </Typography>
        <Button
          variant="contained"
          color={type === "error" ? "error" : "success"}
          size="large"
          onClick={() => {
            if (type === "welcome") {
              router.push("/connect/facebook");
            }
            closePopUp();
          }}
          className="py-3 rounded-lg w-full text-white text-xl font-medium"
        >
          {type === "welcome" ? "Connect Account" : "Continue"}
        </Button>
        {type === "welcome" && (
          <Typography
            className="text-sm text-center cursor-pointer hover:underline"
            onClick={() => closePopUp()}
          >
            Continue without account
          </Typography>
        )}
      </Stack>
    </Box>
  );
};
