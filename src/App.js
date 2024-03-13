import "./App.css";
import { useCallback, useEffect, useState } from "react";
import { bestEmoji, combineTwoWords } from "./utils/llama";
import Spinner from "./Spinner";
import { GameButtonsContainer } from "./GameButton";

const defaultWords = {

}

function App() {
  const [loading, setLoading] = useState(false);
  const [combo, setCombo] = useState([]);
  const [words, setWords] = useState(["fire", "water", "earth", "wind", "pizza"]);

  const makeTheRequest = useCallback(
    async (newCombo) => {
      setLoading(true);
      const wordRes = await combineTwoWords(newCombo[0], newCombo[1]);
      const word = res?.choices[0].message.content.split(" ")[0].toLocaleLowerCase();
      if (!words.includes(word)) {
        console.log(words);
        const newWords = words.concat(word);
        console.log({ words, newWords });
        setWords(newWords);
        const emoRes = await bestEmoji(word);

      }
      setLoading(false);
      setCombo([]);
    }, [words]
  );

  const updateCombo = useCallback(async (newCombo) => {
    setCombo(newCombo);
    if (newCombo.length > 1) {
      makeTheRequest(newCombo);
    }
  }, [words]);

  // console.log({ combo });

  return (
    <div className="App App-header">
      <header style={{ maxWidth: "720px", margin: "auto" }}>
        <p>
          {combo.reduce((cur, acc) => {
            return acc + " " + cur;
          }, "")}
        </p>
        
        <GameButtonsContainer
          updateCombo={(combo) => updateCombo(combo)}
          words={words}
        />
        {/* <input
          style={{ marginTop: "16px", marginBottom: "16px", padding: "10px", width: "100%" }}
          type="button"
          onClick={makeTheRequest}
          value={`G O`}
        /> */}
        {loading ? <Spinner /> : <></>}
      </header>
    </div>
  );
}

export default App;
