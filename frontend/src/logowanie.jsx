import logo from './assets/logo2.png'
import './logowanie.css'
import { useNavigate } from "react-router-dom"
import { LinearGradient as Lg } from 'react-text-gradients'
const Logowanie = () =>{
  const navigate = useNavigate()

  return (
    <>
      <div className="top-bar">
        <h1>
          <Lg gradient={["to left", "#175dffff, #00f7ffff" ]}> GameForge </Lg></h1>
        <img src={logo} className="logo" alt="logo" />
      </div>
      <div className='input'>
        <p>Username: </p>
        <input type="text" />
      </div>
      <div className='input'>
        <p>Password: </p>
        <input type="password" />
      </div>
      <button onClick={() => navigate("/biblioteka")}>
        -Sign in-
      </button>
      <button className="buttonak" onClick={() => navigate("/rejestracja")}>
        -Register-
      </button>
    </>
  )
}

export default Logowanie