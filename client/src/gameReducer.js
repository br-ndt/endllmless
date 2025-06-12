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
    loading: false,
    foundDelay: false
};

export const initialGameState = {
    words: defaultWords,
    wordsQueue: [],
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
    const newState = innerGameReducer(state, action);
    console.log("Game state updated:", action, newState);
    return newState;
}

function innerGameReducer(state, action) {
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
            if (state.wordState.loading || state.wordState.foundDelay) {
                if(state.wordsQueue.length && !state.wordsQueue[state.wordsQueue.length - 1].second) {
                    const newQueue = [...state.wordsQueue];
                    newQueue[newQueue.length - 1].second = action.word;
                    return { ...state, wordsQueue: newQueue };
                }
                else {
                    return {...state, wordsQueue: [...state.wordsQueue, { first: action.word, second: "" }]};
                }
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
                wordState: { ...state.wordState, foundDelay: true, loading: false, new: action.word, isFirstFound: !Object.keys(state.words).includes(action.word) },
                words: { ...state.words, ...{ [action.word]: action.emoji } },
            };
        }
        case 'loading_error': {
            return {
                ...state,
                wordState: defaultWordState
            };
        }
        case 'found_delay': {
            if (!state.wordsQueue.length) {
                return {...state, wordState: { ...state.wordState, foundDelay: false }};
            }
            const [next, ...remainingQueue] = state.wordsQueue;
            return {
                ...state,
                wordsQueue: remainingQueue,
                wordState: { ...state.defaultWordState, ...next }
            };
        }
    }
    throw Error('Unknown action: ' + action.type);
}