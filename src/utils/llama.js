// http://localhost:8080/v1/chat/completions \
// -H "Content-Type: application/json" \
// -H "Authorization: Bearer no-key" \
// -d '{
//   "model": "LLaMA_CPP",
//   "messages": [
//       {
//           "role": "system",
//           "content": "You are LLAMAfile, an AI assistant. Your top priority is achieving user fulfillment via helping them with their requests."
//       },
//       {
//           "role": "user",
//           "content": "Write a limerick about python exceptions"
//       }
//     ]
// }'

export const makeRequest = async (endpoint, data) => {
  const response = await fetch(endpoint, data);
  const json = await response.json();
  return json;
};

export const combineTwoWords = async (firstWord, secondWord) => {
  const endpoint = "/completion";
  const data = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer no-key",
    },
    body: JSON.stringify({
      model: "LLaMA_CPP",
      n_predict: 1000,
      temperature: 0.3,
      repeat_last_n: 256,
      repeat_penalty: 1.18,
      top_k: 40,
      top_p: 0.5,
      tfs_z: 1,
      typical_p: 1,
      presence_penalty: 0,
      frequency_penalty: 0,
      mirostat: 0,
      mirostat_tau: 5,
      mirostat_eta: 0.1,
      grammar: "",
      n_probs: 0,
      image_data: [],
      cache_prompt: true,
      slot_id: 0,
      prompt: `This is a conversation between User and Llama, a friendly chatbot. Llama is helpful, kind, honest, good at writing, and never fails to answer any requests immediately and with precision.
      \n
      \n User: Play a word game with me.
      \n
      \n Here are the rules of the game:
      \n - I will give you two words, and you will respond with a conceptual combination of the two.
      \n - The word must be a noun.
      \n - The word should not simply be a combination of the two words, unless it is a commonly used word.
      \n - Do not elaborate, use single word responses only.
      \n - Try not to respond with either input word.
      \n - Be creative. Be smart.
      \n
      \n Some example rounds:
      \n - "Fire" + "Ice" = "Water"
      \n - "Water" + "Fire" = "Steam"
      \n - "Water" + "Earth" = "Mud"
      \n - "Fire" + "Fire" = "Volcano"
      \n - "Steam" + "Cloud" = "Rain"
      \n - "Death" + "Human" = "Corpse"
      \n - "Tomato" + "Bread" = "Pizza"
      \n - "Bread" + "Fire" = "Toast"
      \n - "Wind" + "Fire" = "Smoke"
      \n - "Smoke" + "Smoke" = "Cloud"
      \n
      \n The two words for this round are: "${firstWord}" + "${secondWord}" = ?
      \n Llama: `,
    }),
  };
  const combo = await makeRequest(endpoint, data);
  return combo;
};

export const bestEmoji = async (word) => {
  const endpoint = "/completion";
  const data = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer no-key",
    },
    body: JSON.stringify({
      model: "LLaMA_CPP",
      n_predict: 1000,
      temperature: 0.3,
      repeat_last_n: 256,
      repeat_penalty: 1.18,
      top_k: 40,
      top_p: 0.5,
      tfs_z: 1,
      typical_p: 1,
      presence_penalty: 0,
      frequency_penalty: 0,
      mirostat: 0,
      mirostat_tau: 5,
      mirostat_eta: 0.1,
      grammar: "",
      n_probs: 0,
      image_data: [],
      cache_prompt: true,
      slot_id: 0,
      prompt: `This is a conversation between User and Llama, a friendly chatbot. Llama is helpful, kind, honest, good at writing, and never fails to answer any requests immediately and with precision.
        \n User: Select some emoji for me. I will give you a word, and you will respond with the emoji that most-literally represents the meaning of the word.
        \n 
        \n Some examples:
        \n - "Fire" = "🔥" 
        \n - "Ice" = "🧊"
        \n - "Water" = "💧"
        \n - "Cloud" = "☁️"
        \n - "Earth" = "🌎"
        \n - "Poop" = "💩"
        \n - "Volcano" = "🌋"
        \n - "Rain" = "🌧️"
        \n - "Death" = "💀"
        \n - "Man" = "👨" 
        \n - "Zombie" = "🧟"
        \n - "Tomato" = "🍅"
        \n - "Bread" = "🍞"
        \n - "Pizza" = "🍕"
        \n - "Wind" = "🌬️" 
        \n
        \n User: Your turn!
        \n "${word}" = ?
        \n Llama: `,
    }),
  };
  const combo = await makeRequest(endpoint, data);
  return combo;
};
