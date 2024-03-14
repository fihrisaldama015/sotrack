import { Box, Stack, Typography } from "@mui/material";
import PlatformCategoryForm from "./components/PlatformCategoryFormComponent";
import PlatformFilterTable from "./components/PlatformFilterTableComponent";
import { cookies } from "next/headers";
import { getAllCategory } from "@/app/api/repository/CategoryRepository";

const getCategory = async (token) => {
  try {
    const res = await getAllCategory(token);

    return res.data;
  } catch (error) {
    console.log({ error });
  }
};

const FilterPlatformPage = async ({ params }) => {
  const platformName = params.platformName;
  const token = cookies().get("accessToken")?.value || "";
  const category = await getCategory(token);
  return (
    <Stack className="flex-col xl:flex-row gap-16 justify-between" spacing={15}>
      <Box>
        <Typography className="mb-6 text-base font-semibold text-[#343A40]">
          Filter Settings
        </Typography>
        <PlatformCategoryForm token={token} category={category} />
      </Box>
      <Box className="my-0 h-full flex flex-col justify-start">
        <Typography className=" text-base font-semibold text-[#343A40]">
          Filter is Running
        </Typography>
        <PlatformFilterTable
          token={token}
          platformName={platformName}
          category={category}
        />
      </Box>
    </Stack>
  );
};

export default FilterPlatformPage;
