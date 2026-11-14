// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Transcoders extends APIResource {
  /**
   * Retrieve all the transcoders statuses for a specific job. Deprecated: Jobs are a
   * legacy resource. Use Assets, Transcodings or Thumbnails instead.
   *
   * @deprecated
   */
  list(jobID: string, options?: RequestOptions): APIPromise<TranscoderListResponse> {
    return this._client.get(path`/jobs/${jobID}/transcoders`, {
      ...options,
      __security: { projectAccessTokenAuth: true },
    });
  }
}

/**
 * Response containing a list of transcoders for a job
 */
export interface TranscoderListResponse {
  data: Array<Shared.TranscoderStatus>;

  /**
   * Status indicates the response status "success"
   */
  status: 'success';
}

export declare namespace Transcoders {
  export { type TranscoderListResponse as TranscoderListResponse };
}
