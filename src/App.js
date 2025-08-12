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
  const [difficulty, setDifficulty] = useState('easy');
  const [maxAttempts, setMaxAttempts] = useState(10);
  const [timeLeft, setTimeLeft] = useState(null);
  const [timerActive, setTimerActive] = useState(false);

  const difficultySettings = {
    easy: { min: 1, max: 50, maxAttempts: 10, timeLimit: 120, points: 100 },
    medium: { min: 1, max: 100, maxAttempts: 8, timeLimit: 90, points: 200 },
    hard: { min: 1, max: 200, maxAttempts: 6, timeLimit: 60, points: 300 },
    expert: { min: 1, max: 500, maxAttempts: 5, timeLimit: 45, points: 500 }
  };

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setMessage('⏰ Time\'s up! Game Over!');
      setGameWon(false);
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const generateNewNumber = () => {
    const settings = difficultySettings[difficulty];
    const newNumber = Math.floor(Math.random() * (settings.max - settings.min + 1)) + settings.min;
    setTargetNumber(newNumber);
    setGuess('');
    setMessage('');
    setAttempts(0);
    setGameWon(false);
    setGameStarted(true);
    setMaxAttempts(settings.maxAttempts);
    setTimeLeft(settings.timeLimit);
    setTimerActive(true);
  };

  const handleGuess = () => {
    const guessNum = parseInt(guess);
    const settings = difficultySettings[difficulty];
    
    if (isNaN(guessNum) || guessNum < settings.min || guessNum > settings.max) {
      setMessage(`Please enter a valid number between ${settings.min} and ${settings.max}!`);
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (guessNum === targetNumber) {
      const points = Math.max(0, settings.points - (newAttempts - 1) * 10);
      const timeBonus = timeLeft * 2;
      const totalPoints = points + timeBonus;
      
      setMessage(`🎉 Congratulations! You guessed it in ${newAttempts} attempts! 
                  Points: ${points} + Time Bonus: ${timeBonus} = ${totalPoints} total!`);
      setGameWon(true);
      setTimerActive(false);
      
      // Update high score
      if (!highScore || newAttempts < highScore) {
        setHighScore(newAttempts);
        localStorage.setItem('highScore', newAttempts);
      }
    } else if (newAttempts >= maxAttempts) {
      setMessage(`💀 Game Over! You've used all ${maxAttempts} attempts. The number was ${targetNumber}.`);
      setGameWon(false);
      setTimerActive(false);
    } else if (guessNum < targetNumber) {
      setMessage(`📈 Too low! Try a higher number. (${maxAttempts - newAttempts} attempts left)`);
    } else {
      setMessage(`📉 Too high! Try a lower number. (${maxAttempts - newAttempts} attempts left)`);
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
    setTimerActive(false);
    setTimeLeft(null);
  };

  const resetHighScore = () => {
    setHighScore(null);
    localStorage.removeItem('highScore');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!gameStarted) {
    return (
      <div className="app">
        <div className="game-container">
          <h1 className="title">🎯 Number Guessing Game</h1>
          <p className="description">
            Choose your difficulty and see how quickly you can guess the secret number!
          </p>
          
          <div className="difficulty-selector">
            <h3>Select Difficulty:</h3>
            <div className="difficulty-options">
              {Object.entries(difficultySettings).map(([level, settings]) => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className={`difficulty-btn ${difficulty === level ? 'active' : ''}`}
                >
                  <div className="difficulty-name">{level.toUpperCase()}</div>
                  <div className="difficulty-details">
                    <span>Range: {settings.min}-{settings.max}</span>
                    <span>Attempts: {settings.maxAttempts}</span>
                    <span>Time: {formatTime(settings.timeLimit)}</span>
                    <span>Points: {settings.points}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {highScore && (
            <div className="high-score">
              🏆 Best Score: {highScore} attempts
              <button onClick={resetHighScore} className="reset-score-btn">
                Reset Score
              </button>
            </div>
          )}
          
          <button onClick={generateNewNumber} className="start-btn">
            Start New Game ({difficulty.toUpperCase()})
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="game-container">
        <h1 className="title">🎯 Number Guessing Game</h1>
        
        <div className="game-header">
          <div className="difficulty-badge">
            {difficulty.toUpperCase()}
          </div>
          <div className="timer">
            ⏱️ {formatTime(timeLeft)}
          </div>
        </div>
        
        <div className="game-info">
          <p>Attempts: {attempts}/{maxAttempts}</p>
          <p>Range: {difficultySettings[difficulty].min}-{difficultySettings[difficulty].max}</p>
          {highScore && <p>Best Score: {highScore} attempts</p>}
        </div>

        <div className="input-section">
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Enter your guess (${difficultySettings[difficulty].min}-${difficultySettings[difficulty].max})`}
            className="guess-input"
            disabled={gameWon || attempts >= maxAttempts}
            min={difficultySettings[difficulty].min}
            max={difficultySettings[difficulty].max}
          />
          <button 
            onClick={handleGuess} 
            className="guess-btn"
            disabled={gameWon || !guess || attempts >= maxAttempts}
          >
            Guess!
          </button>
        </div>

        {message && (
          <div className={`message ${gameWon ? 'success' : attempts >= maxAttempts ? 'error' : 'info'}`}>
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
            <div className="points-display">
              <span>🏆 Difficulty: {difficulty.toUpperCase()}</span>
              <span>⚡ Time Bonus: +{timeLeft * 2} points</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
