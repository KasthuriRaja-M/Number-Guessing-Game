import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [targetNumber, setTargetNumber] = useState(null);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [highScore, setHighScore] = useState(localStorage.getItem('highScore') || null);

  const generateNewNumber = () => {
    const newNumber = Math.floor(Math.random() * 100) + 1;
    setTargetNumber(newNumber);
    setGuess('');
    setMessage('');
    setAttempts(0);
    setGameWon(false);
    setGameStarted(true);
  };

  const handleGuess = () => {
    const guessNum = parseInt(guess);
    
    if (isNaN(guessNum) || guessNum < 1 || guessNum > 100) {
      setMessage('Please enter a valid number between 1 and 100!');
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (guessNum === targetNumber) {
      setMessage(`🎉 Congratulations! You guessed it in ${newAttempts} attempts!`);
      setGameWon(true);
      
      // Update high score
      if (!highScore || newAttempts < highScore) {
        setHighScore(newAttempts);
        localStorage.setItem('highScore', newAttempts);
      }
    } else if (guessNum < targetNumber) {
      setMessage('📈 Too low! Try a higher number.');
    } else {
      setMessage('📉 Too high! Try a lower number.');
    }
    
    setGuess('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleGuess();
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setTargetNumber(null);
    setGuess('');
    setMessage('');
    setAttempts(0);
    setGameWon(false);
  };

  const resetHighScore = () => {
    setHighScore(null);
    localStorage.removeItem('highScore');
  };

  if (!gameStarted) {
    return (
      <div className="app">
        <div className="game-container">
          <h1 className="title">🎯 Number Guessing Game</h1>
          <p className="description">
            I'm thinking of a number between 1 and 100. Can you guess it?
          </p>
          
          {highScore && (
            <div className="high-score">
              🏆 Best Score: {highScore} attempts
              <button onClick={resetHighScore} className="reset-score-btn">
                Reset Score
              </button>
            </div>
          )}
          
          <button onClick={generateNewNumber} className="start-btn">
            Start New Game
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="game-container">
        <h1 className="title">🎯 Number Guessing Game</h1>
        
        <div className="game-info">
          <p>Attempts: {attempts}</p>
          {highScore && <p>Best Score: {highScore} attempts</p>}
        </div>

        <div className="input-section">
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter your guess (1-100)"
            className="guess-input"
            disabled={gameWon}
            min="1"
            max="100"
          />
          <button 
            onClick={handleGuess} 
            className="guess-btn"
            disabled={gameWon || !guess}
          >
            Guess!
          </button>
        </div>

        {message && (
          <div className={`message ${gameWon ? 'success' : 'info'}`}>
            {message}
          </div>
        )}

        <div className="actions">
          <button onClick={generateNewNumber} className="new-game-btn">
            New Game
          </button>
          <button onClick={resetGame} className="reset-btn">
            Back to Menu
          </button>
        </div>

        {gameWon && (
          <div className="celebration">
            <div className="fireworks">🎆</div>
            <p>You're amazing! 🎉</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
