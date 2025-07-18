
import React, { useState, useEffect, useCallback } from 'react';
import './Wordle.css';

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;

type LetterStatus = 'correct' | 'present' | 'absent' | 'default';

type LetterStatuses = { [key: string]: LetterStatus };

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  letterStatuses: LetterStatuses;
}

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress, letterStatuses }) => {
  const row1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
  const row2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
  const row3 = ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace'];

  const getKeyStatus = (key: string): LetterStatus => {
    return letterStatuses[key] || 'default';
  };

  return (
    <div className="keyboard">
      {row1.map((k, i) => (
        <button
          key={k}
          style={{ gridRow: 1, gridColumn: i + 1 }}
          className={`key ${getKeyStatus(k)}`}
          onClick={() => onKeyPress(k)}
        >{k}</button>
      ))}
      {row2.map((k, i) => (
        <button
          key={k}
          style={{ gridRow: 2, gridColumn: i + 2 }}
          className={`key ${getKeyStatus(k)}`}
          onClick={() => onKeyPress(k)}
        >{k}</button>
      ))}
      {row3.map((k, i) => (
        <button
          key={k}
          style={{
            gridRow: 3,
            gridColumn: k === 'enter' ? '1 / span 2'
                        : k === 'backspace' ? '9 / span 2'
                        : i + 2, 
          }}
          className={`key ${k.length > 1 ? 'wide' : ''} ${getKeyStatus(k)}`}
          onClick={() => onKeyPress(k)}
        >{k === 'backspace' ? '⌫' : k}</button>
      ))}
    </div>
  );
};

const Wordle: React.FC = () => {
  const [solution, setSolution] = useState<string>('');
  const [guesses, setGuesses] = useState<string[]>(Array(MAX_GUESSES).fill(''));
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [letterStatuses, setLetterStatuses] = useState<LetterStatuses>({});

  const handleEnter = useCallback(() => {
    if (isGameOver) return;

    if (currentGuess.length !== WORD_LENGTH) {
      setMessage('Not enough letters');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    const newGuesses = [...guesses];
    newGuesses[currentRow] = currentGuess;
    setGuesses(newGuesses);

    const newLetterStatuses: LetterStatuses = { ...letterStatuses };
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

    const isWinner = currentGuess === solution;
    if (isWinner) {
      setIsGameOver(true);
      setMessage('You win!');
    } else if (currentRow + 1 >= MAX_GUESSES) {
      setIsGameOver(true);
      setMessage(`You lose! The word was: ${solution.toUpperCase()}`);
    }

    setCurrentRow((prevRow) => prevRow + 1);
    setCurrentGuess('');
  }, [currentGuess, currentRow, guesses, isGameOver, letterStatuses, solution]);

  const handleChar = useCallback((char: string) => {
    if (currentGuess.length < WORD_LENGTH) {
      setCurrentGuess((prev) => prev + char);
    }
  }, [currentGuess.length]);

  const handleBackspace = useCallback(() => {
    setCurrentGuess((prev) => prev.slice(0, -1));
  }, []);

  const handleKeyPress = useCallback((key: string) => {
    if (isGameOver) return;
    if (key === 'enter') {
      handleEnter();
    } else if (key === 'backspace') {
      handleBackspace();
    } else {
      handleChar(key);
    }
  }, [isGameOver, handleEnter, handleBackspace, handleChar]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;
      handleKeyPress(key.toLowerCase());
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress]);

  useEffect(() => {
    setSolution("cloud"); //** PALCEHOLDER */
  }, []);

  const getTileClass = (rowIndex: number, colIndex: number): string => {
    const guess = guesses[rowIndex];
    const char = guess[colIndex];

    if (rowIndex >= currentRow) {
      return 'tile';
    }
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
        {guesses.map((guess: string, rowIndex: number) => (
          <div key={rowIndex} className="row">
            {Array.from({ length: WORD_LENGTH }).map((_, colIndex: number) => (
              <div key={colIndex} className={getTileClass(rowIndex, colIndex)}>
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
