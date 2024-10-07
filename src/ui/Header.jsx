import React, { useEffect, useState } from 'react'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { logo } from '../assets/products';
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { FiUser, FiStar, FiShoppingBag } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import Container from './Container';
import { Link } from 'react-router-dom';
import { config } from '../config';
import { getData } from '../lib';
import ProductCard from './ProductCard'
import { store } from '../lib/store';

const bottomNavigation = [
  { title: "Home", link: "/" },
  { title: "Shop", link: "/product" },
  { title: "Cart", link: "/cart" },
  { title: "Orders", link: "/orders" },
  { title: "My Account", link: "/profile" },
  { title: "Blog", link: "/blog" }, 
];

const Header = () => {
  const [searchText, setSearchText] = useState("");
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { cartProduct } = store();

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = `${config?.baseUrl}products`;
      try {
        const data = await getData(endpoint);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);


  useEffect(()=>{
    const fetchData = async()=>{
      const endpoint = `${config?.baseUrl}categories`;
      console.log("endpoint",endpoint)
      try {
        const data = await getData(endpoint);
        setCategories(data);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    
    fetchData();
  },[]);
  

  useEffect(() => {
    const filtered = products.filter((item) => item.name.toLowerCase().includes(searchText.toLocaleLowerCase()));
  setFilteredProducts(filtered);
  }, [searchText]);

  return (
    <div className='w-full bg-whiteText md:sticky md:top-0 z-50'>
      <div className='container mx-auto h-20 flex items-center justify-between px-4 lg:px-0'>
       <Link to={"/"}>
       <img src={logo} alt="logo" className='w-44' />
       </Link>

        {/* searchbar */}
        <div className='hidden md:inline-flex max-w-3xl w-full relative'>
          <input type="text"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            placeholder='Search products...'
            className='className="w-full flex-1 rounded-full text-gray-900 text-lg placeholder:text-base placeholder:tracking-wide shadow-sm ring-1 ring-inset ring-gray-300 
        placeholder:text-gray-400 placeholder:font-normal focus:ring-1 focus:ring-darkText sm:text-sm px-4 py-2'/>
          {searchText ? (
            <IoClose
              onClick={() => setSearchText("")}
              className='absolute top-2.5 right-4 text-xl hover:text-red-500 cursor-pointer duration-200'
            />
          ) : (
            <IoSearchOutline className='absolute top-2.5 right-4 text-xl' />
          )}
        </div>
        {searchText && (
          <div className='absolute left-0 top-20 w-full mx-auto max-h-[500px] px-10 py-5 bg-white z-20 overflow-y-scroll text-black shadow-md shadow-[#851C31] scrollbar-hide'>
            {
              filteredProducts.length>0?(
              <div className='grid grif-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5'>
                {filteredProducts?.map((item) => (
                  <ProductCard item={item} key={item} setSearchText={setSearchText}/>
                ))}
              </div>
            ):(
              <div className='py-10 bg-gray-50 w-full flex items-center justify-center border border-gray-600 rounded-md'>
                <p className='text-xl font-normal'>Nothing matches with your search keyword{" "}
                <span className='underline underline-offset-2 decoration-[1px] text-red-500 font-semibold'>{`(${searchText})`}</span>
                </p>
                Please try again
              </div>
            )}
          </div>
        )}

        {/* Menubar */}
        <div className='flex items-center gap-x-6 text-2xl'>
         <Link to={"/profile"}>
         <FiUser className="hover:text-skyText duration-200 cursor-pointer" />
         </Link>
          <div className='relative block'>
          <Link to={"/favorite"}>
          <FiStar className="hover:text-skyText duration-200 cursor-pointer" />
          </Link>
            <span className='inline-flex items-center justify-center bg-redText text-whiteText absolute -top-1 -right-2 text-[9px] rounded-full w-4 h-4'>0</span>
          </div>
          <Link to={"/cart"} className='relative block'>
            <FiShoppingBag className="hover:text-skyText duration-200 cursor-pointer" />
            <span className='inline-flex items-center justify-center bg-redText text-whiteText absolute -top-1 -right-2 text-[9px] rounded-full w-4 h-4'>
              {cartProduct?.length > 0 ? cartProduct?.length : "0"}
            </span>
          </Link>
        </div>

      </div>

      <div className='w-full bg-darkText text-whiteText bg-gradient-to-l from-[#7a1935] to-[#141415]'>
        <Container className="py-2 max-w-4xl flex items-center gap-5 justify-between">
          {/* <p className='flex items-center gap-1'>Select Category<FaChevronDown/></p> */}
          <Menu>
            <MenuButton className="inline-flex items-center gap-2 rounded-md border border-gray-400 hover:border-white py-1.5 px-3 font-semibold text-gray-300 hover:text-whiteText">
              Select Category <FaChevronDown className='text-base mt-1
              '/>
            </MenuButton>
            <Transition
             enter='transition ease-out duration-75'
             enterFrom='opacity-0 scale-95'
             enterTo='opacity-100 scale-100'
             leave='transition ease-in duration-100'
             leaveFrom='opacity-100 scale-100'
             leaveTo='opacity-0 scale-95'             
             >
              
              <MenuItems 
              anchor="bottom end"
               className='w-52 origin-top-right rounded-xl border border-white/5 bg-black p-1 
               text-sm/6 text-gray-300 [--anchor-gap:var(--spacing-1)] focus:outline-none hover:text-white z-50'>
                {categories?.map((item) => (
                 <MenuItem key={item?._id}>
                    <Link to={`/category/${item?._base}`}
                      className='flex w-full items-center gap-2 px-3 py-2 data-[focus]:bg-white/20 tracking-wide'
                    >
                      <img src={item?.image}
                       alt="categoryImage"
                       className='w-6 h-6 rounded-md'
                       />
                       {item?.name}
                    </Link>
                 </MenuItem> 
                ))}
              </MenuItems>
            </Transition>
          </Menu>
          {bottomNavigation.map(({ title, link }) => (
            <Link
              to={link}
              key={title}
              className="uppercase hidden md:inline-flex text-sm font-semibold text-whiteText/90 hover:text-whiteText duration-200 relative overflow-hidden group"
            >
              {title}
              <span className="inline-flex w-full h-[1px] bg-whiteText absolute bottom-0 left-0 transform -translate-x-[105%] group-hover:translate-x-0 duration-300" />
            </Link>
          ))}
  
        </Container>
      </div>
    </div>
  )
}

export default Header;