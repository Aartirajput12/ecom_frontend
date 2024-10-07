import React from 'react'
import Container from './Container'
import { homeBanner } from '../assets/products'
import { Banner } from '../assets/products'
import LinkButton from './LinkButton'

const HomeBanner = () => {
  return (
    <Container className='realtive py-5 overflow-hidden'>
        <div className='relative'>
            <img src={homeBanner} alt="homebanner" className='w-full h-full object-cover rounded-md'/>
        
        <div className='absolute top-0 left-0 bg-black/10'/>
        <div className='absolute inset-0 flex flex-col justify-center px-10 z-30'>
        <h2 className='text-xl md:text-4xl lg:text-7xl text-white font-bold'>Mi Air Purifier</h2>
          <p className='text-base md:text-xl font-semibold leading-6 text-whiteText/90 max-w-[250px] mt-4'>The new tech gift you are wishing for right here.</p>
          <LinkButton classname="w-44 flex items-center justify-center bg-whiteText text-darkText hover:bg-darkText hover:text-whiteText duration-200 mt-4"/>
        </div>
        </div>
    </Container>
  )
}

export default HomeBanner;