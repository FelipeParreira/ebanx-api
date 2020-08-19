import swaggerUI from 'swagger-ui-express';
import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';

import swaggerDocument from '../docs/swagger.json';

import router from './routes';

const app = express();

// middleware

// Security HTTP headers
// See https://helmetjs.github.io/docs/
app.use(helmet());

app.use(cors());
app.use(morgan('tiny', { skip: () => process.env.NODE_ENV === 'test' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// docs
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// routes
app.use('/', router);

export default app;
