import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [activeTab, setActiveTab] = useState('sale');

  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div style={{ fontFamily: 'YourChosenFont, sans-serif', backgroundColor: '#F2F2F2', color: '#333' }}>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Effortlessly find your <span className='text-slate-500'>perfect </span>
          {/* <br /> */}
          place
        </h1>
        <div className='text-gray-600 text-xs sm:text-sm'>
          Explore the epitome of living at Sambhav Estate—your ultimate destination for discovering the ideal home.
          <br />
          With a diverse selection of properties, we offer a spectrum of choices tailored to your lifestyle and preferences.
          <br />
        </div>
        <Link to={'/search'} className='text-xs sm:text-sm text-blue-800 font-bold'>
          {/* <p>Explore more</p> */}
          <button className='bg-blue-400 p-2 text-white rounded-full hover:bg-blue-600'>Explore More</button>
        </Link>
      </div>

      {/* Swiper component for image gallery */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div className='w-[600px] m-auto'>
                <div className='text-center text-blue-500 text-3xl font-bold animate-pulse transform hover:scale-110 transition-transform duration-300 m-5'>
                  Gallery
                </div>
                <div
                  style={{
                    background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  }}
                  className='h-[300px]'
                ></div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        <div className='flex gap-6'>

          <div
            className={`flex-1 p-6 cursor-pointer border-2 rounded-lg ${activeTab === 'sale' ? 'border-blue-500' : 'border-gray-300'}`}
            onClick={() => handleTabChange('sale')}
            style={{ backgroundColor: '#E1EFFF', color: '#333' }}
          >
            <h2 className='text-xl font-semibold text-blue-500 mb-2'>
              Places for Sale
            </h2>
            <div className='text-gray-600'>
              Explore our latest listings for sale.
            </div>
          </div>

          <div
            className={`flex-1 p-6 cursor-pointer border-2 rounded-lg ${activeTab === 'rent' ? 'border-blue-500' : 'border-gray-300'}`}
            onClick={() => handleTabChange('rent')}
            style={{ backgroundColor: '#FFF8E1', color: '#333' }}
          >
            <h2 className='text-xl font-semibold text-blue-500 mb-2'>
              Places for Rent
            </h2>
            <div className='text-gray-600'>
              Find the perfect place for rent.
            </div>
          </div>
        </div>

        {activeTab === 'sale' && saleListings && saleListings.length > 0 && (
          <div className='p-8' style={{ backgroundColor: '#E1EFFF', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <div className='my-3'>
              <div className='text-blue-500 text-3xl font-semibold animate-pulse transform hover:scale-110 transition-transform duration-300'>
                Places for Sale
              </div>
              <Link
                className='text-sm text-blue-800 hover:underline'
                to={'/search?type=sale'}
              >
                Show more places for sale
              </Link>
            </div>
            <div className='flex flex-wrap gap-4' style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'rent' && rentListings && rentListings.length > 0 && (
          <div className='p-8' style={{ backgroundColor: '#FFF8E1', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <div className='my-3'>
              <div className='text-blue-500 text-3xl font-semibold animate-pulse transform hover:scale-110 transition-transform duration-300'>
                Places for Rent
              </div>
              <Link
                className='text-sm text-blue-800 hover:underline'
                to={'/search?type=rent'}
              >
                Show more places for rent
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <div key={listing._id} style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                  <ListingItem listing={listing} />
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
