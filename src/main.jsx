import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'; 
import App from './App.jsx'
import './index.css'
import ReactDOM from 'react-dom/client';
import {Outlet, ScrollRestoration} from 'react-router-dom';
import Layout from './ui/Layout.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Product from './pages/Product.jsx';
import Category from './pages/Category.jsx';
import Cart from './pages/Cart.jsx';
import Favorite from './pages/Favorite.jsx';
import Orders from './pages/Orders.jsx';
import Success from './pages/Success.jsx';
import Cancel from './pages/Cancel.jsx';
import NotFound from './pages/NotFound.jsx';

const RouterLayout = () => {
  return(
    <Layout>
      <ScrollRestoration/>
      <Outlet/>
    </Layout>
  );
};


const router = createBrowserRouter([
  {
    path: "/",
    element: <RouterLayout/>,
    children: [
      {
        path: "/",
        element: <App/>,      
      },
      {
        path: "/product",
        element: <Product/>,      
      },
      {
        path: "/product/:id",
        element: <Product/>,      
      },
      {
        path: "/category",
        element: <Category/>,      
      },
      {
        path: "category/:id",
        element: <Category/>,      
      },
      {
        path: "/cart",
        element: <Cart/>,      
      },
      {
        path: "favorite",
        element: <Favorite/>,      
      },
      {
        path: "/orders",
        element: <Orders/>,      
      },
      {
        path: "/success",
        element: <Success/>,      
      },
      {
        path: "cancel",
        element: <Cancel/>,      
      },
      {
        path: "*",
        element: <NotFound/>,      
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,
  <RouterProvider router={router}/>
)
