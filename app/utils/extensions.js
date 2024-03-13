import { toast } from "react-toastify";

export const ToRupiah = (number) => {
    const formatCurr = Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 20,
    }).format(number)
    return formatCurr;
}

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
}

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
}

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
}