// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Logs extends APIResource {
  /**
   * Retrieve logs for a specific job, either from the transcoder or manager service.
   * Deprecated: Jobs are a legacy resource. Use Assets, Transcodings or Thumbnails
   * instead.
   *
   * @deprecated
   */
  list(jobID: string, query: LogListParams, options?: RequestOptions): APIPromise<LogListResponse> {
    return this._client.get(path`/jobs/${jobID}/logs`, {
      query,
      ...options,
      __security: { projectAccessTokenAuth: true },
    });
  }
}

/**
 * Response containing a list of logs for a job
 */
export interface LogListResponse {
  data: Array<Shared.Log>;

  /**
   * Status indicates the response status "success"
   */
  status: 'success';
}

export interface LogListParams {
  /**
   * Service type (transcoder or manager)
   */
  service: 'transcoder' | 'manager';

  /**
   * Transcoder ID (required if service is transcoder)
   */
  transcoder_id?: number;
}

export declare namespace Logs {
  export { type LogListResponse as LogListResponse, type LogListParams as LogListParams };
}
