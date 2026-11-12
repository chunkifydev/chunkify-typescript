// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as RunsAPI from '../workflows/runs/runs';
import { APIPromise } from '../../core/api-promise';
import { PagePromise, PaginatedResults, type PaginatedResultsParams } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Automatic video-on-demand Assets and independent H.264 MP4 static renditions.
 */
export class Workflow extends APIResource {
  /**
   * Update a ready Asset to the latest revision of its selected Workflow. Existing
   * outputs are preserved and missing outputs are created.
   *
   * @example
   * ```ts
   * const workflowRun = await client.assets.workflow.update(
   *   'assetId',
   * );
   * ```
   */
  update(assetID: string, options?: RequestOptions): APIPromise<RunsAPI.WorkflowRun> {
    return (
      this._client.post(path`/assets/${assetID}/workflow/update`, {
        ...options,
        __security: { projectAccessTokenAuth: true },
      }) as APIPromise<{ data: RunsAPI.WorkflowRun }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * List retained Workflow actions for an Asset, newest first. Direct output
   * requests are excluded.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const assetActionRun of client.assets.workflow.listActions(
   *   'assetId',
   * )) {
   *   // ...
   * }
   * ```
   */
  listActions(
    assetID: string,
    query: WorkflowListActionsParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<AssetActionRunsPaginatedResults, AssetActionRun> {
    return this._client.getAPIList(
      path`/assets/${assetID}/workflow/actions`,
      PaginatedResults<AssetActionRun>,
      { query, ...options, __security: { projectAccessTokenAuth: true } },
    );
  }
}

export type AssetActionRunsPaginatedResults = PaginatedResults<AssetActionRun>;

/**
 * One execution of an Asset action, started by a Workflow or a direct output
 * request.
 */
export interface AssetActionRun {
  /**
   * Unique action execution ID, prefixed with acr\_.
   */
  id: string;

  /**
   * ID of the Asset processed by this action.
   */
  asset_id: string;

  /**
   * When the action completed, failed, was skipped, or was cancelled. Null while
   * work remains.
   */
  completed_at: string | null;

  /**
   * When the action was accepted.
   */
  created_at: string;

  /**
   * Resolved parameters and input references for this execution.
   */
  input: AssetActionRun.Input;

  /**
   * Current execution status of the action.
   */
  status: 'pending' | 'running' | 'waiting' | 'completed' | 'failed' | 'skipped' | 'cancelled';

  /**
   * Type of action performed.
   */
  type:
    | 'create_static_rendition'
    | 'create_caption'
    | 'create_transcript'
    | 'translate_caption'
    | 'create_thumbnails';

  /**
   * When the action was last updated.
   */
  updated_at: string;

  /**
   * ID of the Workflow run that started the action. Null for direct output requests.
   */
  workflow_run_id: string | null;

  /**
   * Action key within the rule. Omitted for direct output requests.
   */
  action_id?: string;

  /**
   * Reason the action failed. Omitted when no failure message is available.
   */
  error?: string;

  /**
   * Machine-readable reason for waiting, skipping, failure, or cancellation. Omitted
   * when no reason applies.
   */
  reason?: string;

  /**
   * Output reference and reuse flag. Included when the action completes
   * successfully.
   */
  result?: AssetActionRun.Result;

  /**
   * Rule key from the Workflow definition. Omitted for direct output requests.
   */
  rule_id?: string;
}

export namespace AssetActionRun {
  /**
   * Resolved parameters and input references for this execution.
   */
  export interface Input {
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
    thumbnails?: Input.Thumbnails;

    /**
     * TranscriptId specifies the original transcript consumed by caption publication.
     * Omitted for actions without a transcript input.
     */
    transcript_id?: string;
  }

  export namespace Input {
    /**
     * Thumbnail settings. Included only for create_thumbnails actions.
     */
    export interface Thumbnails {
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
      range?: Thumbnails.Range;

      /**
       * Size specifies the maximum image or tile edge in pixels, from 64 to 1920.
       * Defaults to 320. Odd sizes are supported. Preserves display aspect ratio without
       * cropping or upscaling.
       */
      size?: number;

      /**
       * Timestamps specifies 1 to 100 Source-relative target times in seconds. Times
       * outside the selected range are skipped when the action runs. If none remain, the
       * action is skipped without a charge. Repeated targets produce separate outputs.
       */
      timestamps?: Array<number>;
    }

    export namespace Thumbnails {
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
   * Output reference and reuse flag. Included when the action completes
   * successfully.
   */
  export interface Result {
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
}

export interface WorkflowListActionsParams extends PaginatedResultsParams {
  created?: WorkflowListActionsParams.Created;

  /**
   * LatestPerAction specifies whether to return only the latest execution of each
   * rule and action on the Asset. Defaults to false. Pagination and total count
   * apply after this selection.
   */
  latest_per_action?: boolean;

  /**
   * Revision specifies the Workflow revision to filter by. Omit it to include all
   * revisions.
   */
  revision?: number;

  /**
   * Status specifies the action status to filter by. Omit it to include all
   * statuses.
   */
  status?: 'pending' | 'running' | 'waiting' | 'completed' | 'failed' | 'skipped' | 'cancelled';

  /**
   * Type specifies the action type to filter by. Omit it to include all action
   * types.
   */
  type?: 'create_static_rendition' | 'create_caption' | 'create_transcript' | 'translate_caption';
}

export namespace WorkflowListActionsParams {
  export interface Created {
    /**
     * Created at or after this Unix timestamp in seconds.
     */
    gte?: number;

    /**
     * Created at or before this Unix timestamp in seconds.
     */
    lte?: number;
  }
}

export declare namespace Workflow {
  export {
    type AssetActionRun as AssetActionRun,
    type AssetActionRunsPaginatedResults as AssetActionRunsPaginatedResults,
    type WorkflowListActionsParams as WorkflowListActionsParams,
  };
}
