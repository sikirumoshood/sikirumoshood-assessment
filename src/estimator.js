import * as E from './utils/estimate';

const { estimateNumberOfInfectedPeople, estimateInfectionsByRequestedTime } = E;

const covid19ImpactEstimator = (data) => {
  const inputData = data;
  const { reportedCases } = data;
  const mildCurrentlyInfected = estimateNumberOfInfectedPeople(reportedCases, 10);
  const severeCurrentlyInfected = estimateNumberOfInfectedPeople(reportedCases, 50);
  const infectionsByRequestedTimeForMildCase = estimateInfectionsByRequestedTime(mildCurrentlyInfected, 28, 3, 'days');
  const infectionsByRequestedTimeForSevereCase = estimateInfectionsByRequestedTime(severeCurrentlyInfected, 28, 3, 'days');

  return {
    data: inputData,
    impact: {
      currentlyInfected: mildCurrentlyInfected,
      infectionsByRequestedTime: infectionsByRequestedTimeForMildCase
    },
    severeImpact: {
      currentlyInfected: severeCurrentlyInfected,
      infectionsByRequestedTime: infectionsByRequestedTimeForSevereCase
    }
  };
};

export default covid19ImpactEstimator;
