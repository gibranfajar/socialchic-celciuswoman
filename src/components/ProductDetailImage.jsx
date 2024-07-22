import React from "react";
import ImageGallery from "react-image-gallery";
import Zoom from "react-medium-image-zoom";
import "react-image-gallery/styles/css/image-gallery.css";
import "react-medium-image-zoom/dist/styles.css";

export const ProductDetailImage = ({ dataImages }) => {
  const images = dataImages.map((image) => ({
    original: import.meta.env.VITE_IMG_STORAGE + image.image,
    thumbnail: import.meta.env.VITE_IMG_STORAGE + image.image,
  }));

  return (
    <div className="w-full h-full">
      <ImageGallery
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
              className="object-cover w-full h-64 md:h-full"
            />
          </Zoom>
        )}
      />
    </div>
  );
};
