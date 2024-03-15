import "./App.css";
import { useCallback, useEffect, useState } from "react";
import { combineTwoWords } from "./utils/combineWordsApi";
import Spinner from "./Spinner";
import { GameButtonsContainer } from "./GameButton";
import { stopWordsMap, stopWords } from "./stopWords";
import { SelectedWord } from "./SelectedWord";

const getFirstWord = (content) => {
  const words = content.split(" ");
  for (let word of words) {
    if (!stopWordsMap[word]) {
      return word.toLocaleLowerCase();
    }
  }
  return "nope";
};

const getRandomStopWord = () =>
  stopWords[Math.floor(stopWords.length * Math.random())];
const randomWord = getRandomStopWord();

const defaultWords = {
  earth: "⛰️",
  fire: "🔥",
  life: "🌿",
  stone: "🪨",
  water: "💦",
  wind: "🌬️",
  wood: "🪵",
};

function App() {
  const [loading, setLoading] = useState(false);
  const [firstWord, setFirstWord] = useState("");
  const [secondWord, setSecondWord] = useState("");
  const [newWord, setNewWord] = useState("");
  const [words, setWords] = useState(() => {
    const wordsInStorage = localStorage.getItem("words");
    if (wordsInStorage) {
      return JSON.parse(wordsInStorage);
    } else {
      return defaultWords;
    }
  });

  const makeTheRequest = useCallback(
    async (firstWord, secondWord) => {
      setLoading(true);
      const wordRes = await combineTwoWords(firstWord, secondWord);

      const word = getFirstWord(
        wordRes.newWord.replaceAll("\"", "")
      );
      if (!Object.keys(words).includes(word)) {
        const updatedWords = { ...words, [word]: wordRes.newEmoji };
        setWords(updatedWords);
        localStorage.setItem("words", JSON.stringify(updatedWords));
      }
      setNewWord(word);
      setLoading(false);
    },
    [words, loading]
  );

  const setWord = useCallback(
    async (word) => {
      if (!loading) {
        if (newWord) {
          setFirstWord(word);
          setNewWord("");
          setSecondWord("");
        } else if (firstWord) {
          setSecondWord(word);
          makeTheRequest(firstWord, word);
        } else {
          setFirstWord(word);
          setNewWord("");
          setSecondWord("");
        }
      }
    },
    [firstWord, secondWord, loading]
  );

  return (
    <div className="App">
      <div className="container" style={{ maxWidth: "720px", margin: "auto" }}>
        <div className="topbar">
          <div>
            <h2 style={{ textTransform: "uppercase" }}>
              CRAFT {randomWord} THINGS
            </h2>
          </div>
          <div
            style={{
              height: "50px",
              marginBottom: "16px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {firstWord ? (
              <>
                <SelectedWord string={firstWord} emoji={words[firstWord]} />
                <span>+</span>
              </>
            ) : (
              <></>
            )}
            {secondWord ? (
              <SelectedWord string={secondWord} emoji={words[secondWord]} />
            ) : (
              <></>
            )}
            {firstWord && secondWord ? "= " : ""}
            {newWord ? (
              <SelectedWord string={newWord} emoji={words[newWord]} />
            ) : loading ? (
              <Spinner />
            ) : (
              ""
            )}
          </div>
        </div>
        <GameButtonsContainer setWord={setWord} words={words} />
      </div>
    </div>
  );
}

export default App;
