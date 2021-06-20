import { Component } from "react";
import Cell from "./Cell";
export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      turn: 0,
      cells: [],
      canPlay: true,
      winner: 0,
      counter: 0,
    };
  }
  componentDidMount() {
    this.resetGame();
  }
  componentDidUpdate(prevProps) {
    if (this.props.boardReset != prevProps.boardReset) {
      this.resetGame();
    }
  }
  boardFull() {
    return this.state.counter == this.props.gridSize * this.props.gridSize;
  }
  resetGame() {
    this.setState({
      counter: 0,
    });
    let tempArr1 = [];
    let tempArr = [];
    for (var j = 0; j < this.props.gridSize; j++) {
      tempArr.push("");
    }
    for (var j = 0; j < this.props.gridSize; j++) {
      tempArr1.push(tempArr);
    }
    this.setState({ cells: tempArr1 });
    this.setState({ canPlay: true });
  }

  cellClicked(x, y) {
    if (this.state.canPlay && !this.boardFull()) {
      var arr = [];
      for (var i = 0; i < this.props.gridSize; i++) {
        arr.push([...this.state.cells[i]]);
      }
      var temp = [...arr];
      if (temp[x][y] === "") {
        temp[x][y] = this.state.turn ? 1 : 0;
        this.setState({ cells: temp });
        let win = this.didWin(temp);
        if (win !== "") {
          this.setState({ canPlay: false });
          this.setState({ winner: win });
        } else {
          this.toggleTurn();
          this.setState({
            counter: this.state.counter + 1,
          });
        }
      }
    }
  }

  didWin(temp) {
    //horizontal
    for (let i = 0; i < this.props.gridSize; i++) {
      let t = temp[i][0],
        flag = true;
      for (let j = 1; j < this.props.gridSize; j++) {
        if (temp[i][j] === "" || temp[i][j] !== t) {
          flag = false;
          break;
        }
      }
      if (flag) {
        return t;
      }
    }

    //vertical
    for (let i = 0; i < this.props.gridSize; i++) {
      let t = temp[0][i],
        flag = true;
      for (let j = 1; j < this.props.gridSize; j++) {
        if (temp[j][i] === "" || temp[j][i] !== t) {
          flag = false;
          break;
        }
      }
      if (flag) {
        return t;
      }
    }

    //diagonal
    let t = temp[0][0];
    let flag = true;
    // \
    for (let j = 1; j < this.props.gridSize; j++) {
      if (temp[j][j] === "" || temp[j][j] !== t) {
        flag = false;
        break;
      }
    }
    if (flag) {
      return t;
    }
    // /
    t = temp[0][this.props.gridSize - 1];
    flag = true;
    for (let j = 1; j < this.props.gridSize; j++) {
      if (
        temp[j][this.props.gridSize - 1 - j] === "" ||
        temp[j][this.props.gridSize - 1 - j] !== t
      ) {
        flag = false;
        break;
      }
    }
    if (flag) {
      return t;
    }
    return "";
  }

  toggleTurn() {
    this.setState({ turn: !this.state.turn });
  }

  arr = [];
  makeGrid = () => {
    this.arr = [];
    for (var i = 0; i < this.props.gridSize; i++) {
      this.arr.push(i + 1);
    }
    return this.arr.map((i, index) => {
      return (
        <div className="Row" key={index}>
          {this.arr.map((j, index1) => {
            return (
              <div
                className="CellParent"
                key={index1}
                onClick={() => {
                  this.cellClicked(index, index1);
                }}
              >
                {this.state.cells.length == this.props.gridSize && (
                  <Cell value={this.state.cells[index][index1]} />
                )}
              </div>
            );
          })}
        </div>
      );
    });
  };
  render() {
    return (
      <div>
        <div
          className={`message no-bg ${this.state.turn == 0 ? "O" : "X"} ${
            this.state.canPlay ? (this.boardFull() ? "Tie" : "") : "Won"
          }`}
        >
          {this.state.canPlay
            ? this.boardFull()
              ? "Tied!"
              : `Player ${this.state.turn ? "X" : "O"}'s turn`
            : `Player ${this.state.winner ? "X" : "O"} has won!`}
        </div>
        <div id="Cells">{this.makeGrid()}</div>
      </div>
    );
  }
}
