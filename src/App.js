import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Component/Layout/Layout.jsx'
import Home from './Component/Home/Home.jsx'
import Cart from './Component/Cart/Cart.jsx'
import Brands from './Component/Brands/Brands.jsx'
import Products from './Component/Products/Products.jsx'
import Categories from './Component/Categories/Categories.jsx'
import Login from './Component/Login/Login.jsx'
import ProductDetails from './Component/ProductDetails/ProductDetails.jsx'
import Register from './Component/Register/Register.jsx'
import Footer from './Component/Footer/Footer.jsx'
import NotFound from './Component/NotFound/NotFound.jsx'
import UserTokenProvider from './Context/UserTK.js'
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute.jsx'
import CartContextProvider from './Context/CartContext.js'
import toast, { Toaster } from 'react-hot-toast';
import WishList from './Component/WishList/WishList.jsx'
import WishListContextProvider from './Context/WishListContext.js'
import ForgetPassword from './Component/ForgetPassword/ForgetPassword.jsx'
import BrandDetails from './Component/BrandDetails/BrandDetails.jsx'



export default function App() {

  let siteRouter = createBrowserRouter([
    {

      path: '/', element: <Layout />, children: [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: 'wishlist', element: <ProtectedRoute><WishList /></ProtectedRoute> },
        { path: 'productdetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: 'branddetails/:id', element: <ProtectedRoute><BrandDetails /></ProtectedRoute> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'forgetpassword', element: <ForgetPassword /> },
        { path: 'footer', element: <Footer /> },
        { path: '*', element: <NotFound /> },
      ]
    }
  ])

  return <>
    <CartContextProvider>
      <WishListContextProvider>
        <UserTokenProvider>
          <RouterProvider router={siteRouter}></RouterProvider>
          <Toaster />
        </UserTokenProvider>
      </WishListContextProvider>
    </CartContextProvider>
  </>

}
