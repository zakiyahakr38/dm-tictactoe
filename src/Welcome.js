import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';

function Welcome({ onStart }) {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [error, setError] = useState('');

  const handleStart = () => {
    if (player1 && player2) {
      onStart(player1, player2);
    } else {
      setError('Les deux noms doivent être remplis.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Bienvenue au Tic-Tac-Toe
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Nom du joueur 1"
          variant="outlined"
          value={player1}
          onChange={(e) => setPlayer1(e.target.value)}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Nom du joueur 2"
          variant="outlined"
          value={player2}
          onChange={(e) => setPlayer2(e.target.value)}
          required
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleStart}
          fullWidth
          sx={{ mt: 3 }}
        >
          Commencer
        </Button>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </Box>
    </Container>
  );
}

export default Welcome;
