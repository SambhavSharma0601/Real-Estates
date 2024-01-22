import  { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';
import PropTypes from 'prop-types'; 

const ForgotPassword = ({ setEmail }) => {
  const [email, setForgotEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const sendCode = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Code sent to your email. Please check your inbox.');
      } else {
        toast.error('Email not found. Please enter a valid email.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const verifyCode = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Code verified. Enter your new password.');
        setEmail(email);
      } else {
        toast.error(data.error || 'Incorrect code. Please try again.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error verifying code. Please try again.');
    }
  };

  const updatePassword = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/update-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Password updated successfully. You can now log in with your new password.');
        navigate('/login');
      } else {
        toast.error(data.error || 'Password update failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error updating password. Please try again.');
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setForgotEmail(e.target.value)}
        />
        <button className="action-button" onClick={sendCode}>
          Send Code
        </button>
      </div>
      {email && (
        <div className="form-group">
          <label>Verification Code:</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button className="action-button" onClick={verifyCode}>
            Verify Code
          </button>
        </div>
      )}
      {email && code && (
        <div className="form-group">
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button className="action-button" onClick={updatePassword}>
            Update Password
          </button>
        </div>
      )}
    </div>
  );
};
ForgotPassword.propTypes = {
    setEmail: PropTypes.func,  // Add this section
  };

export default ForgotPassword;
