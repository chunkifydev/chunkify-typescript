// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Chunkify from 'chunkify';

const client = new Chunkify({
  projectAccessToken: 'My Project Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource notifications', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.notifications.create({
      event: 'job.completed',
      object_id: 'job_A1cce6120E56e7Tu9ioP09Nhjk9',
      webhook_id: 'wh_A1cce6120E56e7Tu9ioP09Nhjk9',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.notifications.create({
      event: 'job.completed',
      object_id: 'job_A1cce6120E56e7Tu9ioP09Nhjk9',
      webhook_id: 'wh_A1cce6120E56e7Tu9ioP09Nhjk9',
    });
  });

  // Prism tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.notifications.retrieve('notificationId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.notifications.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.notifications.list(
        {
          created: { gte: 'gte', lte: 'lte', sort: 'sort' },
          events: ['string'],
          limit: 0,
          object_id: 'object_id',
          offset: 0,
          response_status_code: { eq: 0, gte: 0, lte: 0 },
          webhook_id: 'webhook_id',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Chunkify.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.notifications.delete('notificationId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
