import Stack from "@mui/material/Stack";
import SourceDetailContent from "./components/SourceDetailContentComponent";

const SourceDetailPage = ({ params }) => {
  return (
    <Stack spacing={2} className="w-full">
      <SourceDetailContent platformId={params.platformId} />
    </Stack>
  );
};

export default SourceDetailPage;
