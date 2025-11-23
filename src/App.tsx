import { useState } from "react";
import "./App.scss";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>KEYTHM</h1>
      <h2>KEYTHM</h2>
      <h3>KEYTHM</h3>
      <h4>KEYTHM</h4>
      <h5>KEYTHM</h5>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          PLAY {count}
        </button>
        <p></p>
      </div>
    </>
  );
}

export default App;
