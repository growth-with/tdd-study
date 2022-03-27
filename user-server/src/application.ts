import express, { Application } from 'express';

import loadApp from './loaders';

const application = async () => {
  const app: Application = express();

  await loadApp(app);

  return app;
}

export default application;
