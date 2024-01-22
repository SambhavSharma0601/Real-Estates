import  { useEffect, useRef } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import anime from 'animejs/lib/anime.es.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';
// import { useDispatch, useSelector } from 'react-redux';
// import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading  } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const submitRef = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('http://localhost:3001/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
  
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        toast.error(data.message);
        return;
      }
  
      dispatch(signInSuccess(data));
      console.log('Success message:', data.message); 
      toast.success('Logged in successfully'); 
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
      toast.error(error.message);
    }
  };
  

  useEffect(() => {
    var current = null;

    const addAnimation = (target, offsetValue, dashArrayValue) => {
      if (current) current.pause();
      current = anime({
        targets: 'path',
        strokeDashoffset: {
          value: offsetValue,
          duration: 700,
          easing: 'easeOutQuart',
        },
        strokeDasharray: {
          value: dashArrayValue,
          duration: 700,
          easing: 'easeOutQuart',
        },
      });
    };

    emailRef.current.addEventListener('focus', function () {
      addAnimation('path', 0, '240 1386');
    });

    passwordRef.current.addEventListener('focus', function () {
      addAnimation('path', -336, '240 1386');
    });

    submitRef.current.addEventListener('focus', function () {
      addAnimation('path', -730, '530 1386');
    });
  }, [emailRef, passwordRef, submitRef]);

  return (
    <div className='h-screen flex justify-center items-center ' style={{ backgroundImage: 'url(/photos/bglog.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
    <div className='p-4 max-w-lg w-full mx-auto bg-opacity-20  bg-white backdrop-blur-lg bg-clip-padding backdrop-filter rounded-xl shadow-lg border border-white p-6' >
      <h1 className='text-3xl text-center font-semibold my-7 text-gray-900'>Log In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
          ref={emailRef}
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
          ref={passwordRef}
        />

        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          ref={submitRef}
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth />
      </form>
      <div className="mb-4 text-sm text-blue-500 text-left">
            <Link to="/forgotpassword">Forgot Password?</Link>
          </div>
          
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-100'>Sign up</span>
        </Link>
      </div>
      {/* {error && <p className='text-red-500 mt-5'>{error}</p>} */}
    </div>
    <ToastContainer />
    </div>
  );
}
// import  { useEffect, useRef } from 'react';
// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import anime from 'animejs/lib/anime.es.js';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import {
//   signInStart,
//   signInSuccess,
//   signInFailure,
// } from '../redux/user/userSlice';
// import OAuth from '../components/OAuth';


// export default function SignIn() {
//   const [formData, setFormData] = useState({});
//   const { loading  } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const emailRef = useRef(null);
//   const passwordRef = useRef(null);
//   const submitRef = useRef(null);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch(signInStart());
//       const res = await fetch('http://localhost:3001/api/auth/signin', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       console.log(data);
  
//       if (data.success === false) {
//         dispatch(signInFailure(data.message));
//         toast.error(data.message);
//         return;
//       }
  
//       dispatch(signInSuccess(data));
//       console.log('Success message:', data.message); 
//       toast.success('Logged in successfully'); 
//       navigate('/');
//     } catch (error) {
//       dispatch(signInFailure(error.message));
//       toast.error(error.message);
//     }
//   };
  

//   useEffect(() => {
//     var current = null;

//     const addAnimation = (target, offsetValue, dashArrayValue) => {
//       if (current) current.pause();
//       current = anime({
//         targets: 'path',
//         strokeDashoffset: {
//           value: offsetValue,
//           duration: 700,
//           easing: 'easeOutQuart',
//         },
//         strokeDasharray: {
//           value: dashArrayValue,
//           duration: 700,
//           easing: 'easeOutQuart',
//         },
//       });
//     };

//     emailRef.current.addEventListener('focus', function () {
//       addAnimation('path', 0, '240 1386');
//     });

//     passwordRef.current.addEventListener('focus', function () {
//       addAnimation('path', -336, '240 1386');
//     });

//     submitRef.current.addEventListener('focus', function () {
//       addAnimation('path', -730, '530 1386');
//     });
//   }, [emailRef, passwordRef, submitRef]);

//   return (
//     <div className='h-screen flex justify-center items-center ' style={{ backgroundImage: 'url(/photos/bglog.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
//     <div className='p-4 max-w-lg w-full mx-auto bg-opacity-20  bg-white backdrop-blur-lg bg-clip-padding backdrop-filter rounded-xl shadow-lg border border-white p-6' >
//       <h1 className='text-3xl text-center font-semibold my-7 text-gray-900'>Log In</h1>
//       <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
//         <input
//           type='email'
//           placeholder='email'
//           className='border p-3 rounded-lg'
//           id='email'
//           onChange={handleChange}
//           ref={emailRef}
//         />
//         <input
//           type='password'
//           placeholder='password'
//           className='border p-3 rounded-lg'
//           id='password'
//           onChange={handleChange}
//           ref={passwordRef}
//         />

//         <button
//           disabled={loading}
//           className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
//           ref={submitRef}
//         >
//           {loading ? 'Loading...' : 'Sign In'}
//         </button>
//         <OAuth />
//       </form>
//       <div className="mb-4 text-sm text-blue-500 text-left">
//             <Link to="/forgotpassword">Forgot Password?</Link>
//           </div>

//       <div className='flex gap-2 mt-5'>
//         <p>Dont have an account?</p>
//         <Link to={'/sign-up'}>
//           <span className='text-blue-100'>Sign up</span>
//         </Link>
//       </div>
//       {/* {error && <p className='text-red-500 mt-5'>{error}</p>} */}
//     </div>
//     <ToastContainer />
//     </div>
//   );
// }
