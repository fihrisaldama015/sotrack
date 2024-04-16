const BASE_URL =
  process.env.NODE_ENV === "development"
    ? process.env.BASE_URL_DEV
    : process.env.BASE_URL;
const PLATFORM_ICON = {
  twitter: "/assets/icon/twitter.svg",
  tiktok: "/assets/icon/tiktok.svg",
  instagram: "/assets/icon/instagram.svg",
  facebook: "/assets/icon/facebook.svg",
};
export { BASE_URL, PLATFORM_ICON };
