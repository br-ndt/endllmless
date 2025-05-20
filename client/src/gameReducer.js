const defaultWords = {
    earth: "⛰️",
    fire: "🔥",
    life: "🌿",
    water: "💦",
    wind: "🌬️",
};

const defaultWordState = {
    first: "",
    second: "",
    new: "",
    isFirstFound: false,
    loading: false
};

export const initialGameState = {
    words: defaultWords,
    wordState: defaultWordState,
    confirmReset: false,
};

export const initializeState = (initialValue) => {
    const wordsInStorage = localStorage.getItem("words");
    if (wordsInStorage) {
        initialValue.words = JSON.parse(wordsInStorage);
    }
    return initialValue;
};

export function gameReducer(state, action) {
    switch (action.type) {
        case 'reset_words': {
            return state.confirmReset ? {
                ...state,
                words: defaultWords,
                wordState: defaultWordState,
                confirmReset: false
            } : {
                ...state,
                confirmReset: true
            };
        }
        case 'click_word': {
            if (state.wordState.loading) {
                return { ...state };
            }
            if (!state.wordState.first || state.wordState.new) {
                return {
                    ...state,
                    wordState: { ...defaultWordState, first: action.word },
                    confirmReset: false
                };
            }
            return {
                ...state,
                wordState: { ...defaultWordState, first: state.wordState.first, second: action.word },
                confirmReset: false
            };
        }
        case 'loading_word': {
            return {
                ...state,
                wordState: { ...state.wordState, loading: true }
            };
        }
        case 'new_word': {
            return {
                ...state,
                wordState: { ...state.wordState, loading: false, new: action.word, isFirstFound: !Object.keys(state.words).includes(action.word) },
                words: { ...state.words, ...{ [action.word]: action.emoji } },
            };
        }
        case 'loading_error': {
            return {
                ...state,
                wordState: defaultWordState
            };
        }
    }
    throw Error('Unknown action: ' + action.type);
}