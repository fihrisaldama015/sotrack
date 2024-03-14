import { toast } from "react-toastify";
import { changeIsPopUpOpen } from "../redux/slices/PopupSlice";

export const ToRupiah = (number) => {
  const formatCurr = Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 20,
  }).format(number);
  return formatCurr;
};

export const FormatCountDown = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formatMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formatSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
  return `${formatMinutes}m:${formatSeconds}s`;
};

export const openPopUpError = (dispatch, message) => {
  dispatch(
    changeIsPopUpOpen({
      isPopUpOpen: true,
      popUpMessage: message,
      popUpType: "error",
    })
  );
};
export const openPopUpSuccess = (dispatch, message) => {
  dispatch(
    changeIsPopUpOpen({
      isPopUpOpen: true,
      popUpMessage: message,
      popUpType: "success",
    })
  );
};

//======= Toast Alert =======
export const AlertSuccess = (message) => {
  toast.success(message ?? "", {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export const AlertWarning = (message) => {
  toast.warning(message ?? "", {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export const AlertError = (message) => {
  toast.error(message ?? "", {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};
