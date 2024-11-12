import React, { useEffect, useState } from 'react'
import { FaRegStar, FaRegEye } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { LuArrowLeftRight } from "react-icons/lu";
import { store } from '../lib/store';
import Swal from 'sweetalert2'

const ProductCardSideNav = ({product}) => {

  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  const {addToFavorite, favoriteProduct} = store();
  const [existingProduct, setExistingProduct] = useState(null);

  useEffect(()=>{
    const availableItem = favoriteProduct.find(
      (item) => item?._id === product._id
    );
    setExistingProduct(availableItem || null);
  }, [product, favoriteProduct]);

  const handleFavorite=() => {
    if(product) {
      addToFavorite(product).then(()=>{
        Toast.fire(existingProduct ? ( {title:`${product?.name.substring(0,10)} remove successfully!`, position: "bottom-end",  color: "white", background: "black", icon: "error", iconColor: "red"})
        : ({title:`${product?.name.substring(0,10)} added successfully!`, position: "bottom-end",  color: "white", background: "black", icon: "success", iconColor: "green",}));
      });
    }
  };

  return (
    <div className='absolute right-1 top-1 flex flex-col gap-1 transition translate-x-12 group-hover:translate-x-0 duration-300'>
        <span onClick={handleFavorite} className='w-11 h-11 inline-flex text-black text-lg items-center justify-center rounded-full duration-200'>
           {existingProduct ? <FaStar className='fill-red-600 text-xl'/> : <FaRegStar/>}
        </span>
        <span className='w-11 h-11 inline-flex text-black text-lg items-center justify-center rounded-full hover:text-white hover:bg-black duration-200'>
            <LuArrowLeftRight/>
        </span>
        <span className='w-11 h-11 inline-flex text-black text-lg items-center justify-center rounded-full hover:text-white hover:bg-black duration-200'>
            <FaRegEye/>
        </span>
    </div>  
  )
}
export default ProductCardSideNav;