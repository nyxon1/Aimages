const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config();
const { Configuration, OpenAiApi} = require("openai");
const fs = require('fs')
const multer = require('multer')   

const OpenAi = require ('openai');

const openai = new OpenAi({
  apiKey: process.env.OPENAI_API_KEY,
});
//const openai = new OpenAiApi(configuration);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public')
  },
  filename: (req, file, cb) => {
    console.log('file')
    cb(null, Date.now() + "-" + file.originalname)
  }
})
const upload = multer({storage : storage}).single('file') 
let filePath

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

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    console.log(req.file.path);
    filePath = req.file.path
    res.status(200).json({ message: 'File uploaded successfully'});
  })
})

app.post('/variations', async (req, res) => {
  try {
    const image = await openai.images.createVariation({
      image: fs.createReadStream(filePath),
    });
    res.send(response.data)
    console.log(image.data);
  } catch (error) {
    console.error(error);
}})
  
const PORT = 8000;
app.listen(PORT, () => console.log('Your server is running on PORT ' + PORT));
