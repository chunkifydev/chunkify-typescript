// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { PagePromise, PaginatedResults, type PaginatedResultsParams } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Files extends APIResource {
  /**
   * Retrieve details of a specific file by its ID, including metadata, media
   * properties, and associated jobs.
   */
  retrieve(fileID: string, options?: RequestOptions): APIPromise<APIFile> {
    return (
      this._client.get(path`/api/files/${fileID}`, options) as APIPromise<{ data: APIFile }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Retrieve a list of files with optional filtering and pagination
   */
  list(
    query: FileListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<APIFilesPaginatedResults, APIFile> {
    return this._client.getAPIList('/api/files', PaginatedResults<APIFile>, { query, ...options });
  }

  /**
   * Delete a file. It will fail if there are processing jobs using this file.
   */
  delete(fileID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/api/files/${fileID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type APIFilesPaginatedResults = PaginatedResults<APIFile>;

export interface APIFile {
  /**
   * Unique identifier of the file
   */
  id: string;

  /**
   * Audio bitrate in bits per second
   */
  audio_bitrate: number;

  /**
   * Audio codec used (e.g. aac, mp3)
   */
  audio_codec: string;

  /**
   * Timestamp when the file was created
   */
  created_at: string;

  /**
   * Duration of the video in seconds
   */
  duration: number;

  /**
   * Height of the video in pixels
   */
  height: number;

  /**
   * ID of the job that created this file
   */
  job_id: string;

  /**
   * MIME type of the file
   */
  mime_type: string;

  /**
   * Path to the file in storage
   */
  path: string;

  /**
   * Size of the file in bytes
   */
  size: number;

  /**
   * StorageId identifier where the file is stored
   */
  storage_id: string;

  /**
   * Pre-signed URL to directly access the file (only included when available)
   */
  url: string;

  /**
   * Video bitrate in bits per second
   */
  video_bitrate: number;

  /**
   * Video codec used (e.g. h264, h265)
   */
  video_codec: string;

  /**
   * Video framerate in frames per second
   */
  video_framerate: number;

  /**
   * Width of the video in pixels
   */
  width: number;
}

export interface FileListParams extends PaginatedResultsParams {
  /**
   * Filter by file ID
   */
  id?: string;

  /**
   * Filter by audio codec
   */
  audio_codec?: string;

  created?: FileListParams.Created;

  duration?: FileListParams.Duration;

  height?: FileListParams.Height;

  /**
   * Filter by job ID
   */
  job_id?: string;

  /**
   * Filter by mime type
   */
  mime_type?: string;

  path?: FileListParams.Path;

  size?: FileListParams.Size;

  /**
   * Filter by storage ID
   */
  storage_id?: string;

  /**
   * Filter by video codec
   */
  video_codec?: string;

  width?: FileListParams.Width;
}

export namespace FileListParams {
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
    sort?: 'asc' | 'desc';
  }

  export interface Duration {
    /**
     * Filter by exact duration
     */
    eq?: number;

    /**
     * Filter by duration greater than
     */
    gt?: number;

    /**
     * Filter by duration greater than or equal
     */
    gte?: number;

    /**
     * Filter by duration less than
     */
    lt?: number;

    /**
     * Filter by duration less than or equal
     */
    lte?: number;
  }

  export interface Height {
    /**
     * Filter by exact height
     */
    eq?: number;

    /**
     * Filter by height greater than
     */
    gt?: number;

    /**
     * Filter by height greater than or equal
     */
    gte?: number;

    /**
     * Filter by height less than
     */
    lt?: number;

    /**
     * Filter by height less than or equal
     */
    lte?: number;
  }

  export interface Path {
    /**
     * Filter by path
     */
    eq?: string;

    /**
     * Filter by path (case insensitive)
     */
    ilike?: string;
  }

  export interface Size {
    /**
     * Filter by exact file size
     */
    eq?: number;

    /**
     * Filter by file size greater than
     */
    gt?: number;

    /**
     * Filter by file size greater than or equal
     */
    gte?: number;

    /**
     * Filter by file size less than
     */
    lt?: number;

    /**
     * Filter by file size less than or equal
     */
    lte?: number;
  }

  export interface Width {
    /**
     * Filter by exact width
     */
    eq?: number;

    /**
     * Filter by width greater than
     */
    gt?: number;

    /**
     * Filter by width greater than or equal
     */
    gte?: number;

    /**
     * Filter by width less than
     */
    lt?: number;

    /**
     * Filter by width less than or equal
     */
    lte?: number;
  }
}

export declare namespace Files {
  export {
    type APIFile as APIFile,
    type APIFilesPaginatedResults as APIFilesPaginatedResults,
    type FileListParams as FileListParams,
  };
}
