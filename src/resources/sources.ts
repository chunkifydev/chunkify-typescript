// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as FilesAPI from './files';
import { APIPromise } from '../core/api-promise';
import { MyOffsetPage, type MyOffsetPageParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Sources extends APIResource {
  /**
   * Create a new source from a media URL. The source will be analyzed to extract
   * metadata and generate a thumbnail. The source will be automatically deleted
   * after the data retention period.
   */
  create(body: SourceCreateParams, options?: RequestOptions): APIPromise<SourceCreateResponse> {
    return this._client.post('/api/sources', { body, ...options });
  }

  /**
   * Retrieve details of a specific source by its ID, including metadata, media
   * properties, and associated jobs.
   */
  retrieve(sourceID: string, options?: RequestOptions): APIPromise<SourceRetrieveResponse> {
    return this._client.get(path`/api/sources/${sourceID}`, options);
  }

  /**
   * Retrieve a list of all sources with optional filtering and pagination. Supports
   * filtering by various media properties like duration, dimensions, codecs, etc.
   */
  list(
    query: SourceListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<SourcesMyOffsetPage, Source> {
    return this._client.getAPIList('/api/sources', MyOffsetPage<Source>, { query, ...options });
  }

  /**
   * Delete a source. It will fail if there are processing jobs using this source.
   */
  delete(sourceID: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.delete(path`/api/sources/${sourceID}`, options);
  }
}

export type SourcesMyOffsetPage = MyOffsetPage<Source>;

export interface Source {
  /**
   * Unique identifier of the source
   */
  id?: string;

  /**
   * Audio bitrate in bits per second
   */
  audio_bitrate?: number;

  /**
   * Audio codec used (e.g. aac, mp3)
   */
  audio_codec?: string;

  /**
   * Timestamp when the source was created
   */
  created_at?: string;

  /**
   * Device used to record the video
   */
  device?: string;

  /**
   * Duration of the video in seconds
   */
  duration?: number;

  /**
   * Height of the video in pixels
   */
  height?: number;

  /**
   * Additional metadata for the source
   */
  metadata?: { [key: string]: string };

  /**
   * Size of the source file in bytes
   */
  size?: number;

  /**
   * URL where the source video can be accessed
   */
  url?: string;

  /**
   * Video bitrate in bits per second
   */
  video_bitrate?: number;

  /**
   * Video codec used (e.g. h264, h265)
   */
  video_codec?: string;

  /**
   * Video framerate in frames per second
   */
  video_framerate?: number;

  /**
   * Width of the video in pixels
   */
  width?: number;
}

/**
 * Successful response
 */
export interface SourceCreateResponse extends FilesAPI.ResponseOk {
  data?: Source;
}

/**
 * Successful response
 */
export interface SourceRetrieveResponse extends FilesAPI.ResponseOk {
  data?: Source;
}

/**
 * No content response
 */
export type SourceDeleteResponse = unknown;

export interface SourceCreateParams {
  /**
   * Url is the URL of the source, which must be a valid HTTP URL.
   */
  url: string;

  /**
   * Metadata allows for additional information to be attached to the source, with a
   * maximum size of 1024 bytes.
   */
  metadata?: { [key: string]: string };
}

export interface SourceListParams extends MyOffsetPageParams {
  /**
   * Filter by source ID
   */
  id?: string;

  /**
   * Filter by audio codec
   */
  audio_codec?: string;

  created?: SourceListParams.Created;

  /**
   * Filter by device (apple/android)
   */
  device?: string;

  duration?: SourceListParams.Duration;

  height?: SourceListParams.Height;

  /**
   * Filter by metadata (format: key:value,key:value)
   */
  metadata?: string;

  size?: SourceListParams.Size;

  /**
   * Filter by video codec
   */
  video_codec?: string;

  width?: SourceListParams.Width;
}

export namespace SourceListParams {
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

export declare namespace Sources {
  export {
    type Source as Source,
    type SourceCreateResponse as SourceCreateResponse,
    type SourceRetrieveResponse as SourceRetrieveResponse,
    type SourceDeleteResponse as SourceDeleteResponse,
    type SourcesMyOffsetPage as SourcesMyOffsetPage,
    type SourceCreateParams as SourceCreateParams,
    type SourceListParams as SourceListParams,
  };
}
