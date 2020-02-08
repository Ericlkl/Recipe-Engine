// Library
import express from 'express';
import logger from 'morgan';
import router from './routes';

// Middlewares
import { staticAssetsMiddleware } from './middlewares';

// Server Application Setting
const app = express();

// Add Middlewares to server
app.use(logger('dev'));
app.use(express.json());
app.use(staticAssetsMiddleware);

// Plug in routes to server application
router(app);

// Export App
export default app;
