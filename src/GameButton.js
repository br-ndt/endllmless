import { useCallback, useEffect, useState } from "react";

// word: string, onClick: Function
const GameButton = ({ word, emoji, onClick, index }) => {
  return (
    <button
      style={{ padding: "0px 6px 0px 6px", minWidth: "64px", minHeight: "104px", textTransform: "lowercase" }}
      onClick={() => onClick(word)}
      tabIndex={index}
    >
      <p>{emoji}</p>
      <p>{word}</p>
    </button>
  );
};

// words: string[]
export const GameButtonsContainer = ({ words, setWord }) => {
  const handleClick = useCallback((word) => {
    setWord(word);
  }, [setWord]);

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
