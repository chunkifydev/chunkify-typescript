// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as FilesAPI from '../files';
import * as Shared from '../shared';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Files extends APIResource {
  /**
   * Retrieve all files associated with a specific job
   */
  list(jobID: string, options?: RequestOptions): APIPromise<FileListResponse> {
    return this._client.get(path`/api/jobs/${jobID}/files`, options);
  }
}

/**
 * Successful response
 */
export interface FileListResponse extends Shared.ResponseOk {
  data?: Array<FilesAPI.APIFile>;
}

export declare namespace Files {
  export { type FileListResponse as FileListResponse };
}
