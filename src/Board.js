import { Component } from "react";
import Cell from "./Cell";
export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      turn: 0,
      cells: [],
    };
  }
  componentDidMount() {
    this.resetGame();
  }
  componentDidUpdate(prevProps) {
    if (this.props.gridSize != prevProps.gridSize) {
      this.resetGame();
    }
  }
  resetGame() {
    let tempArr1 = [];
    let tempArr = [];
    for (var j = 0; j < this.props.gridSize; j++) {
      tempArr.push("");
    }
    for (var j = 0; j < this.props.gridSize; j++) {
      tempArr1.push(tempArr);
    }
    this.setState({ cells: tempArr1 });
  }

  cellClicked(x, y) {
    // debugger;
    var arr = [];
    for (var i = 0; i < this.props.gridSize; i++) {
      arr.push([...this.state.cells[i]]);
    }
    var temp = [...arr];
    if (temp[x][y] === "") {
      temp[x][y] = this.state.turn ? 1 : 0;
      this.setState({ cells: temp });
      this.toggleTurn();
    }
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
        <div className="Board" key={index}>
          {this.arr.map((j, index1) => {
            return (
              <div
                key={index1}
                onClick={() => {
                  this.cellClicked(index, index1);
                }}
              >
                {!!this.state.cells.length && (
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
        <div>{`Player ${this.state.turn ? "X" : "O"}'s turn`}</div>
        {this.makeGrid()}
      </div>
    );
  }
}
