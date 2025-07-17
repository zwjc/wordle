import React, { useState, useEffect } from 'react';
import './GeoGuessr.css';

const locations = [
  { name: 'Eiffel Tower, Paris', image: 'https://via.placeholder.com/600x400?text=Eiffel+Tower' },
  { name: 'Statue of Liberty, New York', image: 'https://via.placeholder.com/600x400?text=Statue+of+Liberty' },
  { name: 'Colosseum, Rome', image: 'https://via.placeholder.com/600x400?text=Colosseum' },
  { name: 'Great Wall of China', image: 'https://via.placeholder.com/600x400?text=Great+Wall' },
];

const GeoGuessr: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<{ name: string; image: string } | null>(null);
  const [guess, setGuess] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    startNewRound();
  }, []);

  const startNewRound = () => {
    const randomIndex = Math.floor(Math.random() * locations.length);
    setCurrentLocation(locations[randomIndex]);
    setGuess('');
    setMessage('');
  };

  const handleSubmitGuess = () => {
    if (!currentLocation) return;

    if (guess.toLowerCase().includes(currentLocation.name.toLowerCase().split(',')[0])) {
      setMessage('Correct!');
      setScore(score + 1);
    } else {
      setMessage(`Incorrect. The location was ${currentLocation.name}.`);
    }
    setTimeout(() => {
      startNewRound();
    }, 2000);
  };

  return (
    <div className="geoguessr-game">
      <h1>GeoGuessr (Simplified)</h1>
      <p className="note">Due to environment limitations, this is a simplified version with static images.</p>
      {currentLocation && (
        <div className="location-display">
          <img src={currentLocation.image} alt="Guess this location" className="location-image" />
          <p>Where in the world is this?</p>
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter your guess (e.g., Paris, New York)"
          />
          <button onClick={handleSubmitGuess}>Guess</button>
        </div>
      )}
      {message && <p className="message">{message}</p>}
      <p className="score">Score: {score}</p>
    </div>
  );
};

export default GeoGuessr;