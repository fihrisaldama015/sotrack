"use client";
import {
  getCategory,
  getReportDetail,
} from "@/app/api/repository/PublicReportRepository";
import ReportDetail from "./components/ReportDetailComponent";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

const ReportDetailPage = async ({ params }) => {
  const id = params.reportId;
  const [data, setData] = useState([]);
  const accessToken = getCookie("accessToken");

  const getInitialReportDetailData = async (id) => {
    const response = await getReportDetail(id, accessToken);
    console.log("🚀 ~ getInitialReportDetailData ~ response:", response);
    const categoryList = await getCategory();
    console.log(
      "🚀 ~ getInitialReportDetailData ~ categoryList:",
      categoryList
    );
    const category = categoryList.find(
      (item) => item.id == response.category_id
    ).name;
    response.category = category;
    setData(response);
  };
  useEffect(() => {
    getInitialReportDetailData(id);
  }, []);

  if (data.length == 0) {
    return <div>loading...</div>;
  } else {
    return <ReportDetail initialData={data} />;
  }
};

export default ReportDetailPage;
