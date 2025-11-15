// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as FilesAPI from './files';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Webhooks extends APIResource {
  /**
   * Create a new webhook for a project. The webhook will receive notifications for
   * specified events.
   */
  create(body: WebhookCreateParams, options?: RequestOptions): APIPromise<WebhookCreateResponse> {
    return this._client.post('/api/webhooks', { body, ...options });
  }

  /**
   * Retrieve details of a specific webhook configuration by its ID. The webhook must
   * belong to the current project.
   */
  retrieve(webhookID: string, options?: RequestOptions): APIPromise<WebhookRetrieveResponse> {
    return this._client.get(path`/api/webhooks/${webhookID}`, options);
  }

  /**
   * Update the enabled status of a webhook. The webhook must belong to the current
   * project.
   */
  update(webhookID: string, body: WebhookUpdateParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.patch(path`/api/webhooks/${webhookID}`, { body, ...options });
  }

  /**
   * Retrieve a list of all webhooks configured for the current project. Each webhook
   * includes its URL, enabled status, and subscribed events.
   */
  list(options?: RequestOptions): APIPromise<WebhookListResponse> {
    return this._client.get('/api/webhooks', options);
  }

  /**
   * Permanently delete a webhook configuration. The webhook must belong to the
   * current project. This action cannot be undone.
   */
  delete(webhookID: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.delete(path`/api/webhooks/${webhookID}`, options);
  }
}

export interface Webhook {
  /**
   * Unique identifier of the webhook
   */
  id?: string;

  /**
   * Whether the webhook is currently enabled
   */
  enabled?: boolean;

  /**
   * Array of event types this webhook subscribes to
   */
  events?: Array<string>;

  /**
   * ID of the project this webhook belongs to
   */
  project_id?: string;

  /**
   * URL where webhook events will be sent
   */
  url?: string;
}

/**
 * Successful response
 */
export interface WebhookCreateResponse extends FilesAPI.ResponseOk {
  data?: Webhook;
}

/**
 * Successful response
 */
export interface WebhookRetrieveResponse extends FilesAPI.ResponseOk {
  data?: Webhook;
}

/**
 * No content response
 */
export type WebhookUpdateResponse = unknown;

/**
 * Successful response
 */
export interface WebhookListResponse extends FilesAPI.ResponseOk {
  data?: Array<Webhook>;
}

/**
 * No content response
 */
export type WebhookDeleteResponse = unknown;

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
  events?: Array<string>;
}

export interface WebhookUpdateParams {
  /**
   * Enabled indicates whether the webhook should be enabled or disabled.
   */
  enabled?: boolean;

  /**
   * Events specifies the types of events that will trigger the webhook.
   */
  events?: Array<string>;
}

export declare namespace Webhooks {
  export {
    type Webhook as Webhook,
    type WebhookCreateResponse as WebhookCreateResponse,
    type WebhookRetrieveResponse as WebhookRetrieveResponse,
    type WebhookUpdateResponse as WebhookUpdateResponse,
    type WebhookListResponse as WebhookListResponse,
    type WebhookDeleteResponse as WebhookDeleteResponse,
    type WebhookCreateParams as WebhookCreateParams,
    type WebhookUpdateParams as WebhookUpdateParams,
  };
}
