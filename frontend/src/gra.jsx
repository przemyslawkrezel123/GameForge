import logo from './assets/logo2.png'
import './biblioteka.css'
import './logowanie'
import './sklep'
import './biblioteka'
import { useNavigate } from "react-router-dom"
import {useState, useEffect} from 'react';
import {fetchGames} from './api/gry';

const Gra = () =>{

  const navigate = useNavigate();

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
       
        <ul className="sidebar">
                    {games.map((game) => (
                        <li className="game" key={game.id}>
                            <button onClick={() => setSelectedGame(game)}>
                                <label>{game.name}</label>
                            </button>

                        </li>
                    ))}
                 
        </ul>

            



        
        <div className="maingame">
            {selectedGame ? (
                <div>
                <h2>{selectedGame.name}</h2>
                <p>Genre: {selectedGame.genre}</p>
                <p>Platform: {selectedGame.platform}</p>
                <p>Year: {selectedGame.year}</p>
                </div>
            ) : (
                <p>Click a game to see details</p>
            )}
        </div>

        
    </>
  )
}

export default Gra