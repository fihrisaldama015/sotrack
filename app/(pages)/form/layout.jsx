import Navbar from "./components/Navbar";

export default function FormPublicReportLayout({ children }) {
  return (
    <div className="flex flex-col bg-[#F9F9F9]">
      <Navbar />
      <div className="bg-[#F9F9F9] py-6 px-8 w-full">{children}</div>
    </div>
  );
}
