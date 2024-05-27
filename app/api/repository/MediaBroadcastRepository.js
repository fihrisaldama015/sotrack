import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_POST } from "../provider";

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

export const getMediaBroadcastEmailDetail = async (id, token) => {
  try {
    const { data } = await PROVIDER_GET(`getEmail/${id}`, token);
    return data;
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
      const file_upload = file;
      form.append("files", file_upload);
      console.log("file => ", file_upload);
    });
    for (var pair of form.entries()) {
      console.log(pair[0] + " - " + pair[1]);
    }
    const res = await PROVIDER_POST("sendEmail", form, token, true);

    return res;
  } catch (e) {
    console.log("🚀 ~ getMediaBroadcastEmailList - e:", e);
    return [];
  }
};

export const deleteMediaBroadCastEmail = async (id, token) => {
  try {
    const { data } = await PROVIDER_DELETE(`deleteEmail/${id}`, null, token);
    return data;
  } catch (e) {
    console.log("🚀 ~ getMediaBroadcastEmailList - e:", e);
    return [];
  }
};
