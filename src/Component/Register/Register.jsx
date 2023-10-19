import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { UserToken } from '../../Context/UserTK'

export default function Register() {

    let navigate = useNavigate();
    let [signUpError, setsignUpError] = useState(null);
    let [loading, setLoading] = useState(false)




    async function registerSubmit(values) {
        setLoading(true);

        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values).catch((err) => {
            setsignUpError(err.response.data.message);
            console.log(err.response.data.message);
            setLoading(false);
        })

        if (data.message == 'success') {
            navigate('/login');
            localStorage.setItem('userToken', data.token);
        }

    }

    let validationSchema = Yup.object({
        name: Yup.string().min(3, 'Name must be less than 3 letters').max(15, "Name is too long it cannot exceed 15 letters").required('Name is required'),
        email: Yup.string().email("Invalid Email").required("Email is required"),
        password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'Password must start with uppercase and lowercase or number from 6:11 ').required('Password is required'),
        rePassword: Yup.string().oneOf([Yup.ref('password')], 'Password and rePassword doesnot match').required('rePassword is required'),
        phone: Yup.string().matches(/^01[0125][0-9]{8}$/, 'We need Egyptian number').required('Phone is required')
    })

    let formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: ''
        }, validationSchema, onSubmit: registerSubmit
    })

    return <>
        <div className='register-container mt-3 me-3 ms-3'>

            {signUpError ? <div className='alert alert-danger'>{signUpError}</div> : '  '}

            <h2>Register</h2>

            <form className='mt-4' onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='name' />
                </div>

                {formik.errors.name && formik.touched.name ? <div className='alert alert-danger'>{formik.errors.name}</div> : ''}

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' />
                </div>

                {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : ''}

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='password' />

                </div>

                {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : ''}

                <div className="mb-3">
                    <label htmlFor="rePassword" className="form-label">RePassword</label>
                    <input value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='rePassword' />
                </div>

                {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger'>{formik.errors.rePassword}</div> : ''}

                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='phone' />
                </div>
                {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger'>{formik.errors.phone}</div> : ''}


                {!loading ? <button disabled={!(formik.dirty && formik.isValid)} type="submit" className="btn btn-primary">Submit</button> : <><i className='fas fa-spinner fa-spin'></i></>}

            </form>
        </div>
    </>

}
