import { useEffect, useState } from "react";
import { Layouts } from "../layouts/Layouts";
import desktop1 from "../assets/img/desktop-1.jpg";
import desktop2 from "../assets/img/desktop-2.jpg";
import desktop3 from "../assets/img/desktop-3.jpg";
import mobile1 from "../assets/img/mobile-1.jpg";
import mobile2 from "../assets/img/mobile-2.png";
import mobile3 from "../assets/img/mobile-3.jpg";
import text1 from "../assets/img/text-mobile-1.png";
import text2 from "../assets/img/text-mobile-2.png";
import button from "../assets/img/button.png";
import { motion } from "framer-motion";
import { Link, Element } from "react-scroll";
import { ProductGrid } from "../components/ProductGrid";
import axios from "axios";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

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

  // Fetch Counter Visitor
  useEffect(() => {
    const COUNTER_KEY = "counter_visitor_last_hit";

    const hitCounter = async () => {
      try {
        await axios.post(
          "https://admin-socialchic.clcs.co.id/api/counter-visitor"
        );
        localStorage.setItem(COUNTER_KEY, Date.now().toString());
      } catch (error) {
        console.error("Error fetching counter:", error);
      }
    };

    const checkAndHit = () => {
      const lastHit = localStorage.getItem(COUNTER_KEY);
      const now = Date.now();

      // Jika belum pernah hit atau sudah lewat 1 jam (3600000 ms)
      if (!lastHit || now - Number(lastHit) > 3600000) {
        hitCounter();
      }
    };

    // Hit pertama setelah 10 detik
    const timer = setTimeout(() => {
      checkAndHit();
    }, 10000);

    // Cek setiap kali user kembali (misal reload/tab aktif)
    const onFocus = () => {
      checkAndHit();
    };
    window.addEventListener("focus", onFocus);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  return (
    <Layouts>
      <section className="w-full min-h-[calc(var(--vh,1vh)*100)] relative md:pt-8">
        <Link to="section2" smooth={true} duration={1000}>
          {/* Swiper Desktop */}
          <div className="hidden md:block w-full h-screen">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={0}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              style={{ width: "100%", height: "100%" }}
            >
              <SwiperSlide>
                <motion.img
                  src={desktop3}
                  alt="Social Chic Desktop Banner 1"
                  className="w-full h-screen object-cover object-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 3 }}
                />
              </SwiperSlide>
              <SwiperSlide>
                <motion.img
                  src={desktop2}
                  alt="Social Chic Desktop Banner 2"
                  className="w-full h-screen object-cover object-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 3 }}
                />
              </SwiperSlide>
              <SwiperSlide>
                <motion.img
                  src={desktop1}
                  alt="Social Chic Desktop Banner 3"
                  className="w-full h-screen object-cover object-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 3 }}
                />
              </SwiperSlide>
            </Swiper>
          </div>

          {/* Swiper Mobile */}
          <div className="block md:hidden w-full h-[calc(var(--vh,1vh)*100)]">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={0}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              style={{ width: "100%", height: "100%" }}
            >
              <SwiperSlide>
                <motion.img
                  src={mobile3}
                  alt="Social Chic Mobile Banner"
                  className="w-full h-[calc(var(--vh,1vh)*100)] object-cover object-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 3 }}
                />
              </SwiperSlide>
              <SwiperSlide>
                <div className="relative w-full h-[calc(var(--vh,1vh)*100)]">
                  <motion.img
                    src={mobile2}
                    alt="Social Chic Mobile Banner"
                    className="w-full h-full object-cover object-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 3 }}
                  />
                  <motion.img
                    src={text2}
                    alt="Social Chic Mobile Banner Text"
                    className="absolute left-0 w-full p-8 top-36"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 3 }}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="relative w-full h-[calc(var(--vh,1vh)*100)]">
                  <motion.img
                    src={mobile1}
                    alt="Social Chic Mobile Banner"
                    className="w-full h-full object-cover object-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 3 }}
                  />
                  <motion.img
                    src={text1}
                    alt="Social Chic Mobile Banner Text"
                    className="absolute left-0 w-full p-6 bottom-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 3 }}
                  />
                  <motion.img
                    src={button}
                    alt="Social Chic Mobile Banner Button"
                    className="absolute left-1/2 bottom-8 w-24 max-w-xs -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 3 }}
                  />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </Link>

        {/* ...existing code for text and button... */}
      </section>

      <Element name="section2" className="w-full min-h-screen">
        <ProductGrid products={products} />
      </Element>
    </Layouts>
  );
};
