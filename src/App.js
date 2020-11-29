import "./App.css";
import Grid from "./Grid";
import { useState } from "react";

function StartButton({ active, toggle }) {
  const className = active ? "start-active" : "start-inactive";
  const text = active ? "Stop" : "Start";
  return (
    <div className={className} onClick={toggle}>
      {text}
    </div>
  );
}

function App() {
  const [active, setActive] = useState(false);

  function toggleActive() {
    return setActive((prevState) => {
      return !prevState;
    });
  }

  return (
    <div className="App">
      <Grid active={active} />
      <StartButton active={active} toggle={toggleActive} />
    </div>
  );
}

export default App;
