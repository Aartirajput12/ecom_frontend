import React from 'react'
import BannerCategories from './ui/BannerCategories';
import 'react-multi-carousel/lib/styles.css';
import HomeBanner from './ui/HomeBanner';
import Highlights from './ui/Highlights';
import Categories from './ui/Categories';
import ProductList from './ui/ProductList';
import DiscountedBanner from './ui/DiscountedBanner';
import Blog from './ui/Blog';
import { ToastContainer } from 'react-toastify';
import Profile from './pages/Profile';

const App = () => {
  return (
    <>
      <main>
        <BannerCategories />
        <HomeBanner />
        <Highlights />
        <Categories />
        <ProductList />
        <DiscountedBanner />
        <Blog/>
      </main>
    </>

  )
}

export default App;
