// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Chunkify from '@chunkify/chunkify';

const client = new Chunkify({
  projectAccessToken: 'My Project Access Token',
  teamAccessToken: 'My Team Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource outputs', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.assets.outputs.create('assetId', {
      params: {},
      type: 'caption',
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
    const response = await client.assets.outputs.create('assetId', {
      params: { language_code: 'en', source_caption_id: 'x' },
      type: 'caption',
    });
  });

  // Mock server tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.assets.outputs.retrieve('outputId', { assetId: 'assetId' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('retrieve: required and optional params', async () => {
    const response = await client.assets.outputs.retrieve('outputId', { assetId: 'assetId' });
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.assets.outputs.list('assetId');
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
    await expect(
      client.assets.outputs.list(
        'assetId',
        {
          limit: 1,
          offset: 0,
          status: 'preparing',
          type: 'caption',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Chunkify.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.assets.outputs.delete('outputId', { assetId: 'assetId' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('delete: required and optional params', async () => {
    const response = await client.assets.outputs.delete('outputId', {
      assetId: 'assetId',
      delete_files: true,
    });
  });
});
