// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as FilesAPI from '../files';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Files extends APIResource {
  /**
   * Retrieve all files associated with a specific job
   */
  list(jobID: string, options?: RequestOptions): APIPromise<FileListResponse> {
    return this._client.get(path`/api/jobs/${jobID}/files`, {
      ...options,
      __security: { projectAccessTokenAuth: true },
    });
  }
}

/**
 * Response containing a list of files for a job
 */
export interface FileListResponse {
  data: Array<FilesAPI.JobFile>;

  /**
   * Status indicates the response status "success"
   */
  status: 'success';
}

export declare namespace Files {
  export { type FileListResponse as FileListResponse };
}
