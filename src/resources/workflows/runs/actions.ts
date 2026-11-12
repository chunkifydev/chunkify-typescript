// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as WorkflowAPI from '../../assets/workflow';
import { AssetActionRunsPaginatedResults } from '../../assets/workflow';
import { APIPromise } from '../../../core/api-promise';
import { PagePromise, PaginatedResults, type PaginatedResultsParams } from '../../../core/pagination';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Actions extends APIResource {
  /**
   * Retrieve one action execution in a retained Workflow run, including its resolved
   * inputs, status, and result.
   *
   * @example
   * ```ts
   * const assetActionRun =
   *   await client.workflows.runs.actions.retrieve(
   *     'actionRunId',
   *     { workflowId: 'workflowId', runId: 'runId' },
   *   );
   * ```
   */
  retrieve(
    actionRunID: string,
    params: ActionRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<WorkflowAPI.AssetActionRun> {
    const { workflowId, runId } = params;
    return (
      this._client.get(path`/workflows/${workflowId}/runs/${runId}/actions/${actionRunID}`, {
        ...options,
        __security: { projectAccessTokenAuth: true },
      }) as APIPromise<{ data: WorkflowAPI.AssetActionRun }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * List actions in a retained Workflow run, newest first. Includes resolved inputs,
   * statuses, output references, and skip or failure reasons.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const assetActionRun of client.workflows.runs.actions.list(
   *   'runId',
   *   { workflowId: 'workflowId' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    runID: string,
    params: ActionListParams,
    options?: RequestOptions,
  ): PagePromise<AssetActionRunsPaginatedResults, WorkflowAPI.AssetActionRun> {
    const { workflowId, ...query } = params;
    return this._client.getAPIList(
      path`/workflows/${workflowId}/runs/${runID}/actions`,
      PaginatedResults<WorkflowAPI.AssetActionRun>,
      { query, ...options, __security: { projectAccessTokenAuth: true } },
    );
  }
}

export interface ActionRetrieveParams {
  /**
   * ID of the Workflow.
   */
  workflowId: string;

  /**
   * ID of the Workflow run.
   */
  runId: string;
}

export interface ActionListParams extends PaginatedResultsParams {
  /**
   * Path param: ID of the Workflow.
   */
  workflowId: string;

  /**
   * Query param: AssetId specifies the Asset whose results to return. Omit it to
   * include all Assets.
   */
  asset_id?: string;

  /**
   * Query param
   */
  created?: ActionListParams.Created;

  /**
   * Query param: Status specifies the action status to filter by. Omit it to include
   * all statuses.
   */
  status?: 'pending' | 'running' | 'waiting' | 'completed' | 'failed' | 'skipped' | 'cancelled';

  /**
   * Query param: Type specifies the action type to filter by. Omit it to include all
   * action types.
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
  export { type ActionRetrieveParams as ActionRetrieveParams, type ActionListParams as ActionListParams };
}

export { type AssetActionRunsPaginatedResults };
