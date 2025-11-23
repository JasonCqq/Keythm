// import { useState } from "react";
import "./App.scss";
import {
  MdFullscreen,
  MdOutlineExtensionOff,
  MdOutlineClose,
  MdDesktopMac,
  MdAutorenew,
} from "react-icons/md";
import { FaSpotify } from "react-icons/fa";

function App() {
  return (
    <>
      <h1>KEYTHM</h1>

      <section className="instructions">
        <p>Type words along with the music</p>
        <p>Build your combos</p>
        <p>Keep your health bar up</p>
      </section>

      <button>PLAY</button>

      <section className="grid">
        <div>
          <MdFullscreen className="grid-icon" size={100} />
          <p>Full-screen for the best experience</p>
        </div>

        <div>
          <MdOutlineExtensionOff className="grid-icon" size={80} />
          <p>
            Disable extensions that may interfere with gameplay, colors, or even
            performance
          </p>
        </div>

        <div>
          <MdOutlineClose className="grid-icon" size={90} />
          <p>Close other tabs if performance is lacking</p>
        </div>

        <div>
          <MdDesktopMac className="grid-icon" size={85} />
          <p>Desktop only, this game cannot be played on a mobile device</p>
        </div>

        <div>
          <MdAutorenew className="grid-icon" size={85} />
          <p>
            Keep in mind, this is a beta product. More features will be coming
            soon!
          </p>
        </div>

        <div>
          <FaSpotify className="grid-icon" size={80} />
          <p>Spotify integration possibly coming, don’t count on it!</p>
        </div>
      </section>

      <footer>
        <p> [EXPERIMENTAL] SCORES MAY RESET EVENTUALLY</p>
      </footer>
    </>
  );
}

export default App;
