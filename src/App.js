import { Component } from "react";
import Board from "./Board";
import "./styles.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { gridSize: 3 };
  }

  render() {
    return (
      <div>
        <h1> Tic Tac Toe </h1>
        <input
          value={this.state.gridSize}
          onChange={(e) => {
            this.setState({ gridSize: e.target.value });
          }}
        ></input>
        <Board gridSize={this.state.gridSize} />
      </div>
    );
  }
}
