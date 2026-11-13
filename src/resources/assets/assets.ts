// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import * as ThumbnailsAPI from '../thumbnails';
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
import * as WorkflowsAPI from '../workflows/workflows';
import * as WorkflowAPI from './workflow/workflow';
import { Workflow } from './workflow/workflow';
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
  source_metadata: AssetSourceMetadata;

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
  created_via?: Shared.CreatedVia;

  error?: AssetError;

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
  poster?: AssetPoster;

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
  timeline_previews?: AssetTimelinePreviews;
}

/**
 * Resolved action inputs. Only fields relevant to the action type are included.
 */
export interface AssetActionInput {
  /**
   * LanguageCode specifies the target language for the translated subtitle track,
   * such as en or fr. The same code appears in the caption and HLS manifest.
   */
  language_code?:
    | 'en'
    | 'fr'
    | 'es'
    | 'de'
    | 'it'
    | 'pt'
    | 'nl'
    | 'ja'
    | 'ko'
    | 'zh'
    | 'ar'
    | 'hi'
    | 'ru'
    | 'tr'
    | 'pl'
    | 'sv';

  /**
   * Resolution specifies the H.264 MP4 output resolution. highest selects the
   * largest supported output without upscaling. Hobby supports up to 1080p; other
   * plans support up to 2160p. Streaming resolution limits do not apply.
   */
  resolution?: 'highest' | '240p' | '360p' | '480p' | '540p' | '720p' | '1080p' | '1440p' | '2160p';

  /**
   * ID of the original caption to translate. Included only for translation actions.
   */
  source_caption_id?: string;

  /**
   * Thumbnail settings. Included only for create_thumbnails actions.
   */
  thumbnails?: WorkflowsAPI.WorkflowThumbnail;

  /**
   * TranscriptId specifies the original transcript consumed by caption publication.
   * Omitted for actions without a transcript input.
   */
  transcript_id?: string;
}

/**
 * Reference to the output created or reused by a completed action.
 */
export interface AssetActionResult {
  /**
   * ID of the caption, static rendition, or thumbnail request produced by the
   * action.
   */
  output_id: string;

  /**
   * Type of output referenced by output_id. Caption generation and translation both
   * produce caption outputs.
   */
  output_type: 'caption' | 'static_rendition' | 'thumbnail' | 'transcript';

  /**
   * Whether the action reused an existing output instead of creating one.
   */
  reused: boolean;
}

/**
 * Current action status. pending means accepted; running means executing; waiting
 * means awaiting Asset readiness or an output. completed, failed, skipped, and
 * cancelled are terminal states.
 */
export type AssetActionStatus =
  | 'pending'
  | 'running'
  | 'waiting'
  | 'completed'
  | 'failed'
  | 'skipped'
  | 'cancelled';

/**
 * The action performed: create a static rendition, generate an original transcript
 * or captions, translate a caption, or generate thumbnails.
 */
export type AssetActionType =
  | 'create_static_rendition'
  | 'create_caption'
  | 'create_transcript'
  | 'translate_caption'
  | 'create_thumbnails';

export interface AssetCaption {
  /**
   * Unique Asset output ID, prefixed with aop\_.
   */
  id: string;

  /**
   * Caption processing status.
   */
  status: 'preparing' | 'ready' | 'failed' | 'expired';

  /**
   * Time this caption output was requested.
   */
  created_at?: string;

  /**
   * Reason caption processing failed.
   */
  error?: Shared.AssetOutputError;

  /**
   * Primary language of this subtitle track, such as en or fr. Omitted when no
   * speech was detected or processing has not finished.
   */
  language_code?: string;

  /**
   * Subtitle media playlist path in Storage. Available when speech was detected.
   */
  playlist_path?: string;

  /**
   * Combined subtitle playlist and WebVTT size in bytes. Available when ready.
   */
  size?: number;

  /**
   * ID of the caption track translated to create this track. Omitted for speech
   * transcription.
   */
  source_caption_id?: string;

  /**
   * TranscriptId identifies the original-language transcript used to generate this
   * caption. Omitted for translated captions.
   */
  transcript_id?: string;

  /**
   * WebVTT subtitle segment path in Storage. Available when speech was detected.
   */
  vtt_path?: string;
}

/**
 * An Asset-owned caption output and its canonical resource details.
 */
export interface AssetCaptionOutput {
  /**
   * Id identifies the Asset output, prefixed with aop\_. The type field identifies
   * the output kind.
   */
  id: string;

  /**
   * AssetId identifies the owning Asset.
   */
  asset_id: string;

