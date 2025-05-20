import "./App.css";
import { useReducer } from "react";
import { GameButtonsContainer } from "./GameButton";
import { TitleHeader } from "./TitleHeader";
import { gameReducer, initialGameState, initializeState } from "./gameReducer";
import { WordCombo } from "./WordCombo";
import { ResetButton } from "./ResetButton";

function App() {
  const [gameState, dispatch] = useReducer(gameReducer, initialGameState, initializeState);

  function resetWords() {
    dispatch({ type: 'reset_words' });
  }

  function clickWord(word) {
    dispatch({ type: 'click_word', word });
  }

  function newWord(word, emoji) {
    dispatch({ type: 'new_word', word, emoji });
  }

  function loadingWord() {
    dispatch({ type: 'loading_word' });
  }

  function loadingError() {
    dispatch({ type: 'loading_error' });
  }

  return (
    <div className="App">
      <div className="container" style={{ maxWidth: "720px", margin: "auto" }}>
        <div className="topbar">
          <TitleHeader />
          <WordCombo wordState={gameState.wordState} words={gameState.words} loadingWord={loadingWord} newWord={newWord} loadingError={loadingError} />
        </div>
        <GameButtonsContainer onClickWord={clickWord} words={gameState.words} />
      </div>
      <ResetButton confirmReset={gameState.confirmReset} resetWords={resetWords} />
    </div>
  );
}

export default App;

