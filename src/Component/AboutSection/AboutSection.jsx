import React from 'react'
import Style from './AboutSection.module.css'
export default function AboutSection() {
    return <>


        <div className='about mt-5'>
            <div className='container-fluid bg-black text-white'>
                <div className='row'>
                    <h2 className={`text-center pt-5 pb-5 position-relative`}>ABOUT <span className={`${Style.headerspan}`}>ABOUT</span></h2>
                    <div className='col-12 col-md-6'>
                        <div><img src='/about.jpg' className='w-100 h-100' /></div>
                    </div>

                    <div className='col-12 col-md-6 pt-3 pt-md-0'>
                        <div>
                            <h2> <i class="fa-solid fa-barcode"></i> ECHO</h2>
                            <p>Welcome to Echo, your one-stop destination for fashion enthusiasts and shopaholics. At Echo, we believe that clothing is not just about covering your body; it's a form of self-expression. It's about showcasing your unique style and personality. We're here to help you do just that</p>
                            <p>At Echo, we are passionate about fashion. We understand that fashion is more than just trends; it's about confidence and comfort. We curate a diverse and extensive collection of clothing to cater to your every need, from timeless classics to the latest trends. Whether you're looking for everyday essentials, elegant evening wear, or casual street style, we've got you covered.
                            </p>

                            <p>
                                Quality is our top priority. We handpick our collection to ensure that every garment meets the highest standards. Our clothing is not only stylish but also comfortable, durable, and affordable. With Echo, you can enjoy a wide range of options, from designer labels to budget-friendly choices, because we believe that fashion should be accessible to everyone.


                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </>

}
