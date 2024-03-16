var express = require('express');
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
var router = express.Router();

router.get('/', async (req, res, next) => {
  const wordOne = req.query.wordone;
  const wordTwo = req.query.wordtwo;

  const wordResponse = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        "role": "user",
        "content": `User: Play a word game with me.\n      \n       Here are the rules of the game:\n       - I will give you two words, and you will respond with a conceptual combination of the two.\n       - The word must be a noun.\n       - The word should not simply be a combination of the two words, unless it is a commonly used word.\n       - Do not elaborate, use single word responses only.\n       - Try not to respond with either input word.\n             - Please prefer very commonplace and physical nouns where possible\n       - Choose the most commonsense interpretation for the combination.\n      \n       Some example rounds:\n       - \"Fire\" + \"Ice\" = \"Water\"\n       - \"Water\" + \"Fire\" = \"Steam\"\n       - \"Water\" + \"Earth\" = \"Mud\"\n       - \"Fire\" + \"Fire\" = \"Volcano\"\n       - \"Steam\" + \"Cloud\" = \"Rain\"\n       - \"Death\" + \"Human\" = \"Corpse\"\n       - \"Tomato\" + \"Bread\" = \"Pizza\"\n       - \"Bread\" + \"Fire\" = \"Toast\"\n       - \"Wind\" + \"Fire\" = \"Smoke\"\n       - \"Smoke\" + \"Smoke\" = \"Cloud\"\n      \n       The two words for this round are: \"${wordOne}\" + \"${wordTwo}\" = ?`
      },
      {
        "role": "assistant",
        "content": "Steam"
      }
    ],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });


  const newWord = wordResponse.choices[0].message.content.trim().replace(/[^a-zA-Z0-9 ]/g, '');

  const emojiResponse = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        "role": "user",
        "content": `Respond with the emoji that most-literally represents the meaning of the word "${newWord}". Please respond only with an emoji, do not elaborate.`
      }
    ],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  const newEmoji = emojiResponse.choices[0].message.content.trim().replaceAll("\"", "");

  res.json({ newWord, newEmoji });
});

module.exports = router;
