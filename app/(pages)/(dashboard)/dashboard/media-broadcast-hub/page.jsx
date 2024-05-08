import Stack from "@mui/material/Stack";
import MediaBroadcastHubContent from "./components/MediaBroadcastHubContentComponent";

const MediaBroadcastHubPage = async ({ params }) => {
  return (
    <Stack spacing={2} className="w-full">
      <MediaBroadcastHubContent
        platformId={params.platformId}
        initialData={DUMMY_DATA}
      />
    </Stack>
  );
};

export default MediaBroadcastHubPage;

const DUMMY_DATA = [
  {
    id: "5364fd39-4ab4-45f8-a0f5-7797719ba640",
    receipient: "faisaltemas007@gmail.com, yagura098@gmail.com",
    message: "<b>Bang</b>",
    date: "2023-12-01T00:00:00.000Z",
    city: "Bogor",
    user_id: "da5319d2-174d-4c05-9036-76857a02f78f",
  },
  {
    id: "c09f90ad-466a-4fd4-9bf8-68eacd844cc1",
    receipient: "faisaltemas007@gmail.com, yagura098@gmail.com",
    message: "<b>Bang</b>",
    date: "2023-12-01T00:00:00.000Z",
    city: "Bogor",
    user_id: "da5319d2-174d-4c05-9036-76857a02f78f",
  },
  {
    id: "f271c7f4-d0cf-4a09-a8fd-43094a774cb8",
    receipient: "faisaltemas007@gmail.com, yagura098@gmail.com",
    message: "<b>Bang</b>",
    date: "2023-12-01T00:00:00.000Z",
    city: "Bogor",
    user_id: "da5319d2-174d-4c05-9036-76857a02f78f",
  },
];
