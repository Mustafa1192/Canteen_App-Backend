import React from 'react';
import CategoryList from '../component/Home/CategoryList';
import Banner from '../component/Home/Banner';
import ProductGrid from '../component/Home/ProductGrid';
import OfferPopup from '../component/Home/OfferPopup';

function Home() {
  return (
    <div className="bg-[#FAF5FF] min-h-screen">
      <CategoryList />
      <ProductGrid />
      <Banner />
      <OfferPopup />
    </div>
  );
}

export default Home;
