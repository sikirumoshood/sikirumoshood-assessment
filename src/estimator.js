import { estimateNumberOfInfectedPeople, estimateInfectionsByRequestedTime } from './utils/estimate';

const covid19ImpactEstimator = (data) => {
  const inputData = data;
  const { reportedCases, periodType, timeToElapse } = data;
  const mildCurrentlyInfected = estimateNumberOfInfectedPeople(reportedCases, timeToElapse);
  const severeCurrentlyInfected = estimateNumberOfInfectedPeople(reportedCases, timeToElapse);
  const infectionsByRequestedTimeForMildCase = estimateInfectionsByRequestedTime(
    mildCurrentlyInfected,
    28,
    3,
    periodType
  );
  const infectionsByRequestedTimeForSevereCase = estimateInfectionsByRequestedTime(
    severeCurrentlyInfected,
    28,
    3,
    periodType
  );

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