  /**
   * Details contains the canonical typed output resource, including its available
   * delivery fields.
   */
  details: AssetCaption;

  /**
   * Status specifies the output processing state. Expired means temporary output
   * files are no longer available.
   */
  status: AssetOutputStatus;

  /**
   * Type identifies the output kind.
   */
  type: 'caption';
}

/**
 * Create an Asset-owned caption output.
 */
export interface AssetCaptionOutputCreateParams {
  /**
   * Params specifies the settings for this output type.
   */
  params: AssetCaptionOutputParams;

  /**
   * Type specifies the output kind to create.
   */
  type: 'caption';
}

/**
 * Parameters for original captions or a translation of an existing caption on this
 * Asset.
 */
export interface AssetCaptionOutputParams {
  /**
   * LanguageCode specifies the target language for a translated caption. Supply
   * source_caption_id with this field. Omit both fields to transcribe the Asset
   * audio with automatic language detection.
   */
  language_code?:
    | 'en'
    | 'fr'
    | 'es'
    | 'de'
    | 'it'
    | 'pt'
    | 'nl'
    | 'ja'
    | 'ko'
    | 'zh'
    | 'ar'
    | 'hi'
    | 'ru'
    | 'tr'
    | 'pl'
    | 'sv';

  /**
   * SourceCaptionId specifies the caption on this Asset to translate. Supply
   * language_code with this field. Omit both fields to generate original captions.
   */
  source_caption_id?: string;
}

export interface AssetCreateStorageParams {
  /**
   * ID of output Storage in this Project. Omit to use the Project default. Applies
   * to all outputs, including static renditions added later.
   */
  id?: string;
}

export interface AssetDefaults {
  /**
   * Delete generated and partial files from the output Storage when a new Asset
   * fails. The Asset record and original Source are preserved. Cleanup is attempted
   * once after a delay and requires delete permission on the Storage. Defaults to
   * false. Existing Assets are unchanged.
   */
  delete_files_on_failure?: boolean;

  /**
   * Maximum streaming resolution. Defaults to 1080p on Hobby and 2160p on other
   * plans. 2160p requires Starter or above. Smaller sources are not upscaled. Does
   * not affect static renditions.
   */
  max_resolution?: AssetDefaultsMaxResolution;

  /**
   * Minimum streaming resolution. Defaults to auto, with no minimum. Must not exceed
   * max_resolution. Smaller sources are not upscaled. Does not affect static
   * renditions.
   */
  min_resolution?: AssetDefaultsMinResolution;

  /**
   * PathTemplate specifies the Asset output folder relative to Storage base_prefix.
   * Supports {assetID} and case-sensitive {metadata.<key>}; referenced values must
   * be non-empty. Ignored for Chunkify storage, which always uses {assetID}.
   * Defaults to {assetID}. Maximum template size: 1024 UTF-8 bytes. Expanded prefix:
   * 768 bytes including base_prefix and trailing slash.
   */
  path_template?: string;

  /**
   * Allow public preview access for new Assets without an API token. Defaults to
   * true. Existing Assets are unchanged.
   */
  preview_enabled?: boolean;
}

export type AssetDefaultsMaxResolution = '1080p' | '2160p';

export type AssetDefaultsMinResolution =
  | 'auto'
  | '240p'
  | '360p'
  | '540p'
  | '720p'
  | '1080p'
  | '1440p'
  | '2160p';

export interface AssetDefaultsParams {
  /**
   * Delete generated and partial files from the output Storage when a new Asset
   * fails. The Asset record and original Source are preserved. Cleanup is attempted
   * once after a delay and requires delete permission on the Storage. Defaults to
   * false. Existing Assets are unchanged.
   */
  delete_files_on_failure?: boolean;

  /**
   * Maximum streaming resolution. Defaults to 1080p on Hobby and 2160p on other
   * plans. 2160p requires Starter or above. Smaller sources are not upscaled. Does
   * not affect static renditions.
   */
  max_resolution?: AssetDefaultsMaxResolution;

  /**
   * Minimum streaming resolution. Defaults to auto, with no minimum. Must not exceed
   * max_resolution. Smaller sources are not upscaled. Does not affect static
   * renditions.
   */
  min_resolution?: AssetDefaultsMinResolution;

  /**
   * PathTemplate specifies the Asset output folder relative to Storage base_prefix.
   * Supports {assetID} and case-sensitive {metadata.<key>}; referenced values must
   * be non-empty. Ignored for Chunkify storage, which always uses {assetID}.
   * Defaults to {assetID}. Maximum template size: 1024 UTF-8 bytes. Expanded prefix:
   * 768 bytes including base_prefix and trailing slash.
   */
  path_template?: string;

