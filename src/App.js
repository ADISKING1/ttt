import { Component } from "react";
import Board from "./Board";
import "./styles.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { gridSize: 3, gridSizeInput: 3, boardReset: false };
  }

  render() {
    return (
      <div>
        <h1> Tic Tac Toe </h1>
        <input
          value={this.state.gridSizeInput}
          onChange={(e) => {
            this.setState({ gridSizeInput: e.target.value });
          }}
        ></input>
        <button
          onClick={() => {
            this.setState({ gridSize: this.state.gridSizeInput });
            this.setState({ boardReset: !this.state.boardReset });
          }}
        >
          Reset Board
        </button>
        <Board
          gridSize={this.state.gridSize}
          boardReset={this.state.boardReset}
        />
      </div>
    );
  }
}
