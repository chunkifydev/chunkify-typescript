// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as EventsAPI from './events';
import * as NotificationsAPI from './notifications';
import { APIPromise } from '../core/api-promise';
import { PagePromise, PaginatedResults, type PaginatedResultsParams } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Events extends APIResource {
  /**
   * Retrieve a retained event, its frozen payload, related resources, and up to 100
   * delivery attempts. No webhook configuration is required.
   */
  retrieve(eventID: string, options?: RequestOptions): APIPromise<Event> {
    return (this._client.get(path`/events/${eventID}`, { ...options, __security: { projectAccessTokenAuth : true } }) as APIPromise<{ data: Event }>)._thenUnwrap((obj) => obj.data);
  }

  /**
   * List lifecycle events recorded with or without webhooks. Events and their
   * deliveries expire according to the plan retention deadline. Historical
   * notifications recorded before the event log remain available through
   * Notifications.
   */
  list(query: EventListParams | null | undefined = {}, options?: RequestOptions): PagePromise<EventsPaginatedResults, Event> {
    return this._client.getAPIList('/events', PaginatedResults<Event>, { query, ...options, __security: { projectAccessTokenAuth : true } });
  }
}

export type EventsPaginatedResults = PaginatedResults<Event>

/**
 * A retained lifecycle event, recorded independently of webhook subscriptions. The
 * payload is an immutable JSON snapshot.
 */
export interface Event {
  /**
   * Unique event ID.
   */
  id: string;

  /**
   * Time the event occurred.
   */
  created_at: string;

  /**
   * Number of retained webhook delivery attempts.
   */
  delivery_count: number;

  /**
   * Summary of the latest retained attempt for each webhook. none means no retained
   * attempts; pending means at least one latest attempt is awaiting delivery; failed
   * means at least one latest attempt failed and none are pending; delivered means
   * all latest attempts succeeded. Earlier failures superseded by successful retries
   * do not mark the event failed.
   */
  delivery_status: 'none' | 'pending' | 'delivered' | 'failed';

  event: 'job.created' | 'job.completed' | 'job.failed' | 'job.cancelled' | 'source.created' | 'source.deleted' | 'upload.created' | 'upload.completed' | 'upload.failed' | 'upload.expired' | 'asset.created' | 'asset.ready' | 'asset.playback_ready' | 'asset.failed' | 'asset.expired' | 'asset.deleted' | 'asset.output.created' | 'asset.output.ready' | 'asset.output.failed' | 'asset.output.deleted' | 'workflow_run.created' | 'workflow_run.completed' | 'workflow_run.failed' | 'workflow_run.cancelled' | 'transcoding.created' | 'transcoding.ready' | 'transcoding.failed' | 'transcoding.cancelled' | 'transcoding.expired' | 'transcoding.deleted' | 'thumbnail.created' | 'thumbnail.ready' | 'thumbnail.failed' | 'thumbnail.expired' | 'thumbnail.deleted';

  /**
   * Retention deadline set from the project team plan when the event was recorded.
   * Deliveries and retries share this deadline.
   */
  expires_at: string;

  /**
   * ID of the resource that caused this event.
   */
  object_id: string;

  /**
   * Immutable JSON event envelope. Its ID is the event ID; webhook delivery
   * envelopes retain their notification IDs. Signed links in historical snapshots
   * may have expired.
   */
  payload: string;

  /**
   * Related resource IDs retained independently of resource deletion.
   */
  related_object_ids: Array<string>;

  /**
   * First 100 delivery attempts, oldest first; included on retrieval. List
   * notifications with event_id to paginate all attempts.
   */
  deliveries?: Array<NotificationsAPI.Notification>;
}

export interface EventListParams extends PaginatedResultsParams {
  created?: EventListParams.Created;

  /**
   * Filter by events
   */
  events?: Array<'job.created' | 'job.completed' | 'job.failed' | 'job.cancelled' | 'source.created' | 'source.deleted' | 'upload.created' | 'upload.completed' | 'upload.failed' | 'upload.expired' | 'asset.created' | 'asset.ready' | 'asset.playback_ready' | 'asset.failed' | 'asset.expired' | 'asset.deleted' | 'asset.output.created' | 'asset.output.ready' | 'asset.output.failed' | 'asset.output.deleted' | 'workflow_run.created' | 'workflow_run.completed' | 'workflow_run.failed' | 'workflow_run.cancelled' | 'transcoding.created' | 'transcoding.ready' | 'transcoding.failed' | 'transcoding.cancelled' | 'transcoding.expired' | 'transcoding.deleted' | 'thumbnail.created' | 'thumbnail.ready' | 'thumbnail.failed' | 'thumbnail.expired' | 'thumbnail.deleted'>;

  /**
   * Filter by the primary or a related resource ID, including retained associations
   * after resource deletion.
   */
  object_id?: string;
}

export namespace EventListParams {
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
}

export declare namespace Events {
  export {
    type Event as Event,
    type EventsPaginatedResults as EventsPaginatedResults,
    type EventListParams as EventListParams
  };
}
