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

const ProtectedRoute = ({ children }) => {
  const userId = localStorage.getItem('user_id');
  
  if (!userId) {
    return <Navigate to="/logowanie" replace />;
  }

  return children;
};

function App() {
  


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Logowanie />} />
        <Route path="/rejestracja" element={<Rejestracja />} />
        <Route path="/biblioteka" element={
          <ProtectedRoute>
            <Biblioteka />
          </ProtectedRoute>
        } />
        <Route path="/sklep" element={
          <ProtectedRoute>
            <Sklep />
          </ProtectedRoute>
        } />
        <Route path="/gra" element={
          <ProtectedRoute>
            <Gra />
          </ProtectedRoute>
        } />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
      
      
    
  );
}

export default App
