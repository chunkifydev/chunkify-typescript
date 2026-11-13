// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import * as ThumbnailsAPI from '../thumbnails';
import { APIPromise } from '../../core/api-promise';
import { PagePromise, PaginatedResults, type PaginatedResultsParams } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Automatic video-on-demand Assets and independent H.264 MP4 static renditions.
 */
export class Outputs extends APIResource {
  /**
   * Create one caption, static rendition or additional thumbnail output. The
   * accepted output processes asynchronously and is returned in the same envelope as
   * output reads.
   *
   * @example
   * ```ts
   * const assetOutput = await client.assets.outputs.create(
   *   'assetId',
   *   {
   *     output: {
   *       params: { resolution: '1080p' },
   *       type: 'static_rendition',
   *     },
   *   },
   * );
   * ```
   */
  create(assetID: string, params: OutputCreateParams, options?: RequestOptions): APIPromise<AssetOutput> {
    const { output } = params;
    return (
      this._client.post(path`/assets/${assetID}/outputs`, {
        body: output,
        ...options,
        __security: { projectAccessTokenAuth: true },
      }) as APIPromise<{ data: AssetOutput }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Retrieve one output belonging to the specified Asset and authenticated Project.
   * Delivery URLs follow the output resource retention and expiry rules.
   *
   * @example
   * ```ts
   * const assetOutput = await client.assets.outputs.retrieve(
   *   'outputId',
   *   { assetId: 'assetId' },
   * );
   * ```
   */
  retrieve(
    outputID: string,
    params: OutputRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<AssetOutput> {
    const { assetId } = params;
    return (
      this._client.get(path`/assets/${assetId}/outputs/${outputID}`, {
        ...options,
        __security: { projectAccessTokenAuth: true },
      }) as APIPromise<{ data: AssetOutput }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * List outputs requested directly or by a Workflow. Results are ordered by
   * creation date, newest first, with descending output ID as a tie-breaker.
   * Pagination and total apply after type and status filters. Core playback, poster
   * and default timeline previews remain on the Asset.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const assetOutput of client.assets.outputs.list(
   *   'assetId',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    assetID: string,
    query: OutputListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<AssetOutputsPaginatedResults, AssetOutput> {
    return this._client.getAPIList(path`/assets/${assetID}/outputs`, PaginatedResults<AssetOutput>, {
      query,
      ...options,
      __security: { projectAccessTokenAuth: true },
    });
  }

  /**
   * Delete one output belonging to this Asset and Project. Its type is resolved from
   * the output ID. Type-specific processing and dependency restrictions still apply.
   *
   * @example
   * ```ts
   * await client.assets.outputs.delete('outputId', {
   *   assetId: 'assetId',
   * });
   * ```
   */
  delete(outputID: string, params: OutputDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { assetId, delete_files } = params;
    return this._client.delete(path`/assets/${assetId}/outputs/${outputID}`, {
      query: { delete_files },
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: { projectAccessTokenAuth: true },
    });
  }
}

export type AssetOutputsPaginatedResults = PaginatedResults<AssetOutput>;

/**
 * A resource produced for an Asset, requested directly or by a Workflow. Its type
 * selects the details schema. Output state is independent of Asset playback
 * readiness.
 */
export type AssetOutput =
  | AssetOutput.AssetCaptionOutput
  | AssetOutput.AssetStaticRenditionOutput
  | AssetOutput.AssetThumbnailOutput
  | AssetOutput.AssetTranscriptOutput;

export namespace AssetOutput {
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
    details: AssetCaptionOutput.Details;

    /**
     * Status specifies the output processing state. Expired means temporary output
     * files are no longer available.
     */
    status: 'preparing' | 'ready' | 'failed' | 'expired';

    /**
     * Type identifies the output kind.
     */
    type: 'caption';
  }

  export namespace AssetCaptionOutput {
    /**
     * Details contains the canonical typed output resource, including its available
     * delivery fields.
     */
    export interface Details {
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
    details: AssetStaticRenditionOutput.Details;

    /**
     * Status specifies the output processing state. Expired means temporary output
     * files are no longer available.
     */
    status: 'preparing' | 'ready' | 'failed' | 'expired';

    /**
     * Type identifies the output kind.
     */
    type: 'static_rendition';
  }

  export namespace AssetStaticRenditionOutput {
    /**
     * Details contains the canonical typed output resource, including its available
     * delivery fields.
     */
    export interface Details {
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
      requested_resolution:
        | 'highest'
        | '240p'
        | '360p'
        | '480p'
        | '540p'
        | '720p'
        | '1080p'
        | '1440p'
        | '2160p';

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
      progress?: Details.Progress;

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

    export namespace Details {
      /**
       * Progress specifies the current processing stage and encoding percentage. Omitted
       * after processing ends.
       */
      export interface Progress {
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
    }
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
    status: 'preparing' | 'ready' | 'failed' | 'expired';

    /**
     * Type identifies the output kind.
     */
    type: 'thumbnail';
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
    details: AssetTranscriptOutput.Details;

    /**
     * Status specifies the output processing state. Expired means temporary output
     * files are no longer available.
     */
    status: 'preparing' | 'ready' | 'failed' | 'expired';

    /**
     * Type identifies the output kind.
     */
    type: 'transcript';
  }

  export namespace AssetTranscriptOutput {
    /**
     * An original-language transcript. Content is included in ready output responses
     * and lifecycle event snapshots. Transcripts have no download or CDN URL.
     */
    export interface Details {
      /**
       * Id identifies the Asset output, prefixed with aop\_.
       */
      id: string;

      /**
       * Status specifies the output processing state. Expired means temporary output
       * files are no longer available.
       */
      status: 'preparing' | 'ready' | 'failed' | 'expired';

      /**
       * Content contains the complete text and timed segments. Included when ready;
       * omitted while preparing, failed or expired.
       */
      content?: Details.Content;

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

    export namespace Details {
      /**
       * Content contains the complete text and timed segments. Included when ready;
       * omitted while preparing, failed or expired.
       */
      export interface Content {
        /**
         * Segments contains timed passages in chronological order. Individual word
         * timestamps are not included.
         */
        segments: Array<Content.Segment>;

        /**
         * Text contains the complete recognized speech in the original language.
         */
        text: string;
      }

      export namespace Content {
        /**
         * A timed passage of recognized speech. Times are seconds from the start of the
         * Asset.
         */
        export interface Segment {
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
      }
    }
  }
}

export interface OutputCreateParams {
  /**
   * Create one output for an Asset. Type selects its required, strictly validated
   * parameters.
   */
  output:
    | OutputCreateParams.AssetCaptionOutputCreateParams
    | OutputCreateParams.AssetStaticRenditionOutputCreateParams
    | OutputCreateParams.AssetThumbnailOutputCreateParams
    | OutputCreateParams.AssetTranscriptOutputCreateParams;
}

export namespace OutputCreateParams {
  /**
   * Create an Asset-owned caption output.
   */
  export interface AssetCaptionOutputCreateParams {
    /**
     * Params specifies the settings for this output type.
     */
    params: AssetCaptionOutputCreateParams.Params;

    /**
     * Type specifies the output kind to create.
     */
    type: 'caption';
  }

  export namespace AssetCaptionOutputCreateParams {
    /**
     * Params specifies the settings for this output type.
     */
    export interface Params {
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
  }

  /**
   * Create an Asset-owned static rendition output.
   */
  export interface AssetStaticRenditionOutputCreateParams {
    /**
     * Params specifies the settings for this output type.
     */
    params: AssetStaticRenditionOutputCreateParams.Params;

    /**
     * Type specifies the output kind to create.
     */
    type: 'static_rendition';
  }

  export namespace AssetStaticRenditionOutputCreateParams {
    /**
     * Params specifies the settings for this output type.
     */
    export interface Params {
      /**
       * H.264 MP4 resolution. highest selects the largest supported output without
       * upscaling. Hobby supports up to 1080p; other plans support up to 2160p.
       * Independent of the streaming resolution limits.
       */
      resolution: 'highest' | '240p' | '360p' | '480p' | '540p' | '720p' | '1080p' | '1440p' | '2160p';
    }
  }

  /**
   * Create an Asset-owned thumbnail output.
   */
  export interface AssetThumbnailOutputCreateParams {
    /**
     * Params specifies the settings for this output type.
     */
    params: AssetThumbnailOutputCreateParams.Params;

    /**
     * Type specifies the output kind to create.
     */
    type: 'thumbnail';
  }

  export namespace AssetThumbnailOutputCreateParams {
    /**
     * Params specifies the settings for this output type.
     */
    export interface Params {
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
      range?: Params.Range;

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

    export namespace Params {
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
    params: AssetTranscriptOutputCreateParams.Params;

    /**
     * Type specifies the output kind.
     */
    type: 'transcript';
  }

  export namespace AssetTranscriptOutputCreateParams {
    /**
     * Parameters for an original-language transcript. Pass an empty object; the spoken
     * language is detected automatically.
     */
    export interface Params {}
  }
}

export interface OutputRetrieveParams {
  /**
   * ID of the Asset.
   */
  assetId: string;
}

export interface OutputListParams extends PaginatedResultsParams {
  /**
   * Status specifies the current output state to include. Omit it to include all
   * states.
   */
  status?: 'preparing' | 'ready' | 'failed' | 'expired';

  /**
   * Type specifies the output kind to include. Omit it to include all kinds.
   */
  type?: 'caption' | 'transcript' | 'static_rendition' | 'thumbnail';
}

export interface OutputDeleteParams {
  /**
   * Path param: AssetId identifies the Asset that owns the output within the
   * authenticated Project.
   */
  assetId: string;

  /**
   * Query param: DeleteFiles specifies whether to remove this output's published
   * media files from Storage. Defaults to false, preserving those files. Transcript
   * deletion always schedules removal of its private text and saved subtitle copy,
   * regardless of this option. The Asset, Source, and other outputs are preserved.
   * File cleanup failures retain the output record for retry; files already removed
   * cannot be restored.
   */
  delete_files?: boolean;
}

export declare namespace Outputs {
  export {
    type AssetOutput as AssetOutput,
    type AssetOutputsPaginatedResults as AssetOutputsPaginatedResults,
    type OutputCreateParams as OutputCreateParams,
    type OutputRetrieveParams as OutputRetrieveParams,
    type OutputListParams as OutputListParams,
    type OutputDeleteParams as OutputDeleteParams,
  };
}
