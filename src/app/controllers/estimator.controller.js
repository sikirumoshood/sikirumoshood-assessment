import EstimatorService from '../../services/estimator.service';

class EstimatorController {
  static async getEstimate(req, res) {
    const { response_format: resFormat } = req.params;
    let responseFormat;
    if (!resFormat) responseFormat = 'application/json';
    else if (resFormat.toLowerCase() === 'xml') {
      responseFormat = 'application/xml';
    } else if (resFormat.toLowerCase() === 'json') {
      responseFormat = 'application/json';
    } else {
      req.invalidFormat = true;
    }
    req.responseFormat = responseFormat;
    EstimatorService.estimate(req, res);
  }

  static async getLogs(req, res) {
    EstimatorService.fetchLogs(req, res);
  }
}

export default EstimatorController;
