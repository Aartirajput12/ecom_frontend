import React from 'react'
import { Link } from 'react-router-dom'
import FormattedPrice from './FormattedPrice';
import AddToCartBtn from './AddToCartBtn';
import { IoClose } from "react-icons/io5";
import { store } from '../lib/store';
import Swal from 'sweetalert2'
import { FaCheck } from "react-icons/fa6";

const CartProduct = ({product}) => {

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });

    const {removeFromCart} = store()
    const handleRemoveProduct=()=>{
        if(product) {
            removeFromCart(product?._id);
            Toast.fire({title:`${product?.name.substring(0, 20)} deleted successfully!`,  position: "bottom-end",  color: "white", background: "black", icon: "success", iconColor: "green" });
        }
    }
  return (
    <div className='flex py-6 sm:py-10'>
        <Link to={`/product/${product?._id}`}>
            <img src={product?.images[0]} alt="productimage" 
            className='h-24 w-24 rounded-md object-cover sm:h-48 sm:w-48 border border-[#ecb3be] hover:border-[#6f1628] duration-300'/>
        </Link>
        <div className='ml-4 flex flex-1 flex-col justify-between sm:ml-6'>
            <div className='relative pr-9 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:pr-0'>
                <div className='flex flex-col gap-1 col-span-3'>
                    <h3 className='text-base font-semibold w-full'>
                        {product?.name.substring(0, 80)}</h3>
                    <p className='text-xs'>Brand: <span className='font-medium'>{product?.brand}</span></p>
                    <p className='text-xs'>Category: <span className='font-medium'>{product?.category}</span></p>
                    <div className='flex items-center gap-6 mt-2'>
                        <p className='text-base font-semibold'>
                            <FormattedPrice amount={product?.discountedPrice * product?.quantity }/>
                        </p>
                        <AddToCartBtn product={product}/>
                    </div>
                </div>
                <div className='mt-4 sm:mt-0 sm:pr-9'>
                    <div className='absolute right-0 top-0'>
                        <button onClick={handleRemoveProduct} className='-m-2 inline-flex p-2 text-gray-600 hover:text-red-600'><IoClose /></button>
                    </div>
                </div>
            </div>
            <div>
            {product?.isStock && (
                 <p className='mt-4 flex space-x-2 text-sm text-gray-700'>
                    <FaCheck className='text-lg text-green-500'/>
                    <span>In Stock Ships in 3-4 weeks</span>
                </p>
            )}

        </div>
        
        </div>
    </div>
  )
}

export default CartProduct;