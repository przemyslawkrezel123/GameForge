import logo from './assets/logo2.png'
import './biblioteka.css'
import './logowanie'
import './biblioteka'
import './gra'

import {fetchGames} from './api/gry';
import { useNavigate } from "react-router-dom"
import {useState, useEffect} from 'react';
import axios from 'axios';


const Sklep = () =>{

 const navigate = useNavigate()
 
     const [games, setGames] = useState([]);
     const [selectedGame, setSelectedGame] = useState(null);
   
     useEffect(() => {
       const loadGames = async() => {
               try {
                   const response = await axios.get(
                    'http://localhost:3000/games', 
                    { withCredentials: true }
                   );
                   setGames(response.data);
               } catch (error) {
                   console.error("Error fetching games:", error);
               }
           }
           loadGames();
   
       }, []);

    const buyGame = async () => {
        try {
            // Implement the logic to buy the selected game
            const response = await axios.post(
                'http://localhost:3000/transactions',
                {
                    user_id: localStorage.getItem('user_id'),
                    game_id: selectedGame.game_id
                },
                { withCredentials: true }
            )
            alert("Game purchased successfully!");
        } catch (error) {
            console.error("Error buying game:", error);
            alert("Failed to buy game. Please try again.");
        }
    }
   
     return (
       <>
           <div>
               <button className="buttonek" onClick={() => navigate('/logowanie')}>
                   Sign out
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
                             <li className="game" key={game.game_id}>
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
                        <p>Rate: {selectedGame.rate}</p>
                        <button onClick={buyGame}>
                            Dodaj do koszyka
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