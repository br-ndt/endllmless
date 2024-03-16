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
  water: "💦",
  wind: "🌬️",
};

const defaultWordState = {
  first: "",
  second: "",
  new: "",
};

function App() {
  const [loading, setLoading] = useState(false);
  const [wordState, setWordState] = useState(defaultWordState);
  const [isFirstFound, setIsFirstFound] = useState(false);
  const [stopWord, setStopWord] = useState(() => {
    const wordsInStorage = localStorage.getItem("words");
    if (wordsInStorage) {
      return getRandomStopWord();
    } else {
      return "Endless";
    }
  });
  const [storedWords, setStoredWords] = useState(() => {
    const wordsInStorage = localStorage.getItem("words");
    if (wordsInStorage) {
      return JSON.parse(wordsInStorage);
    } else {
      return defaultWords;
    }
  });

  const resetWords = () => {
    localStorage.setItem("words", JSON.stringify(defaultWords));
    setStoredWords(defaultWords);
    setWordState(defaultWordState);
  };

  const makeTheRequest = useCallback(
    async (first, second) => {
      setLoading(true);
      const wordRes = await combineTwoWords(first, second);

      return {
        [getFirstWord(wordRes.newWord.replaceAll('"', ""))]: wordRes.newEmoji,
      };
    },
    []
  );

  const setWordCombo = useCallback(
    async (first, second) => {
      if (!loading) {
        setIsFirstFound(false);
        setWordState({ first, second, new: "" });
        const newWordObj = await makeTheRequest(first, second);
        const newWord = Object.keys(newWordObj)[0];

        if (!Object.keys(storedWords).includes(newWord)) {
          const updatedWords = { ...storedWords, ...newWordObj };
          setStoredWords(updatedWords);
          setIsFirstFound(true);
          localStorage.setItem("words", JSON.stringify(updatedWords));
        }
        setWordState({ first, second, new: newWord });
        setLoading(false);
      }
    },
    [loading, makeTheRequest, setStoredWords, storedWords]
  );

  useEffect(() => {
    const interval = setInterval(
      () => setStopWord(getRandomStopWord()),
      Math.random() * 10000 + 5000
    );
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
          <div className="word-combo" style={{}}>
            {wordState.first ? (
              <>
                <SelectedWord
                  word={wordState.first}
                  emoji={storedWords[wordState.first]}
                  isFirstFound={false}
                />
                <span>+</span>
              </>
            ) : (
              <></>
            )}
            {wordState.second ? (
              <SelectedWord
                word={wordState.second}
                emoji={storedWords[wordState.second]}
                isFirstFound={false}
              />
            ) : (
              <></>
            )}
            <span>{wordState.first && wordState.second ? "= " : ""}</span>
            {wordState.new ? (
              <SelectedWord
                word={wordState.new}
                emoji={storedWords[wordState.new]}
                isFirstFound={isFirstFound}
              />
            ) : loading ? (
              <Spinner />
            ) : (
              ""
            )}
          </div>
        </div>
        <GameButtonsContainer setWordCombo={setWordCombo} words={storedWords} />
      </div>
      <button onClick={resetWords}>Reset Words</button>
    </div>
  );
}

export default App;
