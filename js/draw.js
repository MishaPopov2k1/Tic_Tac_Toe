const templateZero = '<img class="image-symbol zero-img" src="images/zero.png" alt="zero">';
const templateCross = '<img class="image-symbol cross-img" src="images/cross.png" alt="cross">';
export const playerMoveNumber = document.querySelector('.player__move-number');

const crossWins = document.querySelector('.game-score-for-cross');
const zerosWins = document.querySelector('.game-score-for-zeros');


export let win = false;

let winCounterForCross = 0;
let winCounterForZeros = 0;

export function paintOverWinCells(indexArray, playingField, state) {
  const rows = playingField.children;
  console.log(state);
  for (const coord of indexArray) {
    const cell = rows[coord[0]].children[coord[1]];
    if (state === 'victoryCross') {
      cell.classList.add('paint__over-ice');
    } else if (state === 'victoryZero') {
      cell.classList.add('paint__over-fire');
    }
    // cell.classList.add('paint__over-green');
  }
};

export function renderSymbol(gameCellState, playingField) {
  const {
    state,
    line,
    column,
  } = gameCellState;
  const crossId = localStorage.getItem('crossId');
  const zeroId = localStorage.getItem('zeroId');
  console.log('zeroId : ', zeroId );
  console.log('crossId: ', crossId);
  
  if (state === 'moveCrossPlayer' || state === 'victoryCross') {
    playingField.children[line].children[column].innerHTML = templateCross;
  } else if (state === 'moveZeroPlayer' || state === 'victoryZero') {
    playingField.children[line].children[column].innerHTML = templateZero;
  }
};

export function writeWhoseMove(state) {
  if (state ==='moveCrossPlayer') {
    playerMoveNumber.innerHTML = 'Ход zero ⭕' + '';
  } else if (state === 'moveZeroPlayer') {
    playerMoveNumber.innerHTML = 'Ход cross ❌';
  }
}

export function showWinner(gameCellState) {
  const {
    state,
  } = gameCellState;
  if (state === 'victoryCross') {
    playerMoveNumber.innerHTML = '❌Победа крестиков!❌';
    winCounterForCross++;
    crossWins.innerHTML = `${winCounterForCross}`;
  } else if (state === 'victoryZero') {
    playerMoveNumber.innerHTML = '⭕Победа ноликов!⭕';
    winCounterForZeros++;
    zerosWins.innerHTML = `${winCounterForZeros}`;
  }
}

export function resetGameCells(playingField) {
  win = false;
  for (const row of playingField.children) {
    for (const cell of row.children) {
      cell.innerHTML = '';
      cell.className = 'cell';
      cell.classList.remove('filled');
    }
  }
  playerMoveNumber.innerHTML = 'Ходят крестики ❌';
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
};


