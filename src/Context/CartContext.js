import axios from "axios";
import { createContext, useState } from "react";


export let CartContext = createContext();

export default function CartContextProvider(props) {

    let userToken = localStorage.getItem('userToken');
    let headers = {
        token: userToken
    }

    let [cartNum, setCartNum] = useState(null);

    function addToCart(id) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
            productId: id
        }, {
            headers
        }).then((res) => res).catch((err) => err)
    }


    function getCartItems() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers
        }).then((res) => res).catch((err) => err)
    }

    function deleteCartItem(id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            headers
        }).then((res) => res).catch((err) => err)
    }

    function deleteCart() {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/`, {
            headers
        }).then((res) => res).catch((err) => err)
    }


    function updateCartItem(id, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            count
        }, {
            headers
        }).then((res) => res).catch((err) => err)
    }






    return <CartContext.Provider value={{ addToCart, getCartItems, deleteCartItem, deleteCart, updateCartItem, cartNum, setCartNum }}>
        {props.children}
    </CartContext.Provider>
}