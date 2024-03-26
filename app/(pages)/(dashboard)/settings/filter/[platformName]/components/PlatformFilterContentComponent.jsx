"use client";
import { getUserFilterByPlatformId } from "@/app/api/repository/FilterRepository";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PlatformCategoryForm from "./PlatformCategoryFormComponent";
import PlatformFilterTable from "./PlatformFilterTableComponent";

const PlatformFilterContent = ({ token, platformName, category }) => {
  const router = useRouter();
  const { platformId } = useSelector((state) => state.platformReducer);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getInitialData(
        platformId,
        token,
        platformName,
        category
      );
      setFilterData(data);
    };
    fetchData();
  }, []);

  const refreshPage = async () => {
    console.log("refreshing");

    const data = await getInitialData(
      platformId,
      token,
      platformName,
      category
    );
    setFilterData(data);
    router.refresh();
  };

  return (
    <Stack className="flex-col xl:flex-row gap-16 justify-between" spacing={15}>
      <Box>
        <Typography className="mb-6 text-base font-semibold text-[#343A40]">
          Filter Settings
        </Typography>
        <PlatformCategoryForm
          token={token}
          platformName={platformName}
          category={category}
          refreshPage={refreshPage}
        />
      </Box>
      <Box className="my-0 h-full flex flex-col justify-start">
        <Typography className=" text-base font-semibold text-[#343A40]">
          Filter is Running
        </Typography>
        <PlatformFilterTable
          token={token}
          platformName={platformName}
          filterData={filterData}
          refreshPage={refreshPage}
        />
      </Box>
    </Stack>
  );
};

export default PlatformFilterContent;

const formatDataToTable = (data, platformName, categoryMap) => {
  return data.map((item, index) => {
    return [
      item.id,
      item.category_id,
      index + 1,
      categoryMap.get(item.category_id),
      platformName,
      item.parameter,
      "",
    ];
  });
};

const getInitialData = async (platformId, token, platformName, category) => {
  let categoryMap = new Map();

  category?.forEach((item) => {
    categoryMap.set(item.id, item.name);
  });
  const filter = await getUserFilterByPlatformId(platformId, token);
  if (filter?.length > 0) {
    return formatDataToTable(filter, platformName, categoryMap);
  }
  return [];
};
