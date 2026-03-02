import { NextApiRequest, NextApiResponse } from 'next';
import handler from '../pages/api/movie';

describe('API /api/movie', () => {
  function createMock() {
    const req = { query: {}, method: 'GET' } as unknown as NextApiRequest;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as NextApiResponse;
    return { req, res };
  }

  it('returns 400 when id is missing', async () => {
    const { req, res } = createMock();
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid IMDb ID' });
  });

  it('calls OMDb when id provided (mocked)', async () => {
    const { req, res } = createMock();
    req.query = { id: 'tt0133093' };

    // stub global fetch
    const fakeData = { Response: 'False', Error: 'Movie not found' };
    (global as any).fetch = jest.fn().mockResolvedValueOnce({
      json: () => Promise.resolve(fakeData),
    });

    await handler(req, res);
    expect(fetch).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Movie not found' });
  });
});
