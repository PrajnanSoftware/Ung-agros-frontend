import React from 'react'

const AboutPage = () => {
  return (
    <div className='p-4 bg-gradient-to-b to-green-500 from-white'>
        <div className='py-2'>
            <h1 className='font-bold text-3xl'>ABOUT US - Ung Agros</h1>
            <p className='text-2xl italic'>Rediscovering Agriculture</p>
        </div>
        <div className='py-2'>
            <div>
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
            </div>

            <div className='py-2'>
                <h3 className='text-2xl font-semibold'>🤝 Join the Ung Agro Family</h3>
                <p className='px-8 py-4'>Ready to grow with us? Explore our collection, and let’s cultivate a greener tomorrow, together.</p>
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