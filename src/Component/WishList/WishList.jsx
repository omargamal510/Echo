import React, { useContext, useEffect, useState } from 'react'
import Style from './WishList.module.css'
import { WishListContext } from '../../Context/WishListContext'
import toast from 'react-hot-toast';
import { ThreeDots } from 'react-loader-spinner';
export default function WishList() {

    let { getWishList, deleteOneWish } = useContext(WishListContext);

    let [wishItems, setWishItems] = useState(null);
    let [isLoading, setIsLoading] = useState(true);

    async function getWish() {
        setIsLoading(false);
        let { data } = await getWishList();
        setWishItems(data);
        console.log(data);
    }


    useEffect(() => {
        getWish();
    }, []);

    async function deleteWish(id) {
        setIsLoading(false);
        let { data } = await deleteOneWish(id);
        setWishItems(data);
        console.log(data);
        getWish();
        // if (data.status == 'success') {
        //     toast(data.message, {
        //         icon: '🗑️'
        //     });
        // }
    }

    // async function deleteOneCart(id) {
    //     let { data } = await deleteCartItem(id);
    //     setCartItems(data);
    //     setCartNum(data?.numOfCartItems);
    //     if (data.message == 'success') {
    //         toast('Hello there');
    //     }

    // }


    return <>

        <div className='container-fluid'>
            <div className='row'>
                <h2 className='text-center'>WishList</h2>
                {isLoading ? <div className='load bg-white h-100 position-fixed top-0 end-0 start-0 d-flex justify-content-center align-items-center'>
                    <ThreeDots
                        height={100}
                        width={100}
                        radius={5}
                        color="#4fa94d"
                        ariaLabel="ball-triangle-loading"
                        wrapperClass={{}}
                        wrapperStyle=""
                        visible={true}
                    />
                </div> :


                    wishItems?.data.map((wish, index) => (


                        <div key={index} className='col-12'>
                            <div className='mt-3'>
                                <p>{wish.title}</p>
                                <img src={wish.imageCover} width={100} height={100} /> <br />
                                <button onClick={() => deleteWish(wish.id)} className='btn btn-danger'>Delete</button>
                            </div>
                        </div>
                    ))}

            </div>
        </div>

    </>

}
