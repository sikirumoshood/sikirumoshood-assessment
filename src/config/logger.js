import fs from 'fs';
import moment from 'moment';
import config from './index';

class Logger {
  static logToFile(req) {
    const URL = req.originalUrl;
    const START_TIME = req.start;
    const FINISH_TIME = moment();
    const duration = moment.duration(FINISH_TIME.diff(START_TIME));
    const TIME_ELAPSED = duration.as('seconds');
    const TIMESTAMP = Date.now();
    fs.appendFile(config.logDirectory, `${TIMESTAMP}\t\t${URL}\t\tdone in ${TIME_ELAPSED} seconds\n`, (err) => {
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
