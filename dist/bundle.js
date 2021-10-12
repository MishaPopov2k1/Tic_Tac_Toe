/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./API/getData.js":
/*!************************!*\
  !*** ./API/getData.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sendGameCellState": () => (/* binding */ sendGameCellState),
/* harmony export */   "getTitle": () => (/* binding */ getTitle)
/* harmony export */ });

const getStatus = function(response) {
  if (response.status !== 200) {
    return Promise.reject(new Error(response.statusText));
  }
  return Promise.resolve(response);
};

const getJson = function(response) {
  return response.json();
};

async function sendGameCellState(gameCellState) {
  await fetch('http://localhost:3000/test')
      .then(getStatus)
      .then(getJson)
      .catch();
}

async function getTitle() {
  const title = await fetch('http://localhost:3000/test')
      .then(getStatus)
      .then(getJson)
      .catch(function(error) {
        console.log(error);
      });
  console.log('title: ', title);
  return JSON.parse(title);
}




/***/ }),

/***/ "./API/sendGameState.js":
/*!******************************!*\
  !*** ./API/sendGameState.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "socket": () => (/* binding */ socket),
/* harmony export */   "sendCoordinatesOfMove": () => (/* binding */ sendCoordinatesOfMove),
/* harmony export */   "sendFieldSizesForStart": () => (/* binding */ sendFieldSizesForStart),
/* harmony export */   "resetPlayingMatrix": () => (/* binding */ resetPlayingMatrix),
/* harmony export */   "sendChoosingSide": () => (/* binding */ sendChoosingSide),
/* harmony export */   "sendReadyTwoPlayers": () => (/* binding */ sendReadyTwoPlayers)
/* harmony export */ });
/* harmony import */ var _game_logic_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../game-logic/index */ "./game-logic/index.js");
/* harmony import */ var _js_draw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../js/draw */ "./js/draw.js");
/* harmony import */ var _js_main__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../js/main */ "./js/main.js");




const socket = io('http://127.0.0.1:3000');


/* export function sendGameState(gameCellState) {
  socket.emit('game cell state', gameCellState);
} */
function sendCoordinatesOfMove(cellCoordinates) {
  socket.emit('game cell state', cellCoordinates);
}

function sendFieldSizesForStart({n, k}) {
  socket.emit('start game', {n, k});
}

function resetPlayingMatrix() {
  socket.emit('reset matrix');
}

function sendChoosingSide(sideName) {
  socket.emit('player choosed of side', sideName);
}

function sendReadyTwoPlayers(data) {
  socket.emit('ready two players', data);
}

socket.on('game cell state', (data) => {
  (0,_game_logic_index__WEBPACK_IMPORTED_MODULE_0__.handleGameUpdate)(data);
});

socket.on('reset matrix', () => {
  (0,_js_draw__WEBPACK_IMPORTED_MODULE_1__.resetGameCells)(_js_main__WEBPACK_IMPORTED_MODULE_2__.playingField);
});

socket.on('players id', (data) => {
  (0,_game_logic_index__WEBPACK_IMPORTED_MODULE_0__.savePlayersId)(data);
});


/***/ }),

/***/ "./game-logic/index.js":
/*!*****************************!*\
  !*** ./game-logic/index.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handleGameUpdate": () => (/* binding */ handleGameUpdate),
/* harmony export */   "savePlayersId": () => (/* binding */ savePlayersId)
/* harmony export */ });
/* harmony import */ var _js_main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/main */ "./js/main.js");
/* harmony import */ var _js_draw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../js/draw */ "./js/draw.js");


/**
 *
 * @param {object} data
 * @param {string} data.state
 * @param {object} data.coordinates
 *
 */
function handleGameUpdate(data) {
  console.log('data: ', data);
  const {
    state,
    winningCoordinates,
  } = data;

  (0,_js_draw__WEBPACK_IMPORTED_MODULE_1__.renderSymbol)(data, _js_main__WEBPACK_IMPORTED_MODULE_0__.playingField);
  (0,_js_draw__WEBPACK_IMPORTED_MODULE_1__.writeWhoseMove)(state);

  if (winningCoordinates) {
    (0,_js_draw__WEBPACK_IMPORTED_MODULE_1__.paintOverWinCells)(winningCoordinates, _js_main__WEBPACK_IMPORTED_MODULE_0__.playingField, state);
    (0,_js_draw__WEBPACK_IMPORTED_MODULE_1__.showWinner)(data);
  }
}

function savePlayersId(data) {
  const {
    crossId,
    zeroId,
  } = data;

  localStorage.setItem('crossId', crossId);
  localStorage.setItem('zeroId', zeroId);
};


/***/ }),

/***/ "./js/draw.js":
/*!********************!*\
  !*** ./js/draw.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "playerMoveNumber": () => (/* binding */ playerMoveNumber),
