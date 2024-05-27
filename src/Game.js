import React, { useState } from 'react';
import Board from './Board';
import Welcome from './Welcome';

function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [isGameActive, setIsGameActive] = useState(false);

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  const winningSquares = winner ? winner.line : [];

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[historyPoint.length - 1];
    const squares = current.squares.slice();
    if (winner || squares[i]) return;

    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(history.concat([{ squares: squares }]));
    setStepNumber(historyPoint.length);
    setXIsNext(!xIsNext);
  };

  const handleStart = (p1, p2) => {
    setPlayer1(p1);
    setPlayer2(p2);
    setIsGameActive(true);
  };

  const handleQuit = () => {
    setIsGameActive(false);
    setHistory([{ squares: Array(9).fill(null) }]);
    setStepNumber(0);
    setXIsNext(true);
  };

  const getStatus = () => {
    if (winner) {
      const winnerName = winner.player === 'X' ? player1 : player2;
      return `Winner: ${winnerName}`;
    } else {
      const nextPlayerName = xIsNext ? player1 : player2;
      return `Next player: ${nextPlayerName}`;
    }
  };

  return isGameActive ? (
    <div>
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={handleClick}
          winningSquares={winningSquares}
        />
      </div>
      <div className="game-info">
        <div>{getStatus()}</div>
        <div>Scores: {player1} {scores.player1} - {player2} {scores.player2}</div>
        <button onClick={handleQuit}>Quitter</button>
      </div>
    </div>
  ) : (
    <Welcome onStart={handleStart} />
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { player: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

export default Game;
