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
      <h1 className="text-2xl font-bold mb-2 squels-title">
        {productDetail.product_name}
      </h1>
      <p className="text-xl mb-4 text-mono">
        {productDetail.price_disc !== 0 ? (
          <>
            <span className="opacity-30 line-through pr-2">
              IDR {formatPrice(productDetail.price)}
            </span>
            <span>IDR {formatPrice(productDetail.price_disc)}</span>
          </>
        ) : (
          <span>IDR {formatPrice(productDetail.price)}</span>
        )}
        {/* IDR {productDetail.price ? formatPrice(productDetail.price) : ""} */}
      </p>
      <div className="mb-4 flex justify-between">
        <span className="font-semibold text-lg squels-title">Color</span>
        <div className="flex gap-2">
          {dataColor.map((color) => (
            <label key={color.id} className="mx-2 select-label">
              <Link to={`/product/${color.product_slug}/${color.sku}`}>
                <input
                  type="radio"
                  name="color"
                  value={color.color}
                  checked={selectedColor === color.color}
                  onChange={() => handleColorChange(color.color)}
                />
                <span
                  className={`text-mono ${
                    selectedColor === color.color ? "active-color" : ""
                  }`}
                >
                  {color.color}
                </span>
              </Link>
            </label>
          ))}
        </div>
      </div>
      <div className="mb-4 flex justify-between">
        <span className="font-semibold text-lg squels-title">Size</span>
        <div className="flex gap-2">
          {dataSizes.map((size, index) => (
            <span key={index} className="inline-block mr-2">
              {size.size}
            </span>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <span className="font-semibold text-lg squels-title">Description</span>
        <p
          className="ms-4 text-mono"
          dangerouslySetInnerHTML={{ __html: productDetail.article_desc }}
        ></p>
      </div>
      <div className="mb-4">
        <span className="font-semibold text-lg squels-title">Size Chart</span>
        <p
          className="ms-4 text-mono"
          dangerouslySetInnerHTML={{ __html: productDetail.size_chart }}
        ></p>
      </div>
    </div>
  );
};
