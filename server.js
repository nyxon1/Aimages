const PORT = 8000;
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config();

const { Configuration, OpenAiApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAiApi(configuration);

app.post('/images', async (req, res) => {
    try {  
      const response = await openai.createImage({
        prompt: "A cute baby sea otter",
        n: 2,
        size: "1024x1024",
      });
      console.log(response.data.data)
      res.send(response.data.data)
    } catch (error) {
      console.error(error);
      res.status(500).send('Błąd podczas generowania obrazu');
    }
  }
)
app.listen(PORT, () => console.log('Your server is running on PORT ' + PORT));
