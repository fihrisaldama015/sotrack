"use client";
import TabItemComponent from "@/app/components/TabItemComponent";
import { changePlatformId } from "@/app/redux/slices/PlatformSlice";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const SocialMediaTabsComponent = ({ platform }) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const handlePlatformChange = (platform) => {
    dispatch(changePlatformId({ platformId: platform.id }));
    router.push(`/settings/filter/${platform.name.toLowerCase()}`);
  };
  return (
    <>
      {platform?.map((platform) => (
        <TabItemComponent
          key={platform.id}
          label={platform.name}
          onClick={() => handlePlatformChange(platform)}
          href={`/settings/filter/${platform.name.toLowerCase()}`}
          currentRoute={pathname}
        />
      ))}
    </>
  );
};

export default SocialMediaTabsComponent;
