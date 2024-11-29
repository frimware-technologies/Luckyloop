import { Carousel } from "@mantine/carousel";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
export const Caroussel = () => {
  const autoplay = useRef(Autoplay({ delay: 2000 }));

  return (
    <Carousel
      height={200}
      withControls={false}
      dragFree={true}
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
    >
      <Carousel.Slide bg={"blue"}></Carousel.Slide>
      <Carousel.Slide bg={"red"}></Carousel.Slide>
    </Carousel>
  );
};
