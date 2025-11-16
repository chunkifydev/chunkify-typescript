// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as FilesAPI from './files';
import * as JobsAPI from './jobs';
import { APIPromise } from '../core/api-promise';
import { MyOffsetPage, type MyOffsetPageParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Uploads extends APIResource {
  /**
   * Create a new upload with the specified name.
   */
  create(body: UploadCreateParams, options?: RequestOptions): APIPromise<UploadCreateResponse> {
    return this._client.post('/api/uploads', { body, ...options });
  }

  /**
   * Retrieve details of a specific upload by its ID, including metadata, status, and
   * associated source.
   */
  retrieve(uploadID: string, options?: RequestOptions): APIPromise<UploadRetrieveResponse> {
    return this._client.get(path`/api/uploads/${uploadID}`, options);
  }

  /**
   * Retrieve a list of all uploads with optional filtering and pagination.
   */
  list(
    query: UploadListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<UploadsMyOffsetPage, Upload> {
    return this._client.getAPIList('/api/uploads', MyOffsetPage<Upload>, { query, ...options });
  }

  /**
   * Delete an upload.
   */
  delete(uploadID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/api/uploads/${uploadID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type UploadsMyOffsetPage = MyOffsetPage<Upload>;

export interface Upload {
  /**
   * Unique identifier of the upload
   */
  id?: string;

  /**
   * Timestamp when the upload was created
   */
  created_at?: string;

  /**
   * Error message of the upload
   */
  error?: JobsAPI.ChunkifyError;

  /**
   * Timestamp when the upload will expire
   */
  expires_at?: string;

  /**
   * Additional metadata for the upload
   */
  metadata?: { [key: string]: string };

  /**
   * SourceId is the id of the source that was created from the upload
   */
  source_id?: string;

  /**
   * Current status of the upload (waiting, completed, failed, expired)
   */
  status?: string;

  /**
   * Timestamp when the upload was updated
   */
  updated_at?: string;

  /**
   * Pre-signed URL where the file should be uploaded to
   */
  upload_url?: string;
}

/**
 * Successful response
 */
export interface UploadCreateResponse extends Omit<FilesAPI.ResponseOk, 'data'> {
  data?: Upload;
}

/**
 * Successful response
 */
export interface UploadRetrieveResponse extends Omit<FilesAPI.ResponseOk, 'data'> {
  data?: Upload;
}

export interface UploadCreateParams {
  /**
   * Metadata allows for additional information to be attached to the upload, with a
   * maximum size of 1024 bytes.
   */
  metadata?: { [key: string]: string };

  /**
   * The upload URL will be valid for the given timeout in seconds
   */
  timeout?: number;
}

export interface UploadListParams extends MyOffsetPageParams {
  /**
   * Filter by upload ID
   */
  id?: string;

  created?: UploadListParams.Created;

  /**
   * Filter by metadata (format: key:value,key:value)
   */
  metadata?: string;

  /**
   * Filter by source ID
   */
  source_id?: string;

  /**
   * Filter by status (pending, completed, error)
   */
  status?: string;
}

export namespace UploadListParams {
  export interface Created {
    /**
     * Filter by creation date greater than or equal (RFC3339)
     */
    gte?: string;

    /**
     * Filter by creation date less than or equal (RFC3339)
     */
    lte?: string;

    /**
     * Sort by creation date (asc/desc)
     */
    sort?: string;
  }
}

export declare namespace Uploads {
  export {
    type Upload as Upload,
    type UploadCreateResponse as UploadCreateResponse,
    type UploadRetrieveResponse as UploadRetrieveResponse,
    type UploadsMyOffsetPage as UploadsMyOffsetPage,
    type UploadCreateParams as UploadCreateParams,
    type UploadListParams as UploadListParams,
  };
}
