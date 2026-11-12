// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Chunkify from '@chunkify/chunkify';

const client = new Chunkify({
  projectAccessToken: 'My Project Access Token',
  teamAccessToken: 'My Team Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource connections', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.projects.analytics.connections.create('projectId', {
      name: 'Website analytics',
      type: 'custom',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.projects.analytics.connections.create('projectId', {
      name: 'Website analytics',
      type: 'custom',
      endpoint: 'https://analytics.example.com',
      public_ingest_key: 'ck_public_de90a6057194afc9913a4adcd7ef960db1a91a48d2a13b6b2f7dfe671fd5be36',
      read_key: 'YOUR_READ_ONLY_KEY',
    });
  });

  // Mock server tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.projects.analytics.connections.retrieve('projectId', 'connectionId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('update', async () => {
    const responsePromise = client.projects.analytics.connections.update('projectId', 'connectionId', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.projects.analytics.connections.list('projectId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.projects.analytics.connections.delete('projectId', 'connectionId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
