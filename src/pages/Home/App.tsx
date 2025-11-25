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

// Background
import Particles from "react-particles";
import type { Engine } from "tsparticles-engine"; // same package everywhere
import { loadHyperspacePreset } from "tsparticles-preset-hyperspace";

function App() {
  const particlesInit = async (engine: Engine) => {
    await loadHyperspacePreset(engine);
  };

  return (
    <>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{ preset: "hyperspace", fullScreen: { zIndex: -1 } }}
      />

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
        <p>Type words along with the music</p>
        <p>Keep your health up </p>
        <p>Build your combos</p>
      </section>

      <Link to="game" className="play">
        <p>START</p>
      </Link>

      <section className="grid">
        <div>
          <MdFullscreen className="grid-icon" size={100} />
          <p>Full-screen (F11) for the best experience</p>
        </div>

        <div>
          <MdOutlineExtensionOff className="grid-icon" size={80} />
          <p>Disable extensions that may interfere with gameplay</p>
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
          <p>This is a beta product. More features will be coming soon!</p>
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
