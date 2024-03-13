import { SidebarComponent } from "@/app/components";

export const metadata = {
  title: "Social Media Monitoring",
  description: "Social Media Monitoring Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <div className="flex bg-[#F9F9F9]">
      <SidebarComponent />
      <div className="bg-[#F9F9F9] py-6 px-8 w-full">{children}</div>
    </div>
  );
}
