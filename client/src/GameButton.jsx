import { useEffect, useRef, useState } from "preact/hooks";

// word: string, onClick: Function
const GameButton = ({ emoji, index, onClick, word }) => {
  return (
    <button
      className="game-button"
      onClick={onClick ? () => onClick(word) : () => undefined}
      tabIndex={index}
    >
      <p>{emoji}</p>
      <p>{word}</p>
    </button>
  );
};

// words: string[]
export const GameButtonsContainer = ({ onClickWord, words }) => {
  const [tadaWord, setTadaWord] = useState(null);
  const [selectedWords, setSelectedWords] = useState([]);
  const [fadeOutWords, setFadeOutWords] = useState([]);
  const prevWords = useRef(Object.keys(words));

  // Track new word for tada animation
  useEffect(() => {
    const currentWords = Object.keys(words);
    let tadaTarget = null;
    if (currentWords.length > prevWords.current.length) {
      const newWord = currentWords.find((w) => !prevWords.current.includes(w));
      tadaTarget = newWord;
    }
    // Always fade out highlight after a selection attempt
    if (tadaTarget) {
      setTadaWord(null);
      setTimeout(() => setTadaWord(tadaTarget), 0);
      setTimeout(() => setTadaWord(null), 1000);
    }
    if (selectedWords.length === 2 || selectedWords.length === 1) {
      setFadeOutWords(selectedWords);
      setTimeout(() => setFadeOutWords([]), 1200);
      setSelectedWords([]);
    }
    prevWords.current = currentWords;
  }, [words]);

  // Track selected words for highlight
  function handleClick(word) {
    if (onClickWord) onClickWord(word);
    setSelectedWords((prev) => {
      if (prev.length < 2 && !prev.includes(word)) {
        return [...prev, word];
      } else if (prev.length === 2) {
        return [word];
      } else if (prev.length === 1 && prev[0] === word) {
        // If the same button is clicked twice, keep it selected
        return [word];
      } else {
        return prev;
      }
    });
    setFadeOutWords([]); // Remove fade-out if re-selecting
  }

  return (
    <div className="game-buttons-container">
      {Object.keys(words).map((word, index) => {
        let btnClass = "game-button";
        if (tadaWord === word) btnClass += " tada";
        if (selectedWords.includes(word)) btnClass += " selected";
        if (fadeOutWords.includes(word)) btnClass += " selected fade-out";
        return (
          <button
            className={btnClass}
            onClick={() => handleClick(word)}
            tabIndex={index}
            key={word}
          >
            <p>{words[word]}</p>
            <p>{word}</p>
          </button>
        );
      })}
    </div>
  );
};
