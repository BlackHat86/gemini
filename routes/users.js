var express = require('express');
var router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI('AIzaSyA4CGOZwlzts2hcawhNUF-uP6yaQkkHYNk');

/* GET users listing. */
router.get('/', function(req, res, next) {

// Replace 'your-google-generative-ai-api-key' with your actual API key

async function run() {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = "Write a story about a magic backpack.";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = await response.text();
  res.send(text);
}

run();

});

module.exports = router;