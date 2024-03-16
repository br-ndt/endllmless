import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import { Draggable } from "./Draggable";
import { Droppable } from "./Droppable";

// word: string, onClick: Function
const GameButton = ({ emoji, index, word }) => {
  return (
    <button
      className="game-button"
      tabIndex={index}
    >
      <p>{emoji}</p>
      <p>{word}</p>
    </button>
  );
};

// words: string[]
export const GameButtonsContainer = ({ words, setWordCombo }) => {
  return (
    <div className="game-buttons-container">
      <DndProvider backend={HTML5Backend}>
        {Object.keys(words).map((word, index) => {
          return (
            <Droppable key={word} onDrop={setWordCombo} word={word}>
              <Draggable key={word} word={word}>
                <GameButton
                  emoji={words[word]}
                  index={index}
                  key={word}
                  word={word}
                />
              </Draggable>
            </Droppable>
          );
        })}{" "}
      </DndProvider>
    </div>
  );
};
