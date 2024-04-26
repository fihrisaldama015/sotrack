import { getAllCategory } from "@/app/api/repository/CategoryRepository";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { cookies } from "next/headers";
import PlatformCategoryForm from "../../components/PlatformCategoryFormComponent";

const getCategory = async (token) => {
  try {
    const res = await getAllCategory(token);

    return res.data;
  } catch (error) {
    console.log({ error });
  }
};

const EditFilterPage = async ({ params }) => {
  const platformName = params.platformName;
  const filterId = params.filterId;
  const token = cookies().get("accessToken")?.value || "";
  const category = await getCategory(token);
  return (
    <Stack className="flex-col xl:flex-row gap-16 justify-between" spacing={15}>
      <Box>
        <Typography className="mb-6 text-base font-semibold text-[#343A40]">
          Filter Settings
        </Typography>
        <PlatformCategoryForm
          token={token}
          category={category}
          platformName={platformName}
          edit={true}
          filterId={filterId}
        />
      </Box>
    </Stack>
  );
};

export default EditFilterPage;
