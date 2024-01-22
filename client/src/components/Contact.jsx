import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

import { Link } from 'react-router-dom';
import { store } from '../redux/store';

const Contact = ({ listing }) => {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const tokenFromStore = store.getState().user.currentUser.token;
        // const res = await fetch(`http://localhost:3001/api/user/${listing.userRef}`,);
        const res = await fetch(`http://localhost:3001/api/user/${listing.userRef}`, {
          headers: {
            'Authorization': `Bearer ${tokenFromStore}`,
          },
        });
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  return (
    <>
      {landlord && (
        <div className='flex flex-col gap-2'>
          <p>
            Contact{' '}
            <span className='font-semibold'>{landlord.username}</span> for{' '}
            <span className='font-semibold'>{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name='message'
            id='message'
            rows='2'
            value={message}
            onChange={onChange}
            placeholder='Enter your message here...'
            className='w-full border p-3 rounded-lg text-black'
          ></textarea>

          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
};

Contact.propTypes = {
  listing: PropTypes.shape({
    userRef: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,

  }).isRequired,
};

export default Contact;
