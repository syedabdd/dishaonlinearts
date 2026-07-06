import Hero from "@/components/website/Hero";
import Hero2 from "@/components/website/Hero2";
import dynamic from "next/dynamic";

const TrustStats = dynamic(() => import("@/components/website/TrustStats"));
const TrendingCourses = dynamic(() => import("@/components/website/TrendingCourses"));
const StudyMaterial = dynamic(() => import("@/components/website/StudyMaterial"));
const PopularCategory = dynamic(() => import("@/components/website/PopularCategory"));
const Liveclasses = dynamic(() => import("@/components/website/Liveclasses"));
const JoinOurYoutubeFam = dynamic(() => import("@/components/website/JoinOurYouubeFam"));
const DigitalEcoSystem = dynamic(() => import("@/components/website/DigitalEcoSystem"));
const Toppers = dynamic(() => import("@/components/website/Toppers"));

import { getActiveBanners } from "../(admin)/admindp/banners/actions";

export default async function HomePage() {
  const rawBanners = await getActiveBanners();
  const activeBanners = JSON.parse(JSON.stringify(rawBanners));

  return (
    <>
      <Hero banners={activeBanners} />
      <Hero2 />
      <TrustStats />
      <TrendingCourses />
      <StudyMaterial />
      <PopularCategory />
      <Liveclasses />
      <JoinOurYoutubeFam />
      <DigitalEcoSystem />
      <Toppers />
    </>
  );
}
