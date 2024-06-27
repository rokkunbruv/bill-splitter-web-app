import axios from 'axios';
import fs from 'fs';
import path from 'path';
import base64Img from 'base64-img';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Get the current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.log(apiKey);
  console.error('Error: OPENAI_API_KEY is not defined. Please set it in your .env file.');
  process.exit(1);
}

// Function to encode the image
const encodeImage = (imagePath) => {
  return base64Img.base64Sync(imagePath);
};

// Path to your image
const imagePath = path.join(__dirname, 'receipt.jpg');

export const handleFileUpload = (req, res) => {
  const imagePath = req.file.path;
  const base64Image = encodeImage(imagePath);
  const base64ImageContent = base64Image.split(',')[1];

  const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
  };

  const payload = {
      model: 'gpt-4o',
      messages: [
          {
              role: 'user',
              content: [
                  {
                      type: 'text',
                      text: 'Scan the receipt and return a JSON array as the result. The JSON must have these fields: items{name, price, quantity}, total_num_items, total_cost, payment: number or null, change: number or null'
                  },
                  {
                      type: 'image_url',
                      image_url: {
                          url: `data:image/jpeg;base64,${base64ImageContent}`
                      }
                  }
              ]
          }
      ],
      max_tokens: 300
  };

  axios.post('https://api.openai.com/v1/chat/completions', payload, { headers })
      .then(response => {
          const messageContent = response.data.choices[0].message.content;
          res.json({ message: messageContent });
      })
      .catch(error => {
          console.error(error);
          res.status(500).json({ error: 'Error processing the image' });
      });
};