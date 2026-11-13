// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as WebhooksAPI from './webhooks';
import * as FilesAPI from './files';
import * as SourcesAPI from './sources';
import * as ThumbnailsAPI from './thumbnails';
import * as TranscodingsAPI from './transcodings';
import * as UploadsAPI from './uploads';
import * as AssetsAPI from './assets/assets';
import * as OutputsAPI from './assets/outputs';
import * as JobsAPI from './jobs/jobs';
import * as ActionsAPI from './assets/workflow/actions';
import * as RunsAPI from './workflows/runs/runs';
import { Webhook as Webhook_ } from 'standardwebhooks';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Webhooks extends APIResource {
  /**
   * Create a new webhook for a project. The webhook will receive notifications for
   * specified events.
   *
   * @example
   * ```ts
   * const webhook = await client.webhooks.create({
   *   url: 'https://example.com/webhook',
   * });
   * ```
   */
  create(body: WebhookCreateParams, options?: RequestOptions): APIPromise<Webhook> {
    return (this._client.post('/webhooks', { body, ...options, __security: { projectAccessTokenAuth : true } }) as APIPromise<{ data: Webhook }>)._thenUnwrap((obj) => obj.data);
  }

  /**
   * Retrieve details of a specific webhook configuration by its ID. The webhook must
   * belong to the current project.
   *
   * @example
   * ```ts
   * const webhook = await client.webhooks.retrieve('webhookId');
   * ```
   */
  retrieve(webhookID: string, options?: RequestOptions): APIPromise<Webhook> {
    return (this._client.get(path`/webhooks/${webhookID}`, { ...options, __security: { projectAccessTokenAuth : true } }) as APIPromise<{ data: Webhook }>)._thenUnwrap((obj) => obj.data);
  }

  /**
   * Update the enabled status of a webhook. The webhook must belong to the current
   * project.
   *
   * @example
   * ```ts
   * await client.webhooks.update('webhookId');
   * ```
   */
  update(webhookID: string, body: WebhookUpdateParams, options?: RequestOptions): APIPromise<void> {
    return this._client.patch(path`/webhooks/${webhookID}`, { body, ...options, headers: buildHeaders([{Accept: '*/*'}, options?.headers]), __security: { projectAccessTokenAuth : true } });
  }

  /**
   * Retrieve a list of all webhooks configured for the current project. Each webhook
   * includes its URL, enabled status, and subscribed events.
   *
   * @example
   * ```ts
   * const webhooks = await client.webhooks.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<WebhookListResponse> {
    return this._client.get('/webhooks', { ...options, __security: { projectAccessTokenAuth : true } });
  }

  /**
   * Permanently delete a webhook configuration. The webhook must belong to the
   * current project. This action cannot be undone.
   *
   * @example
   * ```ts
   * await client.webhooks.delete('webhookId');
   * ```
   */
  delete(webhookID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/webhooks/${webhookID}`, { ...options, headers: buildHeaders([{Accept: '*/*'}, options?.headers]), __security: { projectAccessTokenAuth : true } });
  }

  unwrap(body: string, { headers, key }: { headers: Record<string, string>; key?: string }): UnwrapWebhookEvent {
    if (headers !== undefined) {
      const keyStr: string | null = key === undefined ? this._client.webhookKey : key;
      if (keyStr === null) throw new Error('Webhook key must not be null in order to unwrap');
      const wh = new Webhook_(keyStr);
      wh.verify(body, headers);
    }
    return JSON.parse(body) as UnwrapWebhookEvent;
  }
}

export interface Webhook {
  /**
   * Unique identifier of the webhook
   */
  id: string;

  /**
   * Whether the webhook is currently enabled
   */
  enabled: boolean;

  /**
   * Array of event types this webhook subscribes to
   */
  events: Array<'job.created' | 'job.completed' | 'job.failed' | 'job.cancelled' | 'source.created' | 'source.deleted' | 'upload.created' | 'upload.completed' | 'upload.failed' | 'upload.expired' | 'asset.created' | 'asset.ready' | 'asset.playback_ready' | 'asset.failed' | 'asset.expired' | 'asset.deleted' | 'asset.output.created' | 'asset.output.ready' | 'asset.output.failed' | 'asset.output.deleted' | 'workflow_run.created' | 'workflow_run.completed' | 'workflow_run.failed' | 'workflow_run.cancelled' | 'transcoding.created' | 'transcoding.ready' | 'transcoding.failed' | 'transcoding.cancelled' | 'transcoding.expired' | 'transcoding.deleted' | 'thumbnail.created' | 'thumbnail.ready' | 'thumbnail.failed' | 'thumbnail.expired' | 'thumbnail.deleted'>;

  /**
   * ID of the project this webhook belongs to
   */
  project_id: string;

  /**
   * URL where webhook events will be sent
   */
  url: string;
}

/**
 * Response containing the list of all webhooks for a project
 */
export interface WebhookListResponse {
  /**
   * Data contains the webhook items
   */
  data: Array<Webhook>;

  /**
   * Status indicates the response status "success"
   */
  status: 'success';
}

export interface NewEventWebhookEvent {
  /**
   * Unique identifier of the notification
   */
  id: string;

  /**
   * Payload for the event named in event. Replays preserve the original data;
   * retrieve the resource for current state and fresh signed URLs.
   */
  data: NewEventWebhookEvent.NotificationPayloadJobCompleted | NewEventWebhookEvent.NotificationPayloadJobFailed | NewEventWebhookEvent.NotificationPayloadJobCreated | NewEventWebhookEvent.NotificationPayloadSourceCreated | NewEventWebhookEvent.NotificationPayloadUploadCreated | NewEventWebhookEvent.NotificationPayloadUploadCompleted | NewEventWebhookEvent.NotificationPayloadUploadFailed | NewEventWebhookEvent.NotificationPayloadAsset | NewEventWebhookEvent.NotificationPayloadAssetOutput | NewEventWebhookEvent.NotificationPayloadAssetOutputDeleted | NewEventWebhookEvent.NotificationPayloadAssetDeleted | NewEventWebhookEvent.NotificationPayloadWorkflowRun | NewEventWebhookEvent.NotificationPayloadTranscoding | NewEventWebhookEvent.ThumbnailEventData;

  /**
   * Timestamp of the event payload.
   */
  date: string;

  /**
   * Type of event that triggered the notification.
   */
  event: 'job.created' | 'job.completed' | 'job.failed' | 'job.cancelled' | 'source.created' | 'source.deleted' | 'upload.created' | 'upload.completed' | 'upload.failed' | 'upload.expired' | 'asset.created' | 'asset.ready' | 'asset.playback_ready' | 'asset.failed' | 'asset.expired' | 'asset.deleted' | 'asset.output.created' | 'asset.output.ready' | 'asset.output.failed' | 'asset.output.deleted' | 'workflow_run.created' | 'workflow_run.completed' | 'workflow_run.failed' | 'workflow_run.cancelled' | 'transcoding.created' | 'transcoding.ready' | 'transcoding.failed' | 'transcoding.cancelled' | 'transcoding.expired' | 'transcoding.deleted' | 'thumbnail.created' | 'thumbnail.ready' | 'thumbnail.failed' | 'thumbnail.expired' | 'thumbnail.deleted';
}

export namespace NewEventWebhookEvent {
  /**
   * Payload data structure for job.completed events
   */
  export interface NotificationPayloadJobCompleted {
    /**
     * List of files generated by the job
     */
    files: Array<FilesAPI.JobFile>;

    job: JobsAPI.Job;
  }

  /**
   * Payload data structure for job.failed and job.cancelled events
   */
  export interface NotificationPayloadJobFailed {
    job: JobsAPI.Job;
  }

  /**
   * Payload for job.created. A standalone Job has been accepted for processing;
   * execution may not have started.
   */
  export interface NotificationPayloadJobCreated {
    job: JobsAPI.Job;
  }

  /**
   * Payload for source.created. The Source has been validated and saved. Thumbnails
   * may still be pending.
   */
  export interface NotificationPayloadSourceCreated {
    source: SourcesAPI.Source;
  }

  /**
   * Payload for upload.created. A waiting upload session has been created; its
   * Source is created only after successful completion. Transfer credentials are not
   * included.
   */
  export interface NotificationPayloadUploadCreated {
    upload: UploadsAPI.Upload;
  }

  /**
   * Payload data structure for upload.completed events
   */
  export interface NotificationPayloadUploadCompleted {
    source: SourcesAPI.Source;

    upload: UploadsAPI.Upload;
  }

  /**
   * Payload data structure for upload.failed and upload.expired events
   */
  export interface NotificationPayloadUploadFailed {
    upload: UploadsAPI.Upload;
  }

  export interface NotificationPayloadAsset {
    asset: AssetsAPI.Asset;
  }

  /**
   * Payload for Asset output creation, readiness, and failure events.
   */
  export interface NotificationPayloadAssetOutput {
    /**
     * Output contains the canonical typed output snapshot at the event time, matching
     * the output API.
     */
    output: OutputsAPI.AssetOutput;
  }

  /**
   * Payload for asset.output.deleted. The output snapshot is preserved after
   * removal.
   */
  export interface NotificationPayloadAssetOutputDeleted {
    /**
     * FilesDeleted indicates whether the requested cleanup of the output files
     * completed without error. Missing files count as successful cleanup. False means
     * these files were not removed at event time. Private transcript text and saved
     * subtitle copies are always scheduled for asynchronous cleanup.
     */
    files_deleted: boolean;

    /**
     * Output contains the canonical typed output snapshot before removal.
     */
    output: OutputsAPI.AssetOutput;
  }

  /**
   * Payload for asset.deleted. The Asset snapshot is preserved after record
   * deletion.
   */
  export interface NotificationPayloadAssetDeleted {
    asset: AssetsAPI.Asset;

    /**
     * FilesDeleted indicates whether the requested cleanup of the Asset's generated
     * files completed without error. Missing files count as successful cleanup. False
     * means these files were not removed at event time. Private transcript text and
     * saved subtitle copies are always scheduled for asynchronous cleanup.
     */
    files_deleted: boolean;

    /**
     * DeletedSize specifies the recorded generated-file bytes removed with the Asset,
     * including attached outputs. Omitted when cleanup was not requested or the total
     * is unavailable. Missing storage objects still contribute their recorded sizes.
     */
    deleted_size?: number;
  }

  /**
   * Payload for workflow_run.created, workflow_run.completed, workflow_run.failed,
   * and workflow_run.cancelled. The run and its actions are snapshots taken when the
   * event was recorded.
   */
  export interface NotificationPayloadWorkflowRun {
    /**
     * ActionRuns specifies every action admitted by this run, including its rule and
     * action IDs, type, input, status, output reference, and any skip or failure
     * reason. Actions from other runs are excluded.
     */
    action_runs: Array<ActionsAPI.AssetActionRun>;

    /**
     * Snapshot of the Workflow run when the event was recorded.
     */
    workflow_run: RunsAPI.WorkflowRun;
  }

  /**
   * Payload for transcoding.created, transcoding.ready, transcoding.failed,
   * transcoding.cancelled, transcoding.expired and transcoding.deleted events.
   */
  export interface NotificationPayloadTranscoding {
    /**
     * Transcoding contains the canonical resource snapshot at the event time.
     */
    transcoding: TranscodingsAPI.Transcoding;
  }

  /**
   * A canonical thumbnail snapshot for standalone thumbnail.\* events. Asset-owned
   * thumbnails use the Asset output event payload.
   */
  export interface ThumbnailEventData {
    /**
     * Thumbnail contains the resource at the event time.
     */
    thumbnail: ThumbnailsAPI.Thumbnail;
  }
}

export interface UnwrapWebhookEvent {
  /**
   * Unique identifier of the notification
   */
  id: string;

  /**
   * Payload for the event named in event. Replays preserve the original data;
   * retrieve the resource for current state and fresh signed URLs.
   */
  data: UnwrapWebhookEvent.NotificationPayloadJobCompleted | UnwrapWebhookEvent.NotificationPayloadJobFailed | UnwrapWebhookEvent.NotificationPayloadJobCreated | UnwrapWebhookEvent.NotificationPayloadSourceCreated | UnwrapWebhookEvent.NotificationPayloadUploadCreated | UnwrapWebhookEvent.NotificationPayloadUploadCompleted | UnwrapWebhookEvent.NotificationPayloadUploadFailed | UnwrapWebhookEvent.NotificationPayloadAsset | UnwrapWebhookEvent.NotificationPayloadAssetOutput | UnwrapWebhookEvent.NotificationPayloadAssetOutputDeleted | UnwrapWebhookEvent.NotificationPayloadAssetDeleted | UnwrapWebhookEvent.NotificationPayloadWorkflowRun | UnwrapWebhookEvent.NotificationPayloadTranscoding | UnwrapWebhookEvent.ThumbnailEventData;

  /**
   * Timestamp of the event payload.
   */
  date: string;

  /**
   * Type of event that triggered the notification.
   */
  event: 'job.created' | 'job.completed' | 'job.failed' | 'job.cancelled' | 'source.created' | 'source.deleted' | 'upload.created' | 'upload.completed' | 'upload.failed' | 'upload.expired' | 'asset.created' | 'asset.ready' | 'asset.playback_ready' | 'asset.failed' | 'asset.expired' | 'asset.deleted' | 'asset.output.created' | 'asset.output.ready' | 'asset.output.failed' | 'asset.output.deleted' | 'workflow_run.created' | 'workflow_run.completed' | 'workflow_run.failed' | 'workflow_run.cancelled' | 'transcoding.created' | 'transcoding.ready' | 'transcoding.failed' | 'transcoding.cancelled' | 'transcoding.expired' | 'transcoding.deleted' | 'thumbnail.created' | 'thumbnail.ready' | 'thumbnail.failed' | 'thumbnail.expired' | 'thumbnail.deleted';
}

export namespace UnwrapWebhookEvent {
  /**
   * Payload data structure for job.completed events
   */
  export interface NotificationPayloadJobCompleted {
    /**
     * List of files generated by the job
     */
    files: Array<FilesAPI.JobFile>;

    job: JobsAPI.Job;
  }

  /**
   * Payload data structure for job.failed and job.cancelled events
   */
  export interface NotificationPayloadJobFailed {
    job: JobsAPI.Job;
  }

  /**
   * Payload for job.created. A standalone Job has been accepted for processing;
   * execution may not have started.
   */
  export interface NotificationPayloadJobCreated {
    job: JobsAPI.Job;
  }

  /**
   * Payload for source.created. The Source has been validated and saved. Thumbnails
   * may still be pending.
   */
  export interface NotificationPayloadSourceCreated {
    source: SourcesAPI.Source;
  }

  /**
   * Payload for upload.created. A waiting upload session has been created; its
   * Source is created only after successful completion. Transfer credentials are not
   * included.
   */
  export interface NotificationPayloadUploadCreated {
    upload: UploadsAPI.Upload;
  }

  /**
   * Payload data structure for upload.completed events
   */
  export interface NotificationPayloadUploadCompleted {
    source: SourcesAPI.Source;

    upload: UploadsAPI.Upload;
  }

  /**
   * Payload data structure for upload.failed and upload.expired events
   */
  export interface NotificationPayloadUploadFailed {
    upload: UploadsAPI.Upload;
  }

  export interface NotificationPayloadAsset {
    asset: AssetsAPI.Asset;
  }

  /**
   * Payload for Asset output creation, readiness, and failure events.
   */
  export interface NotificationPayloadAssetOutput {
    /**
     * Output contains the canonical typed output snapshot at the event time, matching
     * the output API.
     */
    output: OutputsAPI.AssetOutput;
  }

  /**
   * Payload for asset.output.deleted. The output snapshot is preserved after
   * removal.
   */
  export interface NotificationPayloadAssetOutputDeleted {
    /**
     * FilesDeleted indicates whether the requested cleanup of the output files
     * completed without error. Missing files count as successful cleanup. False means
     * these files were not removed at event time. Private transcript text and saved
     * subtitle copies are always scheduled for asynchronous cleanup.
     */
    files_deleted: boolean;

    /**
     * Output contains the canonical typed output snapshot before removal.
     */
    output: OutputsAPI.AssetOutput;
  }

  /**
   * Payload for asset.deleted. The Asset snapshot is preserved after record
   * deletion.
   */
  export interface NotificationPayloadAssetDeleted {
    asset: AssetsAPI.Asset;

    /**
     * FilesDeleted indicates whether the requested cleanup of the Asset's generated
     * files completed without error. Missing files count as successful cleanup. False
     * means these files were not removed at event time. Private transcript text and
     * saved subtitle copies are always scheduled for asynchronous cleanup.
     */
    files_deleted: boolean;

    /**
     * DeletedSize specifies the recorded generated-file bytes removed with the Asset,
     * including attached outputs. Omitted when cleanup was not requested or the total
     * is unavailable. Missing storage objects still contribute their recorded sizes.
     */
    deleted_size?: number;
  }

  /**
   * Payload for workflow_run.created, workflow_run.completed, workflow_run.failed,
   * and workflow_run.cancelled. The run and its actions are snapshots taken when the
   * event was recorded.
   */
  export interface NotificationPayloadWorkflowRun {
    /**
     * ActionRuns specifies every action admitted by this run, including its rule and
     * action IDs, type, input, status, output reference, and any skip or failure
     * reason. Actions from other runs are excluded.
     */
    action_runs: Array<ActionsAPI.AssetActionRun>;

    /**
     * Snapshot of the Workflow run when the event was recorded.
     */
    workflow_run: RunsAPI.WorkflowRun;
  }

  /**
   * Payload for transcoding.created, transcoding.ready, transcoding.failed,
   * transcoding.cancelled, transcoding.expired and transcoding.deleted events.
   */
  export interface NotificationPayloadTranscoding {
    /**
     * Transcoding contains the canonical resource snapshot at the event time.
     */
    transcoding: TranscodingsAPI.Transcoding;
  }

  /**
   * A canonical thumbnail snapshot for standalone thumbnail.\* events. Asset-owned
   * thumbnails use the Asset output event payload.
   */
  export interface ThumbnailEventData {
    /**
     * Thumbnail contains the resource at the event time.
     */
    thumbnail: ThumbnailsAPI.Thumbnail;
  }
}

export interface WebhookCreateParams {
  /**
   * Url is the endpoint that will receive webhook notifications, which must be a
   * valid HTTP URL.
   */
  url: string;

  /**
   * Enabled indicates whether the webhook is active.
   */
  enabled?: boolean;

  /**
   * Events specifies the types of events that will trigger the webhook.
   */
  events?: Array<'job.created' | 'job.completed' | 'job.failed' | 'job.cancelled' | 'source.created' | 'source.deleted' | 'upload.created' | 'upload.completed' | 'upload.failed' | 'upload.expired' | 'asset.created' | 'asset.ready' | 'asset.playback_ready' | 'asset.failed' | 'asset.expired' | 'asset.deleted' | 'asset.output.created' | 'asset.output.ready' | 'asset.output.failed' | 'asset.output.deleted' | 'workflow_run.created' | 'workflow_run.completed' | 'workflow_run.failed' | 'workflow_run.cancelled' | 'transcoding.created' | 'transcoding.ready' | 'transcoding.failed' | 'transcoding.cancelled' | 'transcoding.expired' | 'transcoding.deleted' | 'thumbnail.created' | 'thumbnail.ready' | 'thumbnail.failed' | 'thumbnail.expired' | 'thumbnail.deleted'>;
}

export interface WebhookUpdateParams {
  /**
   * Enabled indicates whether the webhook should be enabled or disabled.
   */
  enabled?: boolean;

  /**
   * Events specifies the types of events that will trigger the webhook.
   */
  events?: Array<'job.created' | 'job.completed' | 'job.failed' | 'job.cancelled' | 'source.created' | 'source.deleted' | 'upload.created' | 'upload.completed' | 'upload.failed' | 'upload.expired' | 'asset.created' | 'asset.ready' | 'asset.playback_ready' | 'asset.failed' | 'asset.expired' | 'asset.deleted' | 'asset.output.created' | 'asset.output.ready' | 'asset.output.failed' | 'asset.output.deleted' | 'workflow_run.created' | 'workflow_run.completed' | 'workflow_run.failed' | 'workflow_run.cancelled' | 'transcoding.created' | 'transcoding.ready' | 'transcoding.failed' | 'transcoding.cancelled' | 'transcoding.expired' | 'transcoding.deleted' | 'thumbnail.created' | 'thumbnail.ready' | 'thumbnail.failed' | 'thumbnail.expired' | 'thumbnail.deleted'>;
}

export declare namespace Webhooks {
  export {
    type Webhook as Webhook,
    type WebhookListResponse as WebhookListResponse,
    type NewEventWebhookEvent as NewEventWebhookEvent,
    type UnwrapWebhookEvent as UnwrapWebhookEvent,
    type WebhookCreateParams as WebhookCreateParams,
    type WebhookUpdateParams as WebhookUpdateParams
  };
}
