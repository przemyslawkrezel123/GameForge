import logo from './assets/logo2.png'
import './biblioteka.css'
import './logowanie'
import './biblioteka'
import './gra'

import {fetchGames} from './api/gry';
import { useNavigate } from "react-router-dom"
import {useState, useEffect} from 'react';


const Sklep = () =>{

 const navigate = useNavigate()
 
     const [games, setGames] = useState([]);
     const [selectedGame, setSelectedGame] = useState(null);
   
     useEffect(() => {
       const loadGames = async() => {
               try {
                   const data = await fetchGames();
                   setGames(data);
               } catch (error) {
                   console.error("Error fetching games:", error);
               }
           }
           loadGames();
   
       }, []);
   
     return (
       <>
           <div>
               <button className="buttonek" onClick={() => navigate('/logowanie')}>
                   Sing out
               </button>
               <button onClick={() => navigate('/biblioteka')}>
                   Library
               </button>
               <a>                </a>
               <button onClick={() => navigate('/sklep')}>
                   Shop
               </button>
           </div>
           <div className="top-bar">
               <img src={logo} className="logo" alt="logo" />
           </div>
          
           <div className="app">
                 <aside className="sidebar">
                     <ul>
                         {games.map((game) => (
                             <li className="game" key={game.id}>
                             <button onClick={() => setSelectedGame(game)}>
                                 {game.name}
                             </button>
                             </li>
                         ))}
                     </ul>
                 </aside>
 
                 <main className="content">
                     {selectedGame && (
                     <div className="maingame">
                         <div className="game-info">
                         <h1>{selectedGame.name}</h1>
                         <p>Genre: {selectedGame.genre}</p>
                         <p>Price: {selectedGame.price}</p>
                         <p>Opinion: {selectedGame.opinion}</p>
                         <p>Rank: {selectedGame.rank}</p>
                         <button onClick={() => navigate('/biblioteka')}>
                             Buy
                         </button>
                         </div>
                     </div>
                     )}
                 </main>
             </div>
     </>
   )
 }

export default Sklep