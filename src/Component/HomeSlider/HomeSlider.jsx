import React, { useContext, useState } from 'react'
import Style from './HomeSlider.module.css'
import axios from 'axios'
import { useQuery } from 'react-query';
import { BallTriangle, ThreeDots } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import Slider from 'react-slick';

export default function HomeSlider() {

    var settings = {
        autoplay: true,
        autoplaySpeed: 3000,
        infinite: true,
        speed: 1500,
        slidesToShow: 7,
        slidesToScroll: 1,
        easing: 'linear'
    };

    function updateSlidesToShow() {
        if (window.innerWidth <= 1500 && window.innerWidth >= 1300) {
            settings.slidesToShow = 6;
        } else if (window.innerWidth <= 1300 && window.innerWidth >= 1100) {
            settings.slidesToShow = 5;
        }

        else if (window.innerWidth <= 1300 && window.innerWidth >= 1100) {
            settings.slidesToShow = 5;
        }

        else if (window.innerWidth <= 1100 && window.innerWidth >= 900) {
            settings.slidesToShow = 4;
        }


        else if (window.innerWidth <= 900 && window.innerWidth >= 700) {
            settings.slidesToShow = 3;
        }

        else if (window.innerWidth <= 700 && window.innerWidth >= 501) {
            settings.slidesToShow = 2;
        }


        else if (window.innerWidth <= 501) {
            settings.slidesToShow = 1;
        }
    }

    updateSlidesToShow();


    window.addEventListener("resize", updateSlidesToShow);



    let { addToCart } = useContext(CartContext);

    async function addCart(id) {
        let { data } = await addToCart(id);
        console.log(data);
        if (data.status == 'success') {
            toast.success(data.message);

        }
    }

    // function getFeaturedProducts() {
    //     return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    // }




    // let { data, isFetching, isLoading } = useQuery('featuredProducts', getFeaturedProducts);


    function getCategories() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
    }



    let { data, isFetching, isLoading } = useQuery('categories', getCategories);

    return <>

        <div className={`home-slider bg-danger ${Style.homeslider}`}>
            <div>
                <section className='box-container text-white d-flex justify-content-center align-items-start flex-column ps-4'>
                    <h1 className={` ${Style.h1}`}>Exceed your <br /> expectations</h1>
                    <p className={` ${Style.mainp} mainp main-line-height `}>Involve in our biggest place to buy clothes anything <br />   u never knew u want and the things u want , you will surley find them here</p>
                    <Link className='slider-shopn-now btn btn-success' to={'/products'}>Shop Now</Link>
                </section>
            </div>
        </div>


    </>

}



{/* <div className='row gy-4'>

                {!isLoading ? (
                    data?.data.data.map((product) => (
                        <div key={product.id} className={`feat-product cursor-pointer col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 d-flex justify-content-center align-items-center`}>
                            <Link to={`/productdetails/${product.id}`} className='text-decoration-none text-black'>
                                <div className={`${Style.featproduct} position-relative`}>
                                    <section className={`${Style.section}`}>
                                        <img src={product.imageCover} className='w-100 h-100' alt='' />
                                    </section>
                                    <p>{product.brand.name}</p>
                                    <p>{product.title.split(' ').slice(0, 2).join(' ')}</p>
                                    <p>${product.price}</p>
                                    <p>Sold : {product.sold}</p>


                                    <button onClick={() => addCart(product.id)} className='border border-0 p-1 w-100 bg-success'><i class="fa-solid fa-cart-shopping"></i> Add to cart+</button>
                                </div>
                            </Link>

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
            </div > */}