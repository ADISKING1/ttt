import { Component } from "react";
import Board from "./Board";
import "./styles.css";
import logo from "./image/github.png";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { gridSize: 3, gridSizeInput: 3, boardReset: false };
  }

  render() {
    return (
      <div>
        <h1>
          <span className="O no-bg">Tic </span>
          <span className="Tie ">Tac </span>
          <span className="X no-bg">Toe</span>
        </h1>
        <label>Grid: </label>
        <select
          value={this.state.gridSizeInput}
          onChange={(e) => {
            this.setState({ gridSizeInput: e.target.value });
          }}
        >
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button
          onClick={() => {
            this.setState({ gridSize: this.state.gridSizeInput });
            this.setState({ boardReset: !this.state.boardReset });
          }}
        >
          Reset Board
        </button>
        <Board
          className="Board"
          gridSize={this.state.gridSize}
          boardReset={this.state.boardReset}
        />
        <a href="https://github.com/ADISKING1/ttt" target="_blank">
          <img src={logo} alt="git" />
        </a>
      </div>
    );
  }
}
