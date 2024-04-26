import { getAllCategory } from "@/app/api/repository/CategoryRepository";
import { cookies } from "next/headers";
import PlatformFilterContent from "./components/PlatformFilterContentComponent";

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
    <PlatformFilterContent
      token={token}
      platformName={platformName}
      category={category}
    />
  );
};

export default FilterPlatformPage;
