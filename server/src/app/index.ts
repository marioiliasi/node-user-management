import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { connect } from '../lib/persistence/index';
import routes from './routes';

const index = express();

index.use(cors());
index.use(bodyParser.json());
index.use(bodyParser.urlencoded({
    extended: false
}));

routes(index);

const dir = path.join(__dirname, 'assets');
index.use('/upload', express.static(dir));

const port = 3000;

index.listen(port, async () => {
    console.log(`User app listening at http://localhost:${port}`);
    await connect();
})

index.get('/', (req, res) => {
    res.send('Up!');
})
