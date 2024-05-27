import React, { useState } from 'react';

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
    <div>
      <h1>Bienvenue au Tic-Tac-Toe</h1>
      <input
        type="text"
        placeholder="Nom du joueur 1"
        value={player1}
        onChange={(e) => setPlayer1(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Nom du joueur 2"
        value={player2}
        onChange={(e) => setPlayer2(e.target.value)}
        required
      />
      <button onClick={handleStart}>Commencer</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Welcome;
