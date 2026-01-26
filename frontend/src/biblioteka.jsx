import logo from './assets/logo2.png'
import './biblioteka.css'
import './logowanie'
import './sklep'
import './gra'
import {fetchGames} from './api/gry';
import { useNavigate } from "react-router-dom"
import {useState, useEffect} from 'react';
import axios from 'axios';
import ReviewForm from './ReviewForm';


const Biblioteka = () =>{

    const navigate = useNavigate()

    const [games, setGames] = useState([]);
    const [selectedGame, setSelectedGame] = useState(null);
    const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);

    const [reviews, setReviews] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showReviews, setShowReviews] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadGames = async() => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/libraries/${localStorage.getItem('user_id')}`, 
                    { withCredentials: true }
                );
                console.log(response)
                setGames(response.data.map(item => ({
                    ...item.game,
                    id: item.game.game_id,
                })));
            } catch (error) {
                console.error("Error fetching games:", error);
            }
        }
        loadGames();
  
    }, []);

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:3000/auth/logout', {}, { withCredentials: true });

            console.log("Logged out:", response.data);
            localStorage.removeItem('user_id');
            navigate("/logowanie");
        } catch (error) {
            console.error("Logout failed:", error);
            alert("Błąd logowania: " + (error.response?.data?.message || error.message));
        }
    }

    const addToFavouritesHandle = async () => {
        try {
            await axios.put(
                `http://localhost:3000/libraries/${localStorage.getItem('user_id')}/games/${selectedGame.id}/favourite`,
                {}, 
                { withCredentials: true }
            );

            const updatedFavStatus = !selectedGame.favourites;
            
            setSelectedGame(prev => ({ ...prev, favourites: updatedFavStatus }));

            setGames(prevGames => prevGames.map(g => 
                g.id === selectedGame.id 
                    ? { ...g, favourites: updatedFavStatus } 
                    : g
            ));
        } catch (error) {
            console.error("Error adding to favourites:", error);
            alert("Błąd podczas dodawania do ulubionych: " + (error.response?.data?.message || error.message));
        }
    }

    const handleReviewSubmit = async ({ rating, reviewText }) => {
        try {
            await axios.post('http://localhost:3000/reviews', {
                rating: parseInt(rating),
                review_text: reviewText,
                game_id: selectedGame.id,
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
                `http://localhost:3000/reviews/${selectedGame.id}`,
                { withCredentials: true }
            );
            setReviews(response.data);
            setCurrentIndex(0);
            setShowReviews(true);
        } catch (err) {
            console.error("Error loading reviews", err);
            alert("Błąd ładowania recenzji: " + (err.response?.data?.message || err.message));
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

    return (
      <>
          <div>
              <button className="buttonek" onClick={() => handleLogout()}>
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
                            <li className="game" key={game.id}>
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
                </aside>

                <main className="content">
                    {selectedGame && (
                    <div className="maingame">
                        <div className="game-info">
                        <h1>{selectedGame.name}</h1>
                        <p>Genre: {selectedGame.genre}</p>
                        <p>Price: {selectedGame.price}</p>
                        <p>Rate: {selectedGame.rate}</p>
                        
                        <button onClick={() => addToFavouritesHandle()}>
                            {selectedGame.favourites ? "Remove from favourites" : "Add to favourites"}
                        </button>
                        
                        <button className="buttonek2" onClick={() => setIsReviewFormOpen(true)}>
                            Write a review
                        </button>
                        
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

                        {isReviewFormOpen && (
                            <ReviewForm 
                                onSubmit={handleReviewSubmit}
                                onCancel={() => setIsReviewFormOpen(false)}
                            />
                        )}
                        </div>
                    </div>
                    )}
                </main>
            </div>
      </>
    )
}

export default Biblioteka