/* harmony export */   "win": () => (/* binding */ win),
/* harmony export */   "paintOverWinCells": () => (/* binding */ paintOverWinCells),
/* harmony export */   "renderSymbol": () => (/* binding */ renderSymbol),
/* harmony export */   "writeWhoseMove": () => (/* binding */ writeWhoseMove),
/* harmony export */   "showWinner": () => (/* binding */ showWinner),
/* harmony export */   "resetGameCells": () => (/* binding */ resetGameCells),
/* harmony export */   "resetWinCounter": () => (/* binding */ resetWinCounter),
/* harmony export */   "resetPlayingField": () => (/* binding */ resetPlayingField)
/* harmony export */ });
const templateZero = '<img class="image-symbol zero-img" src="images/zero.png" alt="zero">';
const templateCross = '<img class="image-symbol cross-img" src="images/cross.png" alt="cross">';
const playerMoveNumber = document.querySelector('.player__move-number');

const crossWins = document.querySelector('.game-score-for-cross');
const zerosWins = document.querySelector('.game-score-for-zeros');


let win = false;

let winCounterForCross = 0;
let winCounterForZeros = 0;

function paintOverWinCells(indexArray, playingField, state) {
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

function renderSymbol(gameCellState, playingField) {
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

function writeWhoseMove(state) {
  if (state ==='moveCrossPlayer') {
    playerMoveNumber.innerHTML = 'Ход zero ⭕' + '';
  } else if (state === 'moveZeroPlayer') {
    playerMoveNumber.innerHTML = 'Ход cross ❌';
  }
}

function showWinner(gameCellState) {
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

function resetGameCells(playingField) {
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

const resetWinCounter = () => {
  winCounterForCross = 0;
  winCounterForZeros = 0;
  zerosWins.innerHTML = '0';
  crossWins.innerHTML = '0';
};

function resetPlayingField(playingField, gameMenu) {
  playingField.innerHTML = '';
  gameMenu.classList.add('hidden');
};




/***/ }),

/***/ "./js/gameLogic.js":
/*!*************************!*\
  !*** ./js/gameLogic.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "n": () => (/* binding */ n),
/* harmony export */   "k": () => (/* binding */ k),
/* harmony export */   "setGameConditionsFor3x3": () => (/* binding */ setGameConditionsFor3x3),
/* harmony export */   "setGameConditionsForNxN": () => (/* binding */ setGameConditionsForNxN),
/* harmony export */   "checkCellForFullness": () => (/* binding */ checkCellForFullness)
/* harmony export */ });
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main */ "./js/main.js");
/* harmony import */ var _API_sendGameState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../API/sendGameState */ "./API/sendGameState.js");
/* eslint-disable camelcase */



let n;
let k;

const setGameConditionsFor3x3 = () => {
  n = 3;
  k = 3;
};

const setGameConditionsForNxN = () =>{
  const smallElem = document.createElement('small');
  _main__WEBPACK_IMPORTED_MODULE_0__.conditionForNxN.append(smallElem);

  n = + document.querySelector('.input-for-N').value;
  k = + document.querySelector('.input-for-K').value;

  if (n == 0 || k == 0) {
    // alert('Некорректные данные!');
    smallElem.style.color = 'red';
    smallElem.textContent = 'Некорректные данные!';
    return;
  }
};


function checkCellForFullness(cellСoordinates, cell) {
  if (cell.classList.contains('image-symbol')/* || cell.classList.contains('filled') */) {
    return;
  }
  // cell.classList.add('filled');
  // return false;

  // обработка логики игры
  (0,_API_sendGameState__WEBPACK_IMPORTED_MODULE_1__.sendCoordinatesOfMove)(cellСoordinates);
  // sendGameState(gameCellState);
};



/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "playingField": () => (/* binding */ playingField),
/* harmony export */   "conditionForNxN": () => (/* binding */ conditionForNxN)
/* harmony export */ });
/* harmony import */ var _gameLogic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameLogic */ "./js/gameLogic.js");
/* harmony import */ var _API_sendGameState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../API/sendGameState */ "./API/sendGameState.js");
/* harmony import */ var _API_getData_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../API/getData.js */ "./API/getData.js");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modal */ "./js/modal.js");
/* harmony import */ var _draw__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./draw */ "./js/draw.js");








const playingField = document.querySelector('.playing__field');

const gameMenu = document.querySelector('.menu-section');

const cell = document.querySelector('#cell');

const playButton3x3 = document.querySelector('.button-play-3x3');
const playButtonNxN = document.querySelector('.button-play-NxN');
const playAgainButton = document.querySelector('.button-play-again');
const restartButton = document.querySelector('.img-restart');
const playOnlineButton = document.querySelector('.img-play-online');

