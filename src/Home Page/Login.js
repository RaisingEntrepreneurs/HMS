import React, { useState } from 'react';
import './Homepage.css';



const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loginStatus, setLoginStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3010/Users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('data.success:', data.success);
      if (data.success) {
        setLoginStatus('success');
      } else {
        setLoginStatus('fail');
      }

    } catch (error) {
      setLoginStatus('error');  
      console.error('Error:', error);
    } 
   
  };
  
  


  return (
    <div className="login-container" >
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <h2>Login</h2>
          {loginStatus === 'success' && <p>Login Successful!</p>}
          {loginStatus === 'fail' && <p>Login Failed. Please try again .</p>}
          {loginStatus === 'error' && <p>Login error. Please try again .</p>}
          
        
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
         <div className="form-group" > 
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;