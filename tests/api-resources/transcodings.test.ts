// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Chunkify from '@chunkify/chunkify';

const client = new Chunkify({
  projectAccessToken: 'My Project Access Token',
  teamAccessToken: 'My Team Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource transcodings', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.transcodings.create({
      format: { id: 'mp4_h264' },
      source_id: 'src_example',
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
    const response = await client.transcodings.create({
      format: {
        id: 'mp4_h264',
        audio_bitrate: 32000,
        audio_samplerate: 8000,
        channels: 1,
        crf: 23,
        duration: 1,
        level: 41,
        movflags: 'faststart',
        pixfmt: 'yuv420p',
        preset: 'medium',
        profilev: 'high',
        seek: 0,
        x264_keyint: 60,
      },
      source_id: 'src_example',
      metadata: { foo: 'string' },
      storage: { id: 'stor_example', path: 'exports/video.mp4' },
    });
  });

  // Mock server tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.transcodings.retrieve('transcodingId');
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
    const responsePromise = client.transcodings.list();
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
      client.transcodings.list(
        {
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
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Chunkify.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.transcodings.delete('transcodingId');
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
    await expect(
      client.transcodings.delete(
        'transcodingId',
        { delete_files: true },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Chunkify.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('cancel', async () => {
    const responsePromise = client.transcodings.cancel('transcodingId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