const conditionForNxN = document.querySelector('.condition-for-NxN');
const goButton = document.querySelector('.btn-go');

const titleElement = document.querySelector('.title__tic-tac-toe');


// const additionalBtns = document.querySelector('.additional-btn');

(0,_API_getData_js__WEBPACK_IMPORTED_MODULE_2__.getTitle)().then((title) => (
  titleElement.innerHTML = title
));

/**
 * Функция для работы с табами
 * s
 * @param {HTMLElement} btn
 */
function makeTabActive(btn) {
  const menu = document.querySelector('.menu-list');
  const activeBtn = menu.querySelector('.active');

  if (btn.classList.contains('active-game')) {
    btn.classList.toggle('active-game');
    return;
  }

  if (activeBtn) {
    if (btn === activeBtn) {
      activeBtn.classList.remove('active');
      (0,_draw__WEBPACK_IMPORTED_MODULE_4__.resetPlayingField)(playingField, gameMenu);
      return;
    } else {
      activeBtn.classList.remove('active');
      btn.classList.add('active');
    }
  } else {
    btn.classList.add('active');
  }
};

function createPlayingField(playingField, n, cell, k, btn) {
  for (let i = 0; i < n; i++) {
    const tr = document.createElement('tr');

    for (let j = 0; j < n; j++) {
      const td = cell.content.cloneNode(true).firstElementChild;

      td.dataset.index = `${i}${j}`;

      const cellСoordinates = {
        coordinates: {
          line: i,
          column: j,
        },
      };


      tr.appendChild(td);

      td.addEventListener('click', (event) => {
        const cell = event.target;
        /* if ( */(0,_gameLogic__WEBPACK_IMPORTED_MODULE_0__.checkCellForFullness)(cellСoordinates, cell); /* != true) {
          sendCoordinatesOfMove(cellСoordinates);
        } */
      });
      playingField.appendChild(tr);
    };

    gameMenu.classList.remove('hidden');
  };
}


playButton3x3.addEventListener('click', (e) => {
  (0,_gameLogic__WEBPACK_IMPORTED_MODULE_0__.setGameConditionsFor3x3)();
  createPlayingField(playingField, _gameLogic__WEBPACK_IMPORTED_MODULE_0__.n, cell, _gameLogic__WEBPACK_IMPORTED_MODULE_0__.k, e.target);
  (0,_API_sendGameState__WEBPACK_IMPORTED_MODULE_1__.sendFieldSizesForStart)({n: _gameLogic__WEBPACK_IMPORTED_MODULE_0__.n, k: _gameLogic__WEBPACK_IMPORTED_MODULE_0__.k});
  makeTabActive(e.target);
  conditionForNxN.classList.add('hidden');
});


playButtonNxN.addEventListener('click', (e) => {
  (0,_draw__WEBPACK_IMPORTED_MODULE_4__.resetPlayingField)(playingField, gameMenu);
  makeTabActive(e.target);
  conditionForNxN.classList.toggle('hidden');
});

goButton.addEventListener('click', () => {
  (0,_gameLogic__WEBPACK_IMPORTED_MODULE_0__.setGameConditionsForNxN)();

  conditionForNxN.classList.add('hidden');
  playButtonNxN.classList.add('active-game');

  (0,_API_sendGameState__WEBPACK_IMPORTED_MODULE_1__.sendFieldSizesForStart)({n: _gameLogic__WEBPACK_IMPORTED_MODULE_0__.n, k: _gameLogic__WEBPACK_IMPORTED_MODULE_0__.k});
  createPlayingField(playingField, _gameLogic__WEBPACK_IMPORTED_MODULE_0__.n, cell, _gameLogic__WEBPACK_IMPORTED_MODULE_0__.k, playButtonNxN);
});

restartButton.addEventListener('click', () => {
  restartButton.classList.toggle('rotate');
  (0,_API_sendGameState__WEBPACK_IMPORTED_MODULE_1__.sendFieldSizesForStart)({n: _gameLogic__WEBPACK_IMPORTED_MODULE_0__.n, k: _gameLogic__WEBPACK_IMPORTED_MODULE_0__.k});
  (0,_draw__WEBPACK_IMPORTED_MODULE_4__.resetWinCounter)();
});

playAgainButton.addEventListener('click', () => {
  (0,_API_sendGameState__WEBPACK_IMPORTED_MODULE_1__.resetPlayingMatrix)();
  (0,_draw__WEBPACK_IMPORTED_MODULE_4__.resetGameCells)(playingField);
});

playOnlineButton.addEventListener('click', (e) => {
  (0,_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)();
});


