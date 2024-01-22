// import React from 'react'

// import React from 'react';
import { FaHome, FaBuilding, FaUserFriends } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
import ContactUs from './ContactUS';

export default function About() {
  return (
    <div className='py-10 px-4 max-w-6xl mx-auto bg-slate-600 p-8 mt-14'>
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <h1 className='text-4xl font-bold mb-6 text-slate-800'>About Sambhav Estates</h1>
        <p className='mb-4 text-slate-700'>
          Sambhav Estates is a premier real estate agency dedicated to helping clients buy, sell, and rent properties in the most sought-after neighborhoods. Our team of seasoned agents is committed to delivering exceptional service and ensuring a seamless buying and selling process.
        </p>
        <p className='mb-4 text-slate-700'>
          Our mission is to assist clients in achieving their real estate goals by providing expert advice, personalized service, and a profound understanding of the local market. Whether you&apos;re looking to buy, sell, or rent a property, we&apos;re here to guide you every step of the way.
        </p>
        <p className='mb-4 text-slate-700'>
          At Sambhav Estates, we believe in making the real estate experience exciting and rewarding. Our dedicated team of agents brings a wealth of experience and knowledge to the industry, ensuring the highest level of service for our clients.
        </p>

      </div>
      <div className='flex justify-around mt-8 gap-8'>
        <div className='flex items-center p-4 bg-white rounded-md shadow-md hover:shadow-lg transition duration-300'>
          <FaHome className='text-blue-500 text-3xl mr-3' />
          <div>
            <h2 className='text-lg font-semibold'>Residential Properties</h2>
            <p className='text-slate-600'>Explore our selection of beautiful homes.</p>
          </div>
        </div>
        <div className='flex items-center p-4 bg-white rounded-md shadow-md hover:shadow-lg transition duration-300 '>
          <FaBuilding className='text-green-500 text-3xl mr-3' />
          <div>
            <h2 className='text-lg font-semibold'>Commercial Spaces</h2>
            <p className='text-slate-600'>Find the perfect space for your business.</p>
          </div>
        </div>
        <div className='flex items-center p-4 bg-white rounded-md shadow-md hover:shadow-lg transition duration-300'>
          <FaUserFriends className='text-purple-500 text-3xl mr-3' />
          <div>
            <h2 className='text-lg font-semibold'>Expert Agents</h2>
            <p className='text-slate-600'>Connect with our experienced team of real estate agents.</p>
          </div>
        </div>
      </div>
      <ContactUs />
      {/* <Link></Link> */}
      
    </div>
  );
}

