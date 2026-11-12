// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as WebhooksAPI from './webhooks';
import { APIPromise } from '../core/api-promise';
import { PagePromise, PaginatedResults, type PaginatedResultsParams } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Notifications extends APIResource {
  /**
   * Send an event notification to a webhook endpoint. Recorded events replay their
   * original payload.
   *
   * @example
   * ```ts
   * const notification = await client.notifications.create({
   *   event: 'asset.playback_ready',
   *   object_id: 'ast_A1cce6120E56e7Tu9ioP09Nhjk9',
   *   webhook_id: 'wh_A1cce6120E56e7Tu9ioP09Nhjk9',
   * });
   * ```
   */
  create(body: NotificationCreateParams, options?: RequestOptions): APIPromise<Notification> {
    return (
      this._client.post('/notifications', {
        body,
        ...options,
        __security: { projectAccessTokenAuth: true },
      }) as APIPromise<{ data: Notification }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Retrieve details of a specific notification
   *
   * @example
   * ```ts
   * const notification = await client.notifications.retrieve(
   *   'notificationId',
   * );
   * ```
   */
  retrieve(notificationID: string, options?: RequestOptions): APIPromise<Notification> {
    return (
      this._client.get(path`/notifications/${notificationID}`, {
        ...options,
        __security: { projectAccessTokenAuth: true },
      }) as APIPromise<{ data: Notification }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Retrieve a list of notifications with optional filtering and pagination
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const notification of client.notifications.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: NotificationListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<NotificationsPaginatedResults, Notification> {
    return this._client.getAPIList('/notifications', PaginatedResults<Notification>, {
      query,
      ...options,
      __security: { projectAccessTokenAuth: true },
    });
  }

  /**
   * Delete a notification.
   *
   * @example
   * ```ts
   * await client.notifications.delete('notificationId');
   * ```
   */
  delete(notificationID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/notifications/${notificationID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: { projectAccessTokenAuth: true },
    });
  }
}

export type NotificationsPaginatedResults = PaginatedResults<Notification>;

export interface Notification {
  /**
   * Unique identifier of the notification
   */
  id: string;

  /**
   * Timestamp when the notification was created
   */
  created_at: string;

  /**
   * Type of event that triggered this notification
   */
  event:
    | 'job.created'
    | 'job.completed'
    | 'job.failed'
    | 'job.cancelled'
    | 'source.created'
    | 'source.deleted'
    | 'upload.created'
    | 'upload.completed'
    | 'upload.failed'
    | 'upload.expired'
    | 'asset.created'
    | 'asset.ready'
    | 'asset.playback_ready'
    | 'asset.failed'
    | 'asset.expired'
    | 'asset.deleted'
    | 'asset.output.created'
    | 'asset.output.ready'
    | 'asset.output.failed'
    | 'asset.output.deleted'
    | 'workflow_run.created'
    | 'workflow_run.completed'
    | 'workflow_run.failed'
    | 'workflow_run.cancelled'
    | 'transcoding.created'
    | 'transcoding.ready'
    | 'transcoding.failed'
    | 'transcoding.cancelled'
    | 'transcoding.expired'
    | 'transcoding.deleted'
    | 'thumbnail.created'
    | 'thumbnail.ready'
    | 'thumbnail.failed'
    | 'thumbnail.expired'
    | 'thumbnail.deleted';

  /**
   * ID of the object that triggered this notification
   */
  object_id: string;

  /**
   * JSON payload that was sent to the webhook endpoint
   */
  payload: string;

  /**
   * Webhook endpoint configuration that received this notification
   */
  webhook: WebhooksAPI.Webhook;

  /**
   * Originating event ID, when recorded by the event log.
   */
  event_id?: string;

  /**
   * HTTP status code received from the webhook endpoint
   */
  response_status_code?: number;
}

export interface NotificationCreateParams {
  /**
   * Event specifies the type of event that triggered the notification.
   */
  event:
    | 'job.created'
    | 'job.completed'
    | 'job.failed'
    | 'job.cancelled'
    | 'source.created'
    | 'source.deleted'
    | 'upload.created'
    | 'upload.completed'
    | 'upload.failed'
    | 'upload.expired'
    | 'asset.created'
    | 'asset.ready'
    | 'asset.playback_ready'
    | 'asset.failed'
    | 'asset.expired'
    | 'asset.deleted'
    | 'asset.output.created'
    | 'asset.output.ready'
    | 'asset.output.failed'
    | 'asset.output.deleted'
    | 'workflow_run.created'
    | 'workflow_run.completed'
    | 'workflow_run.failed'
    | 'workflow_run.cancelled'
    | 'transcoding.created'
    | 'transcoding.ready'
    | 'transcoding.failed'
    | 'transcoding.cancelled'
    | 'transcoding.expired'
    | 'transcoding.deleted'
    | 'thumbnail.created'
    | 'thumbnail.ready'
    | 'thumbnail.failed'
    | 'thumbnail.expired'
    | 'thumbnail.deleted';

  /**
   * ID of the resource that triggered the event. Use the caption, static rendition,
   * or thumbnail ID for their Asset child events. Replaying asset events,
   * job.created, or source.created requires a retained snapshot. Resource deletion
   * does not prevent replay.
   */
  object_id: string;

  /**
   * WebhookId specifies the webhook endpoint that will receive the notification.
   */
  webhook_id: string;
}

export interface NotificationListParams extends PaginatedResultsParams {
  created?: NotificationListParams.Created;

  /**
   * Filter deliveries by their originating event ID.
   */
  event_id?: string;

  /**
   * Filter by events
   */
  events?: Array<
    | 'job.created'
    | 'job.completed'
    | 'job.failed'
    | 'job.cancelled'
    | 'source.created'
    | 'source.deleted'
    | 'upload.created'
    | 'upload.completed'
    | 'upload.failed'
    | 'upload.expired'
    | 'asset.created'
    | 'asset.ready'
    | 'asset.playback_ready'
    | 'asset.failed'
    | 'asset.expired'
    | 'asset.deleted'
    | 'asset.output.created'
    | 'asset.output.ready'
    | 'asset.output.failed'
    | 'asset.output.deleted'
    | 'workflow_run.created'
    | 'workflow_run.completed'
    | 'workflow_run.failed'
    | 'workflow_run.cancelled'
    | 'transcoding.created'
    | 'transcoding.ready'
    | 'transcoding.failed'
    | 'transcoding.cancelled'
    | 'transcoding.expired'
    | 'transcoding.deleted'
    | 'thumbnail.created'
    | 'thumbnail.ready'
    | 'thumbnail.failed'
    | 'thumbnail.expired'
    | 'thumbnail.deleted'
  >;

  /**
   * Filter by object ID
   */
  object_id?: string;

  response_status_code?: NotificationListParams.ResponseStatusCode;

  /**
   * Filter by webhook ID
   */
  webhook_id?: string;
}

export namespace NotificationListParams {
  export interface Created {
    /**
     * Filter by creation date greater than or equal (UNIX epoch time)
     */
    gte?: number;

    /**
     * Filter by creation date less than or equal (UNIX epoch time)
     */
    lte?: number;

    /**
     * Sort by creation date (asc/desc)
     */
    sort?: 'asc' | 'desc';
  }

  export interface ResponseStatusCode {
    /**
     * Filter by exact response status code
     */
    eq?: number;

    /**
     * Filter by response status code greater than or equal
     */
    gte?: number;

    /**
     * Filter by response status code less than or equal
     */
    lte?: number;
  }
}

export declare namespace Notifications {
  export {
    type Notification as Notification,
    type NotificationsPaginatedResults as NotificationsPaginatedResults,
    type NotificationCreateParams as NotificationCreateParams,
    type NotificationListParams as NotificationListParams,
  };
}
