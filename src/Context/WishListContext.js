import axios from "axios"; import { createContext } from "react";
export let WishListContext = createContext();

export default function WishListContextProvider(props) {
    let userToken = localStorage.getItem('userToken');
    let headers = {
        token: userToken
    }

    function addToWish(id) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
            {
                productId: id,
            },
            {
                headers
            }).then((res) => res).catch((err) => err);
    }

    function getWishList() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            headers
        }).then((res) => res).catch((err) => err);
    }


    function deleteOneWish(id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
            headers
        }).then((res) => res).catch((err) => err);
    }

    return <WishListContext.Provider value={{ addToWish, getWishList, deleteOneWish }}> {props.children} </WishListContext.Provider>
}