import React, { useEffect, useState } from "react";
import { Layouts } from "../layouts/Layouts";
import heroimage from "../assets/img/heroimage.jpg";
import { motion } from "framer-motion";
import { Link, Element } from "react-scroll";
import { ProductGrid } from "../components/ProductGrid";
import axios from "axios";

export const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://cms-catalog.clcs.co.id/api/products"
        );
        setProducts(response.data.product_data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Layouts>
      <section className="w-full min-h-screen">
        <Link to="section2" smooth={true} duration={1000}>
          <motion.img
            src={heroimage}
            alt=""
            className="w-full min-h-screen object-cover cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3 }}
          />
        </Link>
      </section>
      <Element name="section2" className="w-full min-h-screen">
        <ProductGrid products={products} />
      </Element>
    </Layouts>
  );
};
