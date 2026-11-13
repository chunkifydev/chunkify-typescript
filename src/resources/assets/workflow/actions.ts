// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as AssetsAPI from '../assets';
import { PagePromise, PaginatedResults, type PaginatedResultsParams } from '../../../core/pagination';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Automatic video-on-demand Assets and independent H.264 MP4 static renditions.
 */
export class Actions extends APIResource {
  /**
   * List retained Workflow actions for an Asset, newest first. Direct output
   * requests are excluded.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const assetActionRun of client.assets.workflow.actions.list(
   *   'assetId',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    assetID: string,
    query: ActionListParams | null | undefined = {},
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
  input: AssetsAPI.AssetActionInput;

  /**
   * Current execution status of the action.
   */
  status: AssetsAPI.AssetActionStatus;

  /**
   * Type of action performed.
   */
  type: AssetsAPI.AssetActionType;

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
  result?: AssetsAPI.AssetActionResult;

  /**
   * Rule key from the Workflow definition. Omitted for direct output requests.
   */
  rule_id?: string;
}

export interface ActionListParams extends PaginatedResultsParams {
  created?: ActionListParams.Created;

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

export namespace ActionListParams {
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

export declare namespace Actions {
  export {
    type AssetActionRun as AssetActionRun,
    type AssetActionRunsPaginatedResults as AssetActionRunsPaginatedResults,
    type ActionListParams as ActionListParams,
  };
}
