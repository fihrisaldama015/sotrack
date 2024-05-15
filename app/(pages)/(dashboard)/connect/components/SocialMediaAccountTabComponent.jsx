"use client";

import { TabItemComponent } from "@/app/components";
import { usePathname, useRouter } from "next/navigation";

const SocialMediaAccountTabComponent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const handlePlatformChange = (platform) => {
    router.push(`/connect/${platform.toLowerCase()}`);
  };
  return (
    <>
      <TabItemComponent
        label={"Twitter Account"}
        onClick={() => handlePlatformChange("twitter")}
        href={`/connect/twitter`}
        currentRoute={pathname}
      />
      <TabItemComponent
        label={"Facebook Account"}
        onClick={() => handlePlatformChange("facebook")}
        href={`/connect/facebook`}
        currentRoute={pathname}
      />
      <TabItemComponent
        label={"Tiktok Account"}
        href={`/connect/tiktok`}
        onClick={() => handlePlatformChange("tiktok")}
        currentRoute={pathname}
      />
    </>
  );
};

export default SocialMediaAccountTabComponent;
