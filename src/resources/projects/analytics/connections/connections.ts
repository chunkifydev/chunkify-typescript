// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../core/resource';
import * as KeysAPI from './keys';
import {
  AnalyticsKey,
  KeyCreateParams,
  KeyCreateResponse,
  KeyListResponse,
  KeyRotateResponse,
  Keys,
} from './keys';
import { APIPromise } from '../../../../core/api-promise';
import { buildHeaders } from '../../../../internal/headers';
import { RequestOptions } from '../../../../internal/request-options';
import { path } from '../../../../internal/utils/path';

export class Connections extends APIResource {
  keys: KeysAPI.Keys = new KeysAPI.Keys(this._client);

  /**
   * Add a hosted connection or validate and save a custom server. Only team owners
   * can create connections. Retry a known failed hosted setup with the same name to
   * resume its saved project; an unknown creation outcome requires operator
   * reconciliation.
   *
   * @example
   * ```ts
   * const connection =
   *   await client.projects.analytics.connections.create(
   *     'projectId',
   *     {
   *       name: 'Website analytics',
   *       type: 'custom',
   *       endpoint: 'https://analytics.example.com',
   *       read_key: 'YOUR_READ_ONLY_KEY',
   *     },
   *   );
   * ```
   */
  create(
    projectID: string,
    body: ConnectionCreateParams,
    options?: RequestOptions,
  ): APIPromise<ConnectionCreateResponse> {
    return this._client.post(path`/projects/${projectID}/analytics/connections`, {
      body,
      ...options,
      __security: { teamAccessTokenAuth: true },
    });
  }

