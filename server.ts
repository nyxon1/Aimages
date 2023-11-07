import express from 'express';
import cors from 'cors';
import { Request, Response } from 'express';
import { Configuration, OpenAiApi } from "openai";
import fs from 'fs';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAiApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public');
  },
  filename: (req, file, cb) => {
    console.log('file');
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single('file');
let filePath: string | undefined;

app.post('/images', async (req: Request, res: Response) => {
  try {
    const response = await openai.images.generate({
      prompt: req.body.message,
      n: 1,
      size: "1024x1024",
    });
    console.log(response);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Błąd podczas generowania obrazu');
  }
});

app.post('/upload', (req: Request, res: Response) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    filePath = req.file.path;
    res.status(200).json({ message: 'File uploaded successfully' });
  });
});

app.post('/variations', async (req: Request, res: Response) => {
  try {
    if (filePath) {
      const image = await openai.images.createVariation({
        image: fs.createReadStream(filePath),
      });
      res.send(image.data);
      console.log(image.data);
    } else {
      res.status(500).send('No file for variation');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error during image variation');
  }
});

const PORT = 8000;
app.listen(PORT, () => console.log('Your server is running on PORT ' + PORT));
