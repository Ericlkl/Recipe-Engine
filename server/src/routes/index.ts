import path from 'path';
import fruitRouter from './fruit';

import { Application } from 'express';

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
