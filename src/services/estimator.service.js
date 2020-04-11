import jsonToXml from 'json2xml';
import estimator from '../estimator';
import Logger from '../config/logger';

class EstimatorService {
  static async estimate(req, res) {
    try {
      if (req.invalidFormat) {
        throw Error('00001');
      }
      const { body, responseFormat } = req;

      let response = estimator(body);

      if (responseFormat === 'application/xml') {
        response = jsonToXml(response);
      }

      res.status(200);
      res.set('Content-Type', responseFormat);
      res.send(response);
      Logger.logToFile(req, 200);
      return res;
    } catch (e) {
      switch (e.message) {
        case '00001':
          res.status(400);
          res.set('Content-Type', 'application/json');
          res.json({ message: 'Please provide a valid response type' });
          Logger.logToFile(req, 200);
          return res;

        default:
          res.status(400);
          res.set('Content-Type', 'application/json');
          res.json({ message: 'Something went wrong' });
          Logger.logToFile(req, 400);
          return res;
      }
    }
  }

  static async fetchLogs(req, res) {
    try {
      const logData = Logger.readLogs();
      res.status(200);
      res.set('Content-Type', 'text/plain; charset=utf8');
      res.json(logData);
      Logger.logToFile(req, 200);
      return res;
    } catch (e) {
      res.status(400);
      res.set('Content-Type', 'text/plain; charset=utf8');
      res.send('Something went wrong');
      Logger.logToFile(req, 400);
      return res;
    }
  }
}

export default EstimatorService;
