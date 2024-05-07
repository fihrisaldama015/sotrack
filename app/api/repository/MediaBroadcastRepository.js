import { PROVIDER_GET, PROVIDER_POST } from "../provider";

export const getMediaBroadcastEmailList = async (
  token,
  page,
  limit,
  since,
  until,
  q = ""
) => {
  try {
    let URL = `getEmails?page=${page}&limit=${limit}&since=${since}&until=${until}&q=${q}`;
    const { data } = await PROVIDER_GET(URL, token);

    let mediaBroadcastEmailList = data;
    console.log("🚀 ~ mediaBroadcastEmailList:", mediaBroadcastEmailList);

    return mediaBroadcastEmailList;
  } catch (e) {
    console.log("🚀 ~ getMediaBroadcastEmailList - e:", e);
    return [];
  }
};

export const sendMediaBroadCastEmail = async (
  token,
  email,
  subject,
  message,
  date,
  city,
  files = []
) => {
  try {
    const form = new FormData();
    form.append("email", email);
    form.append("subject", subject);
    form.append("message", message);
    form.append("date", date);
    form.append("city", city);
    files.forEach((file) => {
      form.append("files", file);
    });
    const { data } = await PROVIDER_POST("sendEmail", form, token, true);

    return data;
  } catch (e) {
    console.log("🚀 ~ getMediaBroadcastEmailList - e:", e);
    return [];
  }
};
