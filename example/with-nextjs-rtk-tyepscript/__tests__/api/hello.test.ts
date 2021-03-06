import request from 'supertest';
import http from 'http';

import handler from 'src/pages/api/hello';

import requestListener from './utils';

describe('/api/hello', () => {
  describe('GET', () => {
    it('responds with json', async () => {
      const server = http.createServer(requestListener({ handler }));
      const agent = await request.agent(server).get('/api/hello');

      expect(agent.body).toEqual({ name: 'John Doe' });
    });
  });
});
