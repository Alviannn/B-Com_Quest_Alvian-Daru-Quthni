import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { authRouter } from './routes/auth.route';

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

// routes
app.use('/v1/auth', authRouter);

app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

export { app };