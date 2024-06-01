import Stack from "@mui/material/Stack";
import MediaBroadcastHubContent from "./components/MediaBroadcastHubContentComponent";
import AlertWarning from "./components/AlertWarningComponent";

const MediaBroadcastHubPage = async ({ params }) => {
  return (
    <Stack spacing={2} className="w-full">
      <AlertWarning />
      <MediaBroadcastHubContent platformId={params.platformId} />
    </Stack>
  );
};

export default MediaBroadcastHubPage;
