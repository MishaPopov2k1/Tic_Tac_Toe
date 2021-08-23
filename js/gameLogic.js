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

function checkDiagonalWinner(matrix, x, y, k, updateRowCallback, updateDiagonalCallback) {
  let outputCoordinates = [];

  for (let i = 0, counter = 0, row = x, diagonal = y; i < matrix[x].length; i++) {
    if (row >= matrix[x].length ||
            row < 0 ||
            diagonal >= matrix[x].length ||
            diagonal < 0) {
      return null;
    } else if (matrix[row][diagonal] == 1) {
      outputCoordinates.push([row, diagonal]);
      counter++;
      row = updateRowCallback(row);
      diagonal = updateDiagonalCallback(diagonal);

      if (counter == k) {
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

function checkDiagonal(matrix, i, j, k) {
  const firstCheck = checkDiagonalWinner(matrix, i, j, k, function(row) {
    return ++row;
  }, function(diagonal) {
    return ++diagonal;
  });

  if (firstCheck) {
    return firstCheck;
  }

  const secondCheck = checkDiagonalWinner(matrix, i, j, k, function(row) {
    return --row;
  }, function(diagonal) {
    return --diagonal;
  });

  if (secondCheck) {
    return secondCheck;
  }

  const thirdCheck = checkDiagonalWinner(matrix, i, j, k, function(row) {
    return --row;
  }, function(diagonal) {
    return ++diagonal;
  });

  if (thirdCheck) {
    return thirdCheck;
  }

  const fourthCheck = checkDiagonalWinner(matrix, i, j, k, function(row) {
    return ++row;
  }, function(diagonal) {
    return --diagonal;
  });

  if (fourthCheck) {
    return fourthCheck;
  }
}


/* function checkDiagonal(matrix, i, j, k) {
    let outputCoordinates = [];

    for (let i_index = 0, counter = 0, row = i, diagonal = j; i_index < matrix[i].length; i_index++, row++, diagonal++) {
        if (row >= matrix[i].length ||
            row < 0 ||
            diagonal >= matrix[i].length ||
            diagonal < 0) {
            break;
        } else if (matrix[row][diagonal] == 1) {
            outputCoordinates.push([row, diagonal]);
            counter++;

            if (counter == k) {
                return outputCoordinates;
            }
        } else {
            outputCoordinates = [];
            counter = 0;
        }
    }

    outputCoordinates = [];

    for (let i_index = 0, counter = 0, row = i, diagonal = j; i_index < matrix[i].length; i_index++, row--, diagonal--) {
        if (row >= matrix[i].length ||
            row < 0 ||
            diagonal >= matrix[i].length ||
            diagonal < 0) {
            break;
        } else if (matrix[row][diagonal] == 1) {
            outputCoordinates.push([row, diagonal]);
            counter++;

            if (counter == k) {
                return outputCoordinates;
            }
        } else {
            outputCoordinates = [];
            counter = 0;
        }
    }

    outputCoordinates = [];

    for (let i_index = 0, counter = 0, row = i, diagonal = j; i_index < matrix[i].length; i_index++, row--, diagonal++) {
        if (row >= matrix[i].length ||
            row < 0 ||
            diagonal >= matrix[i].length ||
            diagonal < 0) {
            break;
        } else if (matrix[row][diagonal] == 1) {
            outputCoordinates.push([row, diagonal]);
            counter++;

            if (counter == k) {
                return outputCoordinates;
            }
        } else {
            outputCoordinates = [];
            counter = 0;
        }
    }

    outputCoordinates = [];

    for (let i_index = 0, counter = 0, row = i, diagonal = j; i_index < matrix[i].length; i_index++, row++, diagonal--) {
        if (row >= matrix[i].length ||
            row < 0 ||
            diagonal >= matrix[i].length ||
            diagonal < 0) {
            break;
        } else if (matrix[row][diagonal] == 1) {
            outputCoordinates.push([row, diagonal]);
            counter++;

            if (counter == k) {
                return outputCoordinates;
            }
        } else {
            outputCoordinates = [];
            counter = 0;
        }
    }

    return null;
}*/

function checkLine(matrix, i, j, k) {
  let outputCoordinates = [];

  for (let j_index = 0, counter = 0; j_index < matrix[i].length; j_index++) {
    if (matrix[i][j_index] == 1) {
      outputCoordinates.push([i, j_index]);
      counter++;

      if (counter == k) {
        return outputCoordinates;
      }
    } else {
      outputCoordinates = [];
      counter = 0;
    }
  }

  outputCoordinates = [];

  for (let i_index = 0, counter = 0; i_index < matrix[j].length; i_index++) {
    if (matrix[i_index][j] == 1) {
      outputCoordinates.push([i_index, j]);
      counter++;

      if (counter == k) {
        return outputCoordinates;
      }
    } else {
      outputCoordinates = [];
      counter = 0;
    }
  }

  return null;
}

function checkWinner(matrix, i, j, k, playingField) {
  const rowCoords = checkLine(matrix, i, j, k);
  const diagonalCoords = checkDiagonal(matrix, i, j, k);

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

export function updateСell(params) {
  if (win === true) {
    return;
  }
  const {
    cell,
    coordinates: {
      lineСoordinate,
      columnCoordinate,
    },
    fields: {
      fieldOfСrosses,
      fieldOfZeros,
    },
    playingField,
    numberOfSymbolsToWin,
  } = params;


  if (cell.classList.contains('active-cell') || cell.classList.contains('image-symbol')) {
    return;
  }

  cell.classList.add('active-cell');

  if (moveNumber) {
    cell.innerHTML = templateZero;
    fieldOfZeros[lineСoordinate][columnCoordinate] = 1;
    playerMoveNumber.innerHTML = 'Ходят крестики ❌';
  } else {
    cell.innerHTML = templateCross;
    fieldOfСrosses[lineСoordinate][columnCoordinate] = 1;
    playerMoveNumber.innerHTML = 'Ходят нолики ⭕';
  }

  moveNumber = !moveNumber;

  if (checkWinner(fieldOfСrosses, lineСoordinate, columnCoordinate, numberOfSymbolsToWin, playingField) === true) {
    playerMoveNumber.innerHTML = '❌Победа крестиков!❌';
    winCounterForCross++;
    crossWins.innerHTML = `${winCounterForCross}`;
  } else if (checkWinner(fieldOfZeros, lineСoordinate, columnCoordinate, numberOfSymbolsToWin, playingField) === true) {
    playerMoveNumber.innerHTML = '⭕Победа ноликов!⭕';
    winCounterForZeros++;
    zerosWins.innerHTML = `${winCounterForZeros}`;
  }
}
