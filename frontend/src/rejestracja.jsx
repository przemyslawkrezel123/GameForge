import logo from './assets/logo2.png'
import './rejestracja.css'
import { useNavigate } from "react-router-dom"
import { LinearGradient as Lg } from 'react-text-gradients'
import { useState } from 'react';
import axios from 'axios';

const Rejestracja = () =>{
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/register', {
        username,
        password
      });

      if (response.status === 201) {
        console.log("Registered:", response.data);
        alert("Rejestracja zakończona sukcesem! Możesz się teraz zalogować.");
        navigate("/logowanie");
      }
      
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Błąd rejestracji: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <>
     <div className="top-bar">
      <h1><Lg gradient={["to left", "#175dffff, #00f7ffff" ]}> GameForge </Lg></h1>
      <img src={logo} className="logo" alt="logo" />
     </div>
      <div>
            
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
      <button onClick={handleRegister}>
        -Create account-
      </button>
      </div>

    </>
  )
}

export default Rejestracja