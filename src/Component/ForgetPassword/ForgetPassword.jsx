import React from 'react'
import Style from './ForgetPassword.module.css'
import axios from 'axios'
import { useFormik } from 'formik';
import { Navigate } from 'react-router-dom';
export default function ForgetPassword() {

    async function forgetPass(values) {

        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values).catch((err) => {
            // setsignUpError(err.response.data.message);
            // console.log(err.response.data.message);
            // setLoading(false);
        })

        // if (data.message == 'success') {
        //     navigate('/');
        //     localStorage.setItem('userToken', data.token)
        //     setuserToken(data.token);
        // }

    }


    let formik = useFormik({
        initialValues: {
            email: 'ogamal249@gmail.com',
        }, onSubmit: forgetPass
    })

    return <>
        <div>ForgetPassword</div>
    </>

}
