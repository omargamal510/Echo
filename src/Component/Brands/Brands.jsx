import axios from 'axios'
import React, { useState } from 'react'
import { ThreeDots } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import Style from './Brands.module.css'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Brands() {

    let [brandIndex, setBrandIndex] = useState(null);
    let [brandData, setBrandData] = useState(null);

    function getBrands() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
    }

    let { data, isFetching, isLoading } = useQuery('brands', getBrands);
    console.log(data);




    return <>
        <div className='container'>
            <div className='row gy-3'>

                <h2 className='mt-3 mb-3 text-center' >Brands</h2>


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
                </div>
                    : data?.data.data.map((brand, index) => (
                        <div key={index} className={`${Style.brandparent} col-12 col-md-3 col-sm-6 d-flex justify-content-center`}>
                            <div className={`${Style.brandbox} d-flex flex-column justify-content-center align-items-center`}>
                                <img src={brand.image} className='w-50' />
                                <p>{brand.name}</p>
                            </div>
                        </div>
                    ))}

            </div>
        </div>
    </ >

}
