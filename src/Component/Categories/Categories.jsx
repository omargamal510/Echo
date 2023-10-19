import React, { useContext, useState } from 'react'
import Style from './Categories.module.css'
import axios from 'axios'
import { useQuery } from 'react-query';
import { BallTriangle, ThreeDots } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import Slider from 'react-slick';


export default function Categories() {


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



    function getCategories() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
    }



    let { data, isFetching, isLoading } = useQuery('categories', getCategories);

    return <>

        <div className='container-fluid categories p-5'>

            <h2 className='text-center mt-3 mb-3 pb-3 '>Our Categories <span className={`${Style.headerspan}`}>CATEGORIES</span></h2>

            <Slider {...settings}>

                {data?.data.data.map((category, index) => (
                    <div className={`d-flex justify-content-center cursor-pointer align-items-center flex-column categorybox ${Style.categorybox}`} key={category._id}>
                        <img className={`rounded-circle categoryimg ${Style.categoryimg}`} src={category.image} width={200} height={200} />
                        <h5 className={`bg-black text-white cursor-pointer ${Style.categoryname}`}>
                            <span>{category.name}</span>
                            <div className={`${Style.categoryshop} categoryshop`}>

                            </div>
                        </h5>
                    </div>
                ))}

            </Slider >

        </div >


        <div className='exploding deals container-fluid'>

        </div>


    </>

}
