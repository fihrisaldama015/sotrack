import ThemeRegistry from "@/theme/ThemeRegistry";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import StoreProvider from "./redux/StoreProvider";
import { ToastContainer } from "react-toastify";
import AlertContainer from "./components/AlertContainerComponent";

export const metadata = {
  title: "Social Media Monitoring",
  description: "Social Media Monitoring Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <html lang="en">
        <ThemeRegistry>
          <body id="__next">
            <ToastContainer />
            <AlertContainer />
            <div>{children}</div>
          </body>
        </ThemeRegistry>
      </html>
    </StoreProvider>
  );
}
