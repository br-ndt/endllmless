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
  return (
    <>
      <div className="game-buttons-container">
        {Object.keys(words).map((word, index) => {
          return (
            <GameButton
              emoji={words[word]}
              index={index}
              key={word}
              onClick={onClickWord}
              word={word}
            />
          );
        })}{" "}
      </div>
    </>
  );
};
