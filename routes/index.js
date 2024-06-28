var express = require('express');
var router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI('AIzaSyA4CGOZwlzts2hcawhNUF-uP6yaQkkHYNk');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index', { response: "" }); // Initial rendering without response

});


router.post('/sendMessage',(req,res,next)=>{

   const userInput=req.body.message;

  async function run() {
    // The Gemini 1.5 models are versatile and work with multi-turn conversations (like chat)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
  
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text:userInput}],
        },
        {
          role: "model",
          parts: [{ text:"Response placeholder."}],
        },
      ],
      generationConfig: {
        maxOutputTokens: 100,
      },
    });
  
    
    try{
      const result = await chat.sendMessage(userInput);

    const response = await result.response;
    const text = await response.text();
    
  
    res.json({response:text});
    }
    catch(error){
      console.log(error);
    }
  }
 
  
  run();


})

module.exports = router;