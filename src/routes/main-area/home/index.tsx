import { Caroussel } from "../../../components/ui/Carousel";
import { Header } from "../../../components/home/Header";
import { QuickFeatureBar } from "../../../components/home/QuickFeature";
import { Games } from "@/components/game/Games";
export const Home = () => {
  return (
    <>
      <Header />
      <Caroussel />
      <QuickFeatureBar />
      <Games />
    </>
  );
};
