// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { PagePromise, PaginatedResults, type PaginatedResultsParams } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Uploads extends APIResource {
  /**
   * Create a new upload with the specified name.
   *
   * @example
   * ```ts
   * const upload = await client.uploads.create();
   * ```
   */
  create(body: UploadCreateParams, options?: RequestOptions): APIPromise<Upload> {
    return (
      this._client.post('/api/uploads', {
        body,
        ...options,
        __security: { projectAccessTokenAuth: true },
      }) as APIPromise<{ data: Upload }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Retrieve details of a specific upload by its ID, including metadata, status, and
   * associated source.
   *
   * @example
   * ```ts
   * const upload = await client.uploads.retrieve('uploadId');
   * ```
   */
  retrieve(uploadID: string, options?: RequestOptions): APIPromise<Upload> {
    return (
      this._client.get(path`/api/uploads/${uploadID}`, {
        ...options,
        __security: { projectAccessTokenAuth: true },
      }) as APIPromise<{ data: Upload }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Retrieve a list of all uploads with optional filtering and pagination.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const upload of client.uploads.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: UploadListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<UploadsPaginatedResults, Upload> {
    return this._client.getAPIList('/api/uploads', PaginatedResults<Upload>, {
      query,
      ...options,
      __security: { projectAccessTokenAuth: true },
    });
  }

  /**
   * Delete an upload.
   *
   * @example
   * ```ts
   * await client.uploads.delete('uploadId');
   * ```
   */
  delete(uploadID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/api/uploads/${uploadID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: { projectAccessTokenAuth: true },
    });
  }
}

export type UploadsPaginatedResults = PaginatedResults<Upload>;

export interface Upload {
  /**
   * Unique identifier of the upload
   */
  id: string;

  /**
   * Timestamp when the upload was created
   */
  created_at: string;

  /**
   * Timestamp when the upload will expire
   */
  expires_at: string;

  /**
   * Current status of the upload
   */
  status: 'waiting' | 'completed' | 'failed' | 'expired';

  /**
   * Timestamp when the upload was updated
   */
  updated_at: string;

  /**
   * Short-lived completion capability, returned only on creation. POST after a
   * successful PUT before expires_at. Requires no API key. Repeated valid calls are
   * idempotent.
   */
  completion_url?: string;

  /**
   * Error message of the upload
   */
  error?: Shared.ChunkifyError;

  /**
   * Additional metadata for the upload
   */
  metadata?: { [key: string]: string };

  /**
   * SourceId is the id of the source that was created from the upload
   */
  source_id?: string;

  /**
   * Resolved Storage selected when the Upload was created. Absent for historical
   * uploads.
   */
  storage_id?: string;

  /**
   * Presigned PUT URL, returned only when creating an Upload session. Call
   * completion_url after the PUT succeeds.
   */
  upload_url?: string;
}

export interface UploadCreateParams {
  /**
   * Metadata allows for additional information to be attached to the upload, with a
   * maximum size of 2048 bytes.
   */
  metadata?: { [key: string]: string };

  /**
   * Optional Storage override. Omit id to use the Project default.
   * Customer-connected Storage requires path; Chunkify Storage generates its own
   * path.
   */
  storage?: UploadCreateParams.Storage;

  /**
   * Both the file PUT and completion POST must finish within this timeout in seconds
   */
  validity_timeout?: number;
}

export namespace UploadCreateParams {
  /**
   * Optional Storage override. Omit id to use the Project default.
   * Customer-connected Storage requires path; Chunkify Storage generates its own
   * path.
   */
  export interface Storage {
    /**
     * Storage belonging to this Project. Omit to use the Project default.
     */
    id?: string;

    /**
     * Exact object key including filename, required for customer Storage and forbidden
     * for Chunkify Storage. The output base_prefix is not added. Existing keys may be
     * overwritten.
     */
    path?: string;
  }
}

export interface UploadListParams extends PaginatedResultsParams {
  /**
   * Filter by upload ID
   */
  id?: string;

  created?: UploadListParams.Created;

  /**
   * Filter by metadata
   */
  metadata?: Array<Array<string>>;

  /**
   * Filter by source ID
   */
  source_id?: string;

  /**
   * Filter by status (pending, completed, error)
   */
  status?: 'waiting' | 'completed' | 'failed' | 'expired';
}

export namespace UploadListParams {
  export interface Created {
    /**
     * Filter by creation date greater than or equal (UNIX epoch time)
     */
    gte?: number;

    /**
     * Filter by creation date less than or equal (UNIX epoch time)
     */
    lte?: number;

    /**
     * Sort by creation date (asc/desc)
     */
    sort?: 'asc' | 'desc';
  }
}

export declare namespace Uploads {
  export {
    type Upload as Upload,
    type UploadsPaginatedResults as UploadsPaginatedResults,
    type UploadCreateParams as UploadCreateParams,
    type UploadListParams as UploadListParams,
  };
}
