import Stack from "@mui/material/Stack";
import PublicReportContent from "./components/PublicReportContentComponent";

const PublicReportPage = ({ params }) => {
  return (
    <Stack spacing={2} className="w-full">
      <PublicReportContent
        platformId={params.platformId}
        sourceTrackerData={INITIAL_DATA}
      />
    </Stack>
  );
};

export default PublicReportPage;

const INITIAL_DATA = [
  {
    id: "1",
    date: "Nov 15, 2021",
    name: "Hana Syarifah",
    city: "Malang",
    message:
      "Bang jago akhirnya menangis di kantor polisi 😭😭 Ekspresi Begal Nangis Sambil Peluk Polisi saat Interogasi di Polda Jatim",
    ditangani: true,
  },
  {
    id: "2",
    date: "Nov 15, 2021",
    name: "Hana Syarifah",
    city: "Malang",
    message:
      "Semoga wilayah surabaya kembali tenang, Hampir tiap hari terjadi tindak curanmor Efek jeranya bagaimana pak @poldajatim",
    ditangani: true,
  },
  {
    id: "3",
    date: "Nov 15, 2021",
    name: "Hana Syarifah",
    city: "Malang",
    message:
      "Aiptu Hasan petugas Siaga 2 Polda Surabaya Command Center Surabaya langsung kontak ke GKSSFM, akan dikerahkan anggota mengenai info begal ini. ",
    ditangani: false,
  },
  {
    id: "4",
    date: "Nov 15, 2021",
    name: "Hana Syarifah",
    city: "Malang",
    message:
      "Maling sepeda motor milik seorang driver ojek online (Ojol) perempuan di Surabaya akhirnya dibekuk Subdit Jatanras Ditreskrimum Polda Jawa Timur (Jatim). ",
    ditangani: false,
  },
  {
    id: "5",
    date: "Nov 15, 2021",
    name: "Hana Syarifah",
    city: "Malang",
    message:
      "Nonton Game GTA V memang seru. Polisi Polda Metro Jaya menangkap maling mobil Polisi Polda Surabaya. Wanita gengs pelakunya. ",
    ditangani: false,
  },
  {
    id: "6",
    date: "Nov 15, 2021",
    name: "Hana Syarifah",
    city: "Malang",
    message: "Komplotan Maling Motor di Simo Gunung Ditangkap Polda Jatim",
    ditangani: false,
  },
  {
    id: "7",
    date: "Nov 15, 2021",
    name: "Hana Syarifah",
    city: "Malang",
    message:
      "Aksi pencurian motor kembali marak di Pasuruan. Kali ini, dua maling menggasak motor honda Beat milik istri dari anggota kepolisian Brimob Polda Jatim.",
    ditangani: false,
  },
];
