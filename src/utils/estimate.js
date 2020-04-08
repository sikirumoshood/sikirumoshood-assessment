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
    case 'weekly': days = parseFloat(duration) * 7;
      break;
    case 'monthly': days = parseFloat(duration) * 30;
      break;
    default: days = parseFloat(duration);
  }
  const currentlyInfectedNumber = parseFloat(currentlyInfected);
  const frequencyNumber = parseFloat(frequency);
  const estimatedInfections = currentlyInfectedNumber * Math.floor(days / frequencyNumber);

  return estimatedInfections;
};

export { estimateNumberOfInfectedPeople, estimateInfectionsByRequestedTime };
