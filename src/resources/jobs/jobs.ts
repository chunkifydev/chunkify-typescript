// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import * as FilesAPI from './files';
import { FileListResponse, Files } from './files';
import * as LogsAPI from './logs';
import { LogListParams, LogListResponse, Logs } from './logs';
import * as TranscodersAPI from './transcoders';
import { TranscoderListResponse, Transcoders } from './transcoders';
import { APIPromise } from '../../core/api-promise';
import { PagePromise, PaginatedResults, type PaginatedResultsParams } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Jobs extends APIResource {
  files: FilesAPI.Files = new FilesAPI.Files(this._client);
  logs: LogsAPI.Logs = new LogsAPI.Logs(this._client);
  transcoders: TranscodersAPI.Transcoders = new TranscodersAPI.Transcoders(this._client);

  /**
   * Create a new video processing job with specified parameters
   */
  create(body: JobCreateParams, options?: RequestOptions): APIPromise<Job> {
    return (this._client.post('/api/jobs', { body, ...options }) as APIPromise<{ data: Job }>)._thenUnwrap(
      (obj) => obj.data,
    );
  }

  /**
   * Retrieve details of a specific job
   */
  retrieve(jobID: string, options?: RequestOptions): APIPromise<Job> {
    return (this._client.get(path`/api/jobs/${jobID}`, options) as APIPromise<{ data: Job }>)._thenUnwrap(
      (obj) => obj.data,
    );
  }

  /**
   * Retrieve a list of jobs with optional filtering and pagination
   */
  list(
    query: JobListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<JobsPaginatedResults, Job> {
    return this._client.getAPIList('/api/jobs', PaginatedResults<Job>, { query, ...options });
  }

  /**
   * Delete a job.
   */
  delete(jobID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/api/jobs/${jobID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Cancel a job.
   */
  cancel(jobID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.post(path`/api/jobs/${jobID}/cancel`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type JobsPaginatedResults = PaginatedResults<Job>;

export interface HlsAv1 {
  id: 'hls_av1';

  /**
   * AudioBitrate specifies the audio bitrate in bits per second. Must be between
   * 32Kbps and 512Kbps.
   */
  audio_bitrate: number;

  /**
   * VideoBitrate specifies the video bitrate in bits per second. Must be between
   * 100Kbps and 50Mbps.
   */
  video_bitrate: number;

  /**
   * Bufsize specifies the video buffer size in bits. Must be between 100Kbps and
   * 50Mbps.
   */
  bufsize?: number;

  /**
   * Channels specifies the number of audio channels. Valid values: 1 (mono), 2
   * (stereo), 5 (5.1), 7 (7.1)
   */
  channels?: 1 | 2 | 5 | 7;

  /**
   * Crf (Constant Rate Factor) controls the quality of the output video. Lower
   * values mean better quality but larger file size. Range: 16 to 63. Recommended
   * values: 16-35 for high quality, 35-45 for good quality, 45-63 for acceptable
   * quality.
   */
  crf?: number;

  /**
   * DisableAudio indicates whether to disable audio processing.
   */
  disable_audio?: boolean;

  /**
   * DisableVideo indicates whether to disable video processing.
   */
  disable_video?: boolean;

  /**
   * Duration specifies the duration to process in seconds. Must be a positive value.
   */
  duration?: number;

  /**
   * Framerate specifies the output video frame rate. Must be between 15 and 120 fps.
   */
  framerate?: number;

  /**
   * Gop specifies the Group of Pictures (GOP) size. Must be between 1 and 300.
   */
  gop?: number;

  /**
   * Height specifies the output video height in pixels. Must be between -2 and 7680.
   * Use -2 for automatic calculation while maintaining aspect ratio.
   */
  height?: number;

  /**
   * HlsEnc enables encryption for HLS segments when set to true.
   */
  hls_enc?: boolean;

  /**
   * HlsEncIv specifies the initialization vector for encryption. Maximum length: 64
   * characters. Required when HlsEnc is true.
   */
  hls_enc_iv?: string;

  /**
   * HlsEncKey specifies the encryption key for HLS segments. Maximum length: 64
   * characters. Required when HlsEnc is true.
   */
  hls_enc_key?: string;

  /**
   * HlsEncKeyUrl specifies the URL where clients can fetch the encryption key.
   * Required when HlsEnc is true.
   */
  hls_enc_key_url?: string;

  /**
   * HlsSegmentType specifies the type of HLS segments. Valid values:
   *
   * - mpegts: Traditional MPEG-TS segments, better compatibility
   * - fmp4: Fragmented MP4 segments, better efficiency
   */
  hls_segment_type?: 'mpegts' | 'fmp4';

  /**
   * HlsTime specifies the duration of each HLS segment in seconds. Range: 1 to 10.
   * Shorter segments provide faster startup but more overhead, longer segments are
   * more efficient.
   */
  hls_time?: number;

  /**
   * Level specifies the AV1 profile level. Valid values: 30-31 (main), 41 (main10).
   * Higher levels support higher resolutions and bitrates but require more
   * processing power.
   */
  level?: 30 | 31 | 41;

  /**
   * Maxrate specifies the maximum video bitrate in bits per second. Must be between
   * 100Kbps and 50Mbps.
   */
  maxrate?: number;

  /**
   * Minrate specifies the minimum video bitrate in bits per second. Must be between
   * 100Kbps and 50Mbps.
   */
  minrate?: number;

  movflags?: string;

  /**
   * PixFmt specifies the pixel format. Valid value: yuv420p
   */
  pixfmt?:
    | 'yuv410p'
    | 'yuv411p'
    | 'yuv420p'
    | 'yuv422p'
    | 'yuv440p'
    | 'yuv444p'
    | 'yuvJ411p'
    | 'yuvJ420p'
    | 'yuvJ422p'
    | 'yuvJ440p'
    | 'yuvJ444p'
    | 'yuv420p10le'
    | 'yuv422p10le'
    | 'yuv440p10le'
    | 'yuv444p10le'
    | 'yuv420p12le'
    | 'yuv422p12le'
    | 'yuv440p12le'
    | 'yuv444p12le'
    | 'yuv420p10be'
    | 'yuv422p10be'
    | 'yuv440p10be'
    | 'yuv444p10be'
    | 'yuv420p12be'
    | 'yuv422p12be'
    | 'yuv440p12be'
    | 'yuv444p12be';

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
   * Profilev specifies the AV1 profile. Valid values:
   *
   * - main: Main profile, good for most applications
   * - main10: Main 10-bit profile, supports 10-bit color
   * - mainstillpicture: Still picture profile, optimized for single images
   */
  profilev?: 'main' | 'main10' | 'mainstillpicture';

  /**
   * Seek specifies the timestamp to start processing from (in seconds). Must be a
   * positive value.
   */
  seek?: number;

  /**
   * Width specifies the output video width in pixels. Must be between -2 and 7680.
   * Use -2 for automatic calculation while maintaining aspect ratio.
   */
  width?: number;
}

export interface HlsH264 {
  id: 'hls_h264';

  /**
   * AudioBitrate specifies the audio bitrate in bits per second. Must be between
   * 32Kbps and 512Kbps.
   */
  audio_bitrate: number;

  /**
   * VideoBitrate specifies the video bitrate in bits per second. Must be between
   * 100Kbps and 50Mbps.
   */
  video_bitrate: number;

  /**
   * Bufsize specifies the video buffer size in bits. Must be between 100Kbps and
   * 50Mbps.
   */
  bufsize?: number;

  /**
   * Channels specifies the number of audio channels. Valid values: 1 (mono), 2
   * (stereo), 5 (5.1), 7 (7.1)
   */
  channels?: 1 | 2 | 5 | 7;

  /**
   * Crf (Constant Rate Factor) controls the quality of the output video. Lower
   * values mean better quality but larger file size. Range: 16 to 35. Recommended
   * values: 18-28 for high quality, 23-28 for good quality, 28-35 for acceptable
   * quality.
   */
  crf?: number;

  /**
   * DisableAudio indicates whether to disable audio processing.
   */
  disable_audio?: boolean;

  /**
   * DisableVideo indicates whether to disable video processing.
   */
  disable_video?: boolean;

  /**
   * Duration specifies the duration to process in seconds. Must be a positive value.
   */
  duration?: number;

  /**
   * Framerate specifies the output video frame rate. Must be between 15 and 120 fps.
   */
  framerate?: number;

  /**
   * Gop specifies the Group of Pictures (GOP) size. Must be between 1 and 300.
   */
  gop?: number;

  /**
   * Height specifies the output video height in pixels. Must be between -2 and 7680.
   * Use -2 for automatic calculation while maintaining aspect ratio.
   */
  height?: number;

  /**
   * HlsEnc enables encryption for HLS segments when set to true.
   */
  hls_enc?: boolean;

  /**
   * HlsEncIv specifies the initialization vector for encryption. Maximum length: 64
   * characters. Required when HlsEnc is true.
   */
  hls_enc_iv?: string;

  /**
   * HlsEncKey specifies the encryption key for HLS segments. Maximum length: 64
   * characters. Required when HlsEnc is true.
   */
  hls_enc_key?: string;

  /**
   * HlsEncKeyUrl specifies the URL where clients can fetch the encryption key.
   * Required when HlsEnc is true.
   */
  hls_enc_key_url?: string;

  /**
   * HlsSegmentType specifies the type of HLS segments. Valid values:
   *
   * - mpegts: Traditional MPEG-TS segments, better compatibility
   * - fmp4: Fragmented MP4 segments, better efficiency
   */
  hls_segment_type?: 'mpegts' | 'fmp4';

  /**
   * HlsTime specifies the duration of each HLS segment in seconds. Range: 1 to 10.
   * Shorter segments provide faster startup but more overhead, longer segments are
   * more efficient.
   */
  hls_time?: number;

  /**
   * Level specifies the H.264 profile level. Valid values: 10-13 (baseline), 20-22
   * (main), 30-32 (high), 40-42 (high), 50-51 (high). Higher levels support higher
   * resolutions and bitrates but require more processing power.
   */
  level?: 10 | 11 | 12 | 13 | 20 | 21 | 22 | 30 | 31 | 32 | 40 | 41 | 42 | 50 | 51;

  /**
   * Maxrate specifies the maximum video bitrate in bits per second. Must be between
   * 100Kbps and 50Mbps.
   */
  maxrate?: number;

  /**
   * Minrate specifies the minimum video bitrate in bits per second. Must be between
   * 100Kbps and 50Mbps.
   */
  minrate?: number;

  movflags?: string;

  /**
   * PixFmt specifies the pixel format. Valid value: yuv420p
   */
  pixfmt?:
    | 'yuv410p'
    | 'yuv411p'
    | 'yuv420p'
    | 'yuv422p'
    | 'yuv440p'
    | 'yuv444p'
    | 'yuvJ411p'
    | 'yuvJ420p'
    | 'yuvJ422p'
    | 'yuvJ440p'
    | 'yuvJ444p'
    | 'yuv420p10le'
    | 'yuv422p10le'
    | 'yuv440p10le'
    | 'yuv444p10le'
    | 'yuv420p12le'
    | 'yuv422p12le'
    | 'yuv440p12le'
    | 'yuv444p12le'
    | 'yuv420p10be'
    | 'yuv422p10be'
    | 'yuv440p10be'
    | 'yuv444p10be'
    | 'yuv420p12be'
    | 'yuv422p12be'
    | 'yuv440p12be'
    | 'yuv444p12be';

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
   * Seek specifies the timestamp to start processing from (in seconds). Must be a
   * positive value.
   */
  seek?: number;

  /**
   * Width specifies the output video width in pixels. Must be between -2 and 7680.
   * Use -2 for automatic calculation while maintaining aspect ratio.
   */
  width?: number;

  /**
   * X264KeyInt specifies the maximum number of frames between keyframes for H.264
   * encoding. Range: 1 to 300. Higher values can improve compression but may affect
   * seeking.
   */
  x264_keyint?: number;
}

export interface HlsH265 {
  id: 'hls_h265';

  /**
   * AudioBitrate specifies the audio bitrate in bits per second. Must be between
   * 32Kbps and 512Kbps.
   */
  audio_bitrate: number;

  /**
   * VideoBitrate specifies the video bitrate in bits per second. Must be between
   * 100Kbps and 50Mbps.
   */
  video_bitrate: number;

  /**
   * Bufsize specifies the video buffer size in bits. Must be between 100Kbps and
   * 50Mbps.
   */
  bufsize?: number;

  /**
   * Channels specifies the number of audio channels. Valid values: 1 (mono), 2
   * (stereo), 5 (5.1), 7 (7.1)
   */
  channels?: 1 | 2 | 5 | 7;

  /**
   * Crf (Constant Rate Factor) controls the quality of the output video. Lower
   * values mean better quality but larger file size. Range: 16 to 35. Recommended
   * values: 18-28 for high quality, 23-28 for good quality, 28-35 for acceptable
   * quality.
   */
  crf?: number;

  /**
   * DisableAudio indicates whether to disable audio processing.
   */
  disable_audio?: boolean;

  /**
   * DisableVideo indicates whether to disable video processing.
   */
  disable_video?: boolean;

  /**
   * Duration specifies the duration to process in seconds. Must be a positive value.
   */
  duration?: number;

  /**
   * Framerate specifies the output video frame rate. Must be between 15 and 120 fps.
   */
  framerate?: number;

  /**
   * Gop specifies the Group of Pictures (GOP) size. Must be between 1 and 300.
   */
  gop?: number;

  /**
   * Height specifies the output video height in pixels. Must be between -2 and 7680.
   * Use -2 for automatic calculation while maintaining aspect ratio.
   */
  height?: number;

  /**
   * HlsEnc enables encryption for HLS segments when set to true.
   */
  hls_enc?: boolean;

  /**
   * HlsEncIv specifies the initialization vector for encryption. Maximum length: 64
   * characters. Required when HlsEnc is true.
   */
  hls_enc_iv?: string;

  /**
   * HlsEncKey specifies the encryption key for HLS segments. Maximum length: 64
   * characters. Required when HlsEnc is true.
   */
  hls_enc_key?: string;

  /**
   * HlsEncKeyUrl specifies the URL where clients can fetch the encryption key.
   * Required when HlsEnc is true.
   */
  hls_enc_key_url?: string;

  /**
   * HlsSegmentType specifies the type of HLS segments. Valid values:
   *
   * - mpegts: Traditional MPEG-TS segments, better compatibility
   * - fmp4: Fragmented MP4 segments, better efficiency
   */
  hls_segment_type?: 'mpegts' | 'fmp4';

  /**
   * HlsTime specifies the duration of each HLS segment in seconds. Range: 1 to 10.
   * Shorter segments provide faster startup but more overhead, longer segments are
   * more efficient.
   */
  hls_time?: number;

  /**
   * Level specifies the H.265 profile level. Valid values: 30-31 (main), 41
   * (main10). Higher levels support higher resolutions and bitrates but require more
   * processing power.
   */
  level?: 30 | 31 | 41;

  /**
   * Maxrate specifies the maximum video bitrate in bits per second. Must be between
   * 100Kbps and 50Mbps.
   */
  maxrate?: number;

  /**
   * Minrate specifies the minimum video bitrate in bits per second. Must be between
   * 100Kbps and 50Mbps.
   */
  minrate?: number;

  movflags?: string;

  /**
   * PixFmt specifies the pixel format. Valid value: yuv420p
   */
  pixfmt?:
    | 'yuv410p'
    | 'yuv411p'
    | 'yuv420p'
    | 'yuv422p'
    | 'yuv440p'
    | 'yuv444p'
    | 'yuvJ411p'
    | 'yuvJ420p'
    | 'yuvJ422p'
    | 'yuvJ440p'
    | 'yuvJ444p'
    | 'yuv420p10le'
    | 'yuv422p10le'
    | 'yuv440p10le'
    | 'yuv444p10le'
    | 'yuv420p12le'
    | 'yuv422p12le'
    | 'yuv440p12le'
    | 'yuv444p12le'
    | 'yuv420p10be'
    | 'yuv422p10be'
    | 'yuv440p10be'
    | 'yuv444p10be'
    | 'yuv420p12be'
    | 'yuv422p12be'
    | 'yuv440p12be'
    | 'yuv444p12be';

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
   * Profilev specifies the H.265 profile. Valid values:
   *
   * - main: Main profile, good for most applications
   * - main10: Main 10-bit profile, supports 10-bit color
   * - mainstillpicture: Still picture profile, optimized for single images
   */
  profilev?: 'main' | 'main10' | 'mainstillpicture';

  /**
   * Seek specifies the timestamp to start processing from (in seconds). Must be a
   * positive value.
   */
  seek?: number;

  /**
   * Width specifies the output video width in pixels. Must be between -2 and 7680.
   * Use -2 for automatic calculation while maintaining aspect ratio.
   */
  width?: number;

  /**
   * X265KeyInt specifies the maximum number of frames between keyframes for H.265
   * encoding. Range: 1 to 300. Higher values can improve compression but may affect
   * seeking.
   */
  x265_keyint?: number;
}

export interface Job {
  /**
   * Unique identifier for the job
   */
  id: string;

  /**
   * Billable time in seconds
   */
  billable_time: number;

  /**
   * Creation timestamp
   */
  created_at: string;

  /**
   * A template defines the transcoding parameters and settings for a job
   */
  format: Job.Format;

  /**
   * Progress percentage of the job (0-100)
   */
  progress: number;

  /**
   * ID of the source video being transcoded
   */
  source_id: string;

  /**
   * Current status of the job (e.g., "queued", "ingesting","transcoding",
   * "downloading", "merging", "uploading", "failed", "completed")
   */
  status: string;

  /**
   * Storage settings for where the job output will be saved
   */
  storage: Job.Storage;

  /**
   * The transcoder configuration for a job
   */
  transcoder: Job.Transcoder;

  /**
   * Last update timestamp
   */
  updated_at: string;

  /**
   * Error message for the job
   */
  error?: Shared.ChunkifyError;

  /**
   * HLS manifest ID
   */
  hls_manifest_id?: string;

  /**
   * Additional metadata for the job
   */
  metadata?: { [key: string]: string };

  /**
   * When the job started processing
   */
  started_at?: string;
}

export namespace Job {
  /**
   * A template defines the transcoding parameters and settings for a job
   */
  export interface Format {
    /**
     * Configuration parameters for the template. A map of configuration values
     * specific to the format For example, for mp4/h264 format this includes parameters
     * like crf, preset, profile etc.
     */
    config?: { [key: string]: unknown };

    /**
     * Name of the transcoding template.The format to use for transcoding. Valid
     * formats are: mp4/h264, mp4/h265, mp4/av1, webm/vp9, hls/h264, hls/h265, hls/av1,
     * jpg
     */
    name?: string;
  }

  /**
   * Storage settings for where the job output will be saved
   */
  export interface Storage {
    /**
     * ID of the storage
     */
    id?: string;

    /**
     * Path where the output will be stored
     */
    path?: string;
  }

  /**
   * The transcoder configuration for a job
   */
  export interface Transcoder {
    /**
     * Number of instances allocated
     */
    quantity?: number;

    /**
     * Type of transcoder instance
     */
    type?: string;
  }
}

/**
 * FFmpeg encoding parameters specific to JPEG image extraction.
 */
export interface Jpg {
  id: 'jpg';

  /**
   * Time interval in seconds at which frames are extracted from the video (e.g.,
   * interval=10 extracts frames at 0s, 10s, 20s, etc.). Must be between 1 and 60
   * seconds.
   */
  interval: number;

  chunk_duration?: number;

  /**
   * Duration specifies the duration to process in seconds. Must be a positive value.
   */
  duration?: number;

  frames?: number;

  height?: number;

  /**
   * Seek specifies the timestamp to start processing from (in seconds). Must be a
   * positive value.
   */
  seek?: number;

  sprite?: boolean;

  width?: number;
}

export interface MP4Av1 {
  id: 'mp4_av1';

  /**
   * AudioBitrate specifies the audio bitrate in bits per second. Must be between
   * 32Kbps and 512Kbps.
   */
  audio_bitrate?: number;

  /**
   * Bufsize specifies the video buffer size in bits. Must be between 100Kbps and
   * 50Mbps.
   */
  bufsize?: number;

  /**
   * Channels specifies the number of audio channels. Valid values: 1 (mono), 2
   * (stereo), 5 (5.1), 7 (7.1)
   */
  channels?: 1 | 2 | 5 | 7;

  /**
   * Crf (Constant Rate Factor) controls the quality of the output video. Lower
   * values mean better quality but larger file size. Range: 16 to 63. Recommended
   * values: 16-35 for high quality, 35-45 for good quality, 45-63 for acceptable
   * quality.
   */
  crf?: number;

  /**
   * DisableAudio indicates whether to disable audio processing.
   */
  disable_audio?: boolean;

  /**
   * DisableVideo indicates whether to disable video processing.
   */
  disable_video?: boolean;

  /**
   * Duration specifies the duration to process in seconds. Must be a positive value.
   */
  duration?: number;

  /**
   * Framerate specifies the output video frame rate. Must be between 15 and 120 fps.
   */
  framerate?: number;

  /**
   * Gop specifies the Group of Pictures (GOP) size. Must be between 1 and 300.
   */
  gop?: number;

  /**
   * Height specifies the output video height in pixels. Must be between -2 and 7680.
   * Use -2 for automatic calculation while maintaining aspect ratio.
   */
  height?: number;

  /**
   * Level specifies the AV1 profile level. Valid values: 30-31 (main), 41 (main10).
   * Higher levels support higher resolutions and bitrates but require more
   * processing power.
   */
  level?: 30 | 31 | 41;

  /**
   * Maxrate specifies the maximum video bitrate in bits per second. Must be between
   * 100Kbps and 50Mbps.
   */
  maxrate?: number;

  /**
   * Minrate specifies the minimum video bitrate in bits per second. Must be between
   * 100Kbps and 50Mbps.
   */
  minrate?: number;

  movflags?: string;

  /**
   * PixFmt specifies the pixel format. Valid value: yuv420p
   */
  pixfmt?:
    | 'yuv410p'
    | 'yuv411p'
    | 'yuv420p'
    | 'yuv422p'
    | 'yuv440p'
    | 'yuv444p'
    | 'yuvJ411p'
    | 'yuvJ420p'
    | 'yuvJ422p'
    | 'yuvJ440p'
    | 'yuvJ444p'
    | 'yuv420p10le'
    | 'yuv422p10le'
    | 'yuv440p10le'
    | 'yuv444p10le'
    | 'yuv420p12le'
    | 'yuv422p12le'
    | 'yuv440p12le'
    | 'yuv444p12le'
    | 'yuv420p10be'
    | 'yuv422p10be'
    | 'yuv440p10be'
    | 'yuv444p10be'
    | 'yuv420p12be'
    | 'yuv422p12be'
    | 'yuv440p12be'
    | 'yuv444p12be';

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
   * Profilev specifies the AV1 profile. Valid values:
   *
   * - main: Main profile, good for most applications
   * - main10: Main 10-bit profile, supports 10-bit color
   * - mainstillpicture: Still picture profile, optimized for single images
   */
  profilev?: 'main' | 'main10' | 'mainstillpicture';

  /**
   * Seek specifies the timestamp to start processing from (in seconds). Must be a
   * positive value.
   */
  seek?: number;

  /**
   * VideoBitrate specifies the video bitrate in bits per second. Must be between
   * 100Kbps and 50Mbps.
   */
  video_bitrate?: number;

  /**
   * Width specifies the output video width in pixels. Must be between -2 and 7680.
   * Use -2 for automatic calculation while maintaining aspect ratio.
   */
  width?: number;
}

export interface MP4H264 {
  id: 'mp4_h264';

  /**
   * AudioBitrate specifies the audio bitrate in bits per second. Must be between
   * 32Kbps and 512Kbps.
   */
  audio_bitrate?: number;

  /**
   * Bufsize specifies the video buffer size in bits. Must be between 100Kbps and
   * 50Mbps.
   */
  bufsize?: number;

  /**
   * Channels specifies the number of audio channels. Valid values: 1 (mono), 2
   * (stereo), 5 (5.1), 7 (7.1)
   */
  channels?: 1 | 2 | 5 | 7;

  /**
   * Crf (Constant Rate Factor) controls the quality of the output video. Lower
   * values mean better quality but larger file size. Range: 16 to 35. Recommended
   * values: 18-28 for high quality, 23-28 for good quality, 28-35 for acceptable
   * quality.
   */
  crf?: number;

  /**
   * DisableAudio indicates whether to disable audio processing.
   */
  disable_audio?: boolean;

  /**
   * DisableVideo indicates whether to disable video processing.
   */
  disable_video?: boolean;

  /**
   * Duration specifies the duration to process in seconds. Must be a positive value.
   */
  duration?: number;

  /**
   * Framerate specifies the output video frame rate. Must be between 15 and 120 fps.
   */
  framerate?: number;

  /**
   * Gop specifies the Group of Pictures (GOP) size. Must be between 1 and 300.
   */
  gop?: number;

  /**
   * Height specifies the output video height in pixels. Must be between -2 and 7680.
   * Use -2 for automatic calculation while maintaining aspect ratio.
   */
  height?: number;

  /**
   * Level specifies the H.264 profile level. Valid values: 10-13 (baseline), 20-22
   * (main), 30-32 (high), 40-42 (high), 50-51 (high). Higher levels support higher
   * resolutions and bitrates but require more processing power.
   */
  level?: 10 | 11 | 12 | 13 | 20 | 21 | 22 | 30 | 31 | 32 | 40 | 41 | 42 | 50 | 51;

  /**
   * Maxrate specifies the maximum video bitrate in bits per second. Must be between
   * 100Kbps and 50Mbps.
   */
  maxrate?: number;

  /**
   * Minrate specifies the minimum video bitrate in bits per second. Must be between
   * 100Kbps and 50Mbps.
   */
  minrate?: number;

  movflags?: string;

  /**
   * PixFmt specifies the pixel format. Valid value: yuv420p
   */
  pixfmt?:
    | 'yuv410p'
    | 'yuv411p'
    | 'yuv420p'
    | 'yuv422p'
    | 'yuv440p'
    | 'yuv444p'
    | 'yuvJ411p'
    | 'yuvJ420p'
    | 'yuvJ422p'
    | 'yuvJ440p'
    | 'yuvJ444p'
    | 'yuv420p10le'
    | 'yuv422p10le'
    | 'yuv440p10le'
    | 'yuv444p10le'
    | 'yuv420p12le'
    | 'yuv422p12le'
    | 'yuv440p12le'
    | 'yuv444p12le'
    | 'yuv420p10be'
    | 'yuv422p10be'
    | 'yuv440p10be'
    | 'yuv444p10be'
    | 'yuv420p12be'
    | 'yuv422p12be'
    | 'yuv440p12be'
    | 'yuv444p12be';

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
   * Seek specifies the timestamp to start processing from (in seconds). Must be a
   * positive value.
   */
  seek?: number;

  /**
   * VideoBitrate specifies the video bitrate in bits per second. Must be between
   * 100Kbps and 50Mbps.
   */
  video_bitrate?: number;

  /**
   * Width specifies the output video width in pixels. Must be between -2 and 7680.
   * Use -2 for automatic calculation while maintaining aspect ratio.
   */
  width?: number;

  /**
   * X264KeyInt specifies the maximum number of frames between keyframes for H.264
   * encoding. Range: 1 to 300. Higher values can improve compression but may affect
   * seeking.
   */
  x264_keyint?: number;
}

export interface MP4H265 {
  id: 'mp4_h265';

  /**
   * AudioBitrate specifies the audio bitrate in bits per second. Must be between
   * 32Kbps and 512Kbps.
   */
  audio_bitrate?: number;

  /**
   * Bufsize specifies the video buffer size in bits. Must be between 100Kbps and
   * 50Mbps.
   */
  bufsize?: number;

  /**
   * Channels specifies the number of audio channels. Valid values: 1 (mono), 2
   * (stereo), 5 (5.1), 7 (7.1)
   */
  channels?: 1 | 2 | 5 | 7;

  /**
   * Crf (Constant Rate Factor) controls the quality of the output video. Lower
   * values mean better quality but larger file size. Range: 16 to 35. Recommended
   * values: 18-28 for high quality, 23-28 for good quality, 28-35 for acceptable
   * quality.
   */
  crf?: number;

  /**
   * DisableAudio indicates whether to disable audio processing.
   */
  disable_audio?: boolean;

  /**
   * DisableVideo indicates whether to disable video processing.
   */
  disable_video?: boolean;

  /**
   * Duration specifies the duration to process in seconds. Must be a positive value.
   */
  duration?: number;

  /**
   * Framerate specifies the output video frame rate. Must be between 15 and 120 fps.
   */
  framerate?: number;

  /**
   * Gop specifies the Group of Pictures (GOP) size. Must be between 1 and 300.
   */
  gop?: number;

  /**
   * Height specifies the output video height in pixels. Must be between -2 and 7680.
   * Use -2 for automatic calculation while maintaining aspect ratio.
   */
  height?: number;

  /**
   * Level specifies the H.265 profile level. Valid values: 30-31 (main), 41
   * (main10). Higher levels support higher resolutions and bitrates but require more
   * processing power.
   */
  level?: 30 | 31 | 41;

  /**
   * Maxrate specifies the maximum video bitrate in bits per second. Must be between
   * 100Kbps and 50Mbps.
   */
  maxrate?: number;

  /**
   * Minrate specifies the minimum video bitrate in bits per second. Must be between
   * 100Kbps and 50Mbps.
   */
  minrate?: number;

  movflags?: string;

  /**
   * PixFmt specifies the pixel format. Valid value: yuv420p
   */
  pixfmt?:
    | 'yuv410p'
    | 'yuv411p'
    | 'yuv420p'
    | 'yuv422p'
    | 'yuv440p'
    | 'yuv444p'
    | 'yuvJ411p'
    | 'yuvJ420p'
    | 'yuvJ422p'
    | 'yuvJ440p'
    | 'yuvJ444p'
    | 'yuv420p10le'
    | 'yuv422p10le'
    | 'yuv440p10le'
    | 'yuv444p10le'
    | 'yuv420p12le'
    | 'yuv422p12le'
    | 'yuv440p12le'
    | 'yuv444p12le'
    | 'yuv420p10be'
    | 'yuv422p10be'
    | 'yuv440p10be'
    | 'yuv444p10be'
    | 'yuv420p12be'
    | 'yuv422p12be'
    | 'yuv440p12be'
    | 'yuv444p12be';

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
   * Profilev specifies the H.265 profile. Valid values:
   *
   * - main: Main profile, good for most applications
   * - main10: Main 10-bit profile, supports 10-bit color
   * - mainstillpicture: Still picture profile, optimized for single images
   */
  profilev?: 'main' | 'main10' | 'mainstillpicture';

  /**
   * Seek specifies the timestamp to start processing from (in seconds). Must be a
   * positive value.
   */
  seek?: number;

  /**
   * VideoBitrate specifies the video bitrate in bits per second. Must be between
   * 100Kbps and 50Mbps.
   */
  video_bitrate?: number;

  /**
   * Width specifies the output video width in pixels. Must be between -2 and 7680.
   * Use -2 for automatic calculation while maintaining aspect ratio.
   */
  width?: number;

  /**
   * X265KeyInt specifies the maximum number of frames between keyframes for H.265
   * encoding. Range: 1 to 300. Higher values can improve compression but may affect
   * seeking.
   */
  x265_keyint?: number;
}

export interface WebmVp9 {
  id: 'webm_vp9';

  /**
   * AudioBitrate specifies the audio bitrate in bits per second. Must be between
   * 32Kbps and 512Kbps.
   */
  audio_bitrate?: number;

  /**
   * Bufsize specifies the video buffer size in bits. Must be between 100Kbps and
   * 50Mbps.
   */
  bufsize?: number;

  /**
   * Channels specifies the number of audio channels. Valid values: 1 (mono), 2
   * (stereo), 5 (5.1), 7 (7.1)
   */
  channels?: 1 | 2 | 5 | 7;

  /**
   * CpuUsed specifies the CPU usage level for VP9 encoding. Range: 0 to 8. Lower
   * values mean better quality but slower encoding, higher values mean faster
   * encoding but lower quality. Recommended values: 0-2 for high quality, 2-4 for
   * good quality, 4-6 for balanced, 6-8 for speed
   */
  cpu_used?: string;

  /**
   * Crf (Constant Rate Factor) controls the quality of the output video. Lower
   * values mean better quality but larger file size. Range: 15 to 35. Recommended
   * values: 18-28 for high quality, 23-28 for good quality, 28-35 for acceptable
   * quality.
   */
  crf?: number;

  /**
   * DisableAudio indicates whether to disable audio processing.
   */
  disable_audio?: boolean;

  /**
   * DisableVideo indicates whether to disable video processing.
   */
  disable_video?: boolean;

  /**
   * Duration specifies the duration to process in seconds. Must be a positive value.
   */
  duration?: number;

  /**
   * Framerate specifies the output video frame rate. Must be between 15 and 120 fps.
   */
  framerate?: number;

  /**
   * Gop specifies the Group of Pictures (GOP) size. Must be between 1 and 300.
   */
  gop?: number;

  /**
   * Height specifies the output video height in pixels. Must be between -2 and 7680.
   * Use -2 for automatic calculation while maintaining aspect ratio.
   */
  height?: number;

  /**
   * Maxrate specifies the maximum video bitrate in bits per second. Must be between
   * 100Kbps and 50Mbps.
   */
  maxrate?: number;

  /**
   * Minrate specifies the minimum video bitrate in bits per second. Must be between
   * 100Kbps and 50Mbps.
   */
  minrate?: number;

  /**
   * PixFmt specifies the pixel format. Valid value: yuv420p
   */
  pixfmt?:
    | 'yuv410p'
    | 'yuv411p'
    | 'yuv420p'
    | 'yuv422p'
    | 'yuv440p'
    | 'yuv444p'
    | 'yuvJ411p'
    | 'yuvJ420p'
    | 'yuvJ422p'
    | 'yuvJ440p'
    | 'yuvJ444p'
    | 'yuv420p10le'
    | 'yuv422p10le'
    | 'yuv440p10le'
    | 'yuv444p10le'
    | 'yuv420p12le'
    | 'yuv422p12le'
    | 'yuv440p12le'
    | 'yuv444p12le'
    | 'yuv420p10be'
    | 'yuv422p10be'
    | 'yuv440p10be'
    | 'yuv444p10be'
    | 'yuv420p12be'
    | 'yuv422p12be'
    | 'yuv440p12be'
    | 'yuv444p12be';

  /**
   * Quality specifies the VP9 encoding quality preset. Valid values:
   *
   * - good: Balanced quality preset, good for most applications
   * - best: Best quality preset, slower encoding
   * - realtime: Fast encoding preset, suitable for live streaming
   */
  quality?: 'good' | 'best' | 'realtime';

  /**
   * Seek specifies the timestamp to start processing from (in seconds). Must be a
   * positive value.
   */
  seek?: number;

  /**
   * VideoBitrate specifies the video bitrate in bits per second. Must be between
   * 100Kbps and 50Mbps.
   */
  video_bitrate?: number;

  /**
   * Width specifies the output video width in pixels. Must be between -2 and 7680.
   * Use -2 for automatic calculation while maintaining aspect ratio.
   */
  width?: number;
}

export interface JobCreateParams {
  /**
   * Required format configuration, one and only one valid format configuration must
   * be provided. If you want to use a format without specifying any configuration,
   * use an empty object in the corresponding field.
   */
  format: MP4Av1 | MP4H264 | MP4H265 | WebmVp9 | HlsAv1 | HlsH264 | HlsH265 | Jpg;

  /**
   * The ID of the source file to transcode
   */
  source_id: string;

  /**
   * Optional HLS manifest configuration Use the same hls manifest ID to group
   * multiple jobs into a single HLS manifest By default, it's automatically
   * generated if no set for HLS jobs
   */
  hls_manifest_id?: string;

  /**
   * Optional metadata to attach to the job (max 1024 bytes)
   */
  metadata?: { [key: string]: string };

  /**
   * Optional storage configuration
   */
  storage?: JobCreateParams.Storage;

  /**
   * Optional transcoder configuration. If not provided, the system will
   * automatically calculate the optimal quantity and CPU type based on the source
   * file specifications and output requirements. This auto-scaling ensures efficient
   * resource utilization.
   */
  transcoder?: JobCreateParams.Transcoder;
}

export namespace JobCreateParams {
  /**
   * Optional storage configuration
   */
  export interface Storage {
    /**
     * Storage Id specifies the storage configuration to use from pre-configured
     * storage options. Must be 4-64 characters long and contain only alphanumeric
     * characters, underscores and hyphens. Optional if Storage Path is provided.
     */
    id?: string;

    /**
     * Storage Path specifies a custom storage path where processed files will be
     * stored. Must be a valid file path with max length of 1024 characters. Optional
     * if Storage Id is provided.
     */
    path?: string;
  }

  /**
   * Optional transcoder configuration. If not provided, the system will
   * automatically calculate the optimal quantity and CPU type based on the source
   * file specifications and output requirements. This auto-scaling ensures efficient
   * resource utilization.
   */
  export interface Transcoder {
    /**
     * Quantity specifies the number of transcoder instances to use (1-50). Required if
     * Type is set.
     */
    quantity?: number;

    /**
     * Type specifies the CPU configuration for each transcoder instance. Required if
     * Quantity is set.
     */
    type?: '4vCPU' | '8vCPU' | '16vCPU';
  }
}

export interface JobListParams extends PaginatedResultsParams {
  /**
   * Filter by job ID
   */
  id?: string;

  created?: JobListParams.Created;

  /**
   * Filter by format name
   */
  format_name?: string;

  /**
   * Filter by hls manifest ID
   */
  hls_manifest_id?: string;

  /**
   * Filter by metadata (format: key:value,key2:value2)
   */
  metadata?: string;

  /**
   * Filter by source ID
   */
  source_id?: string;

  /**
   * Filter by job status
   */
  status?: string;
}

export namespace JobListParams {
  export interface Created {
    /**
     * Filter by creation date greater than or equal
     */
    gte?: string;

    /**
     * Filter by creation date less than or equal
     */
    lte?: string;

    /**
     * Sort by creation date (asc/desc)
     */
    sort?: string;
  }
}

Jobs.Files = Files;
Jobs.Logs = Logs;
Jobs.Transcoders = Transcoders;

export declare namespace Jobs {
  export {
    type HlsAv1 as HlsAv1,
    type HlsH264 as HlsH264,
    type HlsH265 as HlsH265,
    type Job as Job,
    type Jpg as Jpg,
    type MP4Av1 as MP4Av1,
    type MP4H264 as MP4H264,
    type MP4H265 as MP4H265,
    type WebmVp9 as WebmVp9,
    type JobsPaginatedResults as JobsPaginatedResults,
    type JobCreateParams as JobCreateParams,
    type JobListParams as JobListParams,
  };

  export { Files as Files, type FileListResponse as FileListResponse };

  export { Logs as Logs, type LogListResponse as LogListResponse, type LogListParams as LogListParams };

  export { Transcoders as Transcoders, type TranscoderListResponse as TranscoderListResponse };
}
