/*
    @Description: This method estimates the number of currently infected
    people.
    @params reportedCases { Number }
    @params factor { Number }
    @returns currentlyInfected { Number }


*/

const estimateNumberOfInfectedPeople = (reportedCases, factor) => {
  const currentlyInfected = parseFloat(reportedCases) * parseFloat(factor);
  return currentlyInfected;
};


/*
    @description: This method return the estimated number of infections for a requested
         period of time.
    @params currentlyInfect { Number }
    @params duration { Number }
    @params factor { Number }
    @params type { String }
    @returns estimatedInfections { Number }

*/

const estimateInfectionsByRequestedTime = (currentlyInfected, duration, frequency, type) => {
  let days;
  switch (type) {
    case 'weeks': days = parseFloat(duration) * 7;
      break;
    case 'months': days = parseFloat(duration) * 30;
      break;
    default: days = parseFloat(duration);
  }
  const currentlyInfectedNumber = parseFloat(currentlyInfected);
  const frequencyNumber = parseFloat(frequency);
  const estimatedInfections = currentlyInfectedNumber * (2 ** Math.floor(days / frequencyNumber));

  return estimatedInfections;
};


/*
    @Description: Estimates the number of patients with servere positive cases
      and require hospitalization.
    @params infectionsByRequestedTime { Number }
    @returns 15 % of the number of infectionsByRequestedTime { Number }


*/
// eslint-disable-next-line
const estimateSeverePositiveHospitalizationCase = (infectionsByRequestedTime) => parseFloat(infectionsByRequestedTime) * 0.15;


/*

    @Description: Estimates the number of hospital beds that are available
      or in shortage.
    @params severeCasesByRequestedTime { Number }
    @params totalHospitalBeds { Number }
    @returns availableBeds { Number }
      Positive indicates availability while negative indicates shortages.

*/

const estimateHospitalBedsByRequestedTime = (severeCasesByRequestedTime, totalHospitalBeds) => {
  const requiredNumberOfBeds = parseFloat(severeCasesByRequestedTime);
  const maxNumberOfBedsAvailable = parseFloat(totalHospitalBeds) * 0.35;
  const availableBeds = maxNumberOfBedsAvailable - requiredNumberOfBeds;
  return availableBeds;
};

export {
  estimateNumberOfInfectedPeople,
  estimateInfectionsByRequestedTime,
  estimateSeverePositiveHospitalizationCase,
  estimateHospitalBedsByRequestedTime
};
