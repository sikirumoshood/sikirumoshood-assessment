import fs from 'fs';
import moment from 'moment';

class Logger {
  static logToFile(req, status) {
    const METHOD = req.method;
    const URL = req.url;
    const STATUS = status;
    const START_TIME = req.start;
    const FINISH_TIME = moment();
    const duration = moment.duration(FINISH_TIME.diff(START_TIME));
    const TIME_ELAPSED = duration.as('milliseconds');
    console.log(`${METHOD}\t\t${URL}\t\t${STATUS}\t\t${TIME_ELAPSED} ms`);
    fs.appendFile('src/server.log', `${METHOD}\t\t${URL}\t\t${STATUS}\t\t${TIME_ELAPSED} ms\n`, (err) => {
      if (err) {
        console.log('Error occurred logging to file');
      } else {
        console.log('File written successfully!');
      }
    });
  }

  static async readLogs() {
    fs.readFile('src/server.log', 'utf-8', (err, data) => {
      if (err) {
        Promise.reject(new Error('Unable to read logs'));
      } else {
        Promise.resolve(data);
      }
    });
  }
}

export default Logger;
