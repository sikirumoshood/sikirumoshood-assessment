import moment from 'moment';

const startWatch = (req, res, next) => {
  req.start = moment();
  return next();
};

export default startWatch;
