import React from 'react';

function Square(props) {
  return (
    <button
      className={props.isWinning ? 'square winner' : 'square'}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

export default Square;
