import express from 'express';
import EstimatorController from '../controllers/estimator.controller';

const Route = express.Router();

Route.post(
  '/api/v1/on-covid-19/:response_format?',
  EstimatorController.getEstimate
);

Route.post(
  '/api/v1/on-covid-19/logs',
  EstimatorController.getLogs
);

export default Route;
