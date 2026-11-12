// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as OutputsAPI from './outputs';
import {
  AssetOutput,
  AssetOutputsPaginatedResults,
  OutputCreateParams,
  OutputDeleteParams,
  OutputListParams,
  OutputRetrieveParams,
  Outputs,
} from './outputs';
import * as WorkflowAPI from './workflow';
import {
  AssetActionRun,
  AssetActionRunsPaginatedResults,
  Workflow,
  WorkflowListActionsParams,
} from './workflow';
import { APIPromise } from '../../core/api-promise';
import { PagePromise, PaginatedResults, type PaginatedResultsParams } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Automatic video-on-demand Assets and independent H.264 MP4 static renditions.
 */
export class Assets extends APIResource {
  outputs: OutputsAPI.Outputs = new OutputsAPI.Outputs(this._client);
  workflow: WorkflowAPI.Workflow = new WorkflowAPI.Workflow(this._client);

  /**
   * Create an Asset from a video Source. Processing starts asynchronously.
   *
   * @example
   * ```ts
   * const asset = await client.assets.create({
   *   source_id: 'src_example',
   *   storage: { id: 'stor_example' },
   * });
   * ```
   */
  create(body: AssetCreateParams, options?: RequestOptions): APIPromise<Asset> {
    return (
      this._client.post('/assets', {
        body,
        ...options,
        __security: { projectAccessTokenAuth: true },
      }) as APIPromise<{ data: Asset }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Retrieve an Asset and its streaming, static, poster, and timeline outputs.
   *
   * @example
   * ```ts
   * const asset = await client.assets.retrieve('assetId');
   * ```
   */
  retrieve(assetID: string, options?: RequestOptions): APIPromise<Asset> {
    return (
      this._client.get(path`/assets/${assetID}`, {
        ...options,
        __security: { projectAccessTokenAuth: true },
      }) as APIPromise<{ data: Asset }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Update the title, metadata, or public preview access. Omitted fields remain
   * unchanged.
   *
   * @example
   * ```ts
   * await client.assets.update('assetId');
   * ```
   */
  update(assetID: string, body: AssetUpdateParams, options?: RequestOptions): APIPromise<void> {
    return this._client.patch(path`/assets/${assetID}`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: { projectAccessTokenAuth: true },
    });
  }

  /**
   * List Assets in the Project, with filtering and pagination.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const asset of client.assets.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: AssetListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<AssetsPaginatedResults, Asset> {
    return this._client.getAPIList('/assets', PaginatedResults<Asset>, {
      query,
      ...options,
      __security: { projectAccessTokenAuth: true },
    });
  }

  /**
   * Delete an Asset after all processing finishes. Files remain in Storage unless
   * delete_files is true.
   *
   * @example
   * ```ts
   * await client.assets.delete('assetId');
   * ```
   */
  delete(
    assetID: string,
    params: AssetDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    const { delete_files } = params ?? {};
    return this._client.delete(path`/assets/${assetID}`, {
      query: { delete_files },
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: { projectAccessTokenAuth: true },
    });
  }
}

export type AssetsPaginatedResults = PaginatedResults<Asset>;

export interface Asset {
  /**
   * Unique Asset ID.
   */
  id: string;

  /**
   * Whether the Asset can accept new static rendition requests. Creation can still
   * fail if the original video is no longer accessible.
   */
  can_add_static_renditions: boolean;

  /**
   * When the Asset was created.
   */
  created_at: string;

  /**
   * Maximum streaming resolution selected at creation. Does not limit static
   * renditions.
   */
  max_resolution: '1080p' | '2160p';

  /**
   * String metadata attached to the Asset.
   */
  metadata: { [key: string]: string };

  /**
   * Minimum streaming resolution selected at creation. auto means no minimum;
   * smaller sources are not upscaled.
   */
  min_resolution: 'auto' | '240p' | '360p' | '540p' | '720p' | '1080p' | '1440p' | '2160p';

  /**
   * Whether HLS playback is available, including while the Asset is preparing.
   */
  playback_ready: boolean;

  /**
   * Allow public preview access without an API token. Does not control CDN or static
   * download access. Disabling it does not revoke signed URLs already issued.
   */
  preview_enabled: boolean;

  /**
   * Original media metadata saved at Asset creation and preserved after Source
   * deletion.
   */
  source_metadata: Asset.SourceMetadata;

  /**
   * Status specifies the Asset preparation state. ready means the video is prepared
   * for playback, with its poster and timeline previews available. Static renditions
   * and captions have independent statuses.
   */
  status: AssetStatus;

  /**
   * ID of the output Storage.
   */
  storage_id: string;

  /**
   * Asset title.
   */
  title: string;

  /**
   * When the Asset was last updated.
   */
  updated_at: string;

  /**
   * Selected Workflow ID, or null.
   */
  workflow_id: string | null;

  /**
   * Pinned Workflow revision, or null.
   */
  workflow_revision: number | null;

  /**
   * Unsigned CDN URL of the HLS master playlist. Available when playback_ready is
   * true and Storage has a CDN URL.
   */
  cdn_url?: string;

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

  error?: Asset.Error;

  /**
   * When managed outputs expire, 24 hours after readiness. Omitted for
   * customer-connected Storage.
   */
  expires_at?: string;

  /**
   * Path of the HLS master playlist in Storage. Available when playback_ready is
   * true.
   */
  playback_path?: string;

  /**
   * When HLS playback first became available.
   */
  playback_ready_at?: string;

  /**
   * Poster image, available once generated.
   */
  poster?: Asset.Poster;

  /**
   * Public HLS preview URL. Available when playback_ready and preview_enabled are
   * true. No API token is required.
   */
  preview_url?: string;

  /**
   * When all required Asset outputs finished processing.
   */
  ready_at?: string;

  /**
   * Size specifies the total bytes of available streaming, playback preview, poster,
   * and timeline files. Excludes static renditions. Omitted until the Asset is
   * ready.
   */
  size?: number;

  /**
   * Original Source ID. Omitted after Source deletion.
   */
  source_id?: string;

  /**
   * Timeline thumbnails. The WebVTT file maps video timestamps to image URLs and
   * crop coordinates.
   */
  timeline_previews?: Asset.TimelinePreviews;
}

export namespace Asset {
  /**
   * Original media metadata saved at Asset creation and preserved after Source
   * deletion.
   */
  export interface SourceMetadata {
    /**
     * Original audio bitrate in bits per second, or zero when unavailable.
     */
    audio_bitrate: number;

    /**
     * Original audio codec, or an empty string when there is no audio.
     */
    audio_codec: string;

    /**
     * Original audio sample rate in Hz, or zero when unavailable.
     */
    audio_samplerate: number;

    /**
     * Original duration in seconds.
     */
    duration: number;

    /**
     * Original video height in pixels.
     */
    height: number;

    /**
     * Original file size in bytes.
     */
    size: number;

    /**
     * Original video bitrate in bits per second, or zero when unknown.
     */
    video_bitrate: number;

    /**
     * Original video codec.
     */
    video_codec: string;

    /**
     * Original video frame rate in frames per second.
     */
    video_framerate: number;

    /**
     * Original video width in pixels.
     */
    width: number;
  }

  export interface Error {
    /**
     * Machine-readable processing error code.
     */
    code: string;

    /**
     * Description of the processing failure.
     */
    message: string;

    /**
     * Processing stage that failed.
     */
    stage: 'ingest' | 'analysis' | 'encoding' | 'packaging' | 'upload' | 'validation' | 'cleanup';
  }

  /**
   * Poster image, available once generated.
   */
  export interface Poster {
    /**
     * Image height in pixels.
     */
    height: number;

    /**
     * Image path in Storage.
     */
    path: string;

    /**
     * Image width in pixels.
     */
    width: number;

    /**
     * Unsigned image CDN URL. Available once the poster exists and Storage has a CDN
     * URL.
     */
    cdn_url?: string;

    /**
     * Public poster preview URL. Available when the Asset is ready and preview_enabled
     * is true.
     */
    preview_url?: string;

    /**
     * Image size in bytes.
     */
    size?: number;

    /**
     * Position of the selected frame in seconds.
     */
    time_seconds?: number;

    /**
     * Signed image URL, valid for up to ten minutes. Available once the poster exists,
     * regardless of preview_enabled.
     */
    url?: string;
  }

  /**
   * Timeline thumbnails. The WebVTT file maps video timestamps to image URLs and
   * crop coordinates.
   */
  export interface TimelinePreviews {
    /**
     * Thumbnail image layout.
     */
    format: 'sprite';

    /**
     * WebVTT file path in Storage.
     */
    vtt_path: string;

    /**
     * Unsigned WebVTT CDN URL. Available when the Asset is ready and Storage has a CDN
     * URL.
     */
    cdn_url?: string;

    /**
     * Number of thumbnails.
     */
    image_count?: number;

    /**
     * Target thumbnail sampling interval in seconds. The WebVTT file provides actual
     * cue timestamps.
     */
    interval_seconds?: number;

    /**
     * Public WebVTT preview URL with signed image references. Available when the Asset
     * is ready and preview_enabled is true.
     */
    preview_url?: string;

    /**
     * Combined WebVTT and sprite image size in bytes.
     */
    size?: number;

    /**
     * Number of sprite images containing the thumbnails.
     */
    sprite_count?: number;

    /**
     * Thumbnail height in pixels.
     */
    thumbnail_height?: number;

    /**
     * Thumbnail width in pixels.
     */
    thumbnail_width?: number;
  }
}

export type AssetStatus = 'preparing' | 'ready' | 'failed' | 'expired';

export interface AssetCreateParams {
  /**
   * ID of the video Source to process.
   */
  source_id: string;

  /**
   * Maximum streaming resolution. Omit to use the Project default, or the plan
   * maximum if unset. 2160p requires Starter or above. Smaller sources are not
   * upscaled. Does not affect static renditions.
   */
  max_resolution?: '1080p' | '2160p';

  /**
   * String metadata with a maximum encoded JSON size of 2048 bytes.
   */
  metadata?: { [key: string]: string };

  /**
   * Minimum streaming resolution. Omit to use the Project default; auto removes the
   * minimum. Must not exceed max_resolution. Smaller sources are not upscaled. Does
   * not affect static renditions.
   */
  min_resolution?: 'auto' | '240p' | '360p' | '540p' | '720p' | '1080p' | '1440p' | '2160p';

  /**
   * PathTemplate specifies the Asset output folder relative to Storage base_prefix.
   * Supports {assetID} and case-sensitive {metadata.<key>}; referenced values must
   * be non-empty. Ignored for Chunkify storage, which always uses {assetID}.
   * Overrides the Project default. Defaults to {assetID} when neither is set.
   * Maximum template size: 1024 UTF-8 bytes. Expanded prefix: 768 bytes including
   * base_prefix and trailing slash.
   */
  path_template?: string;

  /**
   * Allow public preview access without an API token. Omit to use the Project
   * default. Does not control CDN or static download access.
   */
  preview_enabled?: boolean;

  /**
   * Output Storage. Omit to use the Project default. The path_template controls the
   * folder for generated output paths.
   */
  storage?: AssetCreateParams.Storage;

  /**
   * Asset title, up to 256 characters. Defaults to an empty string.
   */
  title?: string;

  /**
   * WorkflowId specifies the Workflow to select. Omit to use the Project default.
   * Set null to disable automatic actions. The current revision is pinned when
   * creation is accepted.
   */
  workflow_id?: string | null;
}

export namespace AssetCreateParams {
  /**
   * Output Storage. Omit to use the Project default. The path_template controls the
   * folder for generated output paths.
   */
  export interface Storage {
    /**
     * ID of output Storage in this Project. Omit to use the Project default. Applies
     * to all outputs, including static renditions added later.
     */
    id?: string;
  }
}

export interface AssetUpdateParams {
  /**
   * Replaces all metadata. Send {} to clear it; omit to leave unchanged. Maximum
   * encoded JSON size: 2,048 bytes.
   */
  metadata?: { [key: string]: string };

  /**
   * Allow public preview access without an API token. Does not control CDN or static
   * download access. Disabling it does not revoke signed URLs already issued.
   */
  preview_enabled?: boolean;

  /**
   * Asset title, up to 256 characters. Send an empty string to clear it; omit to
   * leave unchanged.
   */
  title?: string;
}

export interface AssetListParams extends PaginatedResultsParams {
  created?: AssetListParams.Created;

  /**
   * Repeat key:value pairs to match all supplied metadata conditions.
   */
  metadata?: Array<string>;

  /**
   * Case-insensitive search of Asset IDs and titles.
   */
  search?: string;

  /**
   * Filter Assets linked to this Source. Omit to include Assets from all Sources in
   * the Project.
   */
  source_id?: string;

  /**
   * Filter by Asset status.
   */
  status?: AssetStatus;

  /**
   * Filter by output Storage ID.
   */
  storage_id?: string;
}

export namespace AssetListParams {
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

export interface AssetDeleteParams {
  /**
   * Also delete all files under the Asset's storage prefix, including streaming and
   * static outputs. Other files and the original input are preserved. Defaults to
   * false, which preserves published media files. Private transcript text and saved
   * subtitle copies are always scheduled for removal. File deletion is irreversible.
   * If cleanup fails, records remain for retry, but files may already be deleted.
   */
  delete_files?: boolean;
}

Assets.Outputs = Outputs;
Assets.Workflow = Workflow;

export declare namespace Assets {
  export {
    type Asset as Asset,
    type AssetStatus as AssetStatus,
    type AssetsPaginatedResults as AssetsPaginatedResults,
    type AssetCreateParams as AssetCreateParams,
    type AssetUpdateParams as AssetUpdateParams,
    type AssetListParams as AssetListParams,
    type AssetDeleteParams as AssetDeleteParams,
  };

  export {
    Outputs as Outputs,
    type AssetOutput as AssetOutput,
    type AssetOutputsPaginatedResults as AssetOutputsPaginatedResults,
    type OutputCreateParams as OutputCreateParams,
    type OutputRetrieveParams as OutputRetrieveParams,
    type OutputListParams as OutputListParams,
    type OutputDeleteParams as OutputDeleteParams,
  };

  export {
    Workflow as Workflow,
    type AssetActionRun as AssetActionRun,
    type AssetActionRunsPaginatedResults as AssetActionRunsPaginatedResults,
    type WorkflowListActionsParams as WorkflowListActionsParams,
  };
}
