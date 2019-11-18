let turn = 'x';
let taken = '';
let playerX = {};
let playerO = {};
let table = Array.from(document.getElementsByClassName('box'));
let winConditions = ['123', '456', '789', '147', '258', '369', '159', '357'];

let reset = document.getElementById('reset');
reset.onclick = () => {
  turn = 'x';
  for(let i = 0; i < table.length; i++){
    table[i].innerHTML = '';
  }
  document.getElementById('winmsg').innerHTML = '';
  playerX = {};
  playerO = {};
  setTable();
  taken = '';
}

let setTable = () => {
  table = table.map(element => {
    element.onclick = () => {
      if(element.innerHTML.length) {
        alert('Already taken!');
      } else {
        element.innerHTML = turn;
        taken += turn;
        if(turn === 'x') {
          playerX[element.id] = true;
          detectWin(playerX, turn, taken);
          turn = 'o';
        } else {
          playerO[element.id] = true;
          detectWin(playerO, turn, taken);
          turn = 'x';
        }
      }
    }
    return element;
  });
};
setTable();

let detectWin = (player, turn, taken) => {
  let getWin = (turn) => {
    document.getElementById('winmsg').innerHTML = `Player ${turn} wins!`;
  }
  let getTie = () => {
    document.getElementById('winmsg').innerHTML = `Tie!`;
  }
  for(let i = 0; i < winConditions.length; i++) {
    if(player[winConditions[i][0]] && player[winConditions[i][1]] && player[winConditions[i][2]]){
      getWin(turn);
      table = table.map(element => {
        element.onclick = () => {};
        return element;
      })
    }
  }
  if(taken.length === 9 && document.getElementById('winmsg').innerHTML.length === 0) {
    getTie();
    table = table.map(element => {
      element.onclick = () => {};
      return element;
    })
  }
}
