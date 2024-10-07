import React, { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge';
import { store } from '../lib/store';
import Swal from 'sweetalert2'
import { FaMinus, FaPlus } from "react-icons/fa";

const AddToCartBtn = ({ className, title, product }) => {

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
    const [existingProduct, setExistingProduct] = useState(null);    
    const { addToCart, cartProduct, decreaseQuantity } = store();

    useEffect(()=>{
        const availableItem = cartProduct.find((item) => item?._id === product?._id);
        setExistingProduct(availableItem || null);
    }, [product, cartProduct])
    // console.log("cartproduct", cartProduct);
    const handleAddToCart = async () => {
        if (product) {
          try {
            await addToCart(product);
            Toast.fire({title:`${product?.name.substring(0, 10)} added successfully!`, position: "bottom-end",  color: "white", background: "black", icon: "success", iconColor: "green"});

          } catch (error) {
            // toast.error("Failed to add product to cart!");
          }
        } else {
          // toast.error("Product is undefined!");
        }
      };

      const handleDeleteProduct = async () => {
        if(existingProduct){
          if(existingProduct?.quantity > 1) {
          await decreaseQuantity(existingProduct?._id);
            Toast.fire({title:`${product?.name.substring(0,10)} decrease successfully`, position: "bottom-end",  color: "white", background: "black", icon: "error", iconColor: "red"}
            );
          }else{
            Toast.fire({title: `${product?.name.substring(0,10)} You can not decrease less than 1`, position: "bottom-end",  color: "white", background: "black",  icon: "error", iconColor: "red" });
            
          }
         
        }else{

          
        }
      }

      const newClassName = twMerge(
        "bg-[#f7f7f7] text-sm py-3 text-center rounded-full font-semibold hover:bg-[#6f1628] hover:text-white hover:scale-105 duration-200 cursor-pointer",
        className
    );
    
    return (
        <>
           {existingProduct ? (
              <div className='flex self-center items-center justify-center gap-2'>
                <button onClick={handleDeleteProduct} className='bg-[#f7f7f7] text-black p-2 border-[1px] border-gray-200 hover:border-[#6f1628] rounded-full text-sm
                 hover:bg-white duration-200 cursor-pointer'><FaMinus /></button>
                 <p className='text-base font-semibold w-10 text-center'>{existingProduct?.quantity}</p>
                 <button onClick={handleAddToCart}
                  className='bg-[#f7f7f7] text-black p-2 border-[1px] border-gray-200 hover:border-[#6f1628] rounded-full text-sm
                 hover:bg-white duration-200 cursor-pointer'><FaPlus /></button>
              </div>
           ) : (
            <button onClick={handleAddToCart} className={newClassName}>{title ? title : "Add to Cart"}
            </button>
           )}
        </>
    );
};

export default AddToCartBtn;