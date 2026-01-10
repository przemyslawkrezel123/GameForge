import logo from './assets/logo2.png'
import './logowanie.css'
import { useNavigate } from "react-router-dom"
import { LinearGradient as Lg } from 'react-text-gradients'
import { useState } from 'react';
import axios from 'axios';

const Logowanie = () =>{
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', 
      {
        username,
        password
      },
      { 
        withCredentials: true 
      }
    );

      if (response.status === 200) {
        console.log("Logged in:", response.data);
        localStorage.setItem('user_id', response.data.userId);
        navigate("/biblioteka");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Błąd logowania: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <>
      <div className="top-bar">
        <h1>
          <Lg gradient={["to left", "#175dffff, #00f7ffff" ]}> GameForge </Lg></h1>
        <img src={logo} className="logo" alt="logo" />
      </div>
      <div className='input'>
        <p>Username: </p>
        <input 
          type="text" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className='input'>
        <p>Password: </p>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>
        -Sign in-
      </button>
      <button className="buttonak" onClick={() => navigate("/rejestracja")}>
        -Register-
      </button>
    </>
  )
}

export default Logowanie