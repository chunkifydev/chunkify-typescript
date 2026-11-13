// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Chunkify, { toFile } from '@chunkify/chunkify';

const client = new Chunkify({
  projectAccessToken: 'My Project Access Token',
  teamAccessToken: 'My Team Access Token',
  baseURL: process.env["TEST_API_BASE_URL"] ?? 'http://127.0.0.1:4010',
});

describe('resource metrics', () => {
  // Mock server tests are disabled
  test.skip('assets', async () => {
    const responsePromise = client.metrics.assets();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('assets: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.metrics.assets({
    format: 'json',
    from: '7321-69-10',
    to: '7321-69-10',
  }, { path: '/_stainless_unknown_path' }))
      .rejects
      .toThrow(Chunkify.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('storage', async () => {
    const responsePromise = client.metrics.storage();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('storage: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.metrics.storage({
    format: 'json',
    from: '7321-69-10',
    storage_id: 'x',
    to: '7321-69-10',
  }, { path: '/_stainless_unknown_path' }))
      .rejects
      .toThrow(Chunkify.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('usage', async () => {
    const responsePromise = client.metrics.usage();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('usage: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.metrics.usage({
    format: 'json',
    from: '7321-69-10',
    to: '7321-69-10',
  }, { path: '/_stainless_unknown_path' }))
      .rejects
      .toThrow(Chunkify.NotFoundError);
  });
});
