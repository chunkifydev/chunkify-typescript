// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Logs extends APIResource {
  /**
   * Retrieve logs for a specific job, either from the transcoder or manager service
   */
  list(jobID: string, query: LogListParams, options?: RequestOptions): APIPromise<LogListResponse> {
    return this._client.get(path`/api/jobs/${jobID}/logs`, { query, ...options });
  }
}

/**
 * Response containing a list of logs for a job
 */
export interface LogListResponse {
  data: Array<LogListResponse.Data>;

  /**
   * Status indicates the response status "success"
   */
  status: string;
}

export namespace LogListResponse {
  export interface Data {
    /**
     * Additional structured data attached to the log
     */
    attributes: { [key: string]: unknown };

    /**
     * Log level (e.g. "info", "error", "debug")
     */
    level: 'info' | 'error' | 'debug';

    /**
     * The log message content
     */
    msg: string;

    /**
     * Name of the service that generated the log
     */
    service: 'transcoder' | 'manager';

    /**
     * Timestamp when the log was created
     */
    time: string;

    /**
     * Optional ID of the job this log is associated with
     */
    job_id?: string;
  }
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