  /**
   * Allow public preview access for new Assets without an API token. Defaults to
   * true. Existing Assets are unchanged.
   */
  preview_enabled?: boolean;
}

export interface AssetError {
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
 * Status specifies the output processing state. Expired means temporary output
 * files are no longer available.
 */
export type AssetOutputStatus = 'preparing' | 'ready' | 'failed' | 'expired';

export interface AssetPoster {
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
 * Current rendition preparation progress. Encoding progress measures processed
 * video duration, not elapsed time or playback availability.
 */
export interface AssetRenditionProgress {
  /**
   * Stage specifies the current preparation activity. Finalization and streaming
   * publication can overlap encoding; finalizing is shown once encoding has
   * completed.
   */
  stage: 'queued' | 'starting' | 'encoding' | 'finalizing' | 'uploading';

  /**
   * Percent specifies the percentage of the video encoded so far. Present only
   * during encoding when video duration is known. It may decrease if processing
   * restarts. It does not estimate total preparation time.
   */
  percent?: number;
}

/**
 * Original media metadata saved at Asset creation and preserved after Source
 * deletion.
 */
export interface AssetSourceMetadata {
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

export interface AssetStaticRendition {
  /**
   * Unique Asset output ID, prefixed with aop\_.
   */
  id: string;

  /**
   * Parent Asset ID.
   */
  asset_id: string;

  /**
   * Media container.
   */
  container: 'mp4';

  /**
   * When the rendition was created.
   */
  created_at: string;

  /**
   * Output height in pixels.
   */
  height: number;

  /**
   * MP4 path in Storage. Recreating the same resolution reuses this path and
   * overwrites any retained file.
   */
  path: string;

  /**
   * Requested resolution selector.
   */
  requested_resolution: 'highest' | '240p' | '360p' | '480p' | '540p' | '720p' | '1080p' | '1440p' | '2160p';

  /**
   * Selected output resolution. May be smaller than 240p for small sources. Use
   * width and height for pixel dimensions.
   */
  resolution: string;

  /**
   * Processing status of this MP4, independent of streaming outputs.
   */
  status: 'preparing' | 'ready' | 'failed' | 'expired';

  /**
   * Storage containing this rendition, inherited from its Asset.
   */
  storage_id: string;

  /**
   * When the rendition was last updated.
   */
  updated_at: string;

  /**
   * Video codec.
   */
  video_codec: 'h264';

  /**
   * Output width in pixels.
   */
  width: number;

  /**
   * Measured audio bitrate in bits per second. Omitted until known or when there is
   * no audio.
   */
  audio_bitrate?: number;

  /**
   * Measured audio codec. Omitted until known or when there is no audio.
   */
  audio_codec?: string;

  /**
   * Measured audio sample rate in Hz. Omitted until known or when there is no audio.
   */
  audio_samplerate?: number;

  /**
   * Unsigned MP4 CDN URL. Available when ready and unexpired and Storage has a CDN
   * URL.
   */
  cdn_url?: string;

  /**
   * Output duration in seconds. Omitted until ready.
   */
  duration?: number;

  /**
   * A customer-facing Asset output processing failure.
   */
  error?: Shared.AssetOutputError;

  /**
   * Progress specifies the current processing stage and encoding percentage. Omitted
   * after processing ends.
   */
  progress?: AssetRenditionProgress;

  /**
   * When the MP4 became available.
   */
  ready_at?: string;

  /**
   * File size in bytes. Omitted until ready.
   */
  size?: number;

  /**
   * Signed MP4 download URL, available when ready and unexpired. Valid for up to ten
   * minutes. Retrieve the output to refresh it. Independent of preview_enabled.
   */
  url?: string;

  /**
   * Measured video bitrate in bits per second. Omitted until ready.
   */
  video_bitrate?: number;

  /**
   * Measured video frame rate in frames per second. Omitted until known.
   */
  video_framerate?: number;
}

/**
 * Parameters for an independently processed H.264 MP4 rendition.
 */
export interface AssetStaticRenditionCreateParams {
  /**
   * H.264 MP4 resolution. highest selects the largest supported output without
   * upscaling. Hobby supports up to 1080p; other plans support up to 2160p.
   * Independent of the streaming resolution limits.
   */
  resolution: 'highest' | '240p' | '360p' | '480p' | '540p' | '720p' | '1080p' | '1440p' | '2160p';
}

/**
 * An Asset-owned static rendition output and its canonical resource details.
 */
export interface AssetStaticRenditionOutput {
  /**
   * Id identifies the Asset output, prefixed with aop\_. The type field identifies
   * the output kind.
   */
  id: string;

