import bodyParser from 'body-parser';
import estimatorRoute from '../app/route/estimator';
import startWatch from '../app/middlewares/middleware';
import Logger from './logger';

const expressConfig = (app) => {
  app.use(startWatch);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type, Accept');
    next();
  });

  app.use('/api/v1/on-covid-19', estimatorRoute);


  app.use((req, res) => {
    const err = new Error('Not Found');
    err.status = 404;
    Logger.logToFile(req, err.status);
    return res.status(404).json(err);
  });
};
export default expressConfig;
