import ThemeRegistry from "@/theme/ThemeRegistry";
import "react-toastify/dist/ReactToastify.css";
import { SidebarComponent } from "./components";
import "./globals.css";
import StoreProvider from "./redux/StoreProvider";

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
            <div className="flex bg-[#F9F9F9]">
              <SidebarComponent />
              <div className="bg-[#F9F9F9] p-8 w-full">{children}</div>
            </div>
          </body>
        </ThemeRegistry>
      </html>
    </StoreProvider>
  );
}
