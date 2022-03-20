import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

const app = express();

app.set('view engine', 'ejs');

app.use(helmet());
app.use(cors());
app.use(express.static('views'));
app.use(express.urlencoded({ extended: true }));

export { app };