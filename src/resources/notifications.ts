// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as FilesAPI from './files';
import * as WebhooksAPI from './webhooks';
import { APIPromise } from '../core/api-promise';
import { MyOffsetPage, type MyOffsetPageParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Notifications extends APIResource {
  /**
   * Create a new notification for a job event
   */
  create(body: NotificationCreateParams, options?: RequestOptions): APIPromise<NotificationCreateResponse> {
    return this._client.post('/api/notifications', { body, ...options });
  }

  /**
   * Retrieve details of a specific notification
   */
  retrieve(notificationID: string, options?: RequestOptions): APIPromise<NotificationRetrieveResponse> {
    return this._client.get(path`/api/notifications/${notificationID}`, options);
  }

  /**
   * Retrieve a list of notifications with optional filtering and pagination
   */
  list(
    query: NotificationListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<NotificationsMyOffsetPage, Notification> {
    return this._client.getAPIList('/api/notifications', MyOffsetPage<Notification>, { query, ...options });
  }

  /**
   * Delete a notification.
   */
  delete(notificationID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/api/notifications/${notificationID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type NotificationsMyOffsetPage = MyOffsetPage<Notification>;

export interface Notification {
  /**
   * Unique identifier of the notification
   */
  id?: string;

  /**
   * Timestamp when the notification was created
   */
  created_at?: string;

  /**
   * Type of event that triggered this notification
   */
  event?: string;

  /**
   * ID of the object that triggered this notification
   */
  object_id?: string;

  /**
   * JSON payload that was sent to the webhook endpoint
   */
  payload?: string;

  /**
   * HTTP status code received from the webhook endpoint
   */
  response_status_code?: number;

  /**
   * Webhook endpoint configuration that received this notification
   */
  webhook?: WebhooksAPI.Webhook;
}

/**
 * Successful response
 */
export interface NotificationCreateResponse extends Omit<FilesAPI.ResponseOk, 'data'> {
  data?: Notification;
}

/**
 * Successful response
 */
export interface NotificationRetrieveResponse extends Omit<FilesAPI.ResponseOk, 'data'> {
  data?: Notification;
}

export interface NotificationCreateParams {
  /**
   * Event specifies the type of event that triggered the notification. Currently
   * only supports "job.completed" event type.
   */
  event:
    | 'job.completed'
    | 'job.failed'
    | 'job.cancelled'
    | 'upload.completed'
    | 'upload.failed'
    | 'upload.expired';

  /**
   * ObjectId specifies the object that triggered this notification.
   */
  object_id: string;

  /**
   * WebhookId specifies the webhook endpoint that will receive the notification.
   */
  webhook_id: string;
}

export interface NotificationListParams extends MyOffsetPageParams {
  created?: NotificationListParams.Created;

  /**
   * Filter by events (e.g. job.completed, job.failed, upload.completed,
   * upload.failed, upload.expired)
   */
  events?: Array<string>;

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
     * Filter by creation date greater than or equal (RFC3339)
     */
    gte?: string;

    /**
     * Filter by creation date less than or equal (RFC3339)
     */
    lte?: string;

    /**
     * Sort by creation date (asc/desc)
     */
    sort?: string;
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
    type NotificationCreateResponse as NotificationCreateResponse,
    type NotificationRetrieveResponse as NotificationRetrieveResponse,
    type NotificationsMyOffsetPage as NotificationsMyOffsetPage,
    type NotificationCreateParams as NotificationCreateParams,
    type NotificationListParams as NotificationListParams,
  };
}
