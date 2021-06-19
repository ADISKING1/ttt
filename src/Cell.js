import { Component } from "react";

export default class Cell extends Component {
  render() {
    return (
      <div className={`cell ${this.props.value === 0 ? "O" : "X"}`}>
        {this.props.value !== "" ? (this.props.value === 0 ? "O" : "X") : " "}
      </div>
    );
  }
}
