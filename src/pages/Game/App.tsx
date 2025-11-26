import { useEffect, useState, useRef } from "react";
import "./App.scss";

import Counter from "./ComboCounter/App.tsx";
import CountUp from "./ScoreCounter/App.tsx";
import { Link } from "react-router-dom";

import CloudsBackground from "./Background/App.tsx";

// import axios from "axios";

function App() {
  // remember to lower case all, remove all punctuations later
  const [lyrics, setLyrics] = useState(
    `[00:05.02] Disassociate your brain, your brain
[00:09.29] I know you love the pain, I love the pain
[00:12.08] You're not okay, I'm not okay
[00:15.15] I know you love the pain, I love the pain (Yeah)
[00:18.54] Stress me out, and touch me now
[00:21.61] Put your hands around my throat and choke me out
[00:24.76] And shut my mouth, then shut your mouth
[00:27.90] But keep on talkin' all that shit, I love that sound
[00:31.28] And say my name like you mean it
[00:34.46] Or disrespect me, say you want it, say you need it
[00:37.68] Don't have to mean it, don't have no ceiling
[00:40.85] Hurry up, take off that dress, it's too revealing, yeah
[00:47.78] (I was runnin' with the gang)
[00:49.62] Disassociate your brain, your brain
[00:53.76] I know you love the pain, I love the pain
[00:56.56] You're not okay, I'm not okay
[00:59.81] I know you love the pain, I love the pain
[01:02.66] Diso—, your brain, your brain
[01:06.56] I know you love the pain, I love the pain
[01:09.34] You're not okay, I'm not okay
[01:12.78] I know you love the pain, I love the pain
[01:15.34] Diso—
[01:16.50] Stress me out, and touch me now
[01:19.02] Put your hands around my throat and choke me out
[01:22.05] And shut my mouth, then shut your mouth
[01:25.39] But keep on talkin' all that shit, I love that sound
[01:28.86] And say my name like you mean it
[01:32.04] Or disrespect me, say you want it, say you need it
[01:35.03] Don't have to mean it, don't have no ceiling
[01:38.19] Hurry up, take off that dress, it's too revealing, yeah
[01:45.95] (I was runnin' with the gang)
[01:47.06] Disassociate your brain, your brain
[01:51.18] I know you love the pain, I love the pain
[01:53.92] You're not okay, I'm not okay
[01:57.21] I know you love the pain, I love the pain
[01:59.71] Diso—, your brain, your brain
[02:03.85] I know you love the pain, I love the pain
[02:06.87] You're not okay, I'm not okay
[02:10.02] I know you love the pain, I love the pain
[02:12.63] Diso—
[02:16.44] (I was runnin' with the gang)
[02:19.11] (Now run it)
[02:23.58] (You love the pain)
[02:29.82] (I know you love the pain, I love the pain)
[02:32.04] Disassociate (You love the pain)
[02:35.43] `
  );
  const [rawLyrics, setRawLyrics] = useState<{ time: number; text: string }[]>(
    []
  );

  const [combo, setCombo] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  // const [wpm, setWpm] = useState<number>(0);
  // Number_of_keystroke / time_in_second * 60 * percentages_of_accurate_word

  // remove or move into a const variable later on instead state
  const [userInput, setUserInput] = useState<string>("");
  const [highlightIndex, setHighlightIndex] = useState<number>(0);

  const [key, setKey] = useState<string>("");

  const keyCounter = useRef(0);

  //fetch lyrics
  // useEffect(() => {
  //   async function getLyrics() {
  //     const res = await fetch(
  //       "https://lrclib.net" + "/api/search?track_name=BRAIN&artist_name=DIPLO",
  //       {
  //         method: "GET",
  //       }
  //     );

  //     const data = await res.json();
  //     console.log(data[0].syncedLyrics);
  //   }

  //   getLyrics();
  // });

  const [currentLine, setCurrentLine] = useState<number>(0);

  // parse lyrics, separates time and text, and removes punctuation
  useEffect(() => {
    function parseLyrics() {
      const regex = /\[(\d{2}):(\d{2}\.\d{2})\]\s*([^[]+)/g;
      const lyrics2: { time: number; text: string }[] = [];

      let match;
      while ((match = regex.exec(lyrics)) !== null) {
        const minutes = parseInt(match[1]);
        const seconds = parseFloat(match[2]);
        let text = match[3].trim();

        text = text.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");

        lyrics2.push({ time: minutes * 60 + seconds, text });
      }

      return lyrics2;
    }

    const parsed = parseLyrics();
    // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
    setRawLyrics(parsed);
  }, []);

  useEffect(() => {
    // Everything below here is for key pressing functions
    const handleKeyDown = (e: KeyboardEvent) => {
      const keyCount = keyCounter.current;

      // Skip non letters
      if (!/^[a-zA-Z]$/.test(e.key)) return;

      // Type sound
      const sound = document.getElementById("sound") as HTMLAudioElement;
      sound.volume = 0.5;
      sound.currentTime = 0;
      sound.play();

      if (
        e.key.toLowerCase() ===
        rawLyrics[currentLine]?.text[keyCount].toLowerCase()
      ) {
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
      if (rawLyrics[currentLine]?.text[keyCounter.current] === " ") {
        keyCounter.current++;
        setHighlightIndex((prev) => prev + 1);
      }

      if (keyCount >= rawLyrics[currentLine].text.length - 1) {
        setCurrentLine((prev) => prev + 1);
        keyCounter.current = 0;
        setHighlightIndex(0);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // cleanup function that removes the listener
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [userInput]);

  useEffect(() => {
    if (rawLyrics.length === 0) return;

    const intervalId = setInterval(() => {
      const elapsed = performance.now() / 1000; // seconds

      // Move to the next line if its time has passed
      if (
        currentLine < rawLyrics.length - 1 &&
        elapsed >= rawLyrics[currentLine + 1].time
      ) {
        setCurrentLine((prev) => prev + 1);
        keyCounter.current = 0; // reset typing index
        setHighlightIndex(0);
      }

      console.log(elapsed, rawLyrics[currentLine].time);
    }, 500); // 500ms = 0.5 seconds

    return () => clearInterval(intervalId);
  }, [rawLyrics, currentLine]);

  return (
    <>
      <CloudsBackground />
      <audio id="sound" src="/click.mp3"></audio>

      <iframe
        width="25%"
        height="126"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2095478871&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
      ></iframe>

      <div className="options">
        <Link to="/" className="span">
          <p>E</p>
          <p>X</p>
          <p>I</p>
          <p>T</p>
        </Link>
      </div>

      <section className="lyrics-wrapper">
        <p className="lyrics">
          {rawLyrics[currentLine]?.text.split("").map((char, index) => (
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

          <br />
          {rawLyrics[currentLine + 1]?.text.split("").map((char, index) => (
            <span key={index} className="untyped">
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
