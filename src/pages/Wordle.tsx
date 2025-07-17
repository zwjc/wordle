import React, { useState, useEffect } from 'react';
import './Wordle.css';

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;

const Keyboard = ({ onKeyPress, letterStatuses }) => {
  const row1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
  const row2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
  const row3 = ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace'];

  const getKeyStatus = (key) => {
    return letterStatuses[key] || '';
  };

  return (
    <div className="keyboard">
      <div className="keyboard-row">
        {row1.map((key) => (
          <button key={key} className={`key ${getKeyStatus(key)}`} onClick={() => onKeyPress(key)}>
            {key}
          </button>
        ))}
      </div>
      <div className="keyboard-row">
        {row2.map((key) => (
          <button key={key} className={`key ${getKeyStatus(key)}`} onClick={() => onKeyPress(key)}>
            {key}
          </button>
        ))}
      </div>
      <div className="keyboard-row">
        {row3.map((key) => (
          <button
            key={key}
            className={`key ${key.length > 1 ? 'wide' : ''} ${getKeyStatus(key)}`}
            onClick={() => onKeyPress(key)}
          >
            {key === 'backspace' ? '⌫' : key}
          </button>
        ))}
      </div>
    </div>
  );
};

const Wordle = () => {
  const [solution, setSolution] = useState('');
  const [guesses, setGuesses] = useState(Array(MAX_GUESSES).fill(''));
  const [currentGuess, setCurrentGuess] = useState('');
  const [currentRow, setCurrentRow] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [message, setMessage] = useState('');
  const [letterStatuses, setLetterStatuses] = useState({});

  useEffect(() => {
    // In a real app, you'd fetch this from your backend
    // For now, we'll use a placeholder.
    // fetch('http://localhost:8787/api/word')
    //   .then(res => res.json())
    //   .then(data => setSolution(data.word.toLowerCase()));
    setSolution("react"); // Placeholder
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isGameOver) return;

      const { key } = event;
      if (key === 'Enter') {
        handleEnter();
      } else if (key === 'Backspace') {
        handleBackspace();
      } else if (key.length === 1 && key.match(/[a-z]/i)) {
        handleChar(key.toLowerCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentGuess, isGameOver, currentRow, guesses, solution]);

  const handleKeyPress = (key) => {
    if (isGameOver) return;

    if (key === 'enter') {
      handleEnter();
    } else if (key === 'backspace') {
      handleBackspace();
    } else {
      handleChar(key);
    }
  };

  const handleChar = (char) => {
    if (currentGuess.length < WORD_LENGTH) {
      setCurrentGuess(currentGuess + char);
    }
  };

  const handleBackspace = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  const handleEnter = () => {
    if (currentGuess.length !== WORD_LENGTH) {
      setMessage('Not enough letters');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    if (currentRow >= MAX_GUESSES) {
      return;
    }

    const newGuesses = [...guesses];
    newGuesses[currentRow] = currentGuess;
    setGuesses(newGuesses);

    // Update letter statuses
    const newLetterStatuses = { ...letterStatuses };
    for (let i = 0; i < currentGuess.length; i++) {
        const char = currentGuess[i];
        if (solution[i] === char) {
            newLetterStatuses[char] = 'correct';
        } else if (solution.includes(char)) {
            if (newLetterStatuses[char] !== 'correct') {
                newLetterStatuses[char] = 'present';
            }
        } else {
            newLetterStatuses[char] = 'absent';
        }
    }
    setLetterStatuses(newLetterStatuses);


    if (currentGuess === solution) {
      setIsGameOver(true);
      setMessage('You win!');
      return;
    }

    setCurrentRow(currentRow + 1);
    setCurrentGuess('');

    if (currentRow + 1 >= MAX_GUESSES) {
      setIsGameOver(true);
      setMessage(`You lose! The word was: ${solution.toUpperCase()}`);
    }
  };

  const getTileClass = (rowIndex, colIndex) => {
    const guess = guesses[rowIndex];
    const char = guess[colIndex];
    const submitted = rowIndex < currentRow;

    if (!submitted || !char) return 'tile';

    if (solution[colIndex] === char) {
      return 'tile correct';
    }
    if (solution.includes(char)) {
      return 'tile present';
    }
    return 'tile absent';
  };


  return (
    <div className="wordle-game">
      <h1>Wordle</h1>
      {message && <div className="message">{message}</div>}
      <div className="grid">
        {guesses.map((guess, rowIndex) => (
          <div key={rowIndex} className="row">
            {Array.from({ length: WORD_LENGTH }).map((_, colIndex) => (
              <div
                key={colIndex}
                className={rowIndex < currentRow ? getTileClass(rowIndex, colIndex) : 'tile'}
              >
                {rowIndex === currentRow ? currentGuess[colIndex] : guess[colIndex]}
              </div>
            ))}
          </div>
        ))}
      </div>
      <Keyboard onKeyPress={handleKeyPress} letterStatuses={letterStatuses} />
    </div>
  );
};

export default Wordle;