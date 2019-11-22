const React = require('react');
const ReactDOM = require('react-dom');
import Table from './table.jsx';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      table: [['', '', '', '', '', '', ''], ['', '', '', '', '', '', ''], ['', '', '', '', '', '', ''], ['', '', '', '', '', '', ''], ['', '', '', '', '', '', ''], ['', '', '', '', '', '', '']],
      turn: 'X',
      sums: {}
    };
    this.handleAddToken = this.handleAddToken.bind(this);
    this.checkWin = this.checkWin.bind(this);
  }

  checkWin(obj) {
    let minors = {};
    minors[0] = (obj.sums['30'] + obj.sums['21'] + obj.sums['12'] + obj.sums['03']).toString();
    minors[1] = (obj.sums['40'] + obj.sums['31'] + obj.sums['22'] + obj.sums['13'] + obj.sums['04']).toString();
    minors[2] = (obj.sums['50'] + obj.sums['41'] + obj.sums['32'] + obj.sums['23'] + obj.sums['14'] + obj.sums['05']).toString();
    minors[3] = (obj.sums['51'] + obj.sums['42'] + obj.sums['33'] + obj.sums['24'] + obj.sums['15'] + obj.sums['06']).toString();
    minors[4]= (obj.sums['52'] + obj.sums['43'] + obj.sums['34'] + obj.sums['25'] + obj.sums['16']).toString();
    minors[5] = (obj.sums['53'] + obj.sums['44'] + obj.sums['35'] + obj.sums['26']).toString();

    let majors = {};
    majors[0] = (obj.sums['20'] + obj.sums['31'] + obj.sums['42'] + obj.sums['54']).toString();
    majors[1] = (obj.sums['10'] + obj.sums['21'] + obj.sums['32'] + obj.sums['43'] + obj.sums['54']).toString();
    majors[2] = (obj.sums['00'] + obj.sums['11'] + obj.sums['22'] + obj.sums['33'] + obj.sums['44'] + obj.sums['55']).toString();
    majors[3] = (obj.sums['01'] + obj.sums['12'] + obj.sums['23'] + obj.sums['34'] + obj.sums['45'] + obj.sums['56']).toString();
    majors[4] = (obj.sums['02'] + obj.sums['13'] + obj.sums['24'] + obj.sums['35'] + obj.sums['46']).toString();
    majors[5] = (obj.sums['03'] + obj.sums['14'] + obj.sums['25'] + obj.sums['36']).toString();

    let rows = {};
    for (let i = 0; i < obj.table.length; i++) {
      rows[i] = obj.table[i].join('');
    }

    let columns = {};
    for (let i = 0; i < obj.table[0].length; i++) {
      let colVals = [];
      for (let j = 0; j < obj.table.length; j++) {
        colVals.push(obj.table[j][i]);
      }
      columns[i] = colVals.join('')
    }

    for (let k = 0; k < 6; k++) {
      if(minors[k].includes('XXXX') || majors[k].includes('XXXX') || rows[k].includes('XXXX') || columns[k].includes('XXXX')) {
        return 'X';
      } else if (minors[k].includes('OOOO') || majors[k].includes('OOOO') || rows[k].includes('OOOO') || columns[k].includes('OOOO')) {
        return 'O';
      } else if (k === 5 && columns[6].includes('XXXX')) {
        return 'X';
      } else if (k === 5 && columns[6].includes('OOOO')) {
        return 'O';
      }
    }
    return undefined;
  }

  handleAddToken(e) {
    let colnum = Number(e.target.className.slice(-1));
    for (let i = 0; i < this.state.table.length; i++) {
      if (this.state.table[i + 1] === undefined || this.state.table[i + 1][colnum] != '') {
        this.state.table[i][colnum] = this.state.turn;
        this.state.sums[i.toString() + colnum.toString()] = this.state.turn;
        if (this.state.turn === 'X') {
          this.state.turn = 'O';
        } else {
          this.state.turn = 'X';
        }
        break;
      }
    }
    let didwin = this.checkWin(this.state);
    if(didwin != undefined){
      this.state.winner = didwin;
    }
    this.setState((state) => (state));
  }

  render() {
    let winner;
    if(this.state.winner){
      winner = this.state.winner;
    };
    return (
      <div>
        <div><Table rows={this.state.table} addtoken={this.handleAddToken} /></div>
        <div>Winner: {winner}</div>
      </div>
    );
  };
}

ReactDOM.render(<App />, document.getElementById('app'));