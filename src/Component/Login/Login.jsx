import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { UserToken } from '../../Context/UserTK'

export default function Login() {

    let navigate = useNavigate();
    let [signUpError, setsignUpError] = useState(null);
    let [loading, setLoading] = useState(false);
    let { setuserToken } = useContext(UserToken);

    async function signIn(values) {
        setLoading(true);

        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values).catch((err) => {
            setsignUpError(err.response.data.message);
            console.log(err.response.data.message);
            setLoading(false);
        })

        if (data.message == 'success') {
            navigate('/');
            localStorage.setItem('userToken', data.token)
            setuserToken(data.token);
        }

    }

    let validationSchema = Yup.object({

        email: Yup.string().email("Invalid Email").required("Email is required"),
        password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'Password must start with uppercase and lowercase or number from 6:11 ').required('Password is required'),
    })

    let formik = useFormik({
        initialValues: {
            email: '',
            password: ''

        }, validationSchema, onSubmit: signIn
    })

    return <>
        <div className='register-container mt-3 me-3 ms-3'>

            {signUpError ? <div className='alert alert-danger'>{signUpError}</div> : '  '}

            <h2>Login</h2>

            <form className='mt-4' onSubmit={formik.handleSubmit}>


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

                {/* <div className='mb-3'>
                    <Link to={'/forgetpassword'}>Forgot password ?</Link>
                </div> */}

                {!loading ? <button disabled={!(formik.dirty && formik.isValid)} type="submit" className="btn btn-primary">Submit</button> : <><i className='fas fa-spinner fa-spin'></i></>}

            </form>
        </div>
    </>

}
