import { useEffect, useState } from "preact/hooks";
import { stopWords } from "./stopWords";

const getRandomStopWord = () =>
    stopWords[Math.floor(stopWords.length * Math.random())];

export const TitleHeader = () => {
    const [stopWord, setStopWord] = useState("Endless");

    useEffect(() => {
        const interval = setInterval(
            () => setStopWord(getRandomStopWord()),
            Math.random() * 10000 + 5000
        );
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div>
            <h2 style={{ textTransform: "uppercase" }}>
                CRAFT {stopWord} THINGS
            </h2>
        </div>
    );
};