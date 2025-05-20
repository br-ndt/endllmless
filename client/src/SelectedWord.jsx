export const SelectedWord = ({ word, emoji, isFirstFound }) => {
  return (
    <span className={`word ${isFirstFound ? "firstWord" : ""}`} >{emoji}   {word}</span>
  );
};