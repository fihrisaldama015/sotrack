import Stack from "@mui/material/Stack";
import MediaBroadcastHubContent from "./components/MediaBroadcastHubContentComponent";

const MediaBroadcastHubPage = ({ params }) => {
  return (
    <Stack spacing={2} className="w-full">
      <MediaBroadcastHubContent
        platformId={params.platformId}
        sourceTrackerData={INITIAL_DATA}
      />
    </Stack>
  );
};

export default MediaBroadcastHubPage;

const INITIAL_DATA = [
  {
    id: "1",
    date: "Nov 15, 2021",
    recipient: "Detik.com",
    city: "Malang",
    message:
      "Bang jago akhirnya menangis di kantor polisi 😭😭 Ekspresi Begal Nangis Sambil Peluk Polisi saat Interogasi di Polda Jatim",
  },
  {
    id: "2",
    date: "Nov 15, 2021",
    recipient: "Detik.com",
    city: "Malang",
    message:
      "Semoga wilayah surabaya kembali tenang, Hampir tiap hari terjadi tindak curanmor Efek jeranya bagaimana pak @poldajatim",
  },
  {
    id: "3",
    date: "Nov 15, 2021",
    recipient: "Detik.com",
    city: "Malang",
    message:
      "Aiptu Hasan petugas Siaga 2 Polda Surabaya Command Center Surabaya langsung kontak ke GKSSFM, akan dikerahkan anggota mengenai info begal ini. ",
  },
  {
    id: "4",
    date: "Nov 15, 2021",
    recipient: "Detik.com",
    city: "Malang",
    message:
      "Maling sepeda motor milik seorang driver ojek online (Ojol) perempuan di Surabaya akhirnya dibekuk Subdit Jatanras Ditreskrimum Polda Jawa Timur (Jatim). ",
  },
  {
    id: "5",
    date: "Nov 15, 2021",
    recipient: "Detik.com",
    city: "Malang",
    message:
      "Nonton Game GTA V memang seru. Polisi Polda Metro Jaya menangkap maling mobil Polisi Polda Surabaya. Wanita gengs pelakunya. ",
  },
  {
    id: "6",
    date: "Nov 15, 2021",
    recipient: "Detik.com",
    city: "Malang",
    message: "Komplotan Maling Motor di Simo Gunung Ditangkap Polda Jatim",
  },
  {
    id: "7",
    date: "Nov 15, 2021",
    recipient: "Detik.com",
    city: "Malang",
    message:
      "Aksi pencurian motor kembali marak di Pasuruan. Kali ini, dua maling menggasak motor honda Beat milik istri dari anggota kepolisian Brimob Polda Jatim.",
  },
];
