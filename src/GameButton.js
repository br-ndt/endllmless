import { useCallback, useEffect, useState } from "react";

// word: string, onClick: Function
const GameButton = ({ word, emoji, onClick, index }) => {
  return (
    <button
      style={{ padding: "16px", textTransform: "lowercase" }}
      onClick={() => onClick(word)}
      tabIndex={index}
    >
      <p>{emoji}</p>
      <p>{word}</p>
    </button>
  );
};

// words: string[]
export const GameButtonsContainer = ({ words, updateCombo }) => {
  const [firstWord, setFirstWord] = useState(null);
  const [combo, setCombo] = useState([]);

  const handleClick = useCallback(
    (word) => {
      if (firstWord === null) {
        setFirstWord(word);
        updateCombo([word]);
      } else {
        const newCombo = [firstWord, word];
        setCombo(newCombo);
        updateCombo(newCombo);
        setFirstWord(null);
      }
    },
    [firstWord]
  );

  return (
    <div>
      {Object.keys(words).map((word, index) => {
        return (
          <GameButton
            index={index}
            key={word}
            onClick={(word) => handleClick(word)}
            word={word}
            emoji={words[word]}
          />
        );
      })}{" "}
    </div>
  );
};
