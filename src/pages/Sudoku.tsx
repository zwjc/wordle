import { useState, useEffect } from 'react';
import './Sudoku.css';

const generateSudoku = () => {

  const puzzle = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ];

  const solution = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9],
  ];

  return { puzzle, solution };
};

const Sudoku = () => {
  const [board, setBoard] = useState<number[][]>([]);
  const [initialBoard, setInitialBoard] = useState<number[][]>([]);
  const [solutionBoard, setSolutionBoard] = useState<number[][]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const { puzzle, solution } = generateSudoku();
    setBoard(puzzle);
    setInitialBoard(JSON.parse(JSON.stringify(puzzle)));
    setSolutionBoard(solution);
  }, []);

  const handleCellChange = (row: number, col: number, value: number) => {
    if (initialBoard[row][col] !== 0) {
      return;
    }

    const newBoard = board.map((r, rIdx) =>
      r.map((c, cIdx) => (rIdx === row && cIdx === col ? value : c))
    );
    setBoard(newBoard);
  };

  const checkSolution = () => {
    let isCorrect = true;
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] !== solutionBoard[r][c]) {
          isCorrect = false;
          break;
        }
      }
      if (!isCorrect) break;
    }

    if (isCorrect) {
      setMessage('Congratulations! You solved it!');
    } else {
      setMessage('Keep trying! There are errors.');
    }
    setTimeout(() => setMessage(''), 3000);
  };

  const resetBoard = () => {
    setBoard(JSON.parse(JSON.stringify(initialBoard)));
    setMessage('');
  };

  return (
    <div className="sudoku-game">
      <h1>Sudoku</h1>
      {message && <div className="message">{message}</div>}
      <div className="sudoku-board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="sudoku-row">
            {row.map((cell, colIndex) => (
              <input
                key={colIndex}
                type="number"
                min="1"
                max="9"
                value={cell === 0 ? '' : cell}
                onChange={(e) =>
                  handleCellChange(rowIndex, colIndex, parseInt(e.target.value) || 0)
                }
                className={`sudoku-cell ${initialBoard[rowIndex][colIndex] !== 0 ? 'initial' : ''}`}
                readOnly={initialBoard[rowIndex][colIndex] !== 0}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="controls">
        <button onClick={checkSolution}>Check Solution</button>
        <button onClick={resetBoard}>Reset Board</button>
      </div>
    </div>
  );
};

export default Sudoku;