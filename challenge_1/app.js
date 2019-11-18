let turn = 'x';
let taken = '';
let playerX = {};
let playerO = {};
let xname = '';
let oname = '';
let xwins = 0;
let owins = 0;
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
        taken += turn;
        if(turn === 'x') {
          element.innerHTML = `${turn}<div class="xname">${xname}</div>`;
          playerX[element.id] = true;
          detectWin(playerX, turn, taken);
          turn = 'o';
        } else {
          element.innerHTML = `${turn}<div class="oname">${oname}</div>`;
          playerO[element.id] = true;
          detectWin(playerO, turn, taken);
          turn = 'x';
        }
      }
    }
    return element;
  });
};

let detectWin = (player, turn, taken) => {
  let getWin = (turn) => {
    if(turn === 'x') {
      if(xname.length > 0){
        turn = xname;
      } else {
        turn = 'Player x';
      }
      document.getElementById('winmsg').innerHTML = `${turn} wins!`;
      xwins++;
      document.getElementById('xwins').innerHTML = `Games ${turn} won: ${xwins}`;
    } else {
      if(oname.length > 0){
        turn = oname;
      } else {
        turn = 'Player o';
      }
      document.getElementById('winmsg').innerHTML = `${turn} wins!`;
      owins++;
      document.getElementById('owins').innerHTML = `Games ${turn} won: ${owins}`;
    }
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

(() => {
  document.getElementById('xname').onchange = () => {
    xname = document.getElementById('xname').value;
  };
  document.getElementById('oname').onchange = () => {
    oname = document.getElementById('oname').value;
  };
})();

setTable();