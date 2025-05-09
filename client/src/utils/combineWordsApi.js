export const combineTwoWords = async (firstWord, secondWord) => {
    const requestTask = fetch(`/wordcombine?wordone=${firstWord}&wordtwo=${secondWord}`);
    const response = await Promise.all([requestTask, new Promise(r => setTimeout(r, 1000))]);
    return await response[0].json();
};
