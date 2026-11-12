// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { PagePromise, PaginatedResults, type PaginatedResultsParams } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Transcodings extends APIResource {
  /**
   * Create a standalone file export with resolved encoding settings.
   *
   * @example
   * ```ts
   * const transcoding = await client.transcodings.create({
   *   format: { id: 'mp4_h264', height: 720 },
   *   source_id: 'src_example',
   * });
   * ```
   */
  create(body: TranscodingCreateParams, options?: RequestOptions): APIPromise<Transcoding> {
    return (
      this._client.post('/transcodings', {
        body,
        ...options,
        __security: { projectAccessTokenAuth: true },
      }) as APIPromise<{ data: Transcoding }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Retrieve the accepted settings, published files and current state of one
   * Transcoding.
   *
   * @example
   * ```ts
   * const transcoding = await client.transcodings.retrieve(
   *   'transcodingId',
   * );
   * ```
   */
  retrieve(transcodingID: string, options?: RequestOptions): APIPromise<Transcoding> {
    return (
      this._client.get(path`/transcodings/${transcodingID}`, {
        ...options,
        __security: { projectAccessTokenAuth: true },
      }) as APIPromise<{ data: Transcoding }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * List Transcodings in the authenticated Project, newest first by default.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const transcoding of client.transcodings.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: TranscodingListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<TranscodingsPaginatedResults, Transcoding> {
    return this._client.getAPIList('/transcodings', PaginatedResults<Transcoding>, {
      query,
      ...options,
      __security: { projectAccessTokenAuth: true },
    });
  }

  /**
   * Delete a ready, failed, cancelled or expired Transcoding and its file records.
   * The Source and settled usage are preserved. Customer output files remain unless
   * delete_files is true; temporary files retain their original 24-hour expiry.
   * Deletion remains available for inactive teams.
   *
   * @example
   * ```ts
   * await client.transcodings.delete('transcodingId');
   * ```
   */
  delete(
    transcodingID: string,
    params: TranscodingDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    const { delete_files } = params ?? {};
    return this._client.delete(path`/transcodings/${transcodingID}`, {
      query: { delete_files },
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: { projectAccessTokenAuth: true },
    });
  }

  /**
   * Cancel a preparing Transcoding and release its unpaid reservation. Repeating an
   * accepted cancellation succeeds.
   *
   * @example
   * ```ts
   * await client.transcodings.cancel('transcodingId');
   * ```
   */
  cancel(transcodingID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.post(path`/transcodings/${transcodingID}/cancel`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: { projectAccessTokenAuth: true },
    });
  }
}

export type TranscodingsPaginatedResults = PaginatedResults<Transcoding>;

/**
 * A standalone file-encoding request with its accepted settings and published
 * files.
 */
export interface Transcoding {
  /**
   * Id uniquely identifies the Transcoding.
   */
  id: string;

  /**
   * CreatedAt specifies when the request was accepted.
   */
  created_at: string;

  /**
   * Files contains the published output files and their measured properties, ordered
   * by creation time. Empty until publication. Presigned URLs are refreshed on each
   * read and included in lifecycle webhooks when available.
   */
  files: Array<Transcoding.File>;

  /**
   * Format contains the resolved encoding settings accepted at creation, including
   * defaults, dimensions, frame rate and normalized seek and duration. Per-title
   * rate control is resolved during processing. Measured media properties are
   * available in Files.
   */
  format: Transcoding.Format;

  /**
   * Metadata contains the string values attached to the Transcoding.
   */
  metadata: { [key: string]: string };

  /**
   * Status reports processing or output expiry.
   */
  status: 'preparing' | 'ready' | 'failed' | 'cancelled' | 'expired';

  /**
   * Storage contains the resolved output destination.
   */
  storage: Transcoding.Storage;

  /**
   * UpdatedAt specifies when the request was last updated.
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
   * DeleteAt specifies when this record is deleted: three days after its temporary
   * output expires, otherwise when the team's data retention period ends, counted
   * from when the request was accepted, and no sooner than three days after it
   * finished. It does not delete files in customer-owned Storage. Omitted while the
   * Transcoding is preparing.
   */
  delete_at?: string;

  /**
   * Error describes why processing failed. Omitted when no processing error exists.
   */
  error?: Transcoding.Error;

  /**
   * ExpiresAt specifies when temporary output files expire. Omitted for customer
   * output Storage and before the Transcoding is ready.
   */
  expires_at?: string;

  /**
   * ProcessingStage specifies the current activity while the status is preparing.
   * Omitted otherwise.
   */
  processing_stage?: 'queued' | 'starting' | 'encoding' | 'finalizing' | 'uploading';

  /**
   * Progress specifies the video encoding percentage. Available once processing
   * starts and after the output is ready. Omitted for audio-only output; 100
   * requires published output.
   */
  progress?: number;

  /**
   * ReadyAt specifies when the output was published. Omitted before the Transcoding
   * is ready.
   */
  ready_at?: string;

  /**
   * SourceId identifies the original Source. Omitted after Source deletion.
   */
  source_id?: string;
}

export namespace Transcoding {
  /**
   * A validated media file published by a Transcoding.
   */
  export interface File {
    /**
     * Id identifies this published Transcoding file.
     */
    id: string;

    /**
     * CreatedAt records when the validated file was published.
     */
    created_at: string;

    /**
     * Duration specifies the measured output duration in seconds.
     */
    duration: number;

    /**
     * MimeType specifies the media content type.
     */
    mime_type: string;

    /**
     * Path specifies the output path relative to the Storage base_prefix saved when
     * the Transcoding was created. Later Storage prefix changes do not move this file.
     */
    path: string;

    /**
     * Size specifies the measured file size in bytes.
     */
    size: number;

    /**
     * StorageId identifies the output Storage.
     */
    storage_id: string;

    /**
     * Thumbnails contains available dashboard preview images. Empty for audio-only
     * files, failed previews or expired files.
     */
    thumbnails: Array<File.Thumbnail>;

    /**
     * TranscodingId identifies the Transcoding that produced this file.
     */
    transcoding_id: string;

    /**
     * AudioBitrate specifies measured audio bits per second, or zero when unavailable.
     * Omitted without audio.
     */
    audio_bitrate?: number;

    /**
     * AudioCodec specifies the measured audio codec. Omitted without audio.
     */
    audio_codec?: string;

    /**
     * AudioSamplerate specifies measured audio samples per second. Omitted without
     * audio.
     */
    audio_samplerate?: number;

    /**
     * CdnUrl provides the URL from the Storage CDN configuration. Omitted without a
     * configured CDN or after file expiry.
     */
    cdn_url?: string;

    /**
     * ExpiresAt specifies when a temporary output expires. Omitted for customer-owned
     * output storage.
     */
    expires_at?: string;

    /**
     * Height specifies the measured video height in pixels. Omitted for audio-only
     * files.
     */
    height?: number;

    /**
     * ThumbnailStatus reports the optional dashboard preview result. Failure does not
     * affect the media file. Omitted for audio-only files.
     */
    thumbnail_status?: 'ready' | 'failed';

    /**
     * Url provides a signed download valid for at most ten minutes. Omitted when the
     * file has expired or signing is unavailable.
     */
    url?: string;

    /**
     * VideoBitrate specifies measured video bits per second, or zero when unavailable.
     * Omitted without video.
     */
    video_bitrate?: number;

    /**
     * VideoCodec specifies the measured video codec. Omitted for audio-only files.
     */
    video_codec?: string;

    /**
     * VideoFramerate specifies measured video frames per second. Omitted without
     * video.
     */
    video_framerate?: number;

    /**
     * Width specifies the measured video width in pixels. Omitted for audio-only
     * files.
     */
    width?: number;
  }

  export namespace File {
    /**
     * An optional dashboard preview of the completed output.
     */
    export interface Thumbnail {
      /**
       * Format specifies the image encoding.
       */
      format: 'jpeg' | 'webp';

      /**
       * Height specifies the measured image height in pixels.
       */
      height: number;

      /**
       * Size specifies the measured image size in bytes.
       */
      size: number;

      /**
       * Url provides a signed image URL valid for at most ten minutes.
       */
      url: string;

      /**
       * Width specifies the measured image width in pixels.
       */
      width: number;
    }
  }

  /**
   * Format contains the resolved encoding settings accepted at creation, including
   * defaults, dimensions, frame rate and normalized seek and duration. Per-title
   * rate control is resolved during processing. Measured media properties are
   * available in Files.
   */
  export interface Format {
    /**
     * Id specifies the resolved container and codec selection.
     */
    id: 'mp4_h264' | 'mp4_h265' | 'mp4_av1' | 'webm_vp9' | 'm4a_aac';

    /**
     * Duration specifies the accepted output duration in seconds, including normalized
     * trims.
     */
    duration: number;

    /**
     * Seek specifies the accepted start position in source seconds, normalized to the
     * output timeline.
     */
    seek: number;

    /**
     * AudioBitrate specifies the resolved audio bitrate in bits per second. Omitted
     * for video-only output.
     */
    audio_bitrate?: number;

    /**
     * AudioSamplerate specifies the resolved audio samples per second. Omitted for
     * video-only output.
     */
    audio_samplerate?: number;

    /**
     * Bufsize specifies the resolved video buffer size in bits, including codec-level
     * defaults. Omitted when no buffer applies.
     */
    bufsize?: number;

    /**
     * Channels specifies the resolved audio channel count: 1, 2, 6 or 8. Omitted for
     * video-only output.
     */
    channels?: number;

    /**
     * CpuUsed specifies the accepted VP9 encoder speed setting from 0 through 8.
     * Omitted for other codecs.
     */
    cpu_used?: string;

    /**
     * Crf specifies the accepted constant quality. Omitted for bitrate-controlled,
     * per-title and audio-only encoding.
     */
    crf?: number;

    /**
     * DisableAudio is true for video-only output. Omitted when audio is selected.
     */
    disable_audio?: boolean;

    /**
     * Framerate specifies the resolved video frames per second. Omitted for audio-only
     * output.
     */
    framerate?: number;

    /**
     * Gop specifies the resolved maximum keyframe interval in frames. Omitted for
     * audio-only output.
     */
    gop?: number;

    /**
     * Height specifies the resolved video height in pixels. Omitted for audio-only
     * output.
     */
    height?: number;

    /**
     * Level specifies the accepted codec level when explicitly selected.
     */
    level?: number;

    /**
     * Maxrate specifies the resolved maximum video bitrate in bits per second,
     * including codec-level defaults. Omitted when no maximum applies.
     */
    maxrate?: number;

    /**
     * Minrate specifies the accepted minimum video bitrate in bits per second, when
     * configured.
     */
    minrate?: number;

    /**
     * Movflags specifies MP4 packaging. MP4 video exports use faststart.
     */
    movflags?: string;

    /**
     * PerTitle specifies whether video rate control is selected during content
     * analysis. Omitted for audio-only output.
     */
    per_title?: boolean;

    /**
     * Pixfmt specifies the accepted video pixel format. Omitted for audio-only output.
     */
    pixfmt?: string;

    /**
     * Preset specifies the accepted codec preset. Omitted when the codec does not use
     * presets.
     */
    preset?: string;

    /**
     * Profilev specifies the accepted codec profile when explicitly selected.
     */
    profilev?: string;

    /**
     * Quality specifies the accepted VP9 deadline policy: good, best or realtime.
     * Omitted for other codecs.
     */
    quality?: string;

    /**
     * VideoBitrate specifies the accepted video bitrate in bits per second. Omitted
     * for CRF and per-title encoding.
     */
    video_bitrate?: number;

    /**
     * Width specifies the resolved video width in pixels. Omitted for audio-only
     * output.
     */
    width?: number;
  }

  /**
   * Storage contains the resolved output destination.
   */
  export interface Storage {
    /**
     * Id identifies the output Storage.
     */
    id: string;

    /**
     * Path specifies the output file path relative to the Storage base_prefix saved at
     * creation.
     */
    path: string;
  }

  /**
   * Error describes why processing failed. Omitted when no processing error exists.
   */
  export interface Error {
    /**
     * Code identifies the processing failure.
     */
    code: string;

    /**
     * Message describes the failure without internal worker or provider diagnostics.
     */
    message: string;

    /**
     * Stage identifies where processing failed.
     */
    stage: 'queued' | 'starting' | 'encoding' | 'finalizing' | 'uploading';
  }
}

export interface TranscodingM4aAac {
  /**
   * Id specifies an AAC M4A export.
   */
  id: 'm4a_aac';

  /**
   * AudioBitrate specifies the output audio bitrate in bits per second. Defaults
   * to 128000.
   */
  audio_bitrate?: number;

  /**
   * AudioSamplerate specifies the output sample rate in Hz. Defaults to 48000. WebM
   * Opus audio uses 48000.
   */
  audio_samplerate?:
    | 8000
    | 11025
    | 12000
    | 16000
    | 22050
    | 24000
    | 32000
    | 44100
    | 48000
    | 64000
    | 88200
    | 96000;

  /**
   * Channels specifies the output channel count. Defaults to stereo. Six channels
   * means 5.1; eight means 7.1.
   */
  channels?: 1 | 2 | 6 | 8;

  /**
   * Duration specifies the requested output length in seconds. Defaults to the
   * remaining source duration and is capped at the source end. Audio-only output
   * must resolve to at least 0.001 seconds after trimming and sample rounding. The
   * accepted interval determines the fixed price.
   */
  duration?: number;

  /**
   * Seek specifies the start in source seconds. Defaults to zero and must precede
   * the source end. The accepted interval uses the output frame or sample timeline.
   * Audio-only output must retain at least 0.001 seconds after sample rounding.
   */
  seek?: number;
}

export interface TranscodingMP4Av1 {
  /**
   * Id specifies the output format.
   */
  id: 'mp4_av1';

  /**
   * AudioBitrate specifies the output audio bitrate in bits per second. Defaults
   * to 128000.
   */
  audio_bitrate?: number;

  /**
   * AudioSamplerate specifies the output sample rate in Hz. Defaults to 48000. WebM
   * Opus audio uses 48000.
   */
  audio_samplerate?:
    | 8000
    | 11025
    | 12000
    | 16000
    | 22050
    | 24000
    | 32000
    | 44100
    | 48000
    | 64000
    | 88200
    | 96000;

  /**
   * Bufsize specifies the video buffer size in bits, from 100000 through 50000000.
   * H.264 and H.265 require maxrate. AV1 and VP9 require a bitrate-controlled mode.
   */
  bufsize?: number;

  /**
   * Channels specifies the output channel count. Defaults to stereo. Six channels
   * means 5.1; eight means 7.1.
   */
  channels?: 1 | 2 | 6 | 8;

  /**
   * Crf (Constant Rate Factor) controls the quality of the output video. Lower
   * values mean better quality but larger file size. Range: 16 to 63. Recommended
   * values: 16-35 for high quality, 35-45 for good quality, 45-63 for acceptable
   * quality.
   */
  crf?: number;

  /**
   * DisableAudio omits the audio stream. Defaults to false. A source without audio
   * produces video only.
   */
  disable_audio?: boolean;

  /**
   * DisableVideo selects an audio-only AAC M4A export. Defaults to false. The source
   * must contain audio.
   */
  disable_video?: boolean;

  /**
   * Duration specifies the requested output length in seconds. Defaults to the
   * remaining source duration and is capped at the source end. Audio-only output
   * must resolve to at least 0.001 seconds after trimming and sample rounding. The
   * accepted interval determines the fixed price.
   */
  duration?: number;

  /**
   * Framerate specifies the output video frame rate. Defaults to the source rate and
   * must be between 0.001 and 240 fps.
   */
  framerate?: number;

  /**
   * Gop specifies the maximum keyframe interval in frames. Defaults to four seconds
   * at the accepted frame rate, capped at 960 frames.
   */
  gop?: number;

  /**
   * Height specifies the output dimension in pixels. Use -2 or omit one dimension to
   * preserve the source aspect ratio. Explicit dimensions must be 2 to 7680 and
   * even. Omitting both preserves the source dimensions rounded down to even pixels.
   */
  height?: number;

  /**
   * Level specifies the AV1 level using its two-digit representation, such as 31 for
   * level 3.1. The dimensions, frame rate and rate controls must fit this level.
   * Omitted rate limits resolve to level-compatible defaults.
   */
  level?: 30 | 31 | 41;

  /**
   * Maxrate specifies the video buffer maximum rate in bits per second, from 100000
   * through 50000000. H.264 and H.265 require bufsize. VP9 requires video_bitrate;
   * AV1 requires CRF mode.
   */
  maxrate?: number;

  /**
   * Movflags specifies MP4 packaging. Defaults to faststart, which places playback
   * metadata before the media.
   */
  movflags?: 'faststart';

  /**
   * PerTitle enables independent content-based bitrate prediction for each part of
   * the video. Analysis uses only the selected trim interval. Defaults to false.
   * Explicit rate-control settings cannot be combined with it.
   */
  per_title?: boolean;

  /**
   * Pixfmt specifies the output pixel format. Defaults to yuv420p. The selected
   * profile must support it.
   */
  pixfmt?: 'yuv420p' | 'yuv420p10le';

  /**
   * Preset controls the encoding efficiency and processing intensity. Lower presets
   * use more optimization features, creating smaller files with better quality but
   * requiring more compute time. Higher presets encode faster but produce larger
   * files.
   *
   * Preset ranges:
   *
   * - 6-7: Fast encoding for real-time applications (smaller files)
   * - 8-10: Balanced efficiency and speed for general use
   * - 11-13: Fastest encoding for real-time applications (larger files)
   */
  preset?: '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13';

  /**
   * Profilev selects the AV1 Main profile. Use pixfmt to select 8-bit or 10-bit
   * output.
   */
  profilev?: 'main';

  /**
   * Seek specifies the start in source seconds. Defaults to zero and must precede
   * the source end. The accepted interval uses the output frame or sample timeline.
   * Audio-only output must retain at least 0.001 seconds after sample rounding.
   */
  seek?: number;

  /**
   * VideoBitrate specifies the target video bitrate in bits per second, from 1000
   * through 100000000. Omit it for CRF or per-title encoding.
   */
  video_bitrate?: number;

  /**
   * Width specifies the output dimension in pixels. Use -2 or omit one dimension to
   * preserve the source aspect ratio. Explicit dimensions must be 2 to 7680 and
   * even. Omitting both preserves the source dimensions rounded down to even pixels.
   */
  width?: number;
}

export interface TranscodingMP4H264 {
  /**
   * Id specifies the output format.
   */
  id: 'mp4_h264';

  /**
   * AudioBitrate specifies the output audio bitrate in bits per second. Defaults
   * to 128000.
   */
  audio_bitrate?: number;

  /**
   * AudioSamplerate specifies the output sample rate in Hz. Defaults to 48000. WebM
   * Opus audio uses 48000.
   */
  audio_samplerate?:
    | 8000
    | 11025
    | 12000
    | 16000
    | 22050
    | 24000
    | 32000
    | 44100
    | 48000
    | 64000
    | 88200
    | 96000;

  /**
   * Bufsize specifies the video buffer size in bits, from 100000 through 50000000.
   * H.264 and H.265 require maxrate. AV1 and VP9 require a bitrate-controlled mode.
   */
  bufsize?: number;

  /**
   * Channels specifies the output channel count. Defaults to stereo. Six channels
   * means 5.1; eight means 7.1.
   */
  channels?: 1 | 2 | 6 | 8;

  /**
   * Crf (Constant Rate Factor) controls the quality of the output video. Lower
   * values mean better quality but larger file size. Range: 16 to 35. Recommended
   * values: 18-28 for high quality, 23-28 for good quality, 28-35 for acceptable
   * quality.
   */
  crf?: number;

  /**
   * DisableAudio omits the audio stream. Defaults to false. A source without audio
   * produces video only.
   */
  disable_audio?: boolean;

  /**
   * DisableVideo selects an audio-only AAC M4A export. Defaults to false. The source
   * must contain audio.
   */
  disable_video?: boolean;

  /**
   * Duration specifies the requested output length in seconds. Defaults to the
   * remaining source duration and is capped at the source end. Audio-only output
   * must resolve to at least 0.001 seconds after trimming and sample rounding. The
   * accepted interval determines the fixed price.
   */
  duration?: number;

  /**
   * Framerate specifies the output video frame rate. Defaults to the source rate and
   * must be between 0.001 and 240 fps.
   */
  framerate?: number;

  /**
   * Gop specifies the maximum keyframe interval in frames. Defaults to four seconds
   * at the accepted frame rate, capped at 960 frames.
   */
  gop?: number;

  /**
   * Height specifies the output dimension in pixels. Use -2 or omit one dimension to
   * preserve the source aspect ratio. Explicit dimensions must be 2 to 7680 and
   * even. Omitting both preserves the source dimensions rounded down to even pixels.
   */
  height?: number;

  /**
   * Level specifies the H.264 decoder level using its two-digit representation, such
   * as 41 for level 4.1. The dimensions, frame rate and rate controls must fit this
   * level and the effective profile. Omitted rate limits resolve to level-compatible
   * defaults.
   */
  level?: 10 | 11 | 12 | 13 | 20 | 21 | 22 | 30 | 31 | 32 | 40 | 41 | 42 | 50 | 51;

  /**
   * Maxrate specifies the video buffer maximum rate in bits per second, from 100000
   * through 50000000. H.264 and H.265 require bufsize. VP9 requires video_bitrate;
   * AV1 requires CRF mode.
   */
  maxrate?: number;

  /**
   * Movflags specifies MP4 packaging. Defaults to faststart, which places playback
   * metadata before the media.
   */
  movflags?: 'faststart';

  /**
   * PerTitle enables independent content-based bitrate prediction for each part of
   * the video. Analysis uses only the selected trim interval. Defaults to false.
   * Explicit rate-control settings cannot be combined with it.
   */
  per_title?: boolean;

  /**
   * Pixfmt specifies the output pixel format. Defaults to yuv420p. The selected
   * profile must support it.
   */
  pixfmt?: 'yuv420p' | 'yuv422p' | 'yuv444p' | 'yuv420p10le' | 'yuv422p10le' | 'yuv444p10le';

  /**
   * Preset specifies the encoding speed preset. Valid values (from fastest to
   * slowest):
   *
   * - ultrafast: Fastest encoding, lowest quality
   * - superfast: Very fast encoding, lower quality
   * - veryfast: Fast encoding, moderate quality
   * - faster: Faster encoding, good quality
   * - fast: Fast encoding, better quality
   * - medium: Balanced preset, best quality
   */
  preset?: 'ultrafast' | 'superfast' | 'veryfast' | 'faster' | 'fast' | 'medium';

  /**
   * Profilev specifies the H.264 profile. Valid values:
   *
   * - baseline: Basic profile, good for mobile devices
   * - main: Main profile, good for most applications
   * - high: High profile, best quality but requires more processing
   * - high10: High 10-bit profile, supports 10-bit color
   * - high422: High 4:2:2 profile, supports 4:2:2 color sampling
   * - high444: High 4:4:4 profile, supports 4:4:4 color sampling
   */
  profilev?: 'baseline' | 'main' | 'high' | 'high10' | 'high422' | 'high444';

  /**
   * Seek specifies the start in source seconds. Defaults to zero and must precede
   * the source end. The accepted interval uses the output frame or sample timeline.
   * Audio-only output must retain at least 0.001 seconds after sample rounding.
   */
  seek?: number;

  /**
   * VideoBitrate specifies the target video bitrate in bits per second, from 1000
   * through 100000000. Omit it for CRF or per-title encoding.
   */
  video_bitrate?: number;

  /**
   * Width specifies the output dimension in pixels. Use -2 or omit one dimension to
   * preserve the source aspect ratio. Explicit dimensions must be 2 to 7680 and
   * even. Omitting both preserves the source dimensions rounded down to even pixels.
   */
  width?: number;

  /**
   * X264KeyInt specifies the maximum number of frames between keyframes for H.264
   * encoding. Range: 1 to 960. Higher values can improve compression but may affect
   * seeking.
   */
  x264_keyint?: number;
}

export interface TranscodingMP4H265 {
  /**
   * Id specifies the output format.
   */
  id: 'mp4_h265';

  /**
   * AudioBitrate specifies the output audio bitrate in bits per second. Defaults
   * to 128000.
   */
  audio_bitrate?: number;

  /**
   * AudioSamplerate specifies the output sample rate in Hz. Defaults to 48000. WebM
   * Opus audio uses 48000.
   */
  audio_samplerate?:
    | 8000
    | 11025
    | 12000
    | 16000
    | 22050
    | 24000
    | 32000
    | 44100
    | 48000
    | 64000
    | 88200
    | 96000;

  /**
   * Bufsize specifies the video buffer size in bits, from 100000 through 50000000.
   * H.264 and H.265 require maxrate. AV1 and VP9 require a bitrate-controlled mode.
   */
  bufsize?: number;

  /**
   * Channels specifies the output channel count. Defaults to stereo. Six channels
   * means 5.1; eight means 7.1.
   */
  channels?: 1 | 2 | 6 | 8;

  /**
   * Crf (Constant Rate Factor) controls the quality of the output video. Lower
   * values mean better quality but larger file size. Range: 16 to 35. Recommended
   * values: 18-28 for high quality, 23-28 for good quality, 28-35 for acceptable
   * quality.
   */
  crf?: number;

  /**
   * DisableAudio omits the audio stream. Defaults to false. A source without audio
   * produces video only.
   */
  disable_audio?: boolean;

  /**
   * DisableVideo selects an audio-only AAC M4A export. Defaults to false. The source
   * must contain audio.
   */
  disable_video?: boolean;

  /**
   * Duration specifies the requested output length in seconds. Defaults to the
   * remaining source duration and is capped at the source end. Audio-only output
   * must resolve to at least 0.001 seconds after trimming and sample rounding. The
   * accepted interval determines the fixed price.
   */
  duration?: number;

  /**
   * Framerate specifies the output video frame rate. Defaults to the source rate and
   * must be between 0.001 and 240 fps.
   */
  framerate?: number;

  /**
   * Gop specifies the maximum keyframe interval in frames. Defaults to four seconds
   * at the accepted frame rate, capped at 960 frames.
   */
  gop?: number;

  /**
   * Height specifies the output dimension in pixels. Use -2 or omit one dimension to
   * preserve the source aspect ratio. Explicit dimensions must be 2 to 7680 and
   * even. Omitting both preserves the source dimensions rounded down to even pixels.
   */
  height?: number;

  /**
   * Level specifies the HEVC level using its two-digit representation, such as 31
   * for level 3.1. The dimensions, frame rate and rate controls must fit this level.
   * Omitted rate limits resolve to level-compatible defaults.
   */
  level?: 30 | 31 | 41;

  /**
   * Maxrate specifies the video buffer maximum rate in bits per second, from 100000
   * through 50000000. H.264 and H.265 require bufsize. VP9 requires video_bitrate;
   * AV1 requires CRF mode.
   */
  maxrate?: number;

  /**
   * Movflags specifies MP4 packaging. Defaults to faststart, which places playback
   * metadata before the media.
   */
  movflags?: 'faststart';

  /**
   * PerTitle enables independent content-based bitrate prediction for each part of
   * the video. Analysis uses only the selected trim interval. Defaults to false.
   * Explicit rate-control settings cannot be combined with it.
   */
  per_title?: boolean;

  /**
   * Pixfmt specifies the output pixel format. Defaults to yuv420p. The selected
   * profile must support it.
   */
  pixfmt?:
    | 'yuv420p'
    | 'yuv422p'
    | 'yuv444p'
    | 'yuv420p10le'
    | 'yuv422p10le'
    | 'yuv444p10le'
    | 'yuv420p12le'
    | 'yuv422p12le'
    | 'yuv444p12le';

  /**
   * Preset specifies the encoding speed preset. Valid values (from fastest to
   * slowest):
   *
   * - ultrafast: Fastest encoding, lowest quality
   * - superfast: Very fast encoding, lower quality
   * - veryfast: Fast encoding, moderate quality
   * - faster: Faster encoding, good quality
   * - fast: Fast encoding, better quality
   * - medium: Balanced preset, best quality
   */
  preset?: 'ultrafast' | 'superfast' | 'veryfast' | 'faster' | 'fast' | 'medium';

  /**
   * Profilev selects the HEVC profile. It must support the requested pixel format.
   */
  profilev?:
    | 'main'
    | 'main10'
    | 'main12'
    | 'main422-10'
    | 'main422-12'
    | 'main444-8'
    | 'main444-10'
    | 'main444-12';

  /**
   * Seek specifies the start in source seconds. Defaults to zero and must precede
   * the source end. The accepted interval uses the output frame or sample timeline.
   * Audio-only output must retain at least 0.001 seconds after sample rounding.
   */
  seek?: number;

  /**
   * VideoBitrate specifies the target video bitrate in bits per second, from 1000
   * through 100000000. Omit it for CRF or per-title encoding.
   */
  video_bitrate?: number;

  /**
   * Width specifies the output dimension in pixels. Use -2 or omit one dimension to
   * preserve the source aspect ratio. Explicit dimensions must be 2 to 7680 and
   * even. Omitting both preserves the source dimensions rounded down to even pixels.
   */
  width?: number;

  /**
   * X265KeyInt specifies the maximum number of frames between keyframes for H.265
   * encoding. Range: 1 to 300. Higher values can improve compression but may affect
   * seeking.
   */
  x265_keyint?: number;
}

export interface TranscodingWebmVp9 {
  /**
   * Id specifies the output format.
   */
  id: 'webm_vp9';

  /**
   * AudioBitrate specifies the output audio bitrate in bits per second. Defaults
   * to 128000.
   */
  audio_bitrate?: number;

  /**
   * AudioSamplerate specifies the output sample rate in Hz. Defaults to 48000. WebM
   * Opus audio uses 48000.
   */
  audio_samplerate?:
    | 8000
    | 11025
    | 12000
    | 16000
    | 22050
    | 24000
    | 32000
    | 44100
    | 48000
    | 64000
    | 88200
    | 96000;

  /**
   * Bufsize specifies the video buffer size in bits, from 100000 through 50000000.
   * H.264 and H.265 require maxrate. AV1 and VP9 require a bitrate-controlled mode.
   */
  bufsize?: number;

  /**
   * Channels specifies the output channel count. Defaults to stereo. Six channels
   * means 5.1; eight means 7.1.
   */
  channels?: 1 | 2 | 6 | 8;

  /**
   * CpuUsed specifies the CPU usage level for VP9 encoding. Range: 0 to 8. Lower
   * values mean better quality but slower encoding, higher values mean faster
   * encoding but lower quality. Recommended values: 0-2 for high quality, 2-4 for
   * good quality, 4-6 for balanced, 6-8 for speed
   */
  cpu_used?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';

  /**
   * Crf (Constant Rate Factor) controls the quality of the output video. Lower
   * values mean better quality but larger file size. Range: 15 to 35. Recommended
   * values: 18-28 for high quality, 23-28 for good quality, 28-35 for acceptable
   * quality.
   */
  crf?: number;

  /**
   * DisableAudio omits the audio stream. Defaults to false. A source without audio
   * produces video only.
   */
  disable_audio?: boolean;

  /**
   * DisableVideo selects an audio-only AAC M4A export. Defaults to false. The source
   * must contain audio.
   */
  disable_video?: boolean;

  /**
   * Duration specifies the requested output length in seconds. Defaults to the
   * remaining source duration and is capped at the source end. Audio-only output
   * must resolve to at least 0.001 seconds after trimming and sample rounding. The
   * accepted interval determines the fixed price.
   */
  duration?: number;

  /**
   * Framerate specifies the output video frame rate. Defaults to the source rate and
   * must be between 0.001 and 240 fps.
   */
  framerate?: number;

  /**
   * Gop specifies the maximum keyframe interval in frames. Defaults to four seconds
   * at the accepted frame rate, capped at 960 frames.
   */
  gop?: number;

  /**
   * Height specifies the output dimension in pixels. Use -2 or omit one dimension to
   * preserve the source aspect ratio. Explicit dimensions must be 2 to 7680 and
   * even. Omitting both preserves the source dimensions rounded down to even pixels.
   */
  height?: number;

  /**
   * Maxrate specifies the video buffer maximum rate in bits per second, from 100000
   * through 50000000. H.264 and H.265 require bufsize. VP9 requires video_bitrate;
   * AV1 requires CRF mode.
   */
  maxrate?: number;

  /**
   * Minrate selects VP9 constant bitrate when equal to video_bitrate and maxrate.
   * Other minimum-rate combinations are unsupported.
   */
  minrate?: number;

  /**
   * PerTitle enables independent content-based bitrate prediction for each part of
   * the video. Analysis uses only the selected trim interval. Defaults to false.
   * Explicit rate-control settings cannot be combined with it.
   */
  per_title?: boolean;

  /**
   * Pixfmt specifies the output pixel format. Defaults to yuv420p. The selected
   * profile must support it.
   */
  pixfmt?:
    | 'yuv420p'
    | 'yuv422p'
    | 'yuv440p'
    | 'yuv444p'
    | 'yuv420p10le'
    | 'yuv422p10le'
    | 'yuv440p10le'
    | 'yuv444p10le'
    | 'yuv420p12le'
    | 'yuv422p12le'
    | 'yuv440p12le'
    | 'yuv444p12le';

  /**
   * Quality specifies the VP9 encoding quality preset. Valid values:
   *
   * - good: Balanced quality preset, good for most applications
   * - best: Best quality preset, slower encoding
   * - realtime: Fast encoding preset, suitable for live streaming
   */
  quality?: 'good' | 'best' | 'realtime';

  /**
   * Seek specifies the start in source seconds. Defaults to zero and must precede
   * the source end. The accepted interval uses the output frame or sample timeline.
   * Audio-only output must retain at least 0.001 seconds after sample rounding.
   */
  seek?: number;

  /**
   * VideoBitrate specifies the target video bitrate in bits per second, from 1000
   * through 100000000. Omit it for CRF or per-title encoding.
   */
  video_bitrate?: number;

  /**
   * Width specifies the output dimension in pixels. Use -2 or omit one dimension to
   * preserve the source aspect ratio. Explicit dimensions must be 2 to 7680 and
   * even. Omitting both preserves the source dimensions rounded down to even pixels.
   */
  width?: number;
}

export interface TranscodingCreateParams {
  /**
   * Format specifies the requested encoding settings.
   */
  format:
    | TranscodingMP4H264
    | TranscodingMP4H265
    | TranscodingMP4Av1
    | TranscodingWebmVp9
    | TranscodingM4aAac;

  /**
   * SourceId identifies a Source in this Project.
   */
  source_id: string;

  /**
   * Metadata attaches string values to the Transcoding. The serialized object may
   * contain at most 2048 bytes.
   */
  metadata?: { [key: string]: string };

  /**
   * Storage overrides the Project output destination. Source storage remains
   * independent.
   */
  storage?: TranscodingCreateParams.Storage;
}

export namespace TranscodingCreateParams {
  /**
   * Storage overrides the Project output destination. Source storage remains
   * independent.
   */
  export interface Storage {
    /**
     * Id specifies a Storage in this Project. Defaults to the Project output storage.
     */
    id?: string;

    /**
     * Path specifies the output object path relative to the selected Storage
     * base_prefix. Required for customer storage; generated for Chunkify temporary
     * storage. The extension must match the resolved output format. The combined path
     * may contain at most 1024 bytes.
     */
    path?: string;
  }
}

export interface TranscodingListParams extends PaginatedResultsParams {
  /**
   * Id filters by an exact Transcoding ID. Omit to include all matching resources.
   */
  id?: string;

  created?: TranscodingListParams.Created;

  /**
   * Filter Transcodings linked to this Source. Omit to include Transcodings from all
   * Sources in the Project.
   */
  source_id?: string;

  /**
   * Filter by Transcoding status.
   */
  status?: 'preparing' | 'ready' | 'failed' | 'cancelled' | 'expired';

  /**
   * Filter by output Storage ID.
   */
  storage_id?: string;
}

export namespace TranscodingListParams {
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

export interface TranscodingDeleteParams {
  /**
   * DeleteFiles specifies whether to permanently delete this Transcoding's output
   * files at their saved storage paths. Defaults to false. The original Source and
   * unrelated files are preserved. If deletion fails, records remain for retry, but
   * some files may already be deleted. Managed dashboard images are removed with the
   * resource; temporary outputs still expire after 24 hours when this option is
   * false.
   */
  delete_files?: boolean;
}

export declare namespace Transcodings {
  export {
    type Transcoding as Transcoding,
    type TranscodingM4aAac as TranscodingM4aAac,
    type TranscodingMP4Av1 as TranscodingMP4Av1,
    type TranscodingMP4H264 as TranscodingMP4H264,
    type TranscodingMP4H265 as TranscodingMP4H265,
    type TranscodingWebmVp9 as TranscodingWebmVp9,
    type TranscodingsPaginatedResults as TranscodingsPaginatedResults,
    type TranscodingCreateParams as TranscodingCreateParams,
    type TranscodingListParams as TranscodingListParams,
    type TranscodingDeleteParams as TranscodingDeleteParams,
  };
}
