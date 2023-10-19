import React, { useState } from 'react'
import Style from './SemiBranding.module.css'
import axios from 'axios'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
export default function SemiBranding() {

    function getBrands() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
    }
    let { data, isFetching, isLoading } = useQuery('brands', getBrands);



    var settings = {
        autoplay: true,
        autoplaySpeed: 3000,
        infinite: true,
        speed: 1500,
        slidesToShow: 7,
        slidesToScroll: 1,
        easing: 'linear'
    };


    return <>
        <h2 className='text-center mt-5 mb-5 pb-3 '>Our Brands <span className={`${Style.headerspan}`}>Brands</span></h2>

        <div className='container-fluid'>
            <div className='row'>

                <Slider {...settings}>

                    {data?.data.data.slice(0, 10).map((brand, index) => (
                        <div className={`d-flex justify-content-center cursor-pointer align-items-center flex-column categorybox ${Style.categorybox}`} key={brand._id}>
                            <img src={brand.image} className='w-50' />
                        </div>
                    ))}

                </Slider >

            </div>
            <div className='d-flex justify-content-center align-items-center mt-5 mb-5'>
                <Link className='text-center btn btn-success' to={'/brands'}>See all brands</Link>
            </div>
        </div>




    </>

}
