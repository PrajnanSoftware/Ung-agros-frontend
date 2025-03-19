import React, { useEffect } from 'react'
import AOS from 'aos';

const AboutPage = () => {
    
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

  return (
    <div className='p-4 bg-gradient-to-b to-green-500 from-white' data-aos="fade-up">
        <div className='py-2'>
            <h1 className='font-bold text-2xl text-secondary'>Welcome to Ung Agros</h1>
            <p className='text-lg italic text-primary'>Rediscovering Agriculture</p>
        </div>
        <div className='py-2'>
            <div className='px-8'>
                <div className='mb-8 text-secondary'>
                    <h3 className='text-xl font-bold text-center'><strong className='block'>Vision</strong> “looking to build the network of best businesses where passion and purpose comes together”.</h3>
                </div>
                <p className='my-2'>
                    Ung Agros working towards creating a favorable business envt in the agri business industry, Committed towards supplying the right products and services by the farmers and industries who value quality and time. Ung Agros not only intended to supply agricultural inputs but also working on creating market for the farmers produce.
                </p>
                <p className='my-2'>
                    Ung Agros working on creating an association which consists of major food processing industries, traders, exporters and govt organizations and individual person who are passionate towards agriculture, to provide fair market for the farmers efforts and hard work. We have a strong team comprising of men from different fields who are involved in Market research, Product research, and market survey who collect and pool the data for the better tomorrow.
                </p>

                <p className='my-2 '>
                    We also involve in banking activities with a motto of creating a favorable banking environment to the farmer in the process of applying loans, subsidies, grants etc. We work closely with Govt institutions like IIHR, Krishi Kendras, Horticulture departments and banking institutions to provide technical and financial assistance to the needy farmers.
                </p>
                <h3 className='font-bold text-xl text-center py-4 text-secondary'>“We believe in growing together, Unite and work for the prosperous growth”</h3>
                <h2 className='font-semibold text-lg text-secondary'>Customer benefits:</h2>
                <p className='my-2'>
                    We respect every customer, his needs and wants. We are committed to provide the right service to the right person and business and ensure better customer satisfaction.
                </p>
            </div>
            <ul className='px-8 py-4'>
                    <li className='mt-4'>
                        <span className='font-medium'>1. Quality: </span>
                        <p className='my-2'>
                            Our products are not wat the manufacturer produce but what we pick from their heaps. Industrial advancement has led to the mass production and millions of products are available in the market. We are cautious to the needs of the customers and never compromise with the quality. The products that we serve are the best in the industry and picked under the guidance of industry experts.
                        </p>
                    </li>
                    <li className='mt-4'>
                        <span className='font-medium'>2. Safety: </span>
                        <p className='my-2'>
                            It is essential to comply to the rules and regulations of the Environmental policies and we are committed to protect the environment from pollution, depletion and destruction. We are one among the service providers who engaged in promoting organic inputs and organic agriculture practices. We are committed towards safety of the producer and the consumer in the process of production and consumption.
                        </p>
                    </li>
                    <li className='mt-4'>
                        <span className='font-medium'>3. Market access: </span>
                        <p className='my-2'>
                            Our involvement does not stop once we have sold our products but we follow you for a better service through guidance and advice, We make sure that the customer is practicing the good practices in his work which guarantees the better quality in his produce. We also provide market for the produce and help increase his income and thereby raise standard of living.
                        </p>
                    </li>
                    <li className='mt-4'>
                        <span className='font-medium'>4. Provide world class technology: </span>
                        <p className='my-2'>
                            We know the dependency of population on agriculture and we are committed to help them access good food through promoting Good agricultural practices and modern technology in production & processing. We are working with the experts in various stream to make technology accessible to the common people.
                        </p>
                    </li>
            </ul>
            {/* <h2>Work with us</h2> */}

            {/* <div>
                <h3 className='text-2xl font-semibold'>🌱 Welcome to Ung Agro!</h3>
                <p className='px-8 py-4'>At Unq Agro, we believe in nurturing the earth and empowering those who tend to it. Founded with a vision to bridge the gap between traditional farming wisdom and modern agricultural needs, we’re here to help gardeners, farmers, and plant enthusiasts grow sustainably. Whether you’re cultivating a backyard garden or managing acres of farmland, our curated range of tools, fertilizers, compost, plants, and seeds is designed to help you thrive.</p>
            </div>

            <div className='py-2'>
                <h3 className='text-2xl font-semibold'>👨🌾 Our Story: Rooted in Passion</h3>
                <p className='px-8 py-4'>Unq Agro was born from the lifelong passion of our founder, Rakshith, a firm believer in the transformative power of agriculture. Growing up in a family of farmers, Rakshith witnessed firsthand the challenges of accessing high-quality, eco-friendly supplies. Driven by a mission to “rediscover agriculture,” he started Unq Agro to provide affordable, reliable, and sustainable solutions that reconnect people with the joy of growing.</p>
            </div>

            <div className='py-2'>
                <h3 className='text-2xl font-semibold'>🌍 Why Choose Ung Agro?</h3>
                <ul className='px-8 py-4'>
                    <li><span className='font-medium'>Quality First: </span>Partnering with trusted brands and eco-conscious suppliers.</li>
                    <li><span className='font-medium'>Farmers for Farmers: </span>Solutions designed by those who understand the land.</li>
                    <li><span className='font-medium'>Eco-Friendly Focus: </span>Promoting practices that protect the planet.</li>
                </ul>
            </div>

            <div className='py-2'>
                <h3 className='text-2xl font-semibold'>🌿 Our Commitment</h3>
                <p className='px-8 py-4'>We’re more than a store - we’re a movement. Unq Agro is committed to helping you rediscover the essence of agriculture, one seed at a time. By choosing us, you’re supporting a future where farming is sustainable, accessible, and rewarding for all.</p>
            </div> */}

            <div className='py-2'>
                <h3 className='text-2xl font-semibold text-secondary'>🤝 Join the Ung Agro Family</h3>
                <p className='px-8 py-4'>
                    If you wish to be a part of Unite and Grow. Growth in terms of value, earnings, confidence. We welcome you and we are always happy to welcome young and talented youths to be a part of success of Ung Agros.
                </p>
                <div className='px-8 py-4'>
                    <p>With gratitude,</p>
                    <p>Rakshith & the Ung Agro Team</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AboutPage