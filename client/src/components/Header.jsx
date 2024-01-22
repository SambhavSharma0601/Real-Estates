// import { useEffect, useState } from 'react'; 
// import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  // const [searchTerm, setSearchTerm] = useState('');
  // const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const urlParams = new URLSearchParams(window.location.search);
  //   urlParams.set('searchTerm', searchTerm);
  //   const searchQuery = urlParams.toString();
  //   navigate(`/search?${searchQuery}`);
  // };

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const searchTermFromUrl = urlParams.get('searchTerm');
  //   if (searchTermFromUrl) {
  //     setSearchTerm(searchTermFromUrl);
  //   }
  // }, []);

  return (
    <header className='bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-md shadow-md w-full'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-lg sm:text-3xl text-white flex flex-wrap'>
            <span className='text-blue-400'>Sambhav</span>
            <span className='text-blue-200'>Estate</span>
          </h1>
        </Link>
        {/* <form
          onSubmit={handleSubmit}
          className='bg-gray-700 bg-opacity-70 p-3 rounded-lg flex items-center ml-4'
        >
          <input
            type='text'
            placeholder='Search'
            className='bg-transparent focus:outline-none w-24 sm:w-64 text-white'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">
            <FaSearch className='text-white' />
          </button>
        </form> */}
        <ul className='flex gap-4'>
          <Link to='/'>
            <li className='hidden sm:inline text-white hover:underline text-lg'>
              Home
            </li>
          </Link>
          <Link to='/about'>
            <li className='hidden sm:inline text-white hover:underline text-lg'>
              About
            </li>
          </Link>
          <Link to='/create-listing'>
            <li className='text-white hover:underline text-lg'>Create Listing</li>
          </Link>
          <Link to='/profile'>
            {currentUser ? (
              <img
                className='rounded-full h-7 w-7 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
            ) : (
              <li className=' text-white hover:underline text-lg'> Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
