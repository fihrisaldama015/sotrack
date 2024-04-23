import dayjs from "dayjs";
import { PROVIDER_GET } from "../provider";

export const getMentionSource = async (startDate, endDate, token, pageId) => {
  const currentDate = dayjs().add(1, "day").format("YYYY-MM-DD");

  const { data } = await PROVIDER_GET(
    `mentionSource?pageId=${pageId}&since=${startDate}&until=${endDate}`,
    token
  );

  if (currentDate < startDate || currentDate < endDate) {
    throw new Error("Invalid date");
  }
  let sourceTrackerData = getFormattedMentionSource(data);

  return sourceTrackerData;
};

const getFormattedMentionSource = (data) => {
  const formattedData = Object.keys(data).map((key) => {
    return {
      source: key,
      mentions: data[key],
    };
  });

  return formattedData;
};

export const getPageList = async () => {
  const {
    data: { data },
  } = await PROVIDER_GET(`facebook/page`);

  let pageListData = data;
  return pageListData;
};

export const getMentionSourceDetail = async (
  startDate,
  endDate,
  token,
  pageId = "",
  platform,
  topic = "All"
) => {
  const currentDate = dayjs().add(1, "day").format("YYYY-MM-DD");

  const { data } = await PROVIDER_GET(
    `mentionDetails?platform=${platform}&pageId=${pageId}&since=${startDate}&until=${endDate}&topic=${topic}`,
    token
  );

  if (currentDate < startDate || currentDate < endDate) {
    throw new Error("Invalid date");
  }
  let mentionSourceDetailData = data;
  console.log("🚀 ~ mentionSourceDetailData:", mentionSourceDetailData);

  return mentionSourceDetailData;
};

const INITIAL_DATA = [
  {
    no: 1,
    id: "#12390",
    date: "Nov 15, 2021",
    source: "https://google.com",
    mention:
      "Bang jago akhirnya menangis di kantor polisi 😭😭 Ekspresi Begal Nangis Sambil Peluk Polisi saat Interogasi di Polda Jatim",
    about: "Begal Motor",
  },
  {
    no: 2,
    id: "#12391",
    date: "Nov 15, 2021",
    source: "",
    mention:
      "Semoga wilayah surabaya kembali tenang, Hampir tiap hari terjadi tindak curanmor Efek jeranya bagaimana pak @poldajatim",
    about: "Curanmor",
  },
  {
    no: 3,
    id: "#12392",
    date: "Nov 15, 2021",
    source: "",
    mention:
      "Aiptu Hasan petugas Siaga 2 Polda Surabaya Command Center Surabaya langsung kontak ke GKSSFM, akan dikerahkan anggota mengenai info begal ini. ",
    about: "Begal Motor",
  },
  {
    no: 4,
    id: "#12393",
    date: "Nov 15, 2021",
    source: "https://google.com",
    mention:
      "Maling sepeda motor milik seorang driver ojek online (Ojol) perempuan di Surabaya akhirnya dibekuk Subdit Jatanras Ditreskrimum Polda Jawa Timur (Jatim). ",
    about: "Curanmor",
  },
  {
    no: 5,
    id: "#12394",
    date: "Nov 15, 2021",
    source: "https://google.com",
    mention:
      "Nonton Game GTA V memang seru. Polisi Polda Metro Jaya menangkap maling mobil Polisi Polda Surabaya. Wanita gengs pelakunya. ",
    about: "Pencurian Mobil",
  },
  {
    no: 6,
    id: "#12395",
    date: "Nov 15, 2021",
    source: "https://google.com",
    mention: "Komplotan Maling Motor di Simo Gunung Ditangkap Polda Jatim",
    about: "Curanmor",
  },
  {
    no: 7,
    id: "#12396",
    date: "Nov 15, 2021",
    source: "https://google.com",
    mention:
      "Aksi pencurian motor kembali marak di Pasuruan. Kali ini, dua maling menggasak motor honda Beat milik istri dari anggota kepolisian Brimob Polda Jatim.",
    about: "Curanmor",
  },
  {
    no: 8,
    id: "#12397",
    date: "Nov 15, 2021",
    source: "https://google.com",
    mention:
      "Anggota DPR ini gak mau ngaku, maling mana mau ngaku yak ===>> Supercar Berstiker ASC Disita Polda Jatim, Ahmad Sahroni: Bukan Mobil Saya",
    about: "Maling",
  },
  {
    no: 9,
    id: "#12398",
    date: "Nov 15, 2021",
    source: "https://google.com",
    mention:
      "Monggo gengs, kamu-kamu yang merasa pernah jadi korban kejahatan, kendaraan bermotor milikmu digondol maling atau begal, bisa periksa ke Polda Jatim.",
    about: "Curanmor",
  },
];
