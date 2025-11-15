// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Chunkify } from '../client';

export abstract class APIResource {
  protected _client: Chunkify;

  constructor(client: Chunkify) {
    this._client = client;
  }
}
