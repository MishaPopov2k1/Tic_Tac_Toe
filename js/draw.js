

export function paintOverWinCells(indexArray, playingField) {
  const rows = playingField.children;

  for (const coord of indexArray) {
    const cell = rows[coord[0]].children[coord[1]];
    cell.classList.add('paint__over-green');
  }
}

export function paintOverAllCells(playingField) {
  // playingField.children[0].children[0].style.backgroundColor = 'yellow';

}


