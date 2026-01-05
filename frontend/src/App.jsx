import './App.css'
import Logowanie from './logowanie'
import Rejestracja from './rejestracja'
import Biblioteka from './biblioteka'
import Sklep from './sklep'
import Gra from './gra'
import { Routes, Route, Navigate } from 'react-router-dom'
import {useState, useEffect} from 'react';
import axios from "axios";
const API_URL= 'https://localhost:7140';


function App() {
  


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Rejestracja />} />
        <Route path="/logowanie" element={<Logowanie />} />
        <Route path="/biblioteka" element={<Biblioteka />} />
        <Route path="/sklep" element={<Sklep />} />
        <Route path="/gra" element={<Gra />} />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
      
      
    
  );
}

export default App
