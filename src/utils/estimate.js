
/*
   @Description: Converts a decimal number to a whole number without
      rounding it.
   @param number { Number }
   @example : Input of 1234.56 returns 1234
*/

const toWholeNumber = (number) => parseFloat(number.toString().split('.')[0]);


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
  return toWholeNumber(availableBeds);
};


/*

    @Description: Estimates the number of COVID-19 infected patients
      that would need ICU for treatment
    @params infectionsByRequestedTime { Number }
    @returns numberOfICUCases { Number }

*/

const estimateICUCases = (infectionsByRequestedTime) => {
  const numberOfICUCases = parseFloat(infectionsByRequestedTime) * 0.05;
  return toWholeNumber(numberOfICUCases);
};


/*

    @Description: Estimates the number of COVID-19 infected patients
      that would need VENTILATORs for treatment
    @params infectionsByRequestedTime { Number }
    @returns numberOfVentilatorCases { Number }

*/

const estimateVentilatorCases = (infectionsByRequestedTime) => {
  const numberOfVentilatorCases = parseFloat(infectionsByRequestedTime) * 0.02;
  return toWholeNumber(numberOfVentilatorCases);
};


/*

    @Description: Estimates the amount an economy losses over a period of time
      in relation to infected patients
    @params infectionsByRequestedTime { Number }
    @params avgDailyIncome { Number }
    @params avgIncomePopulation { Number }
    @params duration { Number }
    @params type { String } Possible values include: 'days' || 'weeks' || 'monthly'

    @returns numberOfVentilatorCases { Number }

*/

// eslint-disable-next-line
const estimateEconomyMonetryLoss = (infectionsByRequestedTime, avgDailyIncome, avgIncomePopulation, duration, type) => {
  let days;
  switch (type) {
    case 'weeks': days = parseFloat(duration) * 7;
      break;
    case 'months': days = parseFloat(duration) * 30;
      break;
    default: days = parseFloat(duration);
  }

  // eslint-disable-next-line
  const estimatedLoss = parseFloat(infectionsByRequestedTime) * parseFloat(avgDailyIncome) * parseFloat(avgIncomePopulation) * days;

  return parseFloat(estimatedLoss.toFixed(2));
};

export {
  estimateNumberOfInfectedPeople,
  estimateInfectionsByRequestedTime,
  estimateSeverePositiveHospitalizationCase,
  estimateHospitalBedsByRequestedTime,
  estimateICUCases,
  estimateVentilatorCases,
  estimateEconomyMonetryLoss
};
