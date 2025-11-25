import { useEffect, useState, useRef } from "react";
import "./App.scss";

import { RiTimer2Fill } from "react-icons/ri";
import { PiMicrophoneStageFill } from "react-icons/pi";

import Counter from "./ComboCounter/App.tsx";
import CountUp from "./ScoreCounter/App.tsx";

function App() {
  const [title, setTitle] = useState("Someone To Spend Time With");
  const [artist, setArtist] = useState("Los Gatos");
  const [length, setLength] = useState("2:55");

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
    const handleKeyDown = (e: KeyboardEvent) => {
      const keyCount = keyCounter.current;

      // Skip non letters
      if (!/^[a-zA-Z]$/.test(e.key)) return;

      // Check if key is correct
      if (e.key === lyrics[keyCount]) {
        setCombo((prev) => prev + 1);
        setScore((prev) => prev + 1000);
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
      <div className="options">
        <p>PLAY</p>
        <p>RESTART</p>
        <p>EXIT</p>
        <p>VOLUME SLIDER</p>
      </div>

      <header className="song">
        <p className="song-title">{title}</p>
        <section className="song-info">
          {/* Add a timer icon to song length and artist */}

          <span>
            <PiMicrophoneStageFill />
            <p className="song-artist">{artist}</p>
          </span>

          <span>
            <RiTimer2Fill />
            <p className="song-length">{length}</p>
          </span>
        </section>
      </header>

      <div className="song-progress"></div>

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

      <div className="hp"></div>

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
