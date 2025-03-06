import React from 'react'
import ContactUsFormComponent from '../components/ContactUsFormComponent'

const ContactUsPage = () => {
  return (
    <div className='p-4 bg-gradient-to-b to-green-500 from-white'>
        <div className='py-2'>
            <h1 className='font-bold text-3xl'>ABOUT US - Ung Agros</h1>
            <p className='text-2xl italic'>Rediscovering Agriculture</p>
        </div>
        <div className='py-2'>

            <div className='flex  flex-col md:flex-row mt-4 mb-10'>
                <div className='flex flex-col flex-1'>
                    <div className='flex-1'>
                        <h3 className='text-2xl font-semibold'>🌱 Let’s Grow Together!</h3>
                        <p className='px-8 py-4'>At Unq Agro, we’re here to help you cultivate success—whether you’re planting your first seed or managing a thriving farm. Have questions, feedback, or need guidance? We’d love to hear from you! Reach out through any of the channels below, and our team will get back to you faster than a sprout in spring.</p>
                    </div>
                    <div className='flex-1'>
                        <h3 className='text-2xl font-semibold'>🌍 Your Feedback Feeds Our Growth</h3>
                        <p className='px-8 py-4'>At Great Agro, every call, message, or visit inspires us to do better. Rakshith and our team are committed to ensuring your experience with us is as fruitful as your harvest.</p>
                    </div>
                </div>

                <div className='my-4'>
                    <ContactUsFormComponent />
                </div>
            </div>
            
            <div className='flex flex-col md:flex-row'>
                <div className='flex-1'>
                    <h3 className='text-2xl font-semibold'>📞 Talk to Us</h3>
                    <ul className='px-8 py-4'>
                        <li className='font-semibold'>Customer Support:</li>
                        <p><span className='pl-4 font-medium'>☎️ Call: </span>+91-XXXXXX1234 (Mon-Sat, 10 AM – 6 PM IST)</p>
                        <p><span className='pl-4 font-medium'>📧 Email: </span>support@ungagro.com</p>
                        
                        <li className='font-semibold'>Business Inquiries:</li>
                        <p><span className='pl-4 font-medium'>📩 Email: </span>partner@ungagro.com</p>
                        
                    </ul>
                </div>
                <div className='m-4 mt-8 w-1 border-2 border-light hidden md:block' />
                <div className='flex-1'>
                    <h3 className='text-2xl font-semibold'>📍 Visit Us</h3>
                    <p className='px-8 py-4'>Ung Agro, <br />#32, 1st Main, 2nd Cross, <br /> Muneshwara Layout, <br />Laggere Bengaluru -560058,<br /> Karnataka, India</p>
                </div>
            </div>


        </div>
    </div>
  )
}

export default ContactUsPage