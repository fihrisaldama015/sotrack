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
      {/* <TabItemComponent
        label={"Twitter"}
        href="/settings/filter"
        currentRoute={pathname}
      /> */}
      {platform?.map((platform) => (
        <TabItemComponent
          key={platform.id}
          label={platform.name}
          onClick={() => handlePlatformChange(platform)}
          href={`/settings/filter/${platform.name.toLowerCase()}`}
          currentRoute={pathname}
        />
      ))}
      {/* <TabItemComponent
        label={"Instagram"}
        href="/settings/filter/instagram"
        currentRoute={pathname}
      />
      <TabItemComponent
        label={"Facebook"}
        href="/settings/filter/facebook"
        currentRoute={pathname}
      />
      <TabItemComponent
        label={"Tiktok"}
        href="/settings/filter/tiktok"
        currentRoute={pathname}
      />
      <TabItemComponent
        label={"News"}
        href="/settings/filter/news"
        currentRoute={pathname}
      /> */}
    </>
  );
};

export default SocialMediaTabsComponent;
