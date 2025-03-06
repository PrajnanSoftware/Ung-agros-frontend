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

const FooterComponent = () => {
  return (
    <div className='bg-light p-4'>
        <div>
            
        </div>
        <div className=' flex flex-col lg:flex-row justify-between gap-6'>
            {/* About Section */}
            <div className='lg:w-1/4 text-center lg:text-left'>
                <h3 className='border-b-2 pb-2 font-bold'>ABOUT US</h3>
                <img src={logo} alt="Unq Agro" className='m-auto  bg-white h-14 w-14 rounded-full'/>
                <p>We specialize in high-quality Agricultural Manual Tools and Machineries, Pheromone Traps, Home Garden products, and a variety of plants to support farmers, gardeners, and agriculture enthusiasts.</p>
            </div>

            {/* Quick Links Section */}
            <div className='lg:w-1/4 text-center lg:text-left'>
                <h3 className='border-b-2 pb-2 font-bold'>QUICK LiNK</h3>
                <ul className='space-y-2h'>
                    {["About US", "Contact Us", "Privacy Policy", "Terms & Condition"].map((item, index) => (
                        <li key={index} className='flex justify-center lg:justify-start items-center gap-2' ><IoIosArrowForward /><NavLink to='/' className="hover:underline" >{item}</NavLink></li>
                    ))}
                </ul>
            </div>

            {/* Our Category Section */}
            <div className='lg:w-1/4 text-center lg:text-left'>
                <h3 className='border-b-2 pb-2 font-bold'>OUR CATEGORY</h3>
                <ul>
                    {["Agricultural Manual Tools", "Agricultural Machineries", "Pheromone Traps", "Kitchen Garden"].map((item, index) => (
                        <li key={index} className='flex justify-center lg:justify-start items-center gap-2' ><IoIosArrowForward /><NavLink to='/' className="hover:underline" >{item}</NavLink></li>
                    ))}
                </ul>
            </div>

            {/* Contact Section */}
            <div className='lg:w-1/4 text-center lg:text-left'>
                <h3 className='border-b-2 pb-2 font-bold'>GET IN TOUCH</h3>
                <div className='space-y-2'>
                    <div className='flex justify-center lg:justify-start items-center gap-2'>
                        <MdOutlineEmail className='text-2xl' />
                        <p>info@ungagros.com</p>
                    </div>
                    <div className='flex justify-center lg:justify-start items-center gap-2'>
                        <FiPhone className='text-2xl' />
                        <p>+91 98765432XX</p>
                    </div>
                    <div className='flex justify-center lg:justify-start items-center gap-2'>
                        <GrMapLocation className='text-2xl' />
                        <p className='px-2'>Unq Agro, <br />#32, 1st Main, 2nd Cross, <br /> Muneshwara Layout, <br />Laggere Bengaluru -560058,<br /> Karnataka, India</p>
                    </div>
                </div>

                {/* Social Media Section */}
                <div className='pt-4'>
                    <h3 className='border-b-2 pb-2 font-bold'>FOLLOW US</h3>
                    <div className='flex justify-center lg:justify-start gap-4 text-2xl pt-2'>
                        <AiOutlineFacebook className='cursor-pointer text-2xl mr-2' />
                        <FaInstagram className='cursor-pointer text-2xl mr-2' />
                        <AiOutlineYoutube className='cursor-pointer text-2xl mr-2' />
                    </div>
                </div>
            </div>
        </div>

        {/* Copyright Section */}
        <div className='text-center p-2 bg-dark text-white mt-6'>
            <FaRegCopyright className='inline mr-2' /> 
            <p className='inline'>unq agros 2025, All rights reserved. Developed by <a href="https://www.prajnansoftwares.com/" target='_blank'>Prajnan Softwares</a></p>
        </div>
    </div>
  )
}

export default FooterComponent