  /**
   * Retrieve non-secret connection metadata within its owning project.
   *
   * @example
   * ```ts
   * const analyticsConnection =
   *   await client.projects.analytics.connections.retrieve(
   *     'projectId',
   *     'connectionId',
   *   );
   * ```
   */
  retrieve(
    projectID: string,
    connectionID: string,
    options?: RequestOptions,
  ): APIPromise<AnalyticsConnection> {
    return (
      this._client.get(path`/projects/${projectID}/analytics/connections/${connectionID}`, {
        ...options,
        __security: { teamAccessTokenAuth: true },
      }) as APIPromise<{ data: AnalyticsConnection }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Rename a connection or validate replacement custom credentials. Only team owners
   * can update connections. Existing settings remain unchanged if validation fails.
   *
   * @example
   * ```ts
   * const analyticsConnection =
   *   await client.projects.analytics.connections.update(
   *     'projectId',
   *     'connectionId',
   *     { name: 'Production analytics' },
   *   );
   * ```
   */
  update(
    projectID: string,
    connectionID: string,
    body: ConnectionUpdateParams,
    options?: RequestOptions,
  ): APIPromise<AnalyticsConnection> {
    return (
      this._client.patch(path`/projects/${projectID}/analytics/connections/${connectionID}`, {
        body,
        ...options,
        __security: { teamAccessTokenAuth: true },
      }) as APIPromise<{ data: AnalyticsConnection }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * List the saved connections for this project. No connection is activated by this
   * request.
   *
   * @example
   * ```ts
   * const connections =
   *   await client.projects.analytics.connections.list(
   *     'projectId',
   *   );
   * ```
   */
  list(projectID: string, options?: RequestOptions): APIPromise<ConnectionListResponse> {
    return this._client.get(path`/projects/${projectID}/analytics/connections`, {
      ...options,
      __security: { teamAccessTokenAuth: true },
    });
  }

  /**
   * For hosted connections, delete the linked analytics project and invalidate its
   * keys before removing the saved connection. Stored events expire under the
   * collector retention policy. For custom connections, remove only the saved
   * credentials and connection; the remote server, project and data remain
   * unchanged. Only team owners can delete connections. An uncertain remote result
   * preserves the connection for reconciliation.
   *
   * @example
   * ```ts
   * await client.projects.analytics.connections.delete(
   *   'projectId',
   *   'connectionId',
   * );
   * ```
   */
  delete(projectID: string, connectionID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/projects/${projectID}/analytics/connections/${connectionID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: { teamAccessTokenAuth: true },
    });
  }
}

/**
 * A saved source for analytics reports. The dashboard player default is
 * independent of the connection selected in reports. External players keep their
 * own configuration. Only the public ingest key is included; read and management
 * credentials stay private.
 */
export interface AnalyticsConnection {
  /**
   * Id identifies this saved analytics connection.
   */
  id: string;

  /**
   * CreatedAt records when this connection was added.
   */
  created_at: string;

  /**
   * DefaultForDashboard selects this connection for Chunkify dashboard players,
   * public previews, the playground and newly generated snippets. It does not change
   * existing external players. At most one connection per project is selected.
   */
  default_for_dashboard: boolean;

  /**
   * Endpoint specifies the analytics server base URL. It does not configure the
   * player.
   */
  endpoint: string;

  /**
   * Name identifies this connection in the dashboard.
   */
  name: string;

  /**
   * ProjectId identifies the owning Chunkify project.
   */
  project_id: string;

  /**
   * Status indicates whether the connection is ready to read or requires setup
   * repair.
   */
  status: 'preparing' | 'ready' | 'failed';

  /**
   * Type specifies whether Chunkify manages the analytics project.
   */
  type: 'hosted' | 'custom';

  /**
   * UpdatedAt records when this connection was last changed.
   */
  updated_at: string;

  /**
   * AllowedOrigins lists additional website origins permitted to ingest events for a
   * hosted connection. Shared installation origins remain allowed. An empty list
   * clears project-specific origins. Custom servers manage origins on their own
   * infrastructure.
   */
  allowed_origins?: Array<string>;

  /**
   * LastCheckedAt records the most recent successful connection check.
   */
  last_checked_at?: string;

  /**
   * PublicIngestKey is the public browser ingestion key used by Chunkify previews
   * and player examples. It cannot read or manage analytics. Hosted connections use
   * their primary public key. Omitted when preview tracking is not configured.
   */
  public_ingest_key?: string;

  /**
   * RetentionSeconds is the last retention applied to a hosted project, in seconds.
   * Omitted for custom connections.
   */
  retention_seconds?: number;
}

export interface ConnectionCreateResponse {
  /**
   * A saved source for analytics reports. The dashboard player default is
   * independent of the connection selected in reports. External players keep their
   * own configuration. Only the public ingest key is included; read and management
   * credentials stay private.
   */
  data: AnalyticsConnection;

  status: 'success';

  /**
   * PublicKey is the hosted ingestion key. It remains available as public_ingest_key
   * on the connection. Omitted for custom connections.
   */
  public_key?: string;
}

export interface ConnectionListResponse {
  /**
   * Saved connections in creation order.
   */
  data: Array<AnalyticsConnection>;

  status: 'success';
}

export interface ConnectionCreateParams {
  /**
   * Name identifies this connection in the dashboard.
   */
  name: string;

  /**
   * Type specifies whether Chunkify manages the analytics project.
   */
  type: 'hosted' | 'custom';

  /**
   * Endpoint specifies the custom server base URL. Required for custom connections
   * and omitted for hosted connections.
   */
  endpoint?: string;

  /**
   * PublicIngestKey optionally enables preview tracking for a custom connection.
   * Supply the public ingestion key for the same analytics project as read_key. It
   * is returned in connection reads and used in browser code. Omit for hosted
   * connections.
   */
  public_ingest_key?: string;

  /**
   * ReadKey supplies a read-only project credential for a custom connection.
   * Required for custom connections and omitted for hosted connections. Stored
   * encrypted and never returned.
   */
  read_key?: string;
}

export interface ConnectionUpdateParams {
  /**
   * AllowedOrigins lists additional website origins permitted to ingest events for a
   * hosted connection. Shared installation origins remain allowed. An empty list
   * clears project-specific origins. Custom servers manage origins on their own
   * infrastructure.
   */
  allowed_origins?: Array<string>;

  /**
   * DefaultForDashboard selects this ready connection for Chunkify dashboard
   * players, public previews, the playground and newly generated snippets. Requires
   * a public ingest key. Setting true replaces the previous default atomically.
   * Setting false disables dashboard tracking if no default remains; another
   * connection is not selected automatically. Existing external players keep their
   * own configuration.
   */
  default_for_dashboard?: boolean;

  /**
   * Endpoint specifies a replacement custom server base URL. Supply read_key
   * together with it.
   */
  endpoint?: string;

  /**
   * Name identifies this connection in the dashboard.
   */
  name?: string;

  /**
   * PublicIngestKey optionally enables preview tracking for a custom connection.
   * Supply the public ingestion key for the same analytics project as read_key. It
   * is returned in connection reads and used in browser code. Omit for hosted
   * connections. An empty string disables preview tracking. A replacement endpoint
   * clears the saved public key unless a replacement is supplied.
   */
  public_ingest_key?: string;

  /**
   * ReadKey replaces the custom connection credential after validation. Its value is
   * never returned.
   */
  read_key?: string;
}

Connections.Keys = Keys;

export declare namespace Connections {
  export {
    type AnalyticsConnection as AnalyticsConnection,
    type ConnectionCreateResponse as ConnectionCreateResponse,
    type ConnectionListResponse as ConnectionListResponse,
    type ConnectionCreateParams as ConnectionCreateParams,
    type ConnectionUpdateParams as ConnectionUpdateParams,
  };

  export {
    Keys as Keys,
    type AnalyticsKey as AnalyticsKey,
    type KeyCreateResponse as KeyCreateResponse,
    type KeyListResponse as KeyListResponse,
    type KeyRotateResponse as KeyRotateResponse,
    type KeyCreateParams as KeyCreateParams,
  };
}
