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
  const symbols =
    "❤❥웃유🍾☮✌☏✔☑♚▲♪✈⌚¿♥❣♂♀⚤Ⓐ✍✉☣☤✘☒♛▼♫⌘⌛¡♡ღツ☼☁❅♾️✎©®™Σ✪✯☭➳•✿⚡☃☂✄¢€£∞✫★½☯";
  return symbols[~~(Math.random() * symbols.length)];
}

function generateCells(amount) {
  const cells = [...new Array(amount).keys()].map((cell) => ({
    alive: false,
    symbol: generateSymbol(),
  }));

  return cells;
}

function getNeighbors(index, width, height) {
  const left = index - 1;
  const right = index + 1;
  const upper = index - width;
  const upperLeft = upper - 1;
  const upperRight = upper + 1;
  const lower = index + width;
  const lowerLeft = lower - 1;
  const lowerRight = lower + 1;

  return [
    left,
    right,
    upper,
    upperLeft,
    upperRight,
    lower,
    lowerLeft,
    lowerRight,
  ].filter((x) => x > 0 && x < width * height);
}

function doesSurvive(isAlive, neighbors) {
  if (isAlive) return neighbors === 2 || neighbors === 3;
  else return neighbors === 3;
}

function Grid({ active }) {
  const width = 100;
  const height = 100;
  const stepInterval = 100;
  const batches = 10;
  const batchSize = (width * height) / batches;
  const [cells, setCells] = useState(generateCells(width * height));

  const toggleCell = (cell) => {
    setCells((prevState) => {
      const index = prevState.indexOf(cell);
      return [
        ...prevState.slice(0, index),
        { ...cell, alive: !cell.alive },
        ...prevState.slice(index + 1),
      ];
    });
  };

  useEffect(() => {
    if (active) {
      const interval = setInterval(() => {
        setCells((prevState) => {
          return prevState.map((cell, index) => {
            const neighbors = getNeighbors(index, width, height);
            const aliveNeighbors = neighbors
              .map((x) => (prevState[x].alive ? 1 : 0))
              .reduce((a, c) => a + c);
            return {
              ...cell,
              alive: doesSurvive(cell.alive, aliveNeighbors),
            };
          });
        });
      }, stepInterval);
      return () => clearInterval(interval);
    }
  }, [active]);

  return (
    <div className="grid-20px">
      {cells.slice(0, batchSize * 1).map((cell, i) => (
        <Cell key={`cell-${i}`} cell={cell} toggle={toggleCell} />
      ))}
      {cells.slice(batchSize * 1, batchSize * 2).map((cell, i) => (
        <Cell key={`cell-${i}`} cell={cell} toggle={toggleCell} />
      ))}
      {cells.slice(batchSize * 2, batchSize * 3).map((cell, i) => (
        <Cell key={`cell-${i}`} cell={cell} toggle={toggleCell} />
      ))}
      {cells.slice(batchSize * 3, batchSize * 4).map((cell, i) => (
        <Cell key={`cell-${i}`} cell={cell} toggle={toggleCell} />
      ))}
      {cells.slice(batchSize * 4, batchSize * 5).map((cell, i) => (
        <Cell key={`cell-${i}`} cell={cell} toggle={toggleCell} />
      ))}
      {cells.slice(batchSize * 5, batchSize * 6).map((cell, i) => (
        <Cell key={`cell-${i}`} cell={cell} toggle={toggleCell} />
      ))}
      {cells.slice(batchSize * 6, batchSize * 7).map((cell, i) => (
        <Cell key={`cell-${i}`} cell={cell} toggle={toggleCell} />
      ))}
      {cells.slice(batchSize * 7, batchSize * 8).map((cell, i) => (
        <Cell key={`cell-${i}`} cell={cell} toggle={toggleCell} />
      ))}
      {cells.slice(batchSize * 8, batchSize * 9).map((cell, i) => (
        <Cell key={`cell-${i}`} cell={cell} toggle={toggleCell} />
      ))}
      {cells.slice(batchSize * 9).map((cell, i) => (
        <Cell key={`cell-${i}`} cell={cell} toggle={toggleCell} />
      ))}
    </div>
  );
}

export default Grid;
