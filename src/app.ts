import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';

import router from './routes';

const app = express();

// Security HTTP headers
// See https://helmetjs.github.io/docs/
app.use(helmet());

app.use(cors());
app.use(morgan('tiny', { skip: () => process.env.NODE_ENV === 'test' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', router);

export default app;
