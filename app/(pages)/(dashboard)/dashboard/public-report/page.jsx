import Stack from "@mui/material/Stack";
import PublicReportContent from "./components/PublicReportContentComponent";

const PublicReportPage = ({ params }) => {
  return (
    <Stack spacing={2} className="w-full">
      <PublicReportContent platformId={params.platformId} />
    </Stack>
  );
};

export default PublicReportPage;
