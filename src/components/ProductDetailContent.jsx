import React, { useState } from "react";
import { Link } from "react-router-dom";

const formatPrice = (harga) => {
  return harga ? harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "";
};

export const ProductDetailContent = ({
  productDetail,
  dataSizes,
  dataColor,
}) => {
  const [selectedColor, setSelectedColor] = useState("");

  const handleColorChange = (colorId) => {
    setSelectedColor(colorId);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{productDetail.product_name}</h1>
      <p className="text-xl mb-4 text-mono">
        IDR {productDetail.price ? formatPrice(productDetail.price) : ""}
      </p>
      <div className="mb-4 flex justify-between">
        <span className="font-semibold text-lg">Color</span>
        <div className="flex gap-2">
          {dataColor.map((color) => (
            <label key={color.id} className="mx-2 select-label">
              <Link to={`/product/${color.product_slug}/${color.article_name}`}>
                <input
                  type="radio"
                  name="color"
                  value={color.color}
                  checked={selectedColor === color.color}
                  onChange={() => handleColorChange(color.color)}
                />
                <span
                  className={
                    selectedColor === color.color ? "active-color" : ""
                  }
                >
                  {color.color}
                </span>
              </Link>
            </label>
          ))}
        </div>
      </div>
      <div className="mb-4 flex justify-between">
        <span className="font-semibold text-lg">Size</span>
        <div className="flex gap-2">
          {dataSizes.map((size, index) => (
            <span key={index} className="inline-block mr-2">
              {size.size}
            </span>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <span className="font-semibold text-lg">Description</span>
        <p
          className="ms-4 text-mono"
          dangerouslySetInnerHTML={{ __html: productDetail.article_desc }}
        ></p>
      </div>
      <div className="mb-4">
        <span className="font-semibold text-lg">Size Chart</span>
        <p
          className="ms-4 text-mono"
          dangerouslySetInnerHTML={{ __html: productDetail.size_chart }}
        ></p>
      </div>
    </div>
  );
};
