export const combineTwoWords = async (firstWord, secondWord) => {
    const response = await fetch(`/wordcombine?wordone=${firstWord}&wordtwo=${secondWord}`);
    return await response.json();
};
