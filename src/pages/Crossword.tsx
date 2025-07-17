import React, { useState, useEffect } from 'react';
import './Crossword.css';

interface Cell {
  letter: string;
  isBlack: boolean;
  clueNumber?: number;
  acrossWord?: string;
  downWord?: string;
}

const initialPuzzle: Cell[][] = [
  [{ letter: '', isBlack: false, clueNumber: 1, acrossWord: 'REACT' }, { letter: '', isBlack: false }, { letter: '', isBlack: false }, { letter: '', isBlack: false }, { letter: '', isBlack: false }],
  [{ letter: '', isBlack: false, clueNumber: 2, downWord: 'APPLE' }, { letter: '', isBlack: true }, { letter: '', isBlack: false, clueNumber: 3, acrossWord: 'PIE' }, { letter: '', isBlack: true }, { letter: '', isBlack: false, clueNumber: 4, downWord: 'EAT' }],
  [{ letter: '', isBlack: false }, { letter: '', isBlack: true }, { letter: '', isBlack: false }, { letter: '', isBlack: true }, { letter: '', isBlack: false }],
  [{ letter: '', isBlack: false, clueNumber: 5, acrossWord: 'CODE' }, { letter: '', isBlack: false }, { letter: '', isBlack: false }, { letter: '', isBlack: false }, { letter: '', isBlack: true }],
  [{ letter: '', isBlack: true }, { letter: '', isBlack: false, clueNumber: 6, downWord: 'DOG' }, { letter: '', isBlack: false }, { letter: '', isBlack: false }, { letter: '', isBlack: true }],
];

const solutionWords = {
  REACT: 'REACT',
  APPLE: 'APPLE',
  PIE: 'PIE',
  EAT: 'EAT',
  CODE: 'CODE',
  DOG: 'DOG',
};

const clues = {
  across: {
    1: 'JavaScript library for building user interfaces (5 letters)',
    3: 'Dessert often served with ice cream (3 letters)',
    5: 'Write computer programs (4 letters)',
  },
  down: {
    2: 'Common fruit (5 letters)',
    4: 'Consume food (3 letters)',
    6: "Man's best friend (3 letters)",
  },
};

const Crossword: React.FC = () => {
  const [puzzle, setPuzzle] = useState<Cell[][]>(initialPuzzle);
  const [message, setMessage] = useState<string>('');

  const handleInputChange = (row: number, col: number, value: string) => {
    const newPuzzle = puzzle.map((r, rIdx) =>
      r.map((c, cIdx) => {
        if (rIdx === row && cIdx === col) {
          return { ...c, letter: value.toUpperCase() };
        }
        return c;
      })
    );
    setPuzzle(newPuzzle);
  };

  const checkSolution = () => {
    let allCorrect = true;

    // Check Across words
    for (const clueNum in clues.across) {
      const wordKey = initialPuzzle.flat().find(cell => cell.clueNumber === parseInt(clueNum) && cell.acrossWord)?.acrossWord;
      if (wordKey) {
        let currentWord = '';
        let startRow = -1;
        let startCol = -1;

        // Find starting position of the word
        for(let r = 0; r < puzzle.length; r++) {
            for(let c = 0; c < puzzle[r].length; c++) {
                if(initialPuzzle[r][c].clueNumber === parseInt(clueNum) && initialPuzzle[r][c].acrossWord === wordKey) {
                    startRow = r;
                    startCol = c;
                    break;
                }
            }
            if(startRow !== -1) break;
        }

        if(startRow !== -1 && startCol !== -1) {
            for (let i = 0; i < wordKey.length; i++) {
                currentWord += puzzle[startRow][startCol + i].letter;
            }
            if (currentWord !== solutionWords[wordKey as keyof typeof solutionWords]) {
                allCorrect = false;
                break;
            }
        }
      }
    }

    // Check Down words
    if (allCorrect) {
        for (const clueNum in clues.down) {
            const wordKey = initialPuzzle.flat().find(cell => cell.clueNumber === parseInt(clueNum) && cell.downWord)?.downWord;
            if (wordKey) {
                let currentWord = '';
                let startRow = -1;
                let startCol = -1;

                // Find starting position of the word
                for(let r = 0; r < puzzle.length; r++) {
                    for(let c = 0; c < puzzle[r].length; c++) {
                        if(initialPuzzle[r][c].clueNumber === parseInt(clueNum) && initialPuzzle[r][c].downWord === wordKey) {
                            startRow = r;
                            startCol = c;
                            break;
                        }
                    }
                    if(startRow !== -1) break;
                }

                if(startRow !== -1 && startCol !== -1) {
                    for (let i = 0; i < wordKey.length; i++) {
                        currentWord += puzzle[startRow + i][startCol].letter;
                    }
                    if (currentWord !== solutionWords[wordKey as keyof typeof solutionWords]) {
                        allCorrect = false;
                        break;
                    }
                }
            }
        }
    }

    if (allCorrect) {
      setMessage('Congratulations! You solved the crossword!');
    } else {
      setMessage('Some words are incorrect. Keep trying!');
    }
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="crossword-game">
      <h1>Crossword</h1>
      {message && <div className="message">{message}</div>}
      <div className="crossword-grid">
        {puzzle.map((row, rowIndex) => (
          <div key={rowIndex} className="crossword-row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`crossword-cell ${cell.isBlack ? 'black' : ''}`}
              >
                {!cell.isBlack && (
                  <>
                    {cell.clueNumber && <span className="clue-number">{cell.clueNumber}</span>}
                    <input
                      type="text"
                      maxLength={1}
                      value={cell.letter}
                      onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="clues">
        <div className="clues-across">
          <h2>Across</h2>
          <ul>
            {Object.entries(clues.across).map(([num, clue]) => (
              <li key={num}><strong>{num}.</strong> {clue}</li>
            ))}
          </ul>
        </div>
        <div className="clues-down">
          <h2>Down</h2>
          <ul>
            {Object.entries(clues.down).map(([num, clue]) => (
              <li key={num}><strong>{num}.</strong> {clue}</li>
            ))}
          </ul>
        </div>
      </div>
      <button onClick={checkSolution}>Check Solution</button>
    </div>
  );
};

export default Crossword;