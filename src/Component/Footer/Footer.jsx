import React from 'react'
import Style from './Footer.module.css'
import { Link } from 'react-router-dom'
export default function Footer() {




    return <>

        <footer className={`d-none ${Style.footer}`}>
            <div className={`text-white ${Style.footercontainer}`}>
                <div className='container-fluid'>
                    <div className='row text-center'>
                        <p className='pt-2'>All rights reserved @ 2023</p>
                    </div>
                </div>
            </div>
        </footer >

    </>


}
