import React from 'react'
import Style from './BrandDetails.module.css'
import axios from 'axios'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
export default function BrandDetails() {

    let { id } = useParams()

    function getBrand() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
    }

    let { data, isFetching, isLoading } = useQuery('brand', getBrand);

    return <>
        <h2>{data?.data.data.name}</h2>
    </>

}
