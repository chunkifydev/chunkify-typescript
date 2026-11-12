// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { PagePromise, PaginatedResults, type PaginatedResultsParams } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Thumbnails extends APIResource {
  /**
   * Generate individual images or sprite sheets from a Source. Each accepted request
   * creates a new resource. Processing continues after the response.
   *
   * @example
   * ```ts
   * const thumbnail = await client.thumbnails.create({
   *   source_id: 'src_example',
   *   count: 10,
   * });
   * ```
   */
  create(body: ThumbnailCreateParams, options?: RequestOptions): APIPromise<Thumbnail> {
    return (
      this._client.post('/thumbnails', {
        body,
        ...options,
        __security: { projectAccessTokenAuth: true },
      }) as APIPromise<{ data: Thumbnail }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Retrieve the accepted settings, published files and current state of one
   * Thumbnail.
   *
   * @example
   * ```ts
   * const thumbnail = await client.thumbnails.retrieve(
   *   'thumbnailId',
   * );
   * ```
   */
  retrieve(thumbnailID: string, options?: RequestOptions): APIPromise<Thumbnail> {
    return (
      this._client.get(path`/thumbnails/${thumbnailID}`, {
        ...options,
        __security: { projectAccessTokenAuth: true },
      }) as APIPromise<{ data: Thumbnail }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * List Thumbnails in the authenticated Project, newest first by default.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const thumbnail of client.thumbnails.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: ThumbnailListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ThumbnailsPaginatedResults, Thumbnail> {
    return this._client.getAPIList('/thumbnails', PaginatedResults<Thumbnail>, {
      query,
      ...options,
      __security: { projectAccessTokenAuth: true },
    });
  }

  /**
   * Delete a ready, failed or expired Thumbnail after all workers have stopped. The
   * Source and settled usage are preserved. Files remain unless delete_files is
   * true; temporary files retain their original 24-hour expiry. Deletion remains
   * available for inactive teams.
   *
   * @example
   * ```ts
   * await client.thumbnails.delete('thumbnailId');
   * ```
   */
  delete(
    thumbnailID: string,
    params: ThumbnailDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    const { delete_files } = params ?? {};
    return this._client.delete(path`/thumbnails/${thumbnailID}`, {
      query: { delete_files },
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: { projectAccessTokenAuth: true },
    });
  }
}

export type ThumbnailsPaginatedResults = PaginatedResults<Thumbnail>;

/**
 * One thumbnail generation request. At least one sample and its companion files
 * must be published before the resource is ready.
 */
export interface Thumbnail {
  /**
   * Id identifies this thumbnail request. Standalone requests use thm* IDs;
   * Asset-owned outputs use aop* IDs.
   */
  id: string;

  /**
   * AssetId identifies the owning Asset for Workflow outputs, or null for standalone
   * requests.
   */
  asset_id: string | null;

  /**
   * CreatedAt records when the request was accepted.
   */
  created_at: string;

  /**
   * Files contains all published images or sheets and the WebVTT index. Empty while
   * preparing.
   */
  files: Array<Thumbnail.File>;

  /**
   * Metadata contains the accepted string metadata.
   */
  metadata: { [key: string]: string };

  /**
   * Samples contains published thumbnails ordered by timestamp. Empty while
   * preparing. A ready resource may contain fewer samples than requested.
   */
  samples: Array<Thumbnail.Sample>;

  /**
   * Settings contains the accepted sampling and output settings.
   */
  settings: Thumbnail.Settings;

  /**
   * SourceId identifies the input Source, or null if it has been deleted.
   */
  source_id: string | null;

  /**
   * Status reports processing or output expiry.
   */
  status: 'preparing' | 'ready' | 'failed' | 'expired';

  /**
   * StorageId identifies the accepted output Storage.
   */
  storage_id: string;

  /**
   * StoragePath specifies the accepted filename template relative to the Storage
   * base_prefix, or null when Chunkify generated the file names.
   */
  storage_path: string | null;

  /**
   * StoragePrefix specifies the complete output folder saved at creation. File and
   * sample paths are relative to this folder.
   */
  storage_prefix: string;

  /**
   * UpdatedAt records the last lifecycle update.
   */
  updated_at: string;

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
   * DeleteAt specifies when this standalone request is deleted: three days after its
   * temporary output expires, otherwise when the team's data retention period ends,
   * counted from when the request was accepted, and no sooner than three days after
   * it finished. It does not delete files in customer-owned Storage. Omitted while
   * preparing and for Asset-owned thumbnails, which follow their Asset.
   */
  delete_at?: string;

  /**
   * Error explains a failed request. Omitted otherwise.
   */
  error?: Thumbnail.Error;

  /**
   * ExpiresAt specifies when temporary output files expire. Omitted for customer
   * output Storage.
   */
  expires_at?: string;

  /**
   * ReadyAt records when the complete available set was published. Omitted before
   * publication.
   */
  ready_at?: string;
}

export namespace Thumbnail {
  /**
   * One published image, sprite sheet, or WebVTT file.
   */
  export interface File {
    /**
     * Kind identifies an individual image, sprite sheet, or WebVTT index.
     */
    kind: 'image' | 'sprite' | 'vtt';

    /**
     * Path specifies the file relative to storage_prefix.
     */
    path: string;

    /**
     * Size specifies the measured encoded file size in bytes.
     */
    size: number;

    /**
     * CdnUrl provides delivery through the configured CDN. Omitted without a CDN or
     * after expiry.
     */
    cdn_url?: string;

    /**
     * Height specifies the measured image or complete sprite canvas height. Omitted
     * for WebVTT.
     */
    height?: number;

    /**
     * Url provides temporary authorized delivery. Omitted after expiry or when
     * unavailable.
     */
    url?: string;

    /**
     * Width specifies the measured image or complete sprite canvas width. Omitted for
     * WebVTT.
     */
    width?: number;
  }

  /**
   * One successfully published requested sample. Repeated samples remain separate
   * entries.
   */
  export interface Sample {
    /**
     * Height specifies this image or tile height in pixels.
     */
    height: number;

    /**
     * Path identifies the image or sprite sheet in files.
     */
    path: string;

    /**
     * Timestamp specifies the measured Source-relative presentation time of the
     * selected frame in seconds. Compatible cached inputs use millisecond timestamps,
     * which can select a neighboring frame compared with the original Source.
     */
    timestamp: number;

    /**
     * Width specifies this image or tile width in pixels.
     */
    width: number;

    /**
     * Crop specifies the tile origin in its sprite sheet. Omitted for individual
     * images; width and height give the tile dimensions.
     */
    crop?: Sample.Crop;
  }

  export namespace Sample {
    /**
     * Crop specifies the tile origin in its sprite sheet. Omitted for individual
     * images; width and height give the tile dimensions.
     */
    export interface Crop {
      /**
       * X specifies the left edge in pixels.
       */
      x: number;

      /**
       * Y specifies the top edge in pixels.
       */
      y: number;
    }
  }

  /**
   * Settings contains the accepted sampling and output settings.
   */
  export interface Settings {
    /**
     * Format specifies the accepted image encoding.
     */
    format: 'jpeg' | 'webp';

    /**
     * Output specifies the accepted output mode.
     */
    output: 'images' | 'sprites';

    /**
     * Range contains the accepted sampling boundaries.
     */
    range: Settings.Range;

    /**
     * Size specifies the accepted maximum image or tile edge in pixels.
     */
    size: number;

    /**
     * Count specifies 1 to 100 thumbnails at the middle of equal sections of the
     * selected range.
     */
    count?: number;

    /**
     * Timestamps specifies 1 to 100 Source-relative target times in seconds. Every
     * time must be within the selected range. Repeated targets produce separate
     * outputs.
     */
    timestamps?: Array<number>;
  }

  export namespace Settings {
    /**
     * Range contains the accepted sampling boundaries.
     */
    export interface Range {
      /**
       * End specifies the exclusive upper bound in seconds.
       */
      end: number;

      /**
       * Start specifies the inclusive lower bound in seconds.
       */
      start: number;
    }
  }

  /**
   * Error explains a failed request. Omitted otherwise.
   */
  export interface Error {
    /**
     * Code identifies the processing failure.
     */
    code: string;

    /**
     * Message explains the processing failure.
     */
    message: string;
  }
}

/**
 * Output Storage selection, independent of Source storage.
 */
export interface ThumbnailCreateStorageParams {
  /**
   * Id identifies output Storage in this Project. Omit to use the Project default.
   */
  id?: string;

  /**
   * Path specifies the output filename template relative to the selected Storage
   * base_prefix. Required for customer storage; generated for Chunkify temporary
   * storage. The filename must contain one %05d placeholder, replaced by the image
   * or sprite sheet number starting at 1, and end in .jpg for jpeg or .webp for
   * webp. The WebVTT file uses the filename without the placeholder and its adjacent
   * separator, such as thumb.vtt for thumb-%05d.jpg. The combined path may contain
   * at most 1024 bytes.
   */
  path?: string;
}

export interface ThumbnailCreateParams {
  /**
   * SourceId identifies a video Source in this Project.
   */
  source_id: string;

  /**
   * Count specifies 1 to 100 thumbnails at the middle of equal sections of the
   * selected range.
   */
  count?: number;

  /**
   * Format selects JPEG or WebP. Defaults to JPEG.
   */
  format?: 'jpeg' | 'webp';

  /**
   * Metadata attaches string values to this request. The serialized object may
   * contain at most 2048 bytes.
   */
  metadata?: { [key: string]: string };

  /**
   * Output selects images or sprites. Defaults to images.
   */
  output?: 'images' | 'sprites';

  /**
   * Range limits sampling to part of the Source. Defaults to the whole Source
   * duration.
   */
  range?: ThumbnailCreateParams.Range;

  /**
   * Size specifies the maximum image or tile edge in pixels, from 64 to 1920.
   * Defaults to 320. Odd sizes are supported. Preserves display aspect ratio without
   * cropping or upscaling.
   */
  size?: number;

  /**
   * Storage overrides the Project output destination and names the output files.
   * Source storage remains independent.
   */
  storage?: ThumbnailCreateStorageParams;

  /**
   * Timestamps specifies 1 to 100 Source-relative target times in seconds. Every
   * time must be within the selected range. Repeated targets produce separate
   * outputs.
   */
  timestamps?: Array<number>;
}

export namespace ThumbnailCreateParams {
  /**
   * Range limits sampling to part of the Source. Defaults to the whole Source
   * duration.
   */
  export interface Range {
    /**
     * End specifies the exclusive upper bound in seconds. Defaults to the Source
     * duration.
     */
    end?: number;

    /**
     * Start specifies the inclusive lower bound in seconds. Defaults to zero.
     */
    start?: number;
  }
}

export interface ThumbnailListParams extends PaginatedResultsParams {
  /**
   * Id filters by an exact Thumbnail ID. Omit to include all matching resources.
   */
  id?: string;

  created?: ThumbnailListParams.Created;

  /**
   * Filter Thumbnails linked to this Source. Omit to include Thumbnails from all
   * Sources in the Project.
   */
  source_id?: string;

  /**
   * Filter by Thumbnail status.
   */
  status?: 'preparing' | 'ready' | 'failed' | 'expired';

  /**
   * Filter by output Storage ID.
   */
  storage_id?: string;
}

export namespace ThumbnailListParams {
  export interface Created {
    /**
     * Created at or after this Unix timestamp in seconds.
     */
    gte?: number;

    /**
     * Created at or before this Unix timestamp in seconds.
     */
    lte?: number;

    /**
     * Creation-time ordering. Defaults to newest first.
     */
    sort?: 'asc' | 'desc';
  }
}

export interface ThumbnailDeleteParams {
  /**
   * DeleteFiles specifies whether to permanently delete this Thumbnail's owned
   * images, sprite sheets, VTT and partial outputs at their saved storage prefix.
   * Defaults to false. The Source and unrelated files are preserved. If deletion
   * fails, records remain for retry, but some files may already be deleted.
   * Temporary outputs still expire when this option is false.
   */
  delete_files?: boolean;
}

export declare namespace Thumbnails {
  export {
    type Thumbnail as Thumbnail,
    type ThumbnailCreateStorageParams as ThumbnailCreateStorageParams,
    type ThumbnailsPaginatedResults as ThumbnailsPaginatedResults,
    type ThumbnailCreateParams as ThumbnailCreateParams,
    type ThumbnailListParams as ThumbnailListParams,
    type ThumbnailDeleteParams as ThumbnailDeleteParams,
  };
}
