"use client";
import TabItemComponent from "@/app/components/TabItemComponent";
import { usePathname } from "next/navigation";

const SocialMediaTabsComponent = () => {
  const pathname = usePathname();
  return (
    <>
      <TabItemComponent
        label={"Twitter"}
        href="/settings/filter"
        currentRoute={pathname}
      />
      <TabItemComponent
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
      />
    </>
  );
};

export default SocialMediaTabsComponent;
