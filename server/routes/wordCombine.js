var express = require('express');
const OpenAI = require("openai");

const wordCache = new Map();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
var router = express.Router();

router.get('/', async (req, res, next) => {
  const wordOne = req.query.wordone;
  const wordTwo = req.query.wordtwo;

  if (wordCache.has(`${wordOne}+${wordTwo}`)) {
    const cachedResponse = wordCache.get(`${wordOne}+${wordTwo}`);
    return res.json(cachedResponse);
  }

  const wordResponse = await openai.chat.completions.create({
    model: "gpt-4.1-nano",
    messages: [
      {
        "role": "user",
        "content": `User: Play a word game with me.\n      \n       Here are the rules of the game:\n       - I will give you two words, and you will respond with a conceptual combination of the two.\n       - The word must be a noun.\n       - The word should not simply be a combination of the two words, unless it is a commonly used word.\n       - Do not elaborate, use single word responses only.\n       - Try not to respond with either input word.\n             - Please prefer very commonplace and physical nouns where possible\n       - Choose the most commonsense interpretation for the combination.\n      \n       Some example rounds:\n       - \"Fire\" + \"Ice\" = \"Water\"\n       - \"Water\" + \"Fire\" = \"Steam\"\n       - \"Water\" + \"Earth\" = \"Mud\"\n       - \"Fire\" + \"Fire\" = \"Volcano\"\n       - \"Steam\" + \"Cloud\" = \"Rain\"\n       - \"Death\" + \"Human\" = \"Corpse\"\n       - \"Tomato\" + \"Bread\" = \"Pizza\"\n       - \"Bread\" + \"Fire\" = \"Toast\"\n       - \"Wind\" + \"Fire\" = \"Smoke\"\n       - \"Smoke\" + \"Smoke\" = \"Cloud\"\n      \n       The two words for this round are: \"${wordOne}\" + \"${wordTwo}\" = ?`
      }
    ],
    max_tokens: 256,
  });


  const newWord = wordResponse.choices[0].message.content.trim().replace(/[^a-zA-Z0-9 ]/g, '');

  const emojiResponse = await openai.chat.completions.create({
    model: "gpt-4.1-nano",
    messages: [
      {
        "role": "user",
        "content": `Respond with the emoji that most-literally represents the meaning of the word "${newWord}". Please respond only with an emoji, do not elaborate.`
      }
    ],
    max_tokens: 256,
  });
  const newEmoji = emojiResponse.choices[0].message.content.trim().replaceAll("\"", "");
  const response = { newWord, newEmoji };

  wordCache.set(`${wordOne}+${wordTwo}`, response);
  res.json(response);
});

module.exports = router;
