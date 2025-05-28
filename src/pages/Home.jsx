import React, { useEffect, useState } from "react";
import { Layouts } from "../layouts/Layouts";
import desktop from "../assets/img/banner.jpg";
import mobile from "../assets/img/main-mobile.jpg";
import textDesktop from "../assets/img/text-desktop.png";
import textMobile from "../assets/img/text-mobile.png";
import button from "../assets/img/button.png";
import { motion } from "framer-motion";
import { Link, Element } from "react-scroll";
import { ProductGrid } from "../components/ProductGrid";
import axios from "axios";

export const Home = () => {
  const [products, setProducts] = useState([]);

  // Fix vh unit for mobile browsers
  useEffect(() => {
    const handleResize = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    handleResize(); // Set on mount
    window.addEventListener("resize", handleResize); // Update on resize

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://admin-socialchic.clcs.co.id/api/products"
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
      <section className="w-full min-h-[calc(var(--vh,1vh)*100)] relative md:pt-8">
        <Link to="section2" smooth={true} duration={1000}>
          {/* Desktop Image */}
          <motion.img
            src={desktop}
            alt="Social Chic Desktop Banner"
            className="hidden md:block w-full h-screen object-cover object-center cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3 }}
          />

          {/* Mobile Image */}
          <motion.img
            src={mobile}
            className="block w-full h-[calc(var(--vh,1vh)*100)] object-cover object-center cursor-pointer md:hidden"
            alt="Social Chic Mobile Banner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3 }}
          />
        </Link>

        {/* Desktop Text */}
        <motion.img
          src={textDesktop}
          alt="Social Chic Desktop Text"
          className="hidden md:hidden w-full absolute bottom-16 px-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3 }}
        />

        {/* Mobile Text */}
        <motion.img
          src={textMobile}
          alt="Social Chic Mobile Text"
          className="block md:hidden w-full absolute bottom-16 px-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3 }}
        />

        {/* Button */}
        <motion.img
          src={button}
          alt="Social Chic Button"
          className="w-44 md:hidden absolute bottom-10 md:bottom-6 px-12 cursor-pointer left-0 right-0 mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3 }}
        />
      </section>

      <Element name="section2" className="w-full min-h-screen">
        <ProductGrid products={products} />
      </Element>
    </Layouts>
  );
};
