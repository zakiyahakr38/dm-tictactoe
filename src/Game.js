import React, { useState, useEffect } from 'react';
import Board from './Board';
import Welcome from './Welcome';
import { Container, Box, Typography, Button, Grid, Alert } from '@mui/material';

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
    setHistory([{ squares: Array(9).fill(null), move: null }]);
    setStepNumber(0);
    setXIsNext(true);
    setGameFinished(false);
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
    setGameFinished(false); // Réinitialiser les touches de l'ancienne partie
  };

  const getStatus = () => {
    if (winner) {
      const winnerName = winner.player === 'X' ? player1 : player2;
      return `Gagnant : ${winnerName}`;
    } else {
      const nextPlayerName = xIsNext ? player1 : player2;
      return `Prochain joueur : ${nextPlayerName}`;
    }
  };

  const moves = history.map((step, move) => {
    const desc = move ?
      `Aller au coup #${move} (${Math.floor(step.move / 3)}, ${step.move % 3})` :
      'Revenir au début';
    return (
      <li key={move}>
        <Button onClick={() => jumpTo(move)}>{desc}</Button>
      </li>
    );
  });

  return isGameActive ? (
    <Container>
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Box className="game-board">
              <Board
                squares={current.squares}
                onClick={handleClick}
                winningSquares={winningSquares}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box className="game-info">
              <Typography variant="h5">{getStatus()}</Typography>
              <Typography variant="h6">
                Scores: {player1} {scores.player1} - {player2} {scores.player2}
              </Typography>
              <Button variant="contained" color="secondary" onClick={handleQuit}>
                Quitter
              </Button>
              <ol>{moves}</ol>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
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
