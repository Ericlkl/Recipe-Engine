// Library
import express from 'express';
import logger from 'morgan';
import router from './routes';
import { staticAssetsMiddleware } from './middlewares';
// Server Application Setting
const app = express();

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(staticAssetsMiddleware);

router(app);

export default app;
