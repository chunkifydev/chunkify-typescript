// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Chunkify from 'chunkify';

const client = new Chunkify({
  projectAccessToken: 'My Project Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource jobs', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.jobs.create({ format: {}, source_id: 'src_UioP9I876hjKlNBH78ILp0mo56t' });
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
        hls_av1: {
          hls_enc: false,
          hls_enc_iv: '0123456789abcdef',
          hls_enc_key: '0123456789abcdef',
          hls_enc_key_url: 'https://example.com/key',
          hls_segment_type: 'mpegts',
          hls_time: 6,
        },
        hls_h264: {
          hls_enc: false,
          hls_enc_iv: '0123456789abcdef',
          hls_enc_key: '0123456789abcdef',
          hls_enc_key_url: 'https://example.com/key',
          hls_segment_type: 'mpegts',
          hls_time: 6,
        },
        hls_h265: {
          hls_enc: false,
          hls_enc_iv: '0123456789abcdef',
          hls_enc_key: '0123456789abcdef',
          hls_enc_key_url: 'https://example.com/key',
          hls_segment_type: 'mpegts',
          hls_time: 6,
        },
        jpg: {
          interval: 1,
          chunk_duration: 1,
          duration: 1,
          frames: 1,
          height: -2,
          seek: 1,
          sprite: true,
          width: -2,
        },
        mp4_av1: {
          bufsize: 100000,
          channels: 1,
          disable_audio: true,
          disable_video: true,
          duration: 1,
          framerate: 15,
          gop: 1,
          height: -2,
          maxrate: 100000,
          minrate: 100000,
          pixfmt: 'yuv410p',
          seek: 1,
          width: -2,
          audio_bitrate: 32000,
          crf: 35,
          level: 41,
          movflags: 'movflags',
          preset: '10',
          profilev: 'main10',
          video_bitrate: 100000,
        },
        mp4_h264: {
          bufsize: 100000,
          channels: 1,
          disable_audio: true,
          disable_video: true,
          duration: 1,
          framerate: 15,
          gop: 1,
          height: -2,
          maxrate: 100000,
          minrate: 100000,
          pixfmt: 'yuv410p',
          seek: 1,
          width: -2,
          audio_bitrate: 32000,
          crf: 23,
          level: 41,
          movflags: 'movflags',
          preset: 'medium',
          profilev: 'high',
          video_bitrate: 100000,
          x264_keyint: 60,
        },
        mp4_h265: {
          bufsize: 100000,
          channels: 1,
          disable_audio: true,
          disable_video: true,
          duration: 1,
          framerate: 15,
          gop: 1,
          height: -2,
          maxrate: 100000,
          minrate: 100000,
          pixfmt: 'yuv410p',
          seek: 1,
          width: -2,
          audio_bitrate: 32000,
          crf: 23,
          level: 41,
          movflags: 'movflags',
          preset: 'medium',
          profilev: 'main10',
          video_bitrate: 100000,
          x265_keyint: 60,
        },
        webm_vp9: {
          bufsize: 100000,
          channels: 1,
          disable_audio: true,
          disable_video: true,
          duration: 1,
          framerate: 15,
          gop: 1,
          height: -2,
          maxrate: 100000,
          minrate: 100000,
          pixfmt: 'yuv410p',
          seek: 1,
          width: -2,
          cpu_used: '4',
          crf: 23,
          quality: 'good',
        },
      },
      source_id: 'src_UioP9I876hjKlNBH78ILp0mo56t',
      hls_manifest_id: 'hls_2v6EIgcNAycdS5g0IUm0TXBjvHV',
      metadata: { key: 'value', key2: 'value2' },
      storage: { id: 'aws-my-storage', path: '/path/to/video.mp4' },
      transcoder: { quantity: 2, type: '8vCPU' },
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
          created: { gte: 'gte', lte: 'lte', sort: 'sort' },
          format_name: 'format_name',
          hls_manifest_id: 'hls_manifest_id',
          limit: 0,
          metadata: 'metadata',
          offset: 0,
          source_id: 'source_id',
          status: 'status',
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

  // Prism tests are disabled
  test.skip('getFiles', async () => {
    const responsePromise = client.jobs.getFiles('jobId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('getLogs: only required params', async () => {
    const responsePromise = client.jobs.getLogs('jobId', { service: 'transcoder' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('getLogs: required and optional params', async () => {
    const response = await client.jobs.getLogs('jobId', { service: 'transcoder', transcoder_id: 0 });
  });

  // Prism tests are disabled
  test.skip('getTranscoders', async () => {
    const responsePromise = client.jobs.getTranscoders('jobId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
