// Library
import path from 'path';
import fruitRouter from './fruit';

// Types
import { Application } from 'express';

// Plug in all the routes into ExpressJS server application
export default (app: Application) => {
  // Plug fruit API endpoints to application
  app.use('/api/fruits', fruitRouter);

  // Serve HTML website to the client on others unused get method paths
  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../../../', 'client', 'build', 'index.html')
    )
  );
};
