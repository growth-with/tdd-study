import config from './config';
import application from './application';

application()
  .then(app => app.listen(config.port))
  .then(() => console.log(`Server Run on ${config.port}`))
  .catch(() => {
    console.error('Server Run Failed');
    process.exit(1);
  });
