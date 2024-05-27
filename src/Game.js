import React, { useState, useEffect } from 'react';
import Board from './Board';
import Welcome from './Welcome';

function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null), move: null }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [isGameActive, setIsGameActive] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  const winningSquares = winner ? winner.line : [];

  useEffect(() => {
    if (winner && !gameFinished) {
      if (winner.player === 'X') {
        setScores((prevScores) => ({ ...prevScores, player1: prevScores.player1 + 1 }));
      } else {
        setScores((prevScores) => ({ ...prevScores, player2: prevScores.player2 + 1 }));
      }
      setGameFinished(true);
    }
  }, [winner, gameFinished]);

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[historyPoint.length - 1];
    const squares = current.squares.slice();
    if (winner || squares[i]) return;

    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(history.concat([{ squares: squares, move: i }]));
    setStepNumber(historyPoint.length);
    setXIsNext(!xIsNext);
    setGameFinished(false);
  };

  const handleStart = (p1, p2) => {
    setPlayer1(p1);
    setPlayer2(p2);
    setIsGameActive(true);
  };

  const handleQuit = () => {
    setIsGameActive(false);
    setHistory([{ squares: Array(9).fill(null), move: null }]);
    setStepNumber(0);
    setXIsNext(true);
    setGameFinished(false);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
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

  const moves = history.map((step, move) => {
    const desc = move ?
      `Go to move #${move} (${Math.floor(step.move / 3)}, ${step.move % 3})` :
      'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return isGameActive ? (
    <div className="game">
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
        <ol>{moves}</ol>
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
