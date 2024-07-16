import React, { useState, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { loginUser } from '../api';
import { AuthContext } from '../AuthContext';
import '../styles/Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    recaptchaToken: '',
  });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const recaptchaRef = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRecaptchaChange = (token) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      recaptchaToken: token,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.recaptchaToken) {
      alert('Please complete the reCAPTCHA.');
      return;
    }
    try {
      const response = await loginUser(formData);
      login(response.access_token);
      navigate('/');
    } catch (error) {
      console.error('Login failed', error);
      recaptchaRef.current.reset(); // Reset reCAPTCHA
      setTimeout(() => {
        window.location.reload(); // Reload page after a brief delay
      }, 500);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6Lcn9w8qAAAAAAauoSxI5Z5yPj_dNaCMhm5tf-Xp" // Replace with your site key
            onChange={handleRecaptchaChange}
          />
          <button type="submit">Login</button>
        </form>
        <Link to="/register" className="link">Don't have an account? Register</Link>
      </div>
    </div>
  );
};

export default Login;