  /**
   * AssetId identifies the owning Asset.
   */
  asset_id: string;

  /**
   * Details contains the canonical typed output resource, including its available
   * delivery fields.
   */
  details: AssetStaticRendition;

  /**
   * Status specifies the output processing state. Expired means temporary output
   * files are no longer available.
   */
  status: AssetOutputStatus;

  /**
   * Type identifies the output kind.
   */
  type: 'static_rendition';
}

/**
 * Create an Asset-owned static rendition output.
 */
export interface AssetStaticRenditionOutputCreateParams {
  /**
   * Params specifies the settings for this output type.
   */
  params: AssetStaticRenditionCreateParams;

  /**
   * Type specifies the output kind to create.
   */
  type: 'static_rendition';
}

export type AssetStatus = 'preparing' | 'ready' | 'failed' | 'expired';

/**
 * Generate additional thumbnails from a ready Asset using its retained input,
 * folder and Storage. Specify exactly one of timestamps or count. Each layout,
 * format and size combination can be requested once.
 */
export interface AssetThumbnailCreateParams {
  /**
   * Count specifies 1 to 100 thumbnails at the middle of equal sections of the
   * selected range.
   */
  count?: number;

  /**
   * Format selects JPEG or WebP. Defaults to JPEG.
   */
  format?: ThumbnailsAPI.ThumbnailFormat;

  /**
   * Metadata attaches string values to this request. The serialized object may
   * contain at most 2048 bytes.
   */
  metadata?: { [key: string]: string };

  /**
   * Output selects images or sprites. Defaults to images.
   */
  output?: ThumbnailsAPI.ThumbnailOutput;

  /**
   * Range limits sampling to part of the Source. Defaults to the whole Source
   * duration.
   */
  range?: ThumbnailsAPI.ThumbnailRangeParams;

  /**
   * Size specifies the maximum image or tile edge in pixels, from 64 to 1920.
   * Defaults to 320. Odd sizes are supported. Preserves display aspect ratio without
   * cropping or upscaling.
   */
  size?: number;

  /**
   * Timestamps specifies 1 to 100 Source-relative target times in seconds. Every
   * timestamp must be within the selected range, including its start and excluding
   * its end. Repeated targets produce separate outputs.
   */
  timestamps?: Array<number>;
}

/**
 * An Asset-owned thumbnail output and its canonical resource details.
 */
export interface AssetThumbnailOutput {
  /**
   * Id identifies the Asset output, prefixed with aop\_. The type field identifies
   * the output kind.
   */
  id: string;

  /**
   * AssetId identifies the owning Asset.
   */
  asset_id: string;

  /**
   * Details contains the canonical typed output resource, including its available
   * delivery fields.
   */
  details: ThumbnailsAPI.Thumbnail;

  /**
   * Status specifies the output processing state. Expired means temporary output
   * files are no longer available.
   */
  status: AssetOutputStatus;

  /**
   * Type identifies the output kind.
   */
  type: 'thumbnail';
}

/**
 * Create an Asset-owned thumbnail output.
 */
export interface AssetThumbnailOutputCreateParams {
  /**
   * Params specifies the settings for this output type.
   */
  params: AssetThumbnailCreateParams;

  /**
   * Type specifies the output kind to create.
   */
  type: 'thumbnail';
}

export interface AssetTimelinePreviews {
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

/**
 * An original-language transcript. Content is included in ready output responses
 * and lifecycle event snapshots. Transcripts have no download or CDN URL.
 */
export interface AssetTranscript {
  /**
   * Id identifies the Asset output, prefixed with aop\_.
   */
  id: string;

  /**
   * Status specifies the output processing state. Expired means temporary output
   * files are no longer available.
   */
  status: AssetOutputStatus;

  /**
   * Content contains the complete text and timed segments. Included when ready;
   * omitted while preparing, failed or expired.
   */
  content?: AssetTranscriptContent;

  /**
   * A customer-facing Asset output processing failure.
   */
  error?: Shared.AssetOutputError;

  /**
   * LanguageCode identifies the detected primary language, such as en. Omitted
   * before recognition or when no speech is detected.
   */
  language_code?: string;
}

/**
 * The complete transcript and its timed passages. An audio track without speech
 * produces empty text and an empty segments array.
 */
export interface AssetTranscriptContent {
  /**
   * Segments contains timed passages in chronological order. Individual word
   * timestamps are not included.
   */
  segments: Array<AssetTranscriptSegment>;

