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
   * Create an Upload session for a direct transfer to storage. Multipart creation
   * returns every signed part URL. Retry parts with their original URLs and complete
   * before expiry. Customer storage requires long-lived credentials and an
   * incomplete-multipart lifecycle rule. Start a new Upload after abandoning a
   * session.
   *
   * @example
   * ```ts
   * const upload = await client.uploads.create();
   * ```
   */
  create(body: UploadCreateParams, options?: RequestOptions): APIPromise<Upload> {
    return (
      this._client.post('/uploads', {
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
      this._client.get(path`/uploads/${uploadID}`, {
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
    return this._client.getAPIList('/uploads', PaginatedResults<Upload>, {
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
    return this._client.delete(path`/uploads/${uploadID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: { projectAccessTokenAuth: true },
    });
  }

  /**
   * POST the returned completion_url before expires_at. Single-PUT Uploads send no
   * body; multipart Uploads send every part number and storage ETag. Chunkify
   * verifies the assembled object and atomically creates the Source and optional
   * Asset. An Asset destination conflict returns 409 and fails the Upload without
   * committing Source, Asset, or usage changes. Valid retries return 204 without
   * duplicate side effects. Retry network errors, 429, and 5xx responses with
   * bounded backoff.
   *
   * @example
   * ```ts
   * await client.uploads.complete('token', {
   *   parts: [{ part_number: 1, etag: '"abc123"' }],
   * });
   * ```
   */
  complete(token: string, body: UploadCompleteParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post(path`/uploads/completion/${token}`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: {},
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
   * Whether this Upload creates an Asset on completion.
   */
  create_asset: boolean;

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
   * Resolved transfer mode for this Upload.
   */
  upload_mode: 'single' | 'multipart';

  /**
   * Selected Workflow ID, or null.
   */
  workflow_id: string | null;

  /**
   * Pinned Workflow revision, or null.
   */
  workflow_revision: number | null;

  /**
   * Automatically created Asset. May be absent before completion or after record
   * deletion.
   */
  asset_id?: string;

  /**
   * Completion capability, returned only on creation. POST after a successful single
   * PUT or with all multipart ETags before expires_at. Requires no API key. Repeated
   * valid calls are idempotent.
   */
  completion_url?: string;

  /**
   * CreatedByTokenId specifies the Project token used to create the resource. It
   * remains set after the token is revoked. Omitted for dashboard requests, MCP
   * OAuth connections, Workflow actions, and unknown creators.
   */
  created_by_token_id?: string;

  /**
   * CreatedByUserId specifies the team member who created the resource. Omitted for
   * Workflow actions, unknown creators, and deleted accounts.
   */
  created_by_user_id?: string;

  /**
   * CreatedVia specifies how the resource was created: api for API requests,
   * dashboard for the Chunkify dashboard, mcp for MCP clients, and workflow for
   * Workflow actions. Omitted when the creator is unknown.
   */
  created_via?: 'api' | 'dashboard' | 'mcp' | 'workflow';

  /**
   * Error message of the upload
   */
  error?: Shared.ChunkifyError;

  /**
   * Declared file size in bytes, when supplied at creation.
   */
  file_size_bytes?: number;

  /**
   * Additional metadata for the upload
   */
  metadata?: { [key: string]: string };

  /**
   * Multipart transfer details, returned only on creation for multipart Uploads.
   */
  multipart?: Upload.Multipart;

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
   * Presigned PUT URL, returned only when creating a single-PUT Upload session. Call
   * completion_url after the PUT succeeds.
   */
  upload_url?: string;
}

export namespace Upload {
  /**
   * Multipart transfer details, returned only on creation for multipart Uploads.
   */
  export interface Multipart {
    /**
     * ExpiresAt specifies when the signed part URLs expire. URLs cannot be refreshed;
     * create a new Upload after expiry.
     */
    expires_at: string;

    /**
     * PartSizeBytes specifies the size of each part except the final part, in bytes.
     */
    part_size_bytes: number;

    /**
     * Parts contains every signed upload URL in ascending part_number order. Upload
     * file slices directly to these URLs.
     */
    parts: Array<Multipart.Part>;
  }

  export namespace Multipart {
    export interface Part {
      /**
       * PartNumber specifies the one-based part number for this URL.
       */
      part_number: number;

      /**
       * UploadUrl specifies the signed PUT URL for this part. Retry the same file slice
       * with this URL before multipart.expires_at.
       */
      upload_url: string;
    }
  }
}

export interface UploadCreateParams {
  /**
   * CreateAsset specifies whether to create an Asset after Upload completion.
   * Defaults to false. Snapshots the Project output settings, including the path
   * template. Referenced metadata must be non-empty in this request. Asset
   * processing is billed separately.
   */
  create_asset?: boolean;

  /**
   * FileSizeBytes specifies the exact file size in bytes. Required when UploadMode
   * is omitted, auto, or multipart. Optional for explicit single mode. Must fit the
   * team's Source size limit. Single PUT supports up to 5 GiB, subject to the
   * provider's limit; multipart supports up to 5 TiB.
   */
  file_size_bytes?: number;

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
   * UploadMode specifies the transfer method. Defaults to auto. Auto chooses
   * multipart above 100 MiB and single PUT at or below 100 MiB for every Storage
   * provider. Multipart requires a provider that supports the required multipart
   * operations and signed part URLs. Provider failures return an error without
   * falling back to single PUT.
   */
  upload_mode?: 'single' | 'multipart' | 'auto';

  /**
   * ValidityTimeout specifies the session and signed URL lifetime in seconds. Single
   * PUT defaults to 7200 and allows 300–36000. Multipart defaults to twice the
   * transfer time at 5 Mbps plus 1800 seconds, bounded to 7200–172800; an explicit
   * value allows 300–172800. Complete before expiry. Storage credentials and
   * policies can shorten URL validity. Expired URLs cannot be refreshed.
   */
  validity_timeout?: number;

  /**
   * WorkflowId specifies the Workflow to select. Omit to use the Project default.
   * Set null to disable automatic actions. The current revision is pinned when
   * creation is accepted.
   */
  workflow_id?: string | null;
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

export interface UploadCompleteParams {
  /**
   * All uploaded parts in ascending part_number order, with the ETags returned by
   * storage.
   */
  parts: Array<UploadCompleteParams.Part>;
}

export namespace UploadCompleteParams {
  export interface Part {
    /**
     * ETag returned by storage for this part, including its quotation marks when
     * present.
     */
    etag: string;

    /**
     * One-based part number.
     */
    part_number: number;
  }
}

export declare namespace Uploads {
  export {
    type Upload as Upload,
    type UploadsPaginatedResults as UploadsPaginatedResults,
    type UploadCreateParams as UploadCreateParams,
    type UploadListParams as UploadListParams,
    type UploadCompleteParams as UploadCompleteParams,
  };
}
