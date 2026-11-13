// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Metrics extends APIResource {
  /**
   * Retrieve Asset outcomes, timings, output sizes and source profiles by UTC
   * creation date.
   */
  assets(
    query: MetricAssetsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MetricsAssets> {
    return (
      this._client.get('/metrics/assets', {
        query,
        ...options,
        __security: { projectAccessTokenAuth: true },
      }) as APIPromise<{ data: MetricsAssets }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Retrieve recorded additions and successful removals by storage and UTC date.
   * Historical coverage depends on event retention.
   */
  storage(
    query: MetricStorageParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MetricsStorage> {
    return (
      this._client.get('/metrics/storage', {
        query,
        ...options,
        __security: { projectAccessTokenAuth: true },
      }) as APIPromise<{ data: MetricsStorage }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Retrieve project usage totals and daily values for a UTC date range.
   */
  usage(
    query: MetricUsageParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MetricsUsage> {
    return (
      this._client.get('/metrics/usage', {
        query,
        ...options,
        __security: { projectAccessTokenAuth: true },
      }) as APIPromise<{ data: MetricsUsage }>
    )._thenUnwrap((obj) => obj.data);
  }
}

/**
 * Asset outcomes grouped by Asset creation date.
 */
export interface MetricsAssetCounts {
  /**
   * Completed specifies Assets with a recorded ready timestamp.
   */
  completed: number;

  /**
   * Failed specifies retained Assets currently in failed status.
   */
  failed: number;

  /**
   * ProcessedSeconds specifies measured media duration of completed Assets,
   * preserving fractional seconds.
   */
  processed_seconds: number;

  /**
   * Saved specifies retained Assets created in the period.
   */
  saved: number;
}

/**
 * Asset measurements grouped by creation day.
 */
export interface MetricsAssetDay extends MetricsAssetValues {
  /**
   * Date specifies the UTC Asset creation day.
   */
  date: string;
}

/**
 * Measured output sizes for completed Assets. Sample counts describe measurement
 * coverage.
 */
export interface MetricsAssetOutputs {
  /**
   * MeasuredAssetCount specifies completed Assets with at least one measured
   * rendition.
   */
  measured_asset_count: number;

  /**
   * StaticBytes specifies the sum of measured ready static rendition sizes. Null
   * when no measurements exist.
   */
  static_bytes: number | null;

  /**
   * StaticSampleCount specifies ready static renditions with measured sizes.
   */
  static_sample_count: number;

  /**
   * StreamingBytes specifies the sum of measured streaming rendition sizes. Null
   * when no measurements exist.
   */
  streaming_bytes: number | null;

  /**
   * StreamingSampleCount specifies streaming renditions with measured sizes.
   */
  streaming_sample_count: number;
}

/**
 * Source profiles count Assets, not unique Sources.
 */
export interface MetricsAssetSources {
  /**
   * AssetsByCodec specifies Asset counts by normalized source video codec, including
   * unknown. All recorded codecs are returned.
   */
  assets_by_codec: { [key: string]: number };

  /**
   * AssetsByDuration specifies Asset counts by source duration. Keys are under_1m,
   * 1_to_5m, 5_to_10m, 10_to_30m, 30_to_60m, over_60m and unknown. Boundaries are
   * 60, 300, 600, 1800 and 3600 seconds; exactly 3600 belongs to 30_to_60m.
   */
  assets_by_duration: { [key: string]: number };

  /**
   * AssetsByResolution specifies Asset counts by source resolution. Keys are
   * up_to_576, 577_to_720, 721_to_1080, 1081_to_2159, 2160_plus and unknown, using
   * the shorter pixel edge.
   */
  assets_by_resolution: { [key: string]: number };
}

/**
 * Streaming output distribution on completed Assets.
 */
export interface MetricsAssetStreaming {
  /**
   * AssetCount specifies completed Assets, including those with no streaming
   * renditions.
   */
  asset_count: number;

  /**
   * AssetsByHighestResolution specifies counts by highest measured streaming
   * resolution. Keys are up_to_576, 577_to_720, 721_to_1080, 1081_to_2159, 2160_plus
   * and unknown, using the shorter pixel edge.
   */
  assets_by_highest_resolution: { [key: string]: number };

  /**
   * RenditionCount specifies streaming renditions on completed Assets.
   */
  rendition_count: number;

  /**
   * RenditionsPerAsset specifies rendition_count divided by asset_count. Null when
   * no completed Assets exist.
   */
  renditions_per_asset: number | null;
}

/**
 * Lifecycle timing measurements. Period medians use all samples, not averages of
 * daily medians.
 */
export interface MetricsAssetTimings {
  /**
   * CompletionMedianSeconds specifies the median elapsed time from creation to full
   * readiness. Null when no samples exist.
   */
  completion_median_seconds: number | null;

  /**
   * CompletionSampleCount specifies Assets with a full readiness measurement.
   */
  completion_sample_count: number;

  /**
   * PlaybackMedianSeconds specifies the median elapsed time from creation to
   * playback readiness. Null when no samples exist.
   */
  playback_median_seconds: number | null;

  /**
   * PlaybackSampleCount specifies Assets with a playback readiness measurement.
   */
  playback_sample_count: number;
}

/**
 * Asset measurements for a creation-date cohort.
 */
export interface MetricsAssetValues {
  /**
   * Asset outcomes grouped by Asset creation date.
   */
  assets: MetricsAssetCounts;

  /**
   * Measured output sizes for completed Assets. Sample counts describe measurement
   * coverage.
   */
  outputs: MetricsAssetOutputs;

  /**
   * Source profiles count Assets, not unique Sources.
   */
  sources: MetricsAssetSources;

  /**
   * Streaming output distribution on completed Assets.
   */
  streaming: MetricsAssetStreaming;

  /**
   * Lifecycle timing measurements. Period medians use all samples, not averages of
   * daily medians.
   */
  timings: MetricsAssetTimings;
}

/**
 * Measurements saved on retained Assets. Explicit deletion can change historical
 * results; temporary media cleanup does not erase saved Asset measurements.
 */
export interface MetricsAssets {
  /**
   * Daily specifies one record for each selected creation day, oldest first.
   */
  daily: Array<MetricsAssetDay>;

  /**
   * From specifies the inclusive UTC start date.
   */
  from: string;

  /**
   * Summary specifies the complete creation-date cohort.
   */
  summary: MetricsAssetValues;

  /**
   * To specifies the exclusive UTC end date.
   */
  to: string;
}

/**
 * Settled credits in integer units, with 10000 units equal to USD 1 of credits.
 * Category values are parts of total, not additional charges.
 */
export interface MetricsCreditsSpent {
  /**
   * Amount specifies settled credits spent on assets. Integer units; 10000 units
   * equal USD 1 of credits.
   */
  assets: number;

  /**
   * Amount specifies settled credits spent on egress. Integer units; 10000 units
   * equal USD 1 of credits.
   */
  egress: number;

  /**
   * Amount specifies settled credits spent on static renditions. Integer units;
   * 10000 units equal USD 1 of credits.
   */
  static_renditions: number;

  /**
   * Amount specifies settled credits spent on thumbnails. Integer units; 10000 units
   * equal USD 1 of credits.
   */
  thumbnails: number;

  /**
   * Total specifies the sum of these media-processing and output-egress charges.
   * Integer units; 10000 units equal USD 1 of credits.
   */
  total: number;

  /**
   * Amount specifies settled credits spent on transcodings. Integer units; 10000
   * units equal USD 1 of credits.
   */
  transcodings: number;

  /**
   * Amount specifies settled credits spent on transcription. Integer units; 10000
   * units equal USD 1 of credits.
   */
  transcription: number;

  /**
   * Amount specifies settled credits spent on translation. Integer units; 10000
   * units equal USD 1 of credits.
   */
  translation: number;
}

/**
 * Recorded additions and successful removals within event retention. Excludes
 * external storage changes and does not measure current storage size.
 */
export interface MetricsStorage {
  /**
   * From specifies the inclusive UTC start date.
   */
  from: string;

  /**
   * Storages specifies persistent project storage configurations, including those
   * without recorded activity. Chunkify temporary storage is excluded.
   */
  storages: Array<MetricsStorageEntry>;

  /**
   * To specifies the exclusive UTC end date.
   */
  to: string;
}

/**
 * Recorded storage activity grouped by event day.
 */
export interface MetricsStorageDay extends MetricsStorageValues {
  /**
   * Date specifies the UTC event day.
   */
  date: string;
}

/**
 * Activity for one persistent storage configuration.
 */
export interface MetricsStorageEntry {
  /**
   * Daily specifies one record for each selected event day, oldest first.
   */
  daily: Array<MetricsStorageDay>;

  /**
   * StorageId identifies the persistent storage configuration.
   */
  storage_id: string;

  /**
   * Summary specifies recorded activity in the selected period.
   */
  summary: MetricsStorageValues;
}

/**
 * Recorded storage activity in bytes.
 */
export interface MetricsStorageValues {
  /**
   * AssetBytesAdded specifies recorded Asset package additions.
   */
  asset_bytes_added: number;

  /**
   * BytesRemoved specifies recorded successful file removals as a positive amount.
   */
  bytes_removed: number;

  /**
   * NetBytesChange specifies additions minus successful removals. This may be
   * negative and is not bucket occupancy.
   */
  net_bytes_change: number;

  /**
   * SourceBytesAdded specifies recorded Source additions.
   */
  source_bytes_added: number;

  /**
   * StaticRenditionBytesAdded specifies recorded static rendition additions.
   */
  static_rendition_bytes_added: number;
}

/**
 * Project usage for the selected UTC accounting period.
 */
export interface MetricsUsage {
  /**
   * Daily specifies one record for every selected day, oldest first.
   */
  daily: Array<MetricsUsageDay>;

  /**
   * From specifies the inclusive UTC start date.
   */
  from: string;

  /**
   * Summary specifies totals across the selected period.
   */
  summary: MetricsUsageValues;

  /**
   * To specifies the exclusive UTC end date.
   */
  to: string;
}

/**
 * Asset processing usage.
 */
export interface MetricsUsageAssets {
  /**
   * Failed specifies recorded failed Asset outcomes.
   */
  failed: number;

  /**
   * InputSeconds specifies settled billable Asset input duration.
   */
  input_seconds: number;

  /**
   * Video duration in seconds by pricing resolution tier: sd, hd, 2k and uhd.
   */
  input_seconds_by_resolution: { [key: string]: number };

  /**
   * Ready specifies recorded successful Asset outcomes.
   */
  ready: number;
}

/**
 * Caption processing usage.
 */
export interface MetricsUsageCaptions {
  /**
   * TranscriptionSeconds specifies audio duration transcribed.
   */
  transcription_seconds: number;

  /**
   * TranslationSeconds specifies caption duration translated, counted once per
   * target language.
   */
  translation_seconds: number;
}

/**
 * Daily recorded usage. Inactive days contain zero counters.
 */
export interface MetricsUsageDay extends MetricsUsageValues {
  /**
   * Date specifies the UTC accounting day.
   */
  date: string;
}

/**
 * Recorded output egress eligible for the transfer tariff. Provider-exempt
 * transfers are excluded.
 */
export interface MetricsUsageEgress {
  /**
   * Bytes specifies tariff-eligible output transfer bytes for Asset preparation.
   */
  asset_preparation_bytes: number;

  /**
   * Bytes specifies tariff-eligible output transfer bytes for streaming renditions.
   */
  asset_rendition_bytes: number;

  /**
   * BillableBytes specifies external output bytes charged after the allowance.
   */
  billable_bytes: number;

  /**
   * Bytes specifies tariff-eligible output transfer bytes for captions.
   */
  caption_bytes: number;

  /**
   * IncludedBytes specifies external output bytes covered by the allowance.
   */
  included_bytes: number;

  /**
   * Bytes specifies tariff-eligible output transfer bytes for static renditions.
   */
  static_rendition_bytes: number;

  /**
   * Bytes specifies tariff-eligible output transfer bytes for Thumbnails.
   */
  thumbnail_bytes: number;

  /**
   * TotalBytes specifies the sum of tariff-eligible output transfers.
   */
  total_bytes: number;

  /**
   * Bytes specifies tariff-eligible output transfer bytes for Transcodings.
   */
  transcoding_bytes: number;
}

/**
 * Webhook delivery activity.
 */
export interface MetricsUsageNotifications {
  /**
   * Failed specifies recorded failed webhook delivery attempts.
   */
  failed: number;

  /**
   * Sent specifies recorded successful webhook deliveries.
   */
  sent: number;
}

/**
 * Source ingestion activity.
 */
export interface MetricsUsageSources {
  /**
   * Bytes specifies cumulative ingested Source bytes, not current storage occupancy.
   */
  bytes: number;

  /**
   * Created specifies the number of ingested Sources.
   */
  created: number;

  /**
   * IngestedSeconds specifies ingested media duration in seconds.
   */
  ingested_seconds: number;
}

/**
 * Static rendition usage.
 */
export interface MetricsUsageStaticRenditions {
  /**
   * AudioOutputSeconds specifies the audio-only subset of output_seconds.
   */
  audio_output_seconds: number;

  /**
   * OutputSeconds specifies settled billable output duration, including audio-only
   * output.
   */
  output_seconds: number;

  /**
   * Video duration in seconds by pricing resolution tier. Contains sd, hd, 2k and
   * uhd keys; audio is reported separately.
   */
  output_seconds_by_resolution: { [key: string]: number };
}

/**
 * Thumbnail processing usage.
 */
export interface MetricsUsageThumbnails {
  /**
   * ImagesPublished specifies the number of published thumbnail images.
   */
  images_published: number;

  /**
   * SetsFailed specifies recorded failed Thumbnail requests.
   */
  sets_failed: number;

  /**
   * SetsReady specifies recorded successful Thumbnail requests.
   */
  sets_ready: number;
}

/**
 * Standalone Transcoding usage.
 */
export interface MetricsUsageTranscodings {
  /**
   * AudioOutputSeconds specifies the audio-only subset of output_seconds.
   */
  audio_output_seconds: number;

  /**
   * Failed specifies recorded failed Transcoding outcomes.
   */
  failed: number;

  /**
   * OutputSeconds specifies settled billable output duration, including audio-only
   * output.
   */
  output_seconds: number;

  /**
   * Video duration in seconds by pricing resolution tier. Contains sd, hd, 2k and
   * uhd keys; audio is reported separately.
   */
  output_seconds_by_resolution: { [key: string]: number };

  /**
   * Ready specifies recorded successful Transcoding outcomes.
   */
  ready: number;
}

/**
 * Upload activity.
 */
export interface MetricsUsageUploads {
  /**
   * Bytes specifies successfully uploaded bytes.
   */
  bytes: number;

  /**
   * Completed specifies successfully completed Uploads.
   */
  completed: number;

  /**
   * Failed specifies recorded failed Uploads.
   */
  failed: number;
}

/**
 * Recorded usage for a UTC accounting day or a complete period.
 */
export interface MetricsUsageValues {
  /**
   * Asset processing usage.
   */
  assets: MetricsUsageAssets;

  /**
   * Caption processing usage.
   */
  captions: MetricsUsageCaptions;

  /**
   * Settled credits in integer units, with 10000 units equal to USD 1 of credits.
   * Category values are parts of total, not additional charges.
   */
  credits_spent: MetricsCreditsSpent;

  /**
   * Recorded output egress eligible for the transfer tariff. Provider-exempt
   * transfers are excluded.
   */
  egress: MetricsUsageEgress;

  /**
   * Webhook delivery activity.
   */
  notifications: MetricsUsageNotifications;

  /**
   * Source ingestion activity.
   */
  sources: MetricsUsageSources;

  /**
   * Static rendition usage.
   */
  static_renditions: MetricsUsageStaticRenditions;

  /**
   * Thumbnail processing usage.
   */
  thumbnails: MetricsUsageThumbnails;

  /**
   * Standalone Transcoding usage.
   */
  transcodings: MetricsUsageTranscodings;

  /**
   * Upload activity.
   */
  uploads: MetricsUsageUploads;
}

export interface MetricAssetsParams {
  /**
   * Response format. Defaults to JSON unless Accept requests CSV. Overrides Accept
   * when supplied; errors remain JSON.
   */
  format?: 'json' | 'csv';

  /**
   * Inclusive UTC start date, YYYY-MM-DD. Supply both dates for a custom range of at
   * most 366 days. Omit both for the past 7 UTC calendar days including today.
   */
  from?: string;

  /**
   * Exclusive UTC end date, YYYY-MM-DD. Must be after from and at most 366 days
   * later.
   */
  to?: string;
}

export interface MetricStorageParams {
  /**
   * Response format. Defaults to JSON unless Accept requests CSV. Overrides Accept
   * when supplied; errors remain JSON.
   */
  format?: 'json' | 'csv';

  /**
   * Inclusive UTC start date, YYYY-MM-DD. Supply both dates for a custom range of at
   * most 366 days. Omit both for the past 7 UTC calendar days including today.
   */
  from?: string;

  /**
   * Filter to one persistent storage configuration in the authenticated project.
   */
  storage_id?: string;

  /**
   * Exclusive UTC end date, YYYY-MM-DD. Must be after from and at most 366 days
   * later.
   */
  to?: string;
}

export interface MetricUsageParams {
  /**
   * Response format. Defaults to JSON unless Accept requests CSV. Overrides Accept
   * when supplied; errors remain JSON.
   */
  format?: 'json' | 'csv';

  /**
   * Inclusive UTC start date, YYYY-MM-DD. Supply both dates for a custom range of at
   * most 366 days. Omit both for the past 7 UTC calendar days including today.
   */
  from?: string;

  /**
   * Exclusive UTC end date, YYYY-MM-DD. Must be after from and at most 366 days
   * later.
   */
  to?: string;
}

export declare namespace Metrics {
  export {
    type MetricsAssetCounts as MetricsAssetCounts,
    type MetricsAssetDay as MetricsAssetDay,
    type MetricsAssetOutputs as MetricsAssetOutputs,
    type MetricsAssetSources as MetricsAssetSources,
    type MetricsAssetStreaming as MetricsAssetStreaming,
    type MetricsAssetTimings as MetricsAssetTimings,
    type MetricsAssetValues as MetricsAssetValues,
    type MetricsAssets as MetricsAssets,
    type MetricsCreditsSpent as MetricsCreditsSpent,
    type MetricsStorage as MetricsStorage,
    type MetricsStorageDay as MetricsStorageDay,
    type MetricsStorageEntry as MetricsStorageEntry,
    type MetricsStorageValues as MetricsStorageValues,
    type MetricsUsage as MetricsUsage,
    type MetricsUsageAssets as MetricsUsageAssets,
    type MetricsUsageCaptions as MetricsUsageCaptions,
    type MetricsUsageDay as MetricsUsageDay,
    type MetricsUsageEgress as MetricsUsageEgress,
    type MetricsUsageNotifications as MetricsUsageNotifications,
    type MetricsUsageSources as MetricsUsageSources,
    type MetricsUsageStaticRenditions as MetricsUsageStaticRenditions,
    type MetricsUsageThumbnails as MetricsUsageThumbnails,
    type MetricsUsageTranscodings as MetricsUsageTranscodings,
    type MetricsUsageUploads as MetricsUsageUploads,
    type MetricsUsageValues as MetricsUsageValues,
    type MetricAssetsParams as MetricAssetsParams,
    type MetricStorageParams as MetricStorageParams,
    type MetricUsageParams as MetricUsageParams,
  };
}
