import "./App.css";
import { useCallback, useEffect, useState } from "react";
import { bestEmoji, combineTwoWords } from "./utils/llama";
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

const getRandomStopWord = () => stopWords[Math.floor(stopWords.length * Math.random())];
const randomWord = getRandomStopWord();

const defaultWords = {
  fire: "🔥",
  water: "💦",
  earth: "⛰️",
  wind: "🌬️",
};

function App() {
  const [loading, setLoading] = useState(false);
  const [combo, setCombo] = useState([]);
  const [words, setWords] = useState(() => {
    const wordsInStorage = localStorage.getItem("words");
    console.log({wordsInStorage});
    if (wordsInStorage) {
      return JSON.parse(wordsInStorage);
    } else {
      return defaultWords;
    }
  });
  const [newWord, setNewWord] = useState("");

  const makeTheRequest = useCallback(
    async (newCombo) => {
      setLoading(true);
      const wordRes = await combineTwoWords(newCombo[0], newCombo[1]);

      // const word = wordRes?.choices[0].message.content.split(" ")[0].toLocaleLowerCase();
      const word = getFirstWord(wordRes?.choices[0].message.content);
      setNewWord(word);
      if (!Object.keys(words).includes(word)) {
        const emoRes = await bestEmoji(word);
        const emoji = emoRes?.choices[0].message.content;
        const updatedWords = { ...words, [word]: emoji }
        setWords(updatedWords);
        localStorage.setItem('words', JSON.stringify(updatedWords));
      }
      setLoading(false);
    },
    [words]
  );

  const updateCombo = useCallback(
    async (newCombo) => {
      setNewWord("");
      setCombo(newCombo);
      if (newCombo.length > 1) {
        makeTheRequest(newCombo);
      }
    },
    [words]
  );

  console.log(combo);

  return (
    <div className="App">
      <div className="container" style={{ maxWidth: "720px", margin: "auto" }}>
        <div>
          <h2 style={{textTransform: 'uppercase'}}>CRAFT {randomWord} THINGS</h2>
        </div>
        <div style={{ height: "50px", marginBottom: "16px", display: "flex" }}>
          <SelectedWord string={combo[0]} emoji={words[combo[0]]} />
          <span>+</span>
          <SelectedWord string={combo[1]} emoji={words[combo[1]]} />
          {combo.length === 2 ? "= " : ""}
          {newWord ? (
            <SelectedWord string={newWord} emoji={words[newWord]} />
          ) : loading ? (
            <Spinner />
          ) : (
            ""
          )}
        </div>
        <GameButtonsContainer
          updateCombo={(combo) => updateCombo(combo)}
          words={words}
        />
      </div>
    </div>
  );
}

export default App;
