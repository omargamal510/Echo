import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserToken } from '../../Context/UserTK'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext';

export default function Navbar() {

    let navigate = useNavigate();
    let { setuserToken, userToken } = useContext(UserToken);

    function logOut() {
        localStorage.removeItem('userToken');
        setuserToken(null);
        navigate('/login');
    }

    let { cartNum, setCartNum } = useContext(CartContext);


    let { getCartItems } = useContext(CartContext);

    async function getCart() {

        let { data } = await getCartItems();
        setCartNum(data?.numOfCartItems);
    }


    useEffect(() => {
        getCart();
    }, []);

    return <>
        <nav className="navbar navbar-expand-lg bg-black position-fixed top-0 end-0 start-0 nav-zindex">
            <div className="container-fluid">
                <Link className="navbar-brand nav-box-shadow text-white font-weight-bold bg-success p-2 rounded" to={'/'}><i class="fa-solid fa-barcode"></i> ECHO</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">


                    {userToken ? <ul className="text-white navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link  text-white active" aria-current="page" to={'/'}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to={'brands'}>Brands</Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link className="nav-link text-white" to={'categories'}>Categories</Link>
                        </li> */}

                        <li className="nav-item">
                            <Link className="nav-link text-white" to={'products'}>Products</Link>
                        </li>
                    </ul> : ""}


                    <ul className="navbar-nav ms-auto">

                        {userToken ?
                            <>

                                <li className="nav-item">
                                    <Link className="nav-link text-white" to={'cart'}> <i className="fa-solid fa-cart-shopping"></i>  {cartNum}</Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link text-white" to={'wishlist'}> <i className="fa-solid fa-heart"></i> </Link>
                                </li>

                                <li className="nav-item">
                                    <a onClick={() => logOut()} className="text-white cursor-pointer nav-link">Logout</a>
                                </li>

                            </>
                            : <><li className="nav-item">
                                <Link className="text-white nav-link" to={'login'}>Login</Link>
                            </li>

                                <li className="nav-item">
                                    <Link className="text-white nav-link" to={'register'}>Register</Link>
                                </li></>}



                    </ul >


                </div>
            </div>
        </nav>

    </>

}
