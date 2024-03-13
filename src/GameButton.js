import { useCallback, useEffect, useState } from "react";

// word: string, onClick: Function
const GameButton = ({word, onClick}) => {
    return (
        <button style={{padding: '16px',  textTransform: 'lowercase'}} onClick={() => onClick(word)}>{word}</button>
    );
}

// words: string[]
export const GameButtonsContainer = ({words, updateCombo}) => {
    const [firstWord, setFirstWord] = useState(null);
    const [combo, setCombo] = useState([]);


    const handleClick = useCallback((word) => {
        if (firstWord === null) {
            setFirstWord(word);
            updateCombo([word]);
        } else {
            const newCombo = [firstWord, word]
            setCombo(newCombo);
            updateCombo(newCombo);
            setFirstWord(null);
        }
    }, [firstWord])


    return <div>
        {
        words.map((word) => {
            return <GameButton key={word} onClick={(word) => handleClick(word)} word={word}/>;
        })
    } </div>
}