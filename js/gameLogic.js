/* eslint-disable camelcase */
import {
  paintOverWinCells,

} from './draw';

const crossWins = document.querySelector('.game-score-for-cross');
const zerosWins = document.querySelector('.game-score-for-zeros');
const playerMoveNumber = document.querySelector('.player__move-number');

const templateZero = '<img class="image-symbol zero-img" src="images/zero.png" alt="zero">';
const templateCross = '<img class="image-symbol cross-img" src="images/cross.png" alt="cross">';

export let n = 0;
export let k = 0;

let moveNumber = 0;
let winCounterForCross = 0;
let winCounterForZeros = 0;
// let drawCondition = 0;

export let win = false;

export const setGameConditionsFor3x3 = () => {
  n = 3;
  k = 3;
};

export const resetWinCounter = () => {
  winCounterForCross = 0;
  winCounterForZeros = 0;
  zerosWins.innerHTML = '0';
  crossWins.innerHTML = '0';
};

export function resetPlayingField(playingField, gameMenu) {
  playingField.innerHTML = '';
  gameMenu.classList.add('hidden');
  win = false;
  moveNumber = 0;
};

export function resetPlayingMatrix(arr) {
  for (let i = 0; i < arr.length; i++) {
    resetRow(arr[i]);
  }
  return arr;
};
function resetRow(row) {
  for (let i = 0; i < row.length; i++) {
    row[i] = 0;
  }
  return row;
};

export function resetGameCells(playingField) {
  win = false;
  for (const row of playingField.children) {
    for (const cell of row.children) {
      cell.innerHTML = '';
      cell.className = 'cell';
    }
  }
  moveNumber = 0;
  playerMoveNumber.innerHTML = 'Ходят крестики ❌';
}

export function createMatrix(n) {
  const result = [];

  for (let i = 0; i < n; i++) {
    result.push(new Array(n).fill(0));
  }
  return result;
};

function checkDiagonalWinner(gameCellState, matrix, updateRowCallback, updateDiagonalCallback) {
  const {
    coordinates: {
      line,
      column,
    },
    numberOfSymbolsToWin,
  } = gameCellState;

  let outputCoordinates = [];

  for (let i = 0, counter = 0, row = line, diagonal = column; i < matrix[line].length; i++) {
    if (row >= matrix[line].length ||
            row < 0 ||
            diagonal >= matrix[line].length ||
            diagonal < 0) {
      return null;
    } else if (matrix[row][diagonal] == 1) {
      outputCoordinates.push([row, diagonal]);
      counter++;
      row = updateRowCallback(row);
      diagonal = updateDiagonalCallback(diagonal);

      if (counter == numberOfSymbolsToWin) {
        return outputCoordinates;
      }
    } else {
      outputCoordinates = [];
      counter = 0;
      row = updateRowCallback(row);
      diagonal = updateDiagonalCallback(diagonal);
    }
  }
  return null;
}

function checkDiagonal(gameCellState, matrix) {
  const firstCheck = checkDiagonalWinner(gameCellState, matrix, function(row) {
    return ++row;
  }, function(diagonal) {
    return ++diagonal;
  });

  if (firstCheck) {
    return firstCheck;
  }

  const secondCheck = checkDiagonalWinner(gameCellState, matrix, function(row) {
    return --row;
  }, function(diagonal) {
    return --diagonal;
  });

  if (secondCheck) {
    return secondCheck;
  }

  const thirdCheck = checkDiagonalWinner(gameCellState, matrix, function(row) {
    return --row;
  }, function(diagonal) {
    return ++diagonal;
  });

  if (thirdCheck) {
    return thirdCheck;
  }

  const fourthCheck = checkDiagonalWinner(gameCellState, matrix, function(row) {
    return ++row;
  }, function(diagonal) {
    return --diagonal;
  });

  if (fourthCheck) {
    return fourthCheck;
  }
}


function checkLine(gameCellState, matrix) {
  const {
    coordinates: {
      line,
      column,
    },
    numberOfSymbolsToWin,
  } = gameCellState;

  let outputCoordinates = [];

  for (let j_index = 0, counter = 0; j_index < matrix[line].length; j_index++) {
    if (matrix[line][j_index] == 1) {
      outputCoordinates.push([line, j_index]);
      counter++;

      if (counter == numberOfSymbolsToWin) {
        return outputCoordinates;
      }
    } else {
      outputCoordinates = [];
      counter = 0;
    }
  }

  outputCoordinates = [];

  for (let i_index = 0, counter = 0; i_index < matrix[column].length; i_index++) {
    if (matrix[i_index][column] == 1) {
      outputCoordinates.push([i_index, column]);
      counter++;

      if (counter == numberOfSymbolsToWin) {
        return outputCoordinates;
      }
    } else {
      outputCoordinates = [];
      counter = 0;
    }
  }

  return null;
}

function checkWinner(gameCellState, matrix) {
  const {
    playingField,
  } = gameCellState;

  const rowCoords = checkLine(gameCellState, matrix);
  const diagonalCoords = checkDiagonal(gameCellState, matrix);

  if (rowCoords) {
    paintOverWinCells(rowCoords, playingField);
    return win = true;
  }

  if (diagonalCoords) {
    paintOverWinCells(diagonalCoords, playingField);
    return win = true;
  }

  return false;
}

export function updateСell(gameCellState) {
  if (win === true) {
    return;
  }
  const {
    cell,
    coordinates: {
      line,
      column,
    },
    fields: {
      crosses,
      zeros,
    },
  } = gameCellState;

  if (cell.classList.contains('image-symbol')|| cell.classList.contains('filled')) {
    return;
  }
  cell.classList.add('filled');

  if (moveNumber) {
    cell.innerHTML = templateZero;
    zeros[line][column] = 1;
    playerMoveNumber.innerHTML = 'Ходят крестики ❌';
  } else {
    cell.innerHTML = templateCross;
    crosses[line][column] = 1;
    playerMoveNumber.innerHTML = 'Ходят нолики ⭕';
  }

  moveNumber = !moveNumber;

  const matrixForCrosses = gameCellState.fields.crosses;
  const matrixForZeros = gameCellState.fields.zeros;

  if (checkWinner(gameCellState, matrixForCrosses) === true) {
    playerMoveNumber.innerHTML = '❌Победа крестиков!❌';
    winCounterForCross++;
    crossWins.innerHTML = `${winCounterForCross}`;
  } else if (checkWinner(gameCellState, matrixForZeros) === true) {
    playerMoveNumber.innerHTML = '⭕Победа ноликов!⭕';
    winCounterForZeros++;
    zerosWins.innerHTML = `${winCounterForZeros}`;
  }
}
