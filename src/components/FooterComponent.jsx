import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { GrMapLocation } from "react-icons/gr";
import { AiOutlineFacebook } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaRegCopyright } from "react-icons/fa";
import logo from "../assets/logo (2).png";  
import { LiaShippingFastSolid } from "react-icons/lia";
import { BiBadgeCheck } from "react-icons/bi";
import { RiSecurePaymentLine } from "react-icons/ri";
import { MdOutlineSentimentVerySatisfied } from "react-icons/md";

const FooterComponent = () => {
  return (
    <div className='bg-primary text-white  text-sm'>
        <div className='bg-secondary w-full flex justify-around p-2 text-base gap-2'>
            <div className='flex flex-col md:flex-row justify-around w-full gap-2'>
                <div className='flex items-center gap-2'>
                    <LiaShippingFastSolid className='text-3xl'/> Fast & Secured Delivery
                </div>
                <div className='flex items-center gap-2'>
                    <BiBadgeCheck className='text-3xl' /> Genuine & Authentic
                </div>
            </div>
            <div className='flex flex-col md:flex-row justify-around w-full gap-2'>
                <div className='flex items-center gap-2'>
                    <RiSecurePaymentLine className='text-3xl' /> 100% Safe & Secure Payment
                </div>
                <div className='flex items-center gap-2'>
                    <MdOutlineSentimentVerySatisfied className='text-3xl' /> Satisfied
                </div>
            </div>
        </div>
        <div className=' flex flex-col lg:flex-row p-4 justify-between gap-6'>
            {/* About Section */}
            <div className='lg:w-1/4 text-left'>
                <h3 className='border-b-2 pb-2 font-bold'>ABOUT US</h3>
                <img src={logo} alt="Ung Agro" className='mt-2 m-auto bg-white h-14 w-14 rounded-full'/>
                <p>We specialize in high-quality Agricultural Manual Tools and Machineries, Pheromone Traps, Home Garden products, and a variety of plants to support farmers, gardeners, and agriculture enthusiasts.</p>
            </div>

            {/* Quick Links Section */}
            <div className='lg:w-1/4 text-left'>
                <h3 className='border-b-2 pb-2 font-bold'>QUICK LiNK</h3>
                <ul className='mt-2 space-y-2h'>
                    {["About US", "Contact Us", "Privacy Policy", "Terms & Condition"].map((item, index) => (
                        <li key={index} className='flex justify-start items-center gap-2' ><IoIosArrowForward /><NavLink to='/' className="hover:underline" >{item}</NavLink></li>
                    ))}
                </ul>
            </div>

            {/* Our Category Section */}
            <div className='lg:w-1/4 text-left'>
                <h3 className='border-b-2 pb-2 font-bold'>OUR CATEGORY</h3>
                <ul className='mt-2'>
                    {["Agricultural Manual Tools", "Agricultural Machineries", "Pheromone Traps", "Kitchen Garden"].map((item, index) => (
                        <li key={index} className='flex justify-start items-center gap-2' ><IoIosArrowForward /><NavLink to='/' className="hover:underline" >{item}</NavLink></li>
                    ))}
                </ul>
            </div>

            {/* Contact Section */}
            <div className='lg:w-1/4 text-left'>
                <h3 className='border-b-2 pb-2 font-bold'>GET IN TOUCH</h3>
                <div className='space-y-2 mt-2'>
                    <div className='flex justify-start items-center gap-2'>
                        <MdOutlineEmail className='text-2xl' />
                        <p>info@ungagros.com</p>
                    </div>
                    <div className='flex justify-start items-center gap-2'>
                        <FiPhone className='text-2xl' />
                        <p>+91 98765432XX</p>
                    </div>
                    <div className='flex justify-start items-center gap-2'>
                        <GrMapLocation className='text-2xl' />
                        <p className='px-2'>Ung Agro, <br />#32, 1st Main, 2nd Cross, <br /> Muneshwara Layout, <br />Laggere Bengaluru -560058,<br /> Karnataka, India</p>
                    </div>
                </div>

                {/* Social Media Section */}
                <div className='pt-4'>
                    <h3 className='border-b-2 pb-2 font-bold'>FOLLOW US</h3>
                    <div className='flex justify-start gap-4 text-2xl pt-2'>
                        <AiOutlineFacebook className='cursor-pointer text-2xl mr-2' />
                        <FaInstagram className='cursor-pointer text-2xl mr-2' />
                        <AiOutlineYoutube className='cursor-pointer text-2xl mr-2' />
                    </div>
                </div>
            </div>
        </div>

        {/* Copyright Section */}
        <div className='text-center p-2 bg-secondary text-white mt-6'>
            <FaRegCopyright className='inline mr-2' /> 
            <p className='inline'>ung agros 2025, All rights reserved. Developed by <a href="https://www.prajnansoftwares.com/aboutus" target='_blank'>Prajnan Softwares</a></p>
        </div>
    </div>
  )
}

export default FooterComponent