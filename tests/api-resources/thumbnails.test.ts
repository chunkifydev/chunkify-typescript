// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Chunkify, { toFile } from '@chunkify/chunkify';

const client = new Chunkify({
  projectAccessToken: 'My Project Access Token',
  teamAccessToken: 'My Team Access Token',
  baseURL: process.env["TEST_API_BASE_URL"] ?? 'http://127.0.0.1:4010',
});

describe('resource thumbnails', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.thumbnails.create({ source_id: 'src_example' });
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
    const response = await client.thumbnails.create({
    source_id: 'src_example',
    count: 10,
    format: 'jpeg',
    metadata: { foo: 'string' },
    output: 'images',
    range: { end: 1, start: 0 },
    size: 64,
    storage: { id: 'x', path: 'x' },
    timestamps: [0],
  });
  });

  // Mock server tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.thumbnails.retrieve('thumbnailId');
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
    const responsePromise = client.thumbnails.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.thumbnails.list({
    id: 'x',
    created: {
    gte: 0,
    lte: 0,
    sort: 'asc',
  },
    limit: 1,
    offset: 0,
    source_id: 'x',
    status: 'preparing',
    storage_id: 'x',
  }, { path: '/_stainless_unknown_path' }))
      .rejects
      .toThrow(Chunkify.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.thumbnails.delete('thumbnailId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('delete: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.thumbnails.delete('thumbnailId', { delete_files: true }, { path: '/_stainless_unknown_path' }))
      .rejects
      .toThrow(Chunkify.NotFoundError);
  });
});
