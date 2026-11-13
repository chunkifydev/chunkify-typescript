// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as WorkflowsAPI from './workflows';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Revisions extends APIResource {
  /**
   * Retrieve an immutable definition revision, including revisions of archived
   * Workflows.
   *
   * @example
   * ```ts
   * const workflowRevision =
   *   await client.workflows.revisions.retrieve(0, {
   *     workflowId: 'workflowId',
   *   });
   * ```
   */
  retrieve(
    revision: number,
    params: RevisionRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<WorkflowRevision> {
    const { workflowId } = params;
    return (
      this._client.get(path`/workflows/${workflowId}/revisions/${revision}`, {
        ...options,
        __security: { projectAccessTokenAuth: true },
      }) as APIPromise<{ data: WorkflowRevision }>
    )._thenUnwrap((obj) => obj.data);
  }
}

/**
 * An immutable Workflow definition pinned to Assets and Uploads at creation.
 */
export interface WorkflowRevision {
  /**
   * When this Workflow revision was created.
   */
  created_at: string;

  /**
   * Definition revision number, starting at 1.
   */
  revision: number;

  /**
   * Rules specifies the event subscriptions and actions in this definition. Provide
   * exactly one asset.ready rule and up to 15 connected rules, with at most 32
   * actions and 65536 encoded bytes across all rules. Array order affects display
   * only.
   */
  rules: Array<WorkflowsAPI.WorkflowRule>;

  /**
   * SchemaVersion specifies the Workflow definition format. The supported version
   * is 1.
   */
  schema_version: number;

  /**
   * ID of the Workflow that owns this revision.
   */
  workflow_id: string;
}

export interface RevisionRetrieveParams {
  /**
   * ID of the Workflow.
   */
  workflowId: string;
}

export declare namespace Revisions {
  export { type WorkflowRevision as WorkflowRevision, type RevisionRetrieveParams as RevisionRetrieveParams };
}
