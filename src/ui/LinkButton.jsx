import React from 'react'
import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge';
import { FaArrowLeft } from "react-icons/fa";
   

const LinkButton = ({showButton, link, classname}) => {
    const newClassName = twMerge(
        "bg-darkText/80 hover:bg-darkText text-whiteText py-2.5 px-6 rounded-full flex items-center gap-2 duration-200",
        classname
      );
  return (
    <Link to={link ? link:'/products'} className={newClassName}>
        {showButton && <FaArrowLeft/>} Start Shopping
    </Link>
  )
}

export default LinkButton;
