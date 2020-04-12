import request from 'supertest';
import app from '../../../index';

const body = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 3,
    avgDailyIncomePopulation: 0.59
  },
  reportedCases: 894,
  population: 3501270,
  totalHospitalBeds: 213925,
  timeToElapse: 1,
  periodType: 'weeks'
};

const expectedJsonResponse = {
  data: {
    region: {
      name: 'Africa',
      avgAge: 19.7,
      avgDailyIncomeInUSD: 3,
      avgDailyIncomePopulation: 0.59
    },
    reportedCases: 894,
    population: 3501270,
    totalHospitalBeds: 213925,
    timeToElapse: 1,
    periodType: 'weeks'
  },
  impact: {
    currentlyInfected: 8940,
    infectionsByRequestedTime: 35760,
    severeCasesByRequestedTime: 5364,
    hospitalBedsByRequestedTime: 69509,
    casesForICUByRequestedTime: 1788,
    casesForVentilatorsByRequestedTime: 715,
    dollarsInFlight: 9042
  },
  severeImpact: {
    currentlyInfected: 44700,
    infectionsByRequestedTime: 178800,
    severeCasesByRequestedTime: 26820,
    hospitalBedsByRequestedTime: 48053,
    casesForICUByRequestedTime: 8940,
    casesForVentilatorsByRequestedTime: 3576,
    dollarsInFlight: 45210
  }
};

describe('Integration test for covid-19 estimator API', () => {
  it('Unsupported routes should return 404', async () => {
    const response = await request(app)
      .get('/api/v1/on-covid-19/unknown-route');
    expect(response.status).toBe(404);
  });

  it('Default estimator response format should be json and should be successful', async () => {
    const response = await request(app)
      .post('/api/v1/on-covid-19/')
      .send(body);

    expect(response.status).toBe(200);
    expect(response.header['content-type'].split('; ')[0]).toBe('application/json');
    expect(response.body).toEqual(expectedJsonResponse);
  });

  it('JSON should be returned when json type is requested', async () => {
    const response = await request(app)
      .post('/api/v1/on-covid-19/json')
      .send(body);
    expect(response.status).toBe(200);
    expect(response.header['content-type'].split('; ')[0]).toBe('application/json');
    expect(response.body).toEqual(expectedJsonResponse);
  });

  it('XML should be returned when xml type is requested', async () => {
    const response = await request(app)
      .post('/api/v1/on-covid-19/xml')
      .send(body);
    expect(response.status).toBe(200);
    expect(response.header['content-type'].split('; ')[0]).toBe('application/xml');
  });

  it('Return an error when the provided response type is not supported', async () => {
    const response = await request(app)
      .post('/api/v1/on-covid-19/unsupported-response-type')
      .send(body);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Please provide a valid response type');
  });
});
