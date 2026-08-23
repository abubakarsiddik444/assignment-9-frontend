import Banner from "@/components/Home/Banner";
import FeaturedPets from "@/components/Home/FeaturedPets";
import WhyAdopt from "@/components/Home/WhyAdopt";
import ExtraSection1 from "@/components/Home/ExtraSection1";
import SuccessStories from "@/components/Home/SuccessStories";
import PetCareTips from "@/components/Home/PetCareTips";
import ExtraSection2 from "@/components/Home/ExtraSection2";

export default function HomePage() {
  return (
    <>
      <Banner />
      <FeaturedPets />
      <WhyAdopt />
      <ExtraSection1 />
      <SuccessStories />
      <PetCareTips />
      <ExtraSection2 />
    </>
  );
}
