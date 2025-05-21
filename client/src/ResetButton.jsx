export const ResetButton = ({ confirmReset, resetWords }) => {
    return (
        confirmReset ? <button onClick={resetWords}>Are You Sure?</button> : <button onClick={resetWords}>Reset Words</button>
    );
};