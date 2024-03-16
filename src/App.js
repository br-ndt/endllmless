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
  const [isFirstFound, setIsFirstFound] = useState(false);
  const [stopWord, setStopWord] = useState(getRandomStopWord());
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
        setIsFirstFound(true);
        localStorage.setItem("words", JSON.stringify(updatedWords));
      }
      setNewWord(word);
      setLoading(false);
    },
    [words, isFirstFound, loading]
  );

  const setWord = useCallback(
    async (word) => {
      if (!loading) {
        setIsFirstFound(false);
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
    [firstWord, secondWord, isFirstFound, loading]
  );

  useEffect(() => {
    const interval = setInterval(() => setStopWord(getRandomStopWord()), (Math.random() * 10000) + 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);


  return (
    <div className="App">
      <div className="container" style={{ maxWidth: "720px", margin: "auto" }}>
        <div className="topbar">
          <div>
            <h2 style={{ textTransform: "uppercase" }}>
              CRAFT {stopWord} THINGS
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
                <SelectedWord word={firstWord} emoji={words[firstWord]} isFirstFound={false} />
                <span>+</span>
              </>
            ) : (
              <></>
            )}
            {secondWord ? (
              <SelectedWord word={secondWord} emoji={words[secondWord]} isFirstFound={false} />
            ) : (
              <></>
            )}
            <span>{firstWord && secondWord ? "= " : ""}</span>
            {newWord ? (
              <SelectedWord word={newWord} emoji={words[newWord]} isFirstFound={isFirstFound} />
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
