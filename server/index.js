
// import express from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import router from './routes/userRoutes.js';

// const app = express();
// dotenv.config();

// app.use(bodyParser.json({limit: "30mb", extended: true}));
// app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
// app.use(cors());
// app.use(express.json());

// app.get('/', (req, res) => {
//     console.log(req);
//     return res.status(234).send('Welcome to Bill Splitter App');
// })

// app.use('/api/auth', router);

// const PORT = process.env.PORT || 5000;

// mongoose
//     .connect(process.env.MONGODB_URL)
//     .then(() => {
//         console.log('App connected to database');
//         app.listen(PORT, () => {
//             console.log(`App is listening to port: ${PORT}`);
//         });
//     })
//     .catch((error) => {
//         console.log(error);
//     });

// /server/index.js
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import receiptRoutes from './routes/receipts.js';
import memberRoutes from './routes/members.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/receipts', receiptRoutes);
app.use('/members', memberRoutes);

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error)=> console.log(error.message));