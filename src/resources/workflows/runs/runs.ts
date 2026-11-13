// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as WorkflowsAPI from '../workflows';
import * as ActionsAPI from './actions';
import { ActionListParams, ActionRetrieveParams, Actions } from './actions';
import { APIPromise } from '../../../core/api-promise';
import { PagePromise, PaginatedResults, type PaginatedResultsParams } from '../../../core/pagination';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Runs extends APIResource {
  actions: ActionsAPI.Actions = new ActionsAPI.Actions(this._client);

  /**
   * Retrieve a retained run with its triggering event, status, and action counts.
   *
   * @example
   * ```ts
   * const workflowRun = await client.workflows.runs.retrieve(
   *   'runId',
   *   { workflowId: 'workflowId' },
   * );
   * ```
   */
  retrieve(runID: string, params: RunRetrieveParams, options?: RequestOptions): APIPromise<WorkflowRun> {
    const { workflowId } = params;
    return (
      this._client.get(path`/workflows/${workflowId}/runs/${runID}`, {
        ...options,
        __security: { projectAccessTokenAuth: true },
      }) as APIPromise<{ data: WorkflowRun }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * List retained runs for this Workflow, newest first. Each run corresponds to one
   * matching Asset event.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const workflowRun of client.workflows.runs.list(
   *   'workflowId',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    workflowID: string,
    query: RunListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<WorkflowRunsPaginatedResults, WorkflowRun> {
    return this._client.getAPIList(path`/workflows/${workflowID}/runs`, PaginatedResults<WorkflowRun>, {
      query,
      ...options,
      __security: { projectAccessTokenAuth: true },
    });
  }
}

export type WorkflowRunsPaginatedResults = PaginatedResults<WorkflowRun>;

/**
 * One execution of Workflow rules for an Asset, started by an event or by updating
 * to a newer revision.
 */
export interface WorkflowRun {
  /**
   * Unique Workflow run ID.
   */
  id: string;

  /**
   * Counts of action outcomes in this run. Reused actions are included in completed.
   */
  actions: WorkflowsAPI.WorkflowActionCounts;

  /**
   * AssetExecutionStatus specifies the combined status of this revision for the
   * Asset across retained runs. Any failed action or run makes it failed. Pending or
   * active work, or an Asset still preparing for an unarchived Workflow, makes it
   * running. Otherwise it is completed.
   */
  asset_execution_status: WorkflowsAPI.WorkflowRunStatus;

  /**
   * ID of the Asset processed by this run.
   */
  asset_id: string;

  /**
   * When the run completed, failed, or was cancelled. Null while the run is pending
   * or running.
   */
  completed_at: string | null;

  /**
   * When the run was created.
   */
  created_at: string;

  /**
   * Event specifies the Asset lifecycle event that triggered this run, or manual
   * when the Asset was updated to a newer revision. Action details are available
   * from the run's actions endpoint.
   */
  event: string;

  /**
   * EventId specifies the event that triggered this run. Null when the Asset was
   * updated to a newer revision.
   */
  event_id: string | null;

  /**
   * Pinned Workflow revision used by this run.
   */
  revision: number;

  /**
   * ID of the first run in this event chain. Equals id when this run starts the
   * chain.
   */
  root_run_id: string;

  /**
   * Current status of this event run, based on its own actions.
   */
  status: WorkflowsAPI.WorkflowRunStatus;

  /**
   * When the run was last updated.
   */
  updated_at: string;

  /**
   * ID of the Workflow executed by this run.
   */
  workflow_id: string;

  /**
   * Reason the run failed. Omitted when no failure message is available.
   */
  error?: string;
}

export interface RunRetrieveParams {
  /**
   * ID of the Workflow.
   */
  workflowId: string;
}

export interface RunListParams extends PaginatedResultsParams {
  /**
   * AssetId specifies the Asset whose results to return. Omit it to include all
   * Assets.
   */
  asset_id?: string;

  created?: RunListParams.Created;

  /**
   * EventId specifies the triggering event ID to filter by. Omit it to include all
   * events.
   */
  event_id?: string;

  /**
   * LatestPerAsset specifies whether to return only the latest matching run for each
   * Asset. Defaults to false. Pagination and total count apply to Assets when true.
   */
  latest_per_asset?: boolean;

  /**
   * Status specifies the run status to filter by. Omit it to include all statuses.
   */
  status?: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
}

export namespace RunListParams {
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

Runs.Actions = Actions;

export declare namespace Runs {
  export {
    type WorkflowRun as WorkflowRun,
    type WorkflowRunsPaginatedResults as WorkflowRunsPaginatedResults,
    type RunRetrieveParams as RunRetrieveParams,
    type RunListParams as RunListParams,
  };

  export {
    Actions as Actions,
    type ActionRetrieveParams as ActionRetrieveParams,
    type ActionListParams as ActionListParams,
  };
}
