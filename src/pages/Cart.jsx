import React from 'react'
import Container from '../ui/Container';
import { store } from '../lib/store';
import CartProduct from '../ui/CartProduct';

const Cart = () => {
  const { cartProduct } = store();
  return (
    <Container>
      {cartProduct.length > 0 ? (
        <>
        <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>Shopping Cart</h1>
        <div className='mt-10 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16'>
          <section className='lg:col-span-7'>
            <div className='divide-y divide-gray-200 border-b border-t border-gray-200'>
              {cartProduct.map((product) => (
                <CartProduct product={product} key={product?._id} />
              ))}
            </div>
          </section>

          <section className='mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 '>
            <h2 className='text-lg font-medium text-gray-900'>Order summary</h2>
          </section>
        </div>
        </>
      ) : (
        <div>
           <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>Shopping Cart</h1>

          <p>Your cart is empty. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque non amet ducimus molestias quos nostrum temporibus, magni vero nemo nulla tenetur cupiditate facilis error velit eius, voluptatum laborum dicta odio?</p>
          <Link to={"/product"}>go to shopping</Link>
        </div>
      )}
    </Container>
  )
}

export default Cart;