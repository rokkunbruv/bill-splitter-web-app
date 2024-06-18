
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to our web app!');
})

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})