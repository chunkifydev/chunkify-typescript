// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Webhook } from 'standardwebhooks';

import Chunkify from '@chunkify/chunkify';

const client = new Chunkify({
  projectAccessToken: 'My Project Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource webhooks', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.webhooks.create({ url: 'https://example.com/webhook' });
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
    const response = await client.webhooks.create({
      url: 'https://example.com/webhook',
      enabled: true,
      events: ['job.completed'],
    });
  });

  // Prism tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.webhooks.retrieve('webhookId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('update', async () => {
    const responsePromise = client.webhooks.update('webhookId', {});
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
    const responsePromise = client.webhooks.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.webhooks.delete('webhookId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test.skip('unwrap', async () => {
    const key = 'whsec_c2VjcmV0Cg==';
    const payload =
      '{"id":"notf_2G6MJiNz71bHQGNzGwKx5cJwPFS","data":{"files":[{"id":"file_2G6MJiNz71bHQGNzGwKx5cJwPFS","audio_bitrate":128000,"audio_codec":"aac","created_at":"2025-01-01T12:00:00Z","duration":120,"height":1080,"job_id":"job_2G6MJiNz71bHQGNzGwKx5cJwPFS","mime_type":"video/mp4","path":"path/to/file.mp4","size":1234567,"storage_id":"stor_chunkify_2wLmj1fp8neUaFAWwwxvzKAT0Fa","url":"https://my-bucket.s3.us-east-1.amazonaws.com/path/to/file.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256","video_bitrate":20000000,"video_codec":"h264","video_framerate":29.97,"width":1920}],"job":{"id":"job_2G6MJiNz71bHQGNzGwKx5cJwPFS","billable_time":120,"created_at":"2025-01-01T12:00:00Z","format":{"id":"mp4_h264","audio_bitrate":32000,"bufsize":100000,"channels":1,"crf":35,"disable_audio":true,"disable_video":true,"duration":1,"framerate":15,"gop":1,"height":-2,"level":41,"maxrate":100000,"minrate":100000,"movflags":"movflags","pixfmt":"yuv410p","preset":"10","profilev":"main10","seek":1,"video_bitrate":100000,"width":-2},"progress":45.5,"source_id":"src_2G6MJiNz71bHQGNzGwKx5cJwPFS","status":"transcoding","storage":{"id":"stor_aws_S1cce6120E56e7Tu9ioP09Nhjk1","path":"path/to/video.mp4"},"transcoder":{"auto":true,"quantity":10,"type":"4vCPU"},"updated_at":"2025-01-01T12:05:00Z","error":{"detail":"detail","message":"message","type":"setup"},"hls_manifest_id":"hls_2v6EIgcNAycdS5g0IUm0TXBjvHV","metadata":{"key1":"value1","key2":"value2"},"started_at":"2025-01-01T12:01:00Z"}},"date":"2025-01-01T12:00:00Z","event":"job.completed"}';
    const msgID = '1';
    const timestamp = new Date();
    const wh = new Webhook(key);
    const signature = wh.sign(msgID, timestamp, payload);
    const headers: Record<string, string> = {
      'webhook-signature': signature,
      'webhook-id': msgID,
      'webhook-timestamp': String(Math.floor(timestamp.getTime() / 1000)),
    };
    client.webhooks.unwrap(payload, { headers, key });
    expect(() => {
      const wrongKey = 'whsec_aaaaaaaaaa==';
      client.webhooks.unwrap(payload, { headers, key: wrongKey });
    }).toThrow('No matching signature found');
    expect(() => {
      const badSig = wh.sign(msgID, timestamp, 'some other payload');
      client.webhooks.unwrap(payload, { headers: { ...headers, 'webhook-signature': badSig }, key });
    }).toThrow('No matching signature found');
    expect(() => {
      client.webhooks.unwrap(payload, { headers: { ...headers, 'webhook-timestamp': '5' }, key });
    }).toThrow('Message timestamp too old');
    expect(() => {
      client.webhooks.unwrap(payload, { headers: { ...headers, 'webhook-id': 'wrong' }, key });
    }).toThrow('No matching signature found');
  });
});
