import { useEffect } from "preact/hooks";
import { SelectedWord } from "./SelectedWord";
import { Spinner } from "./Spinner";

const wordCombineApi = async (firstWord, secondWord) => {
    const requestTask = fetch(`/wordcombine?wordone=${firstWord}&wordtwo=${secondWord}`);
    const response = (await Promise.all([requestTask, new Promise(r => setTimeout(r, 600))]))[0];
    return await response.json();
};

export const WordCombo = ({ wordState, words, loadingWord, newWord, loadingError }) => {
    useEffect(() => {
        if (!wordState.loading && wordState.first && wordState.second) {
            async function makeTheRequest() {
                try {
                    const wordRes = await wordCombineApi(wordState.first, wordState.second);
                    newWord(wordRes.newWord, wordRes.newEmoji);
                }
                catch (error) {
                    loadingError();
                }
            }
            loadingWord();
            makeTheRequest();
        }
    }, [wordState.second]);

    useEffect(() => {
        localStorage.setItem("words", JSON.stringify(words));
    }, [words]);

    return (
        <div className="word-combo" style={{}}>
            {wordState.first ? (
                <>
                    <SelectedWord
                        word={wordState.first}
                        emoji={words[wordState.first]}
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
                    emoji={words[wordState.second]}
                    isFirstFound={false}
                />
            ) : (
                <></>
            )}
            <span>{wordState.first && wordState.second ? "= " : ""}</span>
            {wordState.new ? (
                <SelectedWord
                    word={wordState.new}
                    emoji={words[wordState.new]}
                    isFirstFound={wordState.isFirstFound}
                />
            ) : wordState.loading ? (
                <Spinner />
            ) : (
                ""
            )}
        </div>
    );
};