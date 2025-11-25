import { useEffect, useState, useRef } from "react";
import "./App.scss";

import { FaPlay } from "react-icons/fa";
import { MdOutlineReplay } from "react-icons/md";
import { IoExitOutline } from "react-icons/io5";

import Counter from "./ComboCounter/App.tsx";
import CountUp from "./ScoreCounter/App.tsx";
import { Link } from "react-router-dom";

function App() {
  // const [title, setTitle] = useState("Someone To Spend Time With");
  // const [artist, setArtist] = useState("Los Gatos");
  // const [length, setLength] = useState("2:55");

  // const hp, progress

  // remember to lower case all, remove all punctuations later
  const [lyrics, setLyrics] = useState(
    "wake up alone in the morning with no one at my side could it be ive waited too long waiting for the lucky one"
  );

  const [combo, setCombo] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  // remove or move into a const variable later on instead state
  const [userInput, setUserInput] = useState<string>("");
  const [highlightIndex, setHighlightIndex] = useState<number>(0);

  const [key, setKey] = useState<string>("");

  const keyCounter = useRef(0);

  useEffect(() => {
    // Everything below here is for key pressing functions
    const handleKeyDown = (e: KeyboardEvent) => {
      const keyCount = keyCounter.current;

      // Skip non letters
      if (!/^[a-zA-Z]$/.test(e.key)) return;

      // Type sound
      const sound = document.getElementById("sound") as HTMLAudioElement;
      sound.volume = 0.1;
      sound.currentTime = 0;
      sound.play();

      // Check if key is correct
      if (e.key === lyrics[keyCount]) {
        setCombo((prev) => prev + 1);
        setScore((prev) => prev + 300 * combo);
      } else {
        setCombo(0);
      }

      setUserInput((prev) => prev + e.key);
      setKey(e.key);

      keyCounter.current++;
      setHighlightIndex((prev) => prev + 1);

      // check for space, increment extra if next letter is space
      if (lyrics[keyCounter.current] === " ") {
        console.log("space");
        keyCounter.current++;
        setHighlightIndex((prev) => prev + 1);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // cleanup function that removes the listener
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [userInput]);

  return (
    <>
      <audio id="sound" src="/click.mp3"></audio>

      <iframe
        width="25%"
        height="126"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2095478871&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
      ></iframe>
      <div>
        <a href="https://soundcloud.com/diplo" title="Diplo" target="_blank">
          Diplo
        </a>
        <a
          href="https://soundcloud.com/diplo/brain-feat-artemas"
          title="BRAIN (feat. Artemas)"
          target="_blank"
        >
          BRAIN (feat. Artemas)
        </a>
      </div>

      <div className="options">
        <span>
          <FaPlay />
          <p>PLAY</p>
        </span>

        <span>
          <MdOutlineReplay />
          <p>RESTART</p>
        </span>

        <Link to="/" className="span">
          <IoExitOutline />
          <p>EXIT</p>
        </Link>

        <span>
          <p>VOLUME SLIDER</p>
        </span>
      </div>

      <section className="lyrics-wrapper">
        <p className="lyrics">
          {lyrics.split("").map((char, index) => (
            <span
              key={index}
              className={
                index < highlightIndex
                  ? "typed"
                  : index === highlightIndex
                  ? "highlight"
                  : "untyped"
              }
            >
              {char}
            </span>
          ))}
        </p>
      </section>

      <span className="combo">
        <p className="key-pressed">{key}</p>

        <div>
          <Counter
            value={combo}
            places={[100, 10, 1]}
            fontSize={80}
            padding={0}
            gap={0}
            textColor="white"
            fontWeight={900}
          />
          <p>x</p>
        </div>
      </span>

      <section className="score-wrap">
        <CountUp
          from={0}
          to={score}
          separator=""
          direction="up"
          duration={0.25}
          className="count-up-text"
        />
        <p>SCORE</p>
      </section>

      {/* temp for testing */}
      {/* <p className="userInput">{userInput}</p> */}
    </>
  );
}

export default App;
