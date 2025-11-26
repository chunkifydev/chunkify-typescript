// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Chunkify from 'chunkify';

const client = new Chunkify({
  projectAccessToken: 'My Project Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource jobs', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.jobs.create({
      format: { id: 'mp4_av1' },
      source_id: 'src_UioP9I876hjKlNBH78ILp0mo56t',
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
    const response = await client.jobs.create({
      format: {
        id: 'mp4_av1',
        audio_bitrate: 32000,
        bufsize: 100000,
        channels: 1,
        crf: 35,
        disable_audio: true,
        disable_video: true,
        duration: 1,
        framerate: 15,
        gop: 1,
        height: -2,
        level: 41,
        maxrate: 100000,
        minrate: 100000,
        movflags: 'movflags',
        pixfmt: 'yuv410p',
        preset: '10',
        profilev: 'main10',
        seek: 1,
        video_bitrate: 100000,
        width: -2,
      },
      source_id: 'src_UioP9I876hjKlNBH78ILp0mo56t',
      hls_manifest_id: 'hls_2v6EIgcNAycdS5g0IUm0TXBjvHV',
      metadata: { key: 'value', key2: 'value2' },
      storage: { id: 'aws-my-storage', path: '/path/to/video.mp4' },
      transcoder: { quantity: 2, type: '4vCPU' },
    });
  });

  // Prism tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.jobs.retrieve('jobId');
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
    const responsePromise = client.jobs.list();
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
      client.jobs.list(
        {
          id: 'id',
          created: { gte: '2025-01-01', lte: '2025-01-01', sort: 'asc' },
          format_id: 'mp4_h264',
          hls_manifest_id: 'hls_manifest_id',
          limit: 1,
          metadata: [['key1:value1']],
          offset: 0,
          source_id: 'source_id',
          status: 'completed',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Chunkify.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.jobs.delete('jobId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('cancel', async () => {
    const responsePromise = client.jobs.cancel('jobId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
