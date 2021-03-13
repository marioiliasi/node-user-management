import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connect } from '../lib/persistence/index';
import routes from './routes';
import {error} from "../lib/http";
import jwt from "../lib/http/jwt-middleware";
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false,
}));

app.use(jwt());

routes(app);

const port = 3001;

app.get('/', (req, res) => {
    res.send('Up!');
});

app.listen(port, async () => {
    console.log(`User app listening at http://localhost:${port}`);
    await connect();
});
app.use(error);
