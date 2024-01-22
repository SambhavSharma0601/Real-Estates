import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import { useCallback } from 'react';
import { store } from '../redux/store';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './Profile.css'

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();
  // const [ setShowListingsError] = useState(false); // Add this line



  const handleFileUpload = useCallback((file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);


    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      () => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  }, [setFilePerc, setFileUploadError, formData]);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file, handleFileUpload]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const tokenFromStore = store.getState().user.currentUser.token;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`http://localhost:3001/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenFromStore}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      const tokenFromStore = store.getState().user.currentUser.token;
      dispatch(deleteUserStart());
      const res = await fetch(`http://localhost:3001/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${tokenFromStore}`,
        },
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('http://localhost:3001/api/auth/signout');
      var data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };

  const handleShowListings = async () => {
    try {
      const tokenFromStore = store.getState().user.currentUser.token;
      const res = await fetch(`http://localhost:3001/api/user/listings/${currentUser._id}`, {
        headers: {
          'Authorization': `Bearer ${tokenFromStore}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      if (data.success === false) {
        // setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      // setShowListingsError(true);
    }
  };
  // const handleDeleteClick = () => {
  //   // Show a confirmation dialog
  //   const isConfirmed = window.confirm("Are you sure you want to delete?");

  //   // Proceed with deletion if the user confirms
  //   if (isConfirmed) {
  //     handleListingDelete(listingId);
  //   }
  // };


  const handleListingDelete = async (listingId) => {
    try {
      const tokenFromStore = store.getState().user.currentUser.token;
      const confirmed= window.confirm("are u sure?");
      if(confirmed){
      const res = await fetch(`http://localhost:3001/api/listing/delete/${listingId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${tokenFromStore}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    }
    } catch (error) {
      console.log(error.message);
    }
  };

  const [selectedOption, setSelectedOption] = useState('About You');

  useEffect(() => {
    const fetchData = async () => {
      try {
        await handleShowListings();
      } catch (error) {
        // setShowListingsError(true);
      }
    };

    fetchData();
  },);

  return (
    <div className='profile-container'>
      <div className='sidebar h-[91vh]'>
        <div
          className={`sidebar-option ${selectedOption === 'About You' && 'selected'}`}
          onClick={() => setSelectedOption('About You')}
        >
          About You
        </div>
        <div
          className={`sidebar-option ${selectedOption === 'Update Profile' && 'selected'}`}
          onClick={() => setSelectedOption('Update Profile')}
        >
          Update Profile
        </div>
        <div
          className={`sidebar-option ${selectedOption === 'Your Listings' && 'selected'}`}
          onClick={() => setSelectedOption('Your Listings')}
        >
          Your Listings
        </div>
      </div>
      <div className='profile-content'>
        {selectedOption === 'About You' && (
          <div className='about-you'>
            <img
              src={currentUser.avatar}
              alt='profile'
              className='rounded-full h-24 w-24 object-cover self-center mt-2'
            />
            <div className='user-info'>
              <p className='username'>{currentUser.username}</p>
              <p className='email'>{currentUser.email}</p>
            </div>
            <div className='actions'>
              <button onClick={handleSignOut} className='sign-out-button'>
                Sign out
              </button>
              <span onClick={handleDeleteUser} className='delete-account'>
                Delete account
              </span>
            </div>
          </div>
        )}
        {selectedOption === 'Update Profile' && (
          <form onSubmit={handleSubmit} className='profile-form w-96 m-auto'>
            {/* ... (rest of the Update Profile form) */}
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type='file'
              ref={fileRef}
              hidden
              accept='image/*'
            />
            <img
              onClick={() => fileRef.current.click()}
              src={formData.avatar || currentUser.avatar}
              alt='profile'
              className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
            />
            <p className='text-sm self-center'>
              {fileUploadError ? (
                <span className='text-red-700'>
                  Error Image upload (image must be less than 2 mb)
                </span>
              ) : filePerc > 0 && filePerc < 100 ? (
                <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
              ) : filePerc === 100 ? (
                <span className='text-green-700'>Image successfully uploaded!</span>
              ) : (
                ''
              )}
            </p>
            <input
              type='text'
              placeholder='username'
              defaultValue={currentUser.username}
              id='username'
              className='border p-3 rounded-lg'
              onChange={handleChange}
            />
            <input
              type='email'
              placeholder='email'
              id='email'
              defaultValue={currentUser.email}
              className='border p-3 rounded-lg'
              onChange={handleChange}
            />
            <input
              type='password'
              placeholder='password'
              onChange={handleChange}
              id='password'
              className='border p-3 rounded-lg'
            />
            <button
              disabled={loading}
              className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
            >
              {loading ? 'Loading...' : 'Update'}
            </button>
          </form>
        )}
        {selectedOption === 'Your Listings' && (
          <div className='your-listings'>
            <h1 className='text-center mt-7 text-2xl font-semibold font-serif'>Your Listings</h1>
            {userListings.map((listing) => (
              <div
                key={listing._id}
                className='listing-car w-[50vw] bg-slate-300 border rounded-lg p-3 flex justify-between items-center gap-4'
              >
                <Link to={`/listing/${listing._id}`}>
                  <img
                    src={listing.imageUrls[0]}
                    alt='listing cover'
                    className='h-16 w-16 object-contain'
                  />
                </Link>
                <Link
                  className='text-slate-700 font-semibold hover:underline truncate text-left'
                  to={`/listing/${listing._id}`}
                >
                  <p>{listing.name}</p>
                </Link>
                <div className='flex flex-row p-5 gap-6 items-center'> 
                  <button
                    onClick={() => handleListingDelete(listing._id)}
                    className='text-white p-2 rounded-xl font-bold  uppercase cursor-pointer bg-red-600'
                    
                  >
                    Delete
                  </button>
                  <Link to={`/update-listing/${listing._id}`}>
                    <button className='text-white bg-green-600 rounded-xl p-2 font-bold uppercase cursor-pointer'>Edit</button> {/* Added cursor-pointer */}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
