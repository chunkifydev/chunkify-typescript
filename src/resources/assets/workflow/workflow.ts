// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as ActionsAPI from './actions';
import { ActionListParams, Actions, AssetActionRun, AssetActionRunsPaginatedResults } from './actions';
import * as RunsAPI from '../../workflows/runs/runs';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Automatic video-on-demand Assets and independent H.264 MP4 static renditions.
 */
export class Workflow extends APIResource {
  actions: ActionsAPI.Actions = new ActionsAPI.Actions(this._client);

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
    return (this._client.post(path`/assets/${assetID}/workflow/update`, { ...options, __security: { projectAccessTokenAuth : true } }) as APIPromise<{ data: RunsAPI.WorkflowRun }>)._thenUnwrap((obj) => obj.data);
  }
}

Workflow.Actions = Actions;

export declare namespace Workflow {
  export {
    Actions as Actions,
    type AssetActionRun as AssetActionRun,
    type AssetActionRunsPaginatedResults as AssetActionRunsPaginatedResults,
    type ActionListParams as ActionListParams
  };
}
