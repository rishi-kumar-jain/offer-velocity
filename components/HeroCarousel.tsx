"use client"; // here while dealing with Carousel , it consits of client interaction ie using dots to move images
import "react-responsive-carousel/lib/styles/carousel.min.css"; //gives loader for our css
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const heroImages = [
  { imgUrl: "/assets/images/hero-1.svg", alt: "smartwatch" },
  { imgUrl: "/assets/images/hero-2.svg", alt: "bag" },
  { imgUrl: "/assets/images/hero-3.svg", alt: "lamp" },
  { imgUrl: "/assets/images/hero-4.svg", alt: "air frier" },
  { imgUrl: "/assets/images/hero-5.svg", alt: "chair" },
];

const HeroCarousel = () => {
  return (
    <div className="hero-carousel">
      <Carousel
        showThumbs={false}
        // autoPlay
        infiniteLoop
        showStatus={false}
        showArrows={false}
        // interval={2000}
      >
        {heroImages.map((item) => (
          <Image
            key={item.alt}
            src={item.imgUrl}
            alt={item.alt}
            width={484}
            height={484}
            className="object-contain"
          />
        ))}
      </Carousel>

      <Image
        src="assets/icons/hand-drawn-arrow.svg"
        alt="arrow"
        width={175}
        height={175}
        className="max-xl:hidden absolute -left-[15%] bottom-0 z-index-0"
      />
    </div>
  );
};

export default HeroCarousel;
