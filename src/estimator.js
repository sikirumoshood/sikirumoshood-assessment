import {
  estimateNumberOfInfectedPeople,
  estimateInfectionsByRequestedTime,
  estimateSeverePositiveHospitalizationCase,
  estimateHospitalBedsByRequestedTime,
  estimateICUCases,
  estimateVentilatorCases,
  estimateEconomyMonetryLoss
} from './utils/estimate';

import constants from './config/constants';

/*
{
    region: {
        name: "Africa",
        avgAge: 19.7,
        avgDailyIncomeInUSD: 5,
        avgDailyIncomePopulation: 0.71
    },
    periodType: "days",
    timeToElapse: 58,
    reportedCases: 674,
    population: 66622705,
    totalHospitalBeds: 1380614
}
*/
const covid19ImpactEstimator = (data) => {
  const inputData = data;


  const {
    reportedCases, periodType, timeToElapse, totalHospitalBeds,
    region: { avgDailyIncomeInUSD, avgDailyIncomePopulation }
  } = data;


  const mildCurrentlyInfected = estimateNumberOfInfectedPeople(
    reportedCases,
    constants.MILD_CASE_MULTIPLYING_FACTOR
  );


  const severeCurrentlyInfected = estimateNumberOfInfectedPeople(
    reportedCases,
    constants.SEVER_CASE_MULTIPLYING_FACTOR
  );


  const infectionsByRequestedTimeForMildCase = estimateInfectionsByRequestedTime(
    mildCurrentlyInfected,
    timeToElapse,
    3,
    periodType
  );


  const infectionsByRequestedTimeForSevereCase = estimateInfectionsByRequestedTime(
    severeCurrentlyInfected,
    timeToElapse,
    3,
    periodType
  );

  // eslint-disable-next-line
  const severeCasesByRequestedTimeForMildCase = estimateSeverePositiveHospitalizationCase(infectionsByRequestedTimeForMildCase);

  // eslint-disable-next-line
  const severeCasesByRequestedTimeForSevereCase = estimateSeverePositiveHospitalizationCase(infectionsByRequestedTimeForSevereCase);

  // eslint-disable-next-line
  const hospitalBedsByRequestedTimeForMildCase = estimateHospitalBedsByRequestedTime(severeCasesByRequestedTimeForMildCase, totalHospitalBeds);

  // eslint-disable-next-line
  const hospitalBedsByRequestedTimeForSevereCase = estimateHospitalBedsByRequestedTime(severeCasesByRequestedTimeForSevereCase, totalHospitalBeds);

  // eslint-disable-next-line
  const casesForICUByRequestedTimeForMildCase = estimateICUCases(infectionsByRequestedTimeForMildCase);

  // eslint-disable-next-line
  const casesForICUByRequestedTimeForSeverCase = estimateICUCases(infectionsByRequestedTimeForSevereCase);

  // eslint-disable-next-line
  const casesForVentilatorsByRequestedTimeForMildCase = estimateVentilatorCases(infectionsByRequestedTimeForMildCase);

  // eslint-disable-next-line
  const casesForVentilatorsByRequestedTimeForSevereCase = estimateVentilatorCases(infectionsByRequestedTimeForSevereCase);


  const dollarsInFlightForMildCase = estimateEconomyMonetryLoss(
    infectionsByRequestedTimeForMildCase,
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation,
    timeToElapse,
    periodType
  );

  const dollarsInFlightForSeverCase = estimateEconomyMonetryLoss(
    infectionsByRequestedTimeForSevereCase,
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation,
    timeToElapse,
    periodType
  );

  return {
    data: inputData,
    impact: {
      currentlyInfected: mildCurrentlyInfected,
      infectionsByRequestedTime: infectionsByRequestedTimeForMildCase,
      severeCasesByRequestedTime: severeCasesByRequestedTimeForMildCase,
      hospitalBedsByRequestedTime: hospitalBedsByRequestedTimeForMildCase,
      casesForICUByRequestedTime: casesForICUByRequestedTimeForMildCase,
      casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTimeForMildCase,
      dollarsInFlight: dollarsInFlightForMildCase
    },
    severeImpact: {
      currentlyInfected: severeCurrentlyInfected,
      infectionsByRequestedTime: infectionsByRequestedTimeForSevereCase,
      severeCasesByRequestedTime: severeCasesByRequestedTimeForSevereCase,
      hospitalBedsByRequestedTime: hospitalBedsByRequestedTimeForSevereCase,
      casesForICUByRequestedTime: casesForICUByRequestedTimeForSeverCase,
      casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTimeForSevereCase,
      dollarsInFlight: dollarsInFlightForSeverCase

    }
  };
};

export default covid19ImpactEstimator;
