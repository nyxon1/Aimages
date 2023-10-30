const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config();

const OpenAi = require ('openai');

const openai = new OpenAi({
  apiKey: process.env.OPENAI_API_KEY,
});
//const openai = new OpenAiApi(configuration);

app.post('/images', async (req, res) => {

    try {  
      const response = await openai.images.generate({
        prompt: req.body.message,
        n: 1,
        size: "1024x1024",
      });
      console.log(response)
      res.send(response.data)
    } catch (error) {
      console.error(error);
      res.status(500).send('Błąd podczas generowania obrazu');
    }
  }
);

const PORT = 8000;
app.listen(PORT, () => console.log('Your server is running on PORT ' + PORT));
