import "./Grid.css";
import { useState, useEffect } from "react";

function Cell({ cell, toggle }) {
  return (
    <div
      className={["cell-20px", cell.alive ? "alive" : "dead"].join(" ")}
      onClick={() => toggle(cell)}
    >
      {cell.alive ? cell.symbol : " "}
    </div>
  );
}

function generateSymbol() {
  const allowedEmoji = "😊🙃🤪🤓🤯😴💩👻👽🤖👾👐🖖🤟🤘🤙👋🐭🦕🦖🐉";
  return allowedEmoji[~~(Math.random() * allowedEmoji.length)];
}

function generateCells(amount) {
  const cells = [...new Array(amount).keys()].map((cell) => ({
    alive: false,
    symbol: generateSymbol(),
  }));

  return cells;
}

function Grid() {
  const [cells, setCells] = useState(generateCells(100 * 100));

  const toggleCell = (cell) => {
    setCells((prevState) => {
      const index = prevState.indexOf(cell);
      console.log(cell);
      console.log(index);
      return [
        ...prevState.slice(0, index),
        { ...cell, alive: !cell.alive },
        ...prevState.slice(index + 1),
      ];
    });
  };

  const turn = () => {};

  return (
    <div className="grid-20px">
      {cells.map((cell) => (
        <Cell cell={cell} toggle={toggleCell} />
      ))}
    </div>
  );
}

export default Grid;
