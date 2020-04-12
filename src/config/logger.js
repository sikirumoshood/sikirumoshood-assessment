import fs from 'fs';
import moment from 'moment';
import config from './index';

class Logger {
  static logToFile(req, status) {
    const METHOD = req.method;
    const URL = req.originalUrl;
    const STATUS = status;
    const START_TIME = req.start;
    const FINISH_TIME = moment();
    const duration = moment.duration(FINISH_TIME.diff(START_TIME));
    let TIME_ELAPSED = duration.as('milliseconds');

    if (parseFloat(TIME_ELAPSED) < 10) {
      TIME_ELAPSED = `0${TIME_ELAPSED}`;
    }

    fs.appendFile(config.logDirectory, `${METHOD}       ${URL}        ${STATUS}       ${TIME_ELAPSED}ms \n`, (err) => {
      if (err) {
        throw new Error(err.message);
      }
    });
  }

  static readLogs() {
    const logLocationExists = fs.existsSync(config.logDirectory);
    if (logLocationExists) {
      return fs.readFileSync(config.logDirectory, 'utf-8');
    }
    // Create one
    fs.appendFileSync(config.logDirectory, '');
    return '';
  }
}

export default Logger;
