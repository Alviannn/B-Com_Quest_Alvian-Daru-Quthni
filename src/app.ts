import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('views'));
app.use(express.urlencoded({ extended: true }));

export { app };