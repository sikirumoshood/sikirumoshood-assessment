import {
  toWholeNumber,
  estimateNumberOfInfectedPeople,
  estimateInfectionsByRequestedTime,
  estimateSeverePositiveHospitalizationCase,
  estimateHospitalBedsByRequestedTime,
  estimateICUCases,
  estimateVentilatorCases,
  estimateEconomyMonetryLoss
} from '../../utils/estimate';

describe('Unit test for estimate Module', () => {
  describe('Test for toWholeNumber', () => {
    it('Should return the correct integer part of a decimal number without rounding', () => {
      let value = 12345.789;
      let expectedValue = 12345;
      let result = toWholeNumber(value);
      expect(result).toBe(expectedValue);

      value = 577779098.9888;
      expectedValue = 577779098;
      result = toWholeNumber(value);
      expect(result).toBe(expectedValue);
    });
  });

  describe('Test for estimateNumberOfInfectedPeople', () => {
    it('Should return the correct number of infected people', () => {
      let reportedCase = 1000;
      let mulitplyingFactor = 2;

      let expectedValue = 2000;
      let result = estimateNumberOfInfectedPeople(reportedCase, mulitplyingFactor);
      expect(result).toBe(expectedValue);

      reportedCase = 4567;
      mulitplyingFactor = 10;

      expectedValue = 45670;
      result = estimateNumberOfInfectedPeople(reportedCase, mulitplyingFactor);
      expect(result).toBe(expectedValue);
    });
  });

  describe('Test for estimateInfectionsByRequestedTime', () => {
    it('Should return the correct infection estimate in days', () => {
      const currentlyInfected = 780;
      const duration = 9;
      const frequency = 3; // Every 3 days
      const type = 'days';

      const expectedValue = 6240;
      const result = estimateInfectionsByRequestedTime(
        currentlyInfected,
        duration, frequency,
        type
      );

      expect(result).toBe(expectedValue);
    });

    it('Should return the correct infection estimate in weeks', () => {
      const currentlyInfected = 780;
      const duration = 2;
      const frequency = 3; // Every 3 days
      const type = 'weeks';

      const expectedValue = 12480;
      const result = estimateInfectionsByRequestedTime(
        currentlyInfected,
        duration, frequency,
        type
      );

      expect(result).toBe(expectedValue);
    });

    it('Should return the correct infection estimate in months', () => {
      const currentlyInfected = 780;
      const duration = 1;
      const frequency = 3; // Every 3 days
      const type = 'months';

      const expectedValue = 798720;
      const result = estimateInfectionsByRequestedTime(
        currentlyInfected,
        duration, frequency,
        type
      );

      expect(result).toBe(expectedValue);
    });
  });

  describe('Test for estimateSeverePositiveHospitalizationCase', () => {
    it('Should estimate the servere positive hospitalization case', () => {
      const infectionsByRequestedTime = 780;
      const expectedValue = 117;
      const result = estimateSeverePositiveHospitalizationCase(infectionsByRequestedTime);
      expect(result).toBe(expectedValue);
    });
  });

  describe('Test for estimateHospitalBedsByRequestedTime', () => {
    it('Should estimate hospital beds as available', () => {
      const severeCasesByRequestedTime = 1600;
      const totalHospitalBeds = 5000;
      const expectedAvailableBeds = 150;

      const result = estimateHospitalBedsByRequestedTime(
        severeCasesByRequestedTime,
        totalHospitalBeds
      );

      expect(result).toBe(expectedAvailableBeds);
    });

    it('Should estimate hospital beds as shortages', () => {
      const severeCasesByRequestedTime = 1600;
      const totalHospitalBeds = 1000;
      const expectedAvailableBeds = -1250;

      const result = estimateHospitalBedsByRequestedTime(
        severeCasesByRequestedTime,
        totalHospitalBeds
      );

      expect(result).toBe(expectedAvailableBeds);
    });
  });

  describe('Test for estimateICUCases', () => {
    it('Should return the correct estimate of ICU cases', () => {
      const infectionsByRequestedTime = 7890;
      const expectedNumberOfICUCases = 394;

      const result = estimateICUCases(infectionsByRequestedTime, expectedNumberOfICUCases);
      expect(result).toBe(expectedNumberOfICUCases);
    });
  });

  describe('Test for estimateVentilatorCases', () => {
    it('Should return the correct estimate of Ventilator cases', () => {
      const infectionsByRequestedTime = 7890;
      const expectedNumberOfVentilatorCases = 157;

      const result = estimateVentilatorCases(
        infectionsByRequestedTime,
        expectedNumberOfVentilatorCases
      );

      expect(result).toBe(expectedNumberOfVentilatorCases);
    });
  });

  describe('Test for estimateEconomyMonetryLoss', () => {
    it('Should estimate the economy monetry loss in days', () => {
      const infectionsByRequestedTime = 6650;
      const avgDailyIncome = 10;
      const avgIncomePopulation = 0.50;
      const duration = 30;
      const type = 'days';
      const expectedMonetryLoss = 1108;

      const result = estimateEconomyMonetryLoss(
        infectionsByRequestedTime,
        avgDailyIncome,
        avgIncomePopulation,
        duration, type
      );
      expect(result).toBe(expectedMonetryLoss);
    });

    it('Should estimate the economy monetry loss in weeks', () => {
      const infectionsByRequestedTime = 6650;
      const avgDailyIncome = 10;
      const avgIncomePopulation = 0.50;
      const duration = 1;
      const type = 'weeks';
      const expectedMonetryLoss = 4750;

      const result = estimateEconomyMonetryLoss(
        infectionsByRequestedTime,
        avgDailyIncome,
        avgIncomePopulation,
        duration,
        type
      );

      expect(result).toBe(expectedMonetryLoss);
    });

    it('Should estimate the economy monetry loss in months', () => {
      const infectionsByRequestedTime = 6650;
      const avgDailyIncome = 10;
      const avgIncomePopulation = 0.50;
      const duration = 2;
      const type = 'months';
      const expectedMonetryLoss = 554;

      const result = estimateEconomyMonetryLoss(
        infectionsByRequestedTime,
        avgDailyIncome,
        avgIncomePopulation,
        duration,
        type
      );
      expect(result).toBe(expectedMonetryLoss);
    });
  });
});
