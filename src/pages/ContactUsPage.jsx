import React, { useEffect } from 'react'
import ContactUsFormComponent from '../components/ContactUsFormComponent'
import AOS from 'aos';

const ContactUsPage = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

  return (
    <div className='p-4 bg-gradient-to-b to-green-500 from-white' data-aos="fade-up">
        <div className='py-2'>
            <h1 className='font-bold text-2xl text-secondary'>ABOUT US - Ung Agros</h1>
            <p className='text-lg italic text-primary'>Rediscovering Agriculture</p>
        </div>
        <div className='py-2'>

            <div className='flex  flex-col lg:flex-row mt-4 mb-10'>
                <div className='flex flex-col flex-1'>
                    <div className='flex-1'>
                        <h3 className='text-2xl font-semibold text-secondary'>🌱 Let’s Grow Together!</h3>
                        <p className='px-8 py-4'>
                            UnG Agros a startup established with the motto of providing standard and unique service to the agriculture. We are committed to work diligently to provide better service and products that offers superior performance and new set of standards for the agriculture industry.
                        </p>
                        <p className='px-8 py-2'>
                            UnG helps you access the right product and service and engage with right people for the benefit of your business.
                        </p>
                    </div>
                    <div className='flex-1'>
                        <h3 className='text-2xl font-semibold text-secondary'>🌍 Your Feedback Feeds Our Growth</h3>
                        <p className='px-8 py-4'>At UnG Agro, every call, message, or visit inspires us to do better. Rakshith and our team are committed to ensuring your experience with us is as fruitful as your harvest.</p>
                    </div>
                </div>

                <div className='my-4'>
                    <ContactUsFormComponent />
                </div>
            </div>
            
            <div className='flex flex-col md:flex-row'>
                <div className='flex-1'>
                    <h3 className='text-2xl font-semibold text-secondary'>📞 Talk to Us</h3>
                    <ul className='px-8 py-4'>
                        <li className='font-semibold'>Customer Support:</li>
                        <p><span className='pl-4 font-medium'>☎️ Call: </span>+91-9986636773 (Mon-Sat, 10 AM – 6 PM IST)</p>
                        <p>
                            <span className='pl-4 font-medium'>📧 Email: </span>
                            <a href="mailto:support@ungagros.com" target="_blank" rel="noopener noreferrer" className="">
                            support@ungagros.com
                            </a>
                        </p>
                        
                        <li className='font-semibold'>Business Inquiries:</li>
                        <p>
                            <span className='pl-4 font-medium'>📩 Email: </span>
                            <a href="mailto:partner@ungagros.com" target="_blank" rel="noopener noreferrer" className="">
                            partner@ungagros.com
                            </a>
                        </p>
                        
                    </ul>
                </div>
                <div className='m-4 mt-8 w-1 border-2 border-light hidden md:block' />
                <a href="https://maps.app.goo.gl/g9bQLsMEDMnKpuv48" target="_blank" rel="noopener noreferrer" className='flex-1'>
                    <div className='flex-1'>
                        <h3 className='text-2xl font-semibold text-secondary'>📍 Visit Us</h3>
                        <p className='px-8 py-4'>Ung Agro, <br />#32, 1st Main, 2nd Cross, <br /> Muneshwara    Layout, <br />Laggere Bengaluru -560058,<br /> Karnataka, India</p>
                    </div>
                </a>
            </div>


        </div>
    </div>
  )
}

export default ContactUsPage