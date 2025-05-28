import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Layouts } from "../layouts/Layouts";
import { ProductDetailImage } from "../components/ProductDetailImage";
import { ProductDetailContent } from "../components/ProductDetailContent";

export const ProductView = () => {
  const { productSlug, productSku } = useParams();
  const [productDetail, setProductDetail] = useState([]);
  const [dataSizes, setDataSizes] = useState([]);
  const [dataImages, setDataImages] = useState([]);
  const [dataColor, setDataColor] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://admin-socialchic.clcs.co.id/api/products-detail/${productSlug}/${productSku}`
      )
      .then((res) => {
        setProductDetail(res.data.productDetail);
        setDataSizes(res.data.data_sizes);
        setDataImages(res.data.data_images);
        setDataColor(res.data.data_article);
      })
      .catch((error) => {
        console.error("Error fetching product detail:", error);
      });
  }, [productSku, productSlug]);

  return (
    <Layouts>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-5 pt-12">
        <div className="col-span-1 text-sm min-h-[65vh] md:h-auto">
          <ProductDetailImage dataImages={dataImages} />
        </div>
        <div className="col-span-1 text-sm">
          <ProductDetailContent
            productDetail={productDetail}
            dataSizes={dataSizes}
            dataColor={dataColor}
          />
        </div>
        <Link to={`/`}>
          <button className="fixed bottom-4 right-4 bg-black text-white py-2 px-10 rounded-full shadow-lg">
            Back
          </button>
        </Link>
      </div>
    </Layouts>
  );
};
