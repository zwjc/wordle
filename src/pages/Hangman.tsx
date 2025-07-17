
import React, { useState, useEffect } from 'react';
import './Hangman.css';

const words: string[] = ['react', 'javascript', 'typescript', 'html', 'css'];

const Hangman: React.FC = () => {
  const [selectedWord, setSelectedWord] = useState<string>('');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState<number>(0);

  useEffect(() => {
    setSelectedWord(words[Math.floor(Math.random() * words.length)]);
  }, []);

  const handleGuess = (letter: string) => {
    if (guessedLetters.includes(letter)) return;

    setGuessedLetters([...guessedLetters, letter]);

    if (!selectedWord.includes(letter)) {
      setWrongGuesses(wrongGuesses + 1);
    }
  };

  const isWinner: boolean = selectedWord.split('').every(letter => guessedLetters.includes(letter));
  const isLoser: boolean = wrongGuesses >= 6;

  const wordToShow: string = selectedWord
    .split('')
    .map(letter => (guessedLetters.includes(letter) ? letter : '_'))
    .join(' ');

  const alphabet: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');

  return (
    <div className="hangman-game">
      <h1>Hangman</h1>
      <div className="hangman-drawing">
        <div className={`scaffold ${wrongGuesses > 0 ? 'show' : ''}`}></div>
        <div className={`head ${wrongGuesses > 1 ? 'show' : ''}`}></div>
        <div className={`body ${wrongGuesses > 2 ? 'show' : ''}`}></div>
        <div className={`left-arm ${wrongGuesses > 3 ? 'show' : ''}`}></div>
        <div className={`right-arm ${wrongGuesses > 4 ? 'show' : ''}`}></div>
        <div className={`left-leg ${wrongGuesses > 5 ? 'show' : ''}`}></div>
        <div className={`right-leg ${wrongGuesses > 5 ? 'show' : ''}`}></div>
      </div>
      <p className="word-to-show">{wordToShow}</p>
      <div className="keyboard">
        {alphabet.map((letter: string) => (
          <button
            key={letter}
            onClick={() => handleGuess(letter)}
            disabled={guessedLetters.includes(letter) || isWinner || isLoser}
          >
            {letter}
          </button>
        ))}
      </div>
      {isWinner && <p className="message">You win!</p>}
      {isLoser && <p className="message">You lose! The word was: {selectedWord}</p>}
    </div>
  );
};

export default Hangman;
