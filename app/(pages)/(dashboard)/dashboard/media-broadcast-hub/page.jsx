import Stack from "@mui/material/Stack";
import MediaBroadcastHubContent from "./components/MediaBroadcastHubContentComponent";

const MediaBroadcastHubPage = async ({ params }) => {
  return (
    <Stack spacing={2} className="w-full">
      <MediaBroadcastHubContent platformId={params.platformId} />
    </Stack>
  );
};

export default MediaBroadcastHubPage;
