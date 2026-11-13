// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Chunkify, { toFile } from '@chunkify/chunkify';

const client = new Chunkify({
  projectAccessToken: 'My Project Access Token',
  teamAccessToken: 'My Team Access Token',
  baseURL: process.env["TEST_API_BASE_URL"] ?? 'http://127.0.0.1:4010',
});

describe('resource actions', () => {
  // Mock server tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.workflows.runs.actions.retrieve('actionRunId', { workflowId: 'workflowId', runId: 'runId' });
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
    const response = await client.workflows.runs.actions.retrieve('actionRunId', { workflowId: 'workflowId', runId: 'runId' });
  });

  // Mock server tests are disabled
  test.skip('list: only required params', async () => {
    const responsePromise = client.workflows.runs.actions.list('runId', { workflowId: 'workflowId' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list: required and optional params', async () => {
    const response = await client.workflows.runs.actions.list('runId', {
    workflowId: 'workflowId',
    asset_id: 'asset_id',
    created: { gte: 0, lte: 0 },
    limit: 1,
    offset: 0,
    status: 'pending',
    type: 'create_static_rendition',
  });
  });
});
