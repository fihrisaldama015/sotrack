"use client";
import { DOWNLOAD } from "@/app/utils/assets";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import FileSaver from "file-saver";
import JSZip from "jszip";
import JSZipUtils from "jszip-utils";
import Image from "next/image";
import { useSelector } from "react-redux";

const DownloadReportComponent = () => {
  const { platformSelected } = useSelector(
    (state) => state.dashboardOptionsReducer
  );
  const {
    mostDiscusedLatelyData,
    mentionSourceData,
    mentionAnalyticsData,
    crimeStatisticData,
    criminalReportData,
    sentigraphData,
    socialMentionData,
  } = useSelector((state) => state.dashboardDataReducer);
  const download = () => {
    console.log("Download report => ", mostDiscusedLatelyData);
    // Most Discused Lately
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Topic,Mention\n" +
      mostDiscusedLatelyData
        .map((post) => `${post.topic},${post.mentions}`)
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    // Mention Source
    const csvContentMentionSource =
      "data:text/csv;charset=utf-8," +
      "Source,Mention\n" +
      mentionSourceData
        .map((post) => `${post.source},${post.mentions}`)
        .join("\n");
    const encodedUriMentionSource = encodeURI(csvContentMentionSource);
    // Mention Analytics
    const csvContentMentionAnalytics =
      "data:text/csv;charset=utf-8," +
      "Time,Mention\n" +
      mentionAnalyticsData.map((post) => `${post.x},${post.y}`).join("\n");
    const encodedUriMentionAnalytics = encodeURI(csvContentMentionAnalytics);
    // Crime Statistic
    const csvContentCrimeStatistic =
      "data:text/csv;charset=utf-8," +
      "Type of Crime,Total\n" +
      crimeStatisticData
        .map((post) => `${post.type_of_crime},${post.data}`)
        .join("\n");
    const encodedUriCrimeStatistic = encodeURI(csvContentCrimeStatistic);
    // Criminal Report
    const csvContentCriminalReport =
      "data:text/csv;charset=utf-8," +
      "Time,Mention\n" +
      criminalReportData.map((post) => `${post.index},${post.data}`).join("\n");
    const encodedUriCriminalReport = encodeURI(csvContentCriminalReport);
    // Sentigraph
    const csvContentSentigraph =
      "data:text/csv;charset=utf-8," +
      "Positive,Negative\n" +
      `${sentigraphData.Positive}%,${sentigraphData.Negative}%` +
      "\n";
    const encodedUriSentigraph = encodeURI(csvContentSentigraph);
    // Social Mention Tracker
    const chartData = socialMentionData.chartData;
    const csvContentSocialMention =
      "data:text/csv;charset=utf-8," +
      Object.keys(chartData)
        .map((index) => `${chartData[index].x}`)
        .join(",") +
      ",Total\n" +
      Object.keys(chartData)
        .map((index) => `${chartData[index].y}`)
        .join(",") +
      `,${socialMentionData.total}` +
      "\n";
    const encodedUriSocialMention = encodeURI(csvContentSocialMention);

    // Download multiple files
    const multiple_links = {
      mostDiscusedLately: encodedUri,
      mentionSource: encodedUriMentionSource,
      mentionAnalytics: encodedUriMentionAnalytics,
      crimeStatistic: encodedUriCrimeStatistic,
      criminalReport: encodedUriCriminalReport,
      sentigraph: encodedUriSentigraph,
      socialMention: encodedUriSocialMention,
    };
    console.log("🚀 ~ download ~ multiple_links:", multiple_links);
    let count = 1;
    const zip = new JSZip();
    Object.keys(multiple_links).map((type) => {
      const url = multiple_links[type];
      JSZipUtils.getBinaryContent(url, function (err, data) {
        if (err) {
          throw err; // or handle the error
        }
        try {
          zip.file(type + ".csv", data, { binary: true });
          if (count == Object.keys(multiple_links).length) {
            zip.generateAsync({ type: "blob" }).then(function (content) {
              FileSaver.saveAs(
                content,
                `Socialens - Dashboard ${platformSelected} - ${dayjs().format(
                  "YYYY-MM-DD HH:mm:ss"
                )}.zip`
              );
            });
          }
          count++;
        } catch (e) {
          console.log("errorrr...k", e);
        }
      });
    });
  };
  return (
    <Box
      onClick={download}
      display={"flex"}
      className="gap-2 hover:bg-slate-200 p-2 pr-3 rounded-lg cursor-pointer transition-all"
    >
      <Image src={DOWNLOAD} alt="Download Logo" width={22} height={23} />
      <Typography className="text-sm text-[#4D4D4D] font-medium">
        Download Report
      </Typography>
    </Box>
  );
};

export default DownloadReportComponent;
