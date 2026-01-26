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
    const [searchQuery, setSearchQuery] = useState(''); 
    const [isReviewFormOpen, setIsReviewFormOpen] = useState(false); 
     
    const [reviews, setReviews] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showReviews, setShowReviews] = useState(false);
    const [loading, setLoading] = useState(false);
   
    const gamesPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    
    const filteredGames = games.filter(game => 
        game.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);
    
    const totalPages = Math.ceil(filteredGames.length / gamesPerPage) || 1;  


    const [topGames, setTopGames] = useState([]);
    const [showTopGames, setShowTopGames] = useState(false);

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

    const handleReviewSubmit = async ({ rating, reviewText }) => {
        try {
            await axios.post('http://localhost:3000/reviews', {
                rating: parseInt(rating),
                review_text: reviewText,
                game_id: selectedGame.game_id, 
                user_id: parseInt(localStorage.getItem('user_id'))
            }, { withCredentials: true });

            alert("Recenzja dodana pomyślnie!");
            setIsReviewFormOpen(false);
        } catch (error) {
            console.error("Error submitting review:", error);
            alert("Błąd dodawania recenzji: " + (error.response?.data?.message || error.message));
        }
    }
    
    
    const handleLoadReviews = async () => {
        if (!selectedGame) return;
        
        setLoading(true);
        try {
            const response = await axios.get(
                `http://localhost:3000/reviews/${selectedGame.game_id}`, 
                { withCredentials: true }
            );
            setReviews(response.data);
            setCurrentIndex(0);
            setShowReviews(true);
        } catch (err) {
            console.error("Error loading reviews", err);
            if (err.response?.status === 404) {
                setReviews([]);
                setShowReviews(true);
            } else {
                alert("Błąd ładowania recenzji: " + (err.response?.data?.message || err.message));
            }
        } finally {
            setLoading(false);
        }
    };

    const nextReview = () => {
        setCurrentIndex((prev) =>
            prev === reviews.length - 1 ? 0 : prev + 1
        );
    };

    const prevReview = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? reviews.length - 1 : prev - 1
        );
    };

    const loadTopGames = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/games?limit=10&sort=rate',   
        { withCredentials: true }
      );
      const sorted = response.data
        .sort((a, b) => b.rate - a.rate)
        .slice(0, 10);
      setTopGames(sorted);
      setShowTopGames(true);
    } catch (error) {
      console.error("Error fetching top games:", error);
      alert("Failed to load top games");
    }
  };

   
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
                        <input 
                        type="text"
                        className="search-bar"
                        placeholder="Search games..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}/>
          
                     <ul>
                         {currentGames.map((game) => (
                             <li className="game" key={game.game_id}>
                             <button onClick={() => {
                                setSelectedGame(game);
                                setShowReviews(false);
                                setReviews([]);
                             }}>
                                 {game.name}
                             </button>
                             </li>
                         ))}
                     </ul>
                     <div className="pagination-nav">
                        <button className="btn-nav" onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}>
                            ▲
                        </button>
                        <span style={{color: 'gray'}}>{currentPage} / {totalPages}</span>
                        <button className="btn-nav" onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage >= totalPages}>
                            ▼
                        </button>
                    </div>
                 </aside>
 
                 <main className="content">
                     {selectedGame && (
                     <div className="maingame">
                        <div className="game-info">
                        <h1>{selectedGame.name}</h1>
                        <p>Genre: {selectedGame.genre}</p>
                        <p>Price: {selectedGame.price} $</p>
                        <p>Rate: {selectedGame.rate}</p>
                        <button onClick={buyGame}>
                           Buy game
                        </button>

                        <button className="buttonek5" onClick={loadTopGames}> Top 10 games </button>
                        
                         {showTopGames && (
                            <div className="top-games-overlay" onClick={() => setShowTopGames(false)}>
                            <div className="top-games-container" onClick={(e) => e.stopPropagation()}>
                                <button className="close-top-games" onClick={() => setShowTopGames(false)}>X</button>
                                <h2>Top 10 Games</h2>
                                <div className="podium-container">          
                                {topGames.map((game, index) => (
                                    <div 
                                    key={game.game_id} 
                                    className={`podium-item rank-${index + 1}`}
                                    style={{ '--rank': index + 1 }}
                                    >
                                    <div className="rank-number">#{index + 1}</div>
                                    <div className="game-name">{game.name}</div>
                                    <div className="game-rate">  {game.rate}</div>
                                    </div>
                                ))}
                                </div>
                            </div>
                            </div>
                            )}
                       




                         {!showReviews ? (
                            <button className="buttonek4" onClick={handleLoadReviews}>
                                {loading ? "Loading..." : "Check Reviews"}
                            </button>
                        ) : (
                            <>
                                {reviews.length === 0 ? (
                                    <p>No reviews for this game.</p>
                                ) : (
                                    <div className="reviews">
                                        <h4>Review {currentIndex + 1} / {reviews.length}</h4>

                                        <p><strong>User:</strong> {reviews[currentIndex].username || 'Anonymous'}</p>
                                        <p>{reviews[currentIndex].review_text}</p>
                                        <p><strong>Rating: </strong> {reviews[currentIndex].rating}</p>

                                        <div className="review-buttons">
                                            <button onClick={prevReview}>◀</button>
                                            <button onClick={nextReview}>▶</button>
                                            <button onClick={() => setShowReviews(false)}>Hide Reviews</button>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}


                        </div>
                     </div>
                     )}
                 </main>
             </div>
     </>
   )
 }

export default Sklep