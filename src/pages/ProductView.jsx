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
  const [dataColor, setDataColor] = useState([]); // This is not needed for this component, it's only used in ProductViewDetail component.
  const [relateProduct, setRelateProduct] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://cms-catalog.clcs.co.id/api/products-detail/${productSlug}/${productSku}`
      )
      .then((res) => {
        setProductDetail(res.data.productDetail);
        setDataSizes(res.data.data_sizes);
        setDataImages(res.data.data_images);
        setDataColor(res.data.data_article);
        setRelateProduct(res.data.productRelated);
      })
      .catch((error) => {
        console.error("Error fetching product detail:", error);
      });
  }, [productSku, productSlug]);

  return (
    <Layouts>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-5">
        <div className="col-span-1 text-sm order-last md:order-first">
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
