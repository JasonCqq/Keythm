import "./App.scss";
import {
  MdFullscreen,
  MdOutlineExtensionOff,
  MdOutlineClose,
  MdDesktopMac,
  MdAutorenew,
} from "react-icons/md";
import { FaSpotify } from "react-icons/fa";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <div className="background"></div>

      <div className="wave-container">
        <h1 className="wave-text">
          <span>K</span>
          <span>E</span>
          <span>Y</span>
          <span>T</span>
          <span>H</span>
          <span>M</span>
        </h1>
      </div>

      <section className="instructions">
        <p>Rhythm game with synced songs and lyrics</p>
        <p>Build your combos</p>
      </section>

      <Link to="game" className="play">
        <p>START</p>
      </Link>

      <footer>
        <p> [EXPERIMENTAL] SCORES MAY RESET EVENTUALLY</p>
      </footer>
    </>
  );
}

export default App;
