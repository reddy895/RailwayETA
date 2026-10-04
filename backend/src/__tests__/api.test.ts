import request from 'supertest';
import app from '../app';

describe('RailETA Backend REST API Suite', () => {
  it('GET /api/health should return healthy system status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('healthy');
    expect(res.body.data.service).toBe('RailETA API');
  });

  it('GET /api/stations/search should return station search result', async () => {
    const res = await request(app).get('/api/stations/search?q=NDLS');
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('GET /api/stations/NDLS should return station details', async () => {
    const res = await request(app).get('/api/stations/NDLS');
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.stationCode).toBe('NDLS');
  });

  it('GET /api/trains/12301 should return normalized train info', async () => {
    const res = await request(app).get('/api/trains/12301');
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.trainNumber).toBe('12301');
  });

  it('GET /api/trains/between should return trains between stations', async () => {
    const res = await request(app).get('/api/trains/between?from=NDLS&to=HWH');
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('GET /api/trains/12301/live should return live running status', async () => {
    const res = await request(app).get('/api/trains/12301/live');
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.trainNumber).toBe('12301');
    expect(res.body.data.currentStation).toBeDefined();
  });

  it('GET /api/pnr/8412948210 should return PNR status', async () => {
    const res = await request(app).get('/api/pnr/8412948210');
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.pnrNumber).toBe('8412948210');
  });

  it('GET /api/pnr/invalid should return 400 validation error', async () => {
    const res = await request(app).get('/api/pnr/123');
    expect(res.statusCode).toEqual(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('INVALID_PNR');
  });

  it('GET /api/non-existent-endpoint should return 404 endpoint not found', async () => {
    const res = await request(app).get('/api/invalid-route-path');
    expect(res.statusCode).toEqual(404);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('ENDPOINT_NOT_FOUND');
  });
});
