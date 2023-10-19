import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useQuery } from 'react-query';
import Style from './Products.module.css'
import { ThreeDots } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishListContext } from '../../Context/WishListContext';

export default function Products() {

    function getFeaturedProducts() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    }


    let { addToCart } = useContext(CartContext);

    let { addToWish } = useContext(WishListContext);

    async function addWish(id) {
        let { data } = await addToWish(id);
        if (data.status == 'success') {
            toast.success(data.message);
        }
        console.log(data);
    }

    let { cartNum, setCartNum } = useContext(CartContext)

    async function addCart(id) {
        let { data } = await addToCart(id);
        if (data.status == 'success') {
            toast.success(data.message);
        }
        setCartNum(data?.numOfCartItems);
    }



    let [isWished, setIsWished] = useState(false);


    let [productNums, setProductNums] = useState(10);

    function showMore() {
        setProductNums(productNums + 10);
    }

    function showLess() {
        setProductNums(16);
    }

    let { data, isFetching, isLoading } = useQuery('featuredProducts', getFeaturedProducts);


    // function toggleHeartColor(event) {
    //     event.target.style.color = event.target.style.color === 'red' ? 'inherit' : 'red';
    // }

    let [dataAllNum, setDataAllNum] = useState(null);

    // function setDataLength() {
    //     if (data.status == 'success')
    //         setDataAllNum(data.data.metadata.limit);
    //     console.log(productNums);
    // }

    // setDataLength();


    return <>
        <h2 className='mt-5 pt-5 text-center'>Our Products <span className={`${Style.headerspan}`}>PRODUCTS</span></h2>
        <div className='container-fluid mt-5 pt-5 d-flex flex-column align-items-center'>
            <div className='row gy-4'>

                {!isLoading ? (
                    data?.data.data.map((product) => (
                        <div key={product.id} className={`feat-product cursor-pointer col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 d-flex justify-content-center align-items-center ${Style.productparent}`}>
                            <div className={`${Style.featproduct} position-relative d-flex justify-content-center align-items-center flex-column `}>
                                <Link to={`/productdetails/${product.id}`} className='text-decoration-none text-black'>
                                    <section className={`${Style.section}`}>
                                        <img src={product.imageCover} className='w-100 h-100' alt='' />
                                    </section>
                                    <p className='ms-2 me-2'>{product.title.split(' ').slice(0, 2).join(' ')}</p>
                                    <p className='ms-2 me-2 text-success fw-normal'>${product.price}</p>
                                    <p className={`${Style.productname} mt-1 ms-2 text-white productname`}>{product.brand.name}</p>
                                </Link>
                                <div className='w-100 d-flex justify-content-around addto'>
                                    <button onClick={() => addCart(product.id)} className={`${Style.addtocart} text-decoration-none mt-2 mb-2`}> <i className="fa-solid fa-cart-shopping"></i> Add to cart</button>
                                    <i
                                        className={`${Style.addtowish} me-2 mt-2 fa-solid fa-heart`}
                                        onClick={() => addWish(product.id)}
                                    ></i>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
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
                    </div>
                )}

            </div >
            {/* <button className='btn btn-success mt-5 mb-5' onClick={() => showMore()}>Show More {isLoading ? <i class="fa-solid fa-spinner fa-spin"></i> : ""}</button> */}
            {/* {data?.data.data.length >= productNums ? <button className='btn btn-success mt-5 mb-5' onClick={() => showMore()}>Show More</button>
                : <button className='btn btn-success mt-5 mb-5' onClick={() => showLess()}>Show Less</button>} */}
        </div >
    </>

}
