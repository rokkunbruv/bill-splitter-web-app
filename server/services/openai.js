import OpenAI from 'openai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const prompt_text = "Scan the receipt and return a JSON object with the following structure: items (array of objects with fields: name, price(per one quantity), quantity), total_num_items (integer), total_cost (float), payment (number or null), change (number or null). Return a raw JSON text not encapsulated by text formatting as the result.";

const getReceiptInfo = async (base64Image) => {
    const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            {
                role: 'user',
                content: [
                    { type: "text", text: prompt_text },
                    {
                        type: "image_url",
                        image_url: {
                            "url": `${base64Image}`,
                        },
                    }
                ]
            }
        ],
        max_tokens: 500
    });

    const messageContent = response.choices[0].message.content.trim();

    console.log('Raw response from OpenAI:', messageContent);

    const processedData = JSON.parse(messageContent);

    return processedData;
};

export default getReceiptInfo;
