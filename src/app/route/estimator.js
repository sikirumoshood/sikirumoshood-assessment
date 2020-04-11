import express from 'express';
import EstimatorController from '../controllers/estimator.controller';

const router = express.Router();

router.get(
  '/logs',
  EstimatorController.getLogs
);

router.post(
  '/:response_format?',
  EstimatorController.getEstimate
);

export default router;