document.addEventListener('DOMContentLoaded', function() {
  const checkbox = document.querySelector('input[type="checkbox"]');
  const logoImagine = document.querySelector('.logo-img');


  checkbox.addEventListener('click', function(e) {
    if (checkbox.checked) {
      document.body.classList.add('dark-theme');

      setTimeout( () => {
        logoImagine.classList.add('dark-theme-for-img');
        restartButton.classList.add('dark-theme-for-img');
        playOnlineButton.classList.add('dark-theme-for-img');
      }, 220);
    } else {
      document.body.classList.remove('dark-theme');
      logoImagine.classList.remove('dark-theme-for-img');
      restartButton.classList.remove('dark-theme-for-img');
      playOnlineButton.classList.remove('dark-theme-for-img');
    }
  });
});


/***/ }),

/***/ "./js/modal.js":
/*!*********************!*\
  !*** ./js/modal.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "modalELem": () => (/* binding */ modalELem),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
/* harmony import */ var _API_sendGameState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../API/sendGameState */ "./API/sendGameState.js");
// import {io} from 'socket.io-client';


const modalELem = document.querySelector('.modal');

const playForCrosses = document.querySelector('.btn-cross');
const playForZeroes = document.querySelector('.btn-zero');

const loaderCross = document.querySelector('.img-cross-loader');

let isWaitingOpponent = false;
let isAgreementGame = false;

const titles = {
  default: 'Выберите сторону',
  waiting: 'Ожидаем второго игрока',
  confirm: 'Подтвердите игру',
};

const openModal = (isShowAdditional, player) => {
  modalELem.classList.remove('hidden');
  if (isShowAdditional === true) {
    modalELem.classList.add('with-additional');
    changeTitle(titles.confirm);
    const crossText = playForCrosses.firstElementChild;
    const zeroText = playForZeroes.firstElementChild;

    if (player === 'cross') {
      crossText.innerHTML = 'Игрок 1 ';
      zeroText.innerHTML = 'Вы';
    } else if (player === 'zero') {
      crossText.innerHTML = 'Вы';
      zeroText.innerHTML = 'Игрок 1 ';
    }
  }
};
const closeModal = () => {
  modalELem.classList.add('hidden');
  modalELem.classList.remove('with-additional');
  removeActiveButton();
  isWaitingOpponent = false;
  isAgreementGame = false;
  changeTitle(titles.default);
};

function showLoader() {
  loaderCross.classList.remove('hidden');
}

modalELem.addEventListener('click', (event) => {
  const target = event.target;

  if (target.classList.contains('overlay') ||
        target.classList.contains('modal__close')) {
    closeModal();
  }
});

function changeTitle(title) {
  const modalTitle = document.querySelector('.modal__title');
  modalTitle.innerHTML = title;
}


_API_sendGameState__WEBPACK_IMPORTED_MODULE_0__.socket.on('waiting opponent', (data) => {
  console.log('data: ', data);
  if (isWaitingOpponent === true) {
    return;
  }
  // для клиента2
  openModal(true, data);
  showLoader();
  isAgreementGame = true;
  setActiveButton({lockedSideClass: `btn-${data}`});
  const agreeGame = modalELem.querySelector('.button-accept');
  agreeGame.addEventListener('click', () => {
    if (data === 'cross') {
      (0,_API_sendGameState__WEBPACK_IMPORTED_MODULE_0__.sendChoosingSide)('zero');
    } else if (data === 'zero') {
      (0,_API_sendGameState__WEBPACK_IMPORTED_MODULE_0__.sendChoosingSide)('cross');
    }
    (0,_API_sendGameState__WEBPACK_IMPORTED_MODULE_0__.sendReadyTwoPlayers)('ready');
  });
});

_API_sendGameState__WEBPACK_IMPORTED_MODULE_0__.socket.on('start online', (data) => {
  closeModal();
  // io.emit('ready two players', data);
});

function setActiveButton({sideClass, lockedSideClass}) {
  [playForCrosses, playForZeroes].forEach((btn)=>{
    btn.classList.toggle('locked-btn', sideClass? !btn.classList.contains(sideClass):btn.classList.contains(lockedSideClass));
  });
};

function removeActiveButton() {
  [playForCrosses, playForZeroes].forEach((btn)=>{
    btn.classList.remove('locked-btn');
  });
}

function chooseSides(sideName) {
  if (isAgreementGame === true || isWaitingOpponent === true) {
    return;
  }

  changeTitle(titles.waiting);
  showLoader();
  isWaitingOpponent = true;
  setActiveButton({sideClass: `btn-${sideName}`});
  // отправим состояние ожидание клиента1 на сервер
  (0,_API_sendGameState__WEBPACK_IMPORTED_MODULE_0__.sendChoosingSide)(sideName);
  //
}

playForCrosses.addEventListener('click', (e) => chooseSides('cross') );

playForZeroes.addEventListener('click', (e) => chooseSides('zero') );


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./js/main.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map