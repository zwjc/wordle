import React, { useState, useEffect } from 'react';
import './Memory.css';

const EMOJIS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);

  useEffect(() => {
    const shuffledCards = [...EMOJIS, ...EMOJIS].sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  }, []);

  const handleClick = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || solved.includes(index)) {
      return;
    }

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [firstIndex, secondIndex] = newFlipped;
      if (cards[firstIndex] === cards[secondIndex]) {
        setSolved([...solved, firstIndex, secondIndex]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="memory-game">
      <h1>Memory Game</h1>
      <div className="card-grid">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${flipped.includes(index) || solved.includes(index) ? 'flipped' : ''}`}
            onClick={() => handleClick(index)}
          >
            <div className="card-inner">
              <div className="card-front">?</div>
              <div className="card-back">{card}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;
