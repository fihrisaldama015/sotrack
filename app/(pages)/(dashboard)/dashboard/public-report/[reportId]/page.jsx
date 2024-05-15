"use client";
import {
  getCategory,
  getReportDetail,
} from "@/app/api/repository/PublicReportRepository";
import ReportDetail from "./components/ReportDetailComponent";
import { useEffect, useState } from "react";

const ReportDetailPage = async ({ params }) => {
  const id = params.reportId;
  const [data, setData] = useState([]);

  const getInitialReportDetailData = async (id) => {
    const response = await getReportDetail(id);
    const categoryList = await getCategory();
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
