import React, { useContext } from 'react'
import Style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
export default function ProductDetails() {

    let { id } = useParams();
    function getProduct() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }

    let { data, isFetching, isLoading } = useQuery('product', getProduct);
    console.log(data);


    let { addToCart, cartNum, setCartNum } = useContext(CartContext);

    async function addCart(id) {
        let { data } = await addToCart(id);
        if (data.status == 'success') {
            toast.success(data.message);
        }
        setCartNum(data?.numOfCartItems)
    }


    return <>
        <div>ProductDetails</div>

        {!isLoading ? (
            <div>
                <h2>{data?.data.data.title}</h2>
                <button onClick={() => addCart(data?.data.data.id)} className='btn btn-success'> Add to cart</button>
            </div>
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
            </div >
        )
        }

    </>

}
