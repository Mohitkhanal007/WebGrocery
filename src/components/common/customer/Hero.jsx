import React from "react";
import { useNavigate } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-[500px] bg-cover bg-center" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80)` }}>
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4 grocery-fade-in">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight grocery-heading">Fresh Groceries Delivered</h1>
        <p className="mt-4 text-xl md:text-2xl max-w-3xl grocery-text">
          Premium quality groceries delivered fresh to your doorstep. From farm to table, we ensure the best for your family.
        </p>
        <div className="mt-8">
          <button onClick={() => navigate("/products")} className="grocery-btn bg-purple-800 text-white py-3 px-8 text-xl rounded-lg hover:bg-purple-600 transition duration-300">
            Shop Groceries
          </button>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, description, buttonText, image, imagePosition = "left", onButtonClick }) => (
  <div className={`flex flex-col md:flex-row items-center justify-between py-12 ${imagePosition === "right" ? "md:flex-row-reverse" : ""}`}>
    <div className="md:w-1/2 p-6">
      <h2 className="text-4xl font-bold mb-4 text-purple-800 grocery-heading">{title}</h2>
      <p className="text-lg text-gray-700 mb-6 grocery-text">{description}</p>
      <button onClick={onButtonClick} className="grocery-btn bg-purple-800 text-white py-3 px-8 text-xl rounded-lg hover:bg-purple-600 transition duration-300">
        {buttonText}
      </button>
    </div>
    <div className="md:w-1/2">
      <img src={image} alt={title} className="w-full h-auto rounded-lg shadow-lg" />
    </div>
  </div>
);

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div>
      <HeroSection />

      <div className="container mx-auto px-6">
        <Section
          title="Explore Our Groceries"
          description="From fresh fruits and vegetables to daily essentials, we offer a wide range of premium grocery items sourced from the finest farms and suppliers."
          buttonText="View All Products"
          image="https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=800&q=80"
          onButtonClick={() => navigate("/products")}
        />
        <Section
          title="Contact Us for Bulk Orders"
          description="Need groceries for your business or special events? Contact us for custom orders and bulk pricing."
          buttonText="Get in Touch"
          image="https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=800&q=80"
          imagePosition="right"
          onButtonClick={() => navigate("/contact")}
        />
      </div>
    </div>
  );
};

export default Hero;