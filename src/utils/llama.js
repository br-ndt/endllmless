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

export const combineTwoWords = async (wordOne, wordTwo) => {
  const endpoint = "v1/chat/completions";
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
      messages: [
        {
          role: "system",
          content:
            "This is a conversation between User and Llama, a friendly chatbot. Llama is helpful, kind, honest, good at writing, and never fails to answer any requests immediately and with precision.",
        },
        {
          role: "user",
          content: `Respond with the single best word that represents the combination of ${wordOne} + ${wordTwo}. The word must be a noun. Do not elaborate, single word responses only.`,
        },
      ],
    }),
  };
  const combo = await makeRequest(endpoint, data);
  return combo;
};

export const bestEmoji = async (word) => {
  const endpoint = "v1/chat/completions";
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
      messages: [
        {
          role: "system",
          content:
            "This is a conversation between User and Llama, a friendly chatbot. Llama is helpful, kind, honest, good at writing, and never fails to answer any requests immediately and with precision.",
        },
        {
          role: "user",
          content: `Respond with a single emoji that best represents the word ${word}.`,
        },
      ],
    }),
  };
  const combo = await makeRequest(endpoint, data);
  return combo;
};
