import logo from './assets/logo2.png'
import './rejestracja.css'
import { useNavigate } from "react-router-dom"
import { LinearGradient as Lg } from 'react-text-gradients'

const Rejestracja = () =>{
  const navigate = useNavigate()
  return (
    <>
     <div className="top-bar">
      <h1><Lg gradient={["to left", "#175dffff, #00f7ffff" ]}> GameForge </Lg></h1>
      <img src={logo} className="logo" alt="logo" />
     </div>
      <div>
            
      <div className='input'>
        <p>Username: </p>
        <input type="login" />
      </div>
      <div className='input'>
        <p>Email: </p>
        <input type="email" />
      </div>
      <div className='input'>
        <p>Password: </p>
        <input type="password" />
      </div>
      <button onClick={() => navigate("/logowanie")}>
        -Create account-
      </button>
      </div>

    </>
  )
}

export default Rejestracja