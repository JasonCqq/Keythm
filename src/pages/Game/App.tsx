import { useEffect, useState, useRef } from "react";
import "./App.scss";

function App() {
  const [title, setTitle] = useState("Someone To Spend Time With");
  const [artist, setArtist] = useState("Los Gatos");
  const [length, setLength] = useState(2.55);

  // const hp, progress

  // remember to lower case all, remove all punctuations later
  const [lyrics, setLyrics] = useState(
    "wake up alone in the morning with no one at my side could it be ive waited too long waiting for the lucky one"
  );

  const [combo, setCombo] = useState(259);
  const [score, setScore] = useState(8124120);

  const [userInput, setUserInput] = useState<string>("");
  const [key, setKey] = useState<string>("");

  const keyCounter = useRef(-1);

  useEffect(() => {
    document.addEventListener("keydown", function (e) {
      setUserInput((prev) => prev + e.key);

      setKey(e.key);
      keyCounter.current++;

      if (userInput[keyCounter.current] === lyrics[keyCounter.current]) {
        console.log("NICE");
      } else {
        console.log("WRONG");
      }
    });
  }, []);

  return (
    <>
      <header className="song">
        <p className="song-title">{title}</p>
        <section className="song-info">
          {/* Add a timer icon to song length and artist */}
          <p className="song-artist">{artist}</p>
          <p className="song-length">{length}</p>
        </section>
      </header>

      <div className="song-progress"></div>

      <section className="lyrics-wrapper">
        <p className="lyrics">{lyrics}</p>
      </section>

      <span className="combo">
        <p className="key-pressed">{key}</p>

        <p>
          {combo} x <br /> COMBO
        </p>
      </span>

      <div className="hp"></div>

      <section className="score-wrap">
        <p className="score">{score}</p>
        <p>SCORE</p>
      </section>

      {/* temp for testing */}
      <p className="userInput">{userInput}</p>
    </>
  );
}

export default App;
