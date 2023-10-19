import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { UserToken } from '../../Context/UserTK'
import { useEffect } from 'react'

export default function Layout() {

    let { setuserToken } = useContext(UserToken);
    if (localStorage.getItem('userToken')) {
        setuserToken(localStorage.getItem('userToken'));
    }

    useEffect(() => {
        if (localStorage.getItem('userToken')) {
            setuserToken(localStorage.getItem('userToken'));
        }
    }, []);

    return <>
        <Navbar />
        <Outlet></Outlet>
        <Footer />
    </>

}