  /**
   * Text contains the complete recognized speech in the original language.
   */
  text: string;
}

/**
 * An Asset-owned transcript output and its content.
 */
export interface AssetTranscriptOutput {
  /**
   * Id identifies the Asset output, prefixed with aop\_.
   */
  id: string;

  /**
   * AssetId identifies the owning Asset.
   */
  asset_id: string;

  /**
   * An original-language transcript. Content is included in ready output responses
   * and lifecycle event snapshots. Transcripts have no download or CDN URL.
   */
  details: AssetTranscript;

  /**
   * Status specifies the output processing state. Expired means temporary output
   * files are no longer available.
   */
  status: AssetOutputStatus;

  /**
   * Type identifies the output kind.
   */
  type: 'transcript';
}

/**
 * Create or reuse the original-language transcript for an Asset. Caption
 * generation shares this transcript and its speech-recognition charge.
 */
export interface AssetTranscriptOutputCreateParams {
  /**
   * Parameters for an original-language transcript. Pass an empty object; the spoken
   * language is detected automatically.
   */
  params: AssetTranscriptOutputParams;

  /**
   * Type specifies the output kind.
   */
  type: 'transcript';
}

/**
 * Parameters for an original-language transcript. Pass an empty object; the spoken
 * language is detected automatically.
 */
export interface AssetTranscriptOutputParams {}

/**
 * A timed passage of recognized speech. Times are seconds from the start of the
 * Asset.
 */
export interface AssetTranscriptSegment {
  /**
   * End specifies the passage end time in seconds.
   */
  end: number;

  /**
   * Start specifies the passage start time in seconds.
   */
  start: number;

  /**
   * Text contains the recognized passage, including punctuation.
   */
  text: string;
}

/**
 * An output kind not recognized by this client. Clients may ignore its details.
 */
export interface AssetUnknownOutput {
  /**
   * Id identifies the output resource.
   */
  id: string;

  /**
   * AssetId identifies the owning Asset.
   */
  asset_id: string;

  /**
   * Details contains fields defined by the output kind.
   */
  details: { [key: string]: unknown };

  /**
   * Status specifies the output processing state. Expired means temporary output
   * files are no longer available.
   */
  status: AssetOutputStatus;

  /**
   * Type identifies the output kind.
   */
  type: string;
}

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
  storage?: AssetCreateStorageParams;

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
    type AssetActionInput as AssetActionInput,
    type AssetActionResult as AssetActionResult,
    type AssetActionStatus as AssetActionStatus,
    type AssetActionType as AssetActionType,
    type AssetCaption as AssetCaption,
    type AssetCaptionOutput as AssetCaptionOutput,
    type AssetCaptionOutputCreateParams as AssetCaptionOutputCreateParams,
    type AssetCaptionOutputParams as AssetCaptionOutputParams,
    type AssetCreateStorageParams as AssetCreateStorageParams,
    type AssetDefaults as AssetDefaults,
    type AssetDefaultsMaxResolution as AssetDefaultsMaxResolution,
    type AssetDefaultsMinResolution as AssetDefaultsMinResolution,
    type AssetDefaultsParams as AssetDefaultsParams,
    type AssetError as AssetError,
    type AssetOutputStatus as AssetOutputStatus,
    type AssetPoster as AssetPoster,
    type AssetRenditionProgress as AssetRenditionProgress,
    type AssetSourceMetadata as AssetSourceMetadata,
    type AssetStaticRendition as AssetStaticRendition,
    type AssetStaticRenditionCreateParams as AssetStaticRenditionCreateParams,
    type AssetStaticRenditionOutput as AssetStaticRenditionOutput,
    type AssetStaticRenditionOutputCreateParams as AssetStaticRenditionOutputCreateParams,
    type AssetStatus as AssetStatus,
    type AssetThumbnailCreateParams as AssetThumbnailCreateParams,
    type AssetThumbnailOutput as AssetThumbnailOutput,
    type AssetThumbnailOutputCreateParams as AssetThumbnailOutputCreateParams,
    type AssetTimelinePreviews as AssetTimelinePreviews,
    type AssetTranscript as AssetTranscript,
    type AssetTranscriptContent as AssetTranscriptContent,
    type AssetTranscriptOutput as AssetTranscriptOutput,
    type AssetTranscriptOutputCreateParams as AssetTranscriptOutputCreateParams,
    type AssetTranscriptOutputParams as AssetTranscriptOutputParams,
    type AssetTranscriptSegment as AssetTranscriptSegment,
    type AssetUnknownOutput as AssetUnknownOutput,
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

  export { Workflow as Workflow };
}
