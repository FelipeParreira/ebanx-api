import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import exampleRoute from './routes/example';
import defaultRoute from './routes/health_check';

const app = express();

// Security HTTP headers
// See https://helmetjs.github.io/docs/
app.use(helmet());

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API routes
const api = express.Router();

app.use('/api', api);
exampleRoute(api);
defaultRoute(api);

export default app;
