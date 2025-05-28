import React from "react";
import ImageGallery from "react-image-gallery";
import Zoom from "react-medium-image-zoom";
import "react-image-gallery/styles/css/image-gallery.css";
import "react-medium-image-zoom/dist/styles.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

export const ProductDetailImage = ({ dataImages }) => {
  const images = dataImages.map((image) => ({
    original: import.meta.env.VITE_IMG_STORAGE + image.image,
    thumbnail: import.meta.env.VITE_IMG_STORAGE + image.image,
  }));

  return (
    <div className="w-full h-full">
      <Swiper
        slidesPerView={1}
        // spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Zoom>
              <img
                src={image.original}
                alt="Product image"
                className="object-cover w-full h-[65vh] md:h-full"
              />
            </Zoom>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* <ImageGallery
        items={images}
        showThumbnails={false}
        showFullscreenButton={false}
        showPlayButton={false}
        showNav={false}
        renderItem={(item) => (
          <Zoom>
            <img
              src={item.original}
              alt="Product image"
              className="object-cover w-full h-screen md:h-full"
            />
          </Zoom>
        )}
      /> */}
    </div>
  );
};
