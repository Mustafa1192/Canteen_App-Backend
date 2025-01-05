import React from 'react';
import CategoryList from '../component/Home/CategoryList';
import Banner from '../component/Home/Banner'
import BeveragesSection from '../component/Home/BeveragesSection'
import ProductGrid from '../component/Home/ProductGrid'
import Testimonials from '../component/Home/Testimonials';
import FAQs from '../component/Home/FAQs';
import SouthIndianSection from '../component/Home/SouthIndianSection';
import FrankiesSection from '../component/Home/FrankiesSection';
import GeneralFoodSection from '../component/Home/GeneralFoodSection';

function Home() {
  return (
    <div className="bg-[#FAF5FF] min-h-screen">
      <Banner />
      <CategoryList />
      <ProductGrid />
      <GeneralFoodSection />
      <FrankiesSection />
      <BeveragesSection />
      <SouthIndianSection />
      <Testimonials />
      {/* <FAQs /> */}
    </div>
  );
}

export default Home;
