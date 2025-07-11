import './Games.css'
import { Link } from 'react-router-dom';

function Games() {

  return (
    <>
      <h1>Games</h1>
      <div className="game-cards">
        <div className="card">
          <h2>Wordle</h2>
          <Link to="/wordle"><button>Play</button></Link>
        </div>
        <div className="card">
          <h2>Quizzes</h2>
          <Link to="/quizzes"><button>Play</button></Link>
        </div>
        <div className="card">
          <h2>GeoGuessr</h2>
          <Link to="/geoguessr"><button>Play</button></Link>
        </div>
        <div className="card">
          <h2>Tic Tac Toe</h2>
          <Link to="/tictactoe"><button>Play</button></Link>
        </div>
        <div className="card">
          <h2>Hangman</h2>
          <Link to="/hangman"><button>Play</button></Link>
        </div>
        <div className="card">
          <h2>Sudoku</h2>
          <Link to="/sudoku"><button>Play</button></Link>
        </div>
        <div className="card">
          <h2>Crossword</h2>
          <Link to="/crossword"><button>Play</button></Link>
        </div>
      </div>
    </>
  )
}

export default Games
