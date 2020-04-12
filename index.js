import express from 'express';

import expressConfig from './src/config/express';

import config from './src/config/index';

const app = express();

expressConfig(app);

const { PORT } = config;

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Server running on port ${PORT}`);
});

export default app;
