import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext'
import Style from './Cart.module.css'
import toast from 'react-hot-toast';
import { ThreeDots } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

export default function Cart() {

    let { getCartItems, deleteCartItem, deleteCart, updateCartItem } = useContext(CartContext);
    let [cartItems, setCartItems] = useState(null);
    let [isLoading, setIsLoading] = useState(true);
    let { cartNum, setCartNum } = useContext(CartContext)



    async function getCart() {

        let { data } = await getCartItems();
        setCartItems(data);
        setIsLoading(false);
        console.log(data)
        setCartNum(data?.numOfCartItems);
    }


    async function deleteOneCart(id) {
        let { data } = await deleteCartItem(id);
        setCartItems(data);
        setCartNum(data?.numOfCartItems);
        if (data.message == 'success') {
            toast('Hello there');
        }

    }

    async function deleteAllCart() {
        let { data } = await deleteCart();
        setCartItems(data);
        setCartNum(data?.numOfCartItems);
        if (data.message == 'success') {
            toast('Cart Cleared', {
                icon: '🗑️'
            });
        }


    }



    async function updateCart(id, count) {
        let { data } = await updateCartItem(id, count);
        console.log(data);
        setCartItems(data);
    }


    useEffect(() => {
        getCart();
    }, [cartNum]);

    return <>


        {isLoading ?
            <div className='load bg-white h-100 position-fixed top-0 end-0 start-0 d-flex justify-content-center align-items-center'>
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

            <>


                {cartItems?.numOfCartItems > 0 ? <div className={`${Style.cartdata} fw-bold`}>
                    <h2>Your Cart</h2>
                    <p>Total items : <span>{cartNum}</span></p>
                    <p>Total Price : <span>${cartItems?.data.totalCartPrice}</span></p>
                    {cartItems?.numOfCartItems > 0 ? <button onClick={() => deleteAllCart()} className='btn btn-danger'>Clear all cart</button> : ""}
                </div> : ""}


                <div className='container-fluid'>
                    <div className='row  mt-2'>

                        {cartItems?.numOfCartItems > 0 ? cartItems?.data.products.map((cart, index) => (
                            <div key={index} className='col-md-12'>
                                <div className={`${Style.cartitem} p-2 d-flex justify-content-between align-items-center`}>
                                    {/* <p>Count : {cart.count}</p>
                                    <p>{cart.product._id}</p>
                                    <h3>{cart.product.title}</h3> */}

                                    <div className='d-flex'>
                                        <img src={cart.product.imageCover} width={80} height={80} />
                                        <div className='mt-3 ms-3'>
                                            <h4 className=''>{cart.product.title.split(' ').slice(0, 2).join(' ')}</h4>
                                            <p>${cart.price * cart.count}</p>
                                        </div>
                                    </div>



                                    <div>
                                        <button onClick={() => deleteOneCart(cart.product._id)} className='cartupdate bg-danger text-white border border-0 text-center'> <i className='fa fa-trash'></i> </button>
                                        <button onClick={() => updateCart(cart.product._id, cart.count + 1)} className='cartupdate me-2 ms-2 text-center'><i class="fa-solid fa-plus"></i></button>
                                        <span className='pe-2'> {cart.count} </span>
                                        <button disabled={cart.count <= 1} onClick={() => updateCart(cart.product._id, cart.count - 1)} className='cartupdate text-center'><i class="fa-solid fa-minus"></i></button>
                                    </div>
                                </div>
                            </div>
                        ))
                            : <>
                                <div className='empty cart text-center'>
                                    <img src='/emptycart.png' />
                                    <p>Looks like you have not added anything to your cart. <br /> Go ahead & explore top categories</p>
                                    <Link className='btn btn-success' to={'/products'}>Shop Here</Link>
                                </div>

                            </>}

                    </div>
                </div >


            </>

        }
    </>

}
