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

    const [transactions, setTransactions] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const gamesPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const transactionsPerPage = 3;
    const [currentTransactionPage, setCurrentTransactionPage] = useState(1);

    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);
    const totalPages = Math.ceil(games.length / gamesPerPage) || 1;

    const indexOfLastTransaction = currentTransactionPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
    const totalTransactionPages = Math.ceil(transactions.length / transactionsPerPage) || 1;

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

        const loadTransactions = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/transactions/${localStorage.getItem('user_id')}`,
                    { withCredentials: true }
                );
                setTransactions(response.data);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };

        loadGames();
        loadTransactions();
  
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

    const handleConfirmTransaction = async () => {
        try {
            const response = await axios.put(
                `http://localhost:3000/transactions/${selectedTransaction.transaction_id}/complete`,
                {}, 
                { withCredentials: true }
            );
            
            alert("Transaction confirmed successfully!");
            setSelectedTransaction(null);
            window.location.reload();
        } catch (error) {
            console.error("Error confirming transaction:", error);
            alert("Error confirming transaction: " + (error.response?.data?.message || error.message));
        }
    };

    const handleCancelTransaction = async () => {
        try {
            await axios.delete(
                `http://localhost:3000/transactions/${selectedTransaction.transaction_id}/cancel`,
                { withCredentials: true }
            );
            
            alert("Transaction cancelled successfully!");
            setSelectedTransaction(null);
            window.location.reload();
        } catch (error) {
            console.error("Error cancelling transaction:", error);
            alert("Error cancelling transaction: " + (error.response?.data?.message || error.message));
        }
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
                        {currentGames.map((game) => (
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
                    {selectedGame ? (
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
                    ) : (
                    <div className="maingame">
                        <div className="game-info" style={{border: 'none', boxShadow: 'none'}}>
                            {/* <h1>Transaction History</h1> */}
                            <div className="transactions-grid">
                                {currentTransactions.length === 0 ? (
                                    <p>No transactions found.</p>
                                ) : (
                                    currentTransactions.map((transaction) => (
                                        <div 
                                            key={transaction.transaction_id} 
                                            className="transaction-card"
                                            onClick={() => setSelectedTransaction(transaction)}
                                            style={{cursor: 'pointer'}}
                                        >
                                            <h3>{transaction.game_name}</h3>
                                            <p><strong>Game:</strong> {transaction.game.name}</p>
                                            <p>
                                                <strong>Date:</strong> {
                                                    transaction.status == "WAITING" 
                                                        ? new Date(transaction.created_at).toLocaleDateString()
                                                        : new Date(transaction.completed_at).toLocaleString()
                                                }
                                            </p>
                                            <p><strong>Status:</strong> {transaction.status}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                            {transactions.length > 0 && (
                                <div className="pagination-controls">
                                    <button 
                                        className="btn-nav" 
                                        onClick={() => setCurrentTransactionPage(p => p - 1)} 
                                        disabled={currentTransactionPage === 1}
                                    >
                                        ◀
                                    </button>
                                    <span style={{color: '#fff', margin: '0 15px'}}>
                                        {currentTransactionPage} / {totalTransactionPages}
                                    </span>
                                    <button 
                                        className="btn-nav" 
                                        onClick={() => setCurrentTransactionPage(p => p + 1)} 
                                        disabled={currentTransactionPage >= totalTransactionPages}
                                    >
                                        ▶
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    )}
                </main>
            </div>

            {selectedTransaction && (
                <div className="modal-overlay" onClick={() => setSelectedTransaction(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Transaction Details</h2>
                        <div className="transaction-details">
                            <p><strong>Transaction ID:</strong> {selectedTransaction.transaction_id}</p>
                            <p><strong>Game:</strong> {selectedTransaction.game.name}</p>
                            <p><strong>Date:</strong> {
                                selectedTransaction.status == "WAITING" 
                                ? new Date(selectedTransaction.created_at).toLocaleDateString()
                                : new Date(selectedTransaction.completed_at).toLocaleString()
                            }</p>
                            <p><strong>Price:</strong> {selectedTransaction.amount}</p>
                            {selectedTransaction.status && (
                                <p><strong>Status:</strong> {selectedTransaction.status}</p>
                            )}
                        </div>
                        <div className="modal-buttons">
                            {selectedTransaction.status !== 'COMPLETED' && (
                                <>
                                    <button className="btn-confirm" onClick={handleConfirmTransaction}>
                                        Confirm Transaction
                                    </button>
                                    <button className="btn-cancel" onClick={handleCancelTransaction}>
                                        Cancel Transaction
                                    </button>
                                </>
                            )}
                            <button className="btn-close" onClick={() => setSelectedTransaction(null)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
      </>
    )
}

export default Biblioteka