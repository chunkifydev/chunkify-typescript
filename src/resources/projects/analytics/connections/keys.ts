// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../core/resource';
import { APIPromise } from '../../../../core/api-promise';
import { RequestOptions } from '../../../../internal/request-options';
import { path } from '../../../../internal/utils/path';

export class Keys extends APIResource {
  /**
   * Generate a public key for players to send events, or a read-only secret key for
   * a dashboard or MCP client to query a hosted Chunkify Analytics server. Save
   * secret keys when returned. Requires a team owner and a Team Access Key.
   *
   * @example
   * ```ts
   * const key =
   *   await client.projects.analytics.connections.keys.create(
   *     'projectId',
   *     'connectionId',
   *     { purpose: 'player' },
   *   );
   * ```
   */
  create(
    projectID: string,
    connectionID: string,
    body: KeyCreateParams,
    options?: RequestOptions,
  ): APIPromise<KeyCreateResponse> {
    return this._client.post(path`/projects/${projectID}/analytics/connections/${connectionID}/keys`, {
      body,
      ...options,
      __security: { teamAccessTokenAuth: true },
    });
  }

  /**
   * List keys for a hosted Chunkify Analytics server: the public key used by players
   * to send events, and read-only secret key records for dashboard and MCP access.
   * Secret values are not returned. Requires a team owner and a Team Access Key.
   *
   * @example
   * ```ts
   * const keys =
   *   await client.projects.analytics.connections.keys.list(
   *     'projectId',
   *     'connectionId',
   *   );
   * ```
   */
  list(projectID: string, connectionID: string, options?: RequestOptions): APIPromise<KeyListResponse> {
    return this._client.get(path`/projects/${projectID}/analytics/connections/${connectionID}/keys`, {
      ...options,
      __security: { teamAccessTokenAuth: true },
    });
  }

  /**
   * Rotate a public or read-only secret key for a hosted Chunkify Analytics server.
   * Update the player, dashboard, or MCP client with the new key; the old key stops
   * working immediately. Requires a team owner and a Team Access Key.
   *
   * @example
   * ```ts
   * const response =
   *   await client.projects.analytics.connections.keys.rotate(
   *     'projectId',
   *     'connectionId',
   *     'keyId',
   *   );
   * ```
   */
  rotate(
    projectID: string,
    connectionID: string,
    keyID: string,
    options?: RequestOptions,
  ): APIPromise<KeyRotateResponse> {
    return this._client.post(
      path`/projects/${projectID}/analytics/connections/${connectionID}/keys/${keyID}/rotate`,
      { ...options, __security: { teamAccessTokenAuth: true } },
    );
  }
}

/**
 * One key per purpose. Public player values remain available; read and MCP values
 * are returned only on creation or rotation.
 */
export interface AnalyticsKey {
  /**
   * Id identifies this key in the collector.
   */
  id: string;

  /**
   * Purpose distinguishes player ingestion, read-only API access and a separate
   * read-only MCP credential. Read and MCP keys have the same collector permissions.
   */
  purpose: 'player' | 'read' | 'mcp';

  /**
   * PublicKey is the browser ingestion credential for a player key. Omitted for
   * read-only API and MCP keys, whose secret values are shown once.
   */
  public_key?: string;
}

export interface KeyCreateResponse {
  /**
   * One key per purpose. Public player values remain available; read and MCP values
   * are returned only on creation or rotation.
   */
  data: AnalyticsKey;

  /**
   * Key is the new credential. Save read and MCP keys now; later reads omit their
   * values. Public keys remain available.
   */
  key: string;

  status: 'success';
}

export interface KeyListResponse {
  data: Array<AnalyticsKey>;

  status: 'success';
}

export interface KeyRotateResponse {
  /**
   * One key per purpose. Public player values remain available; read and MCP values
   * are returned only on creation or rotation.
   */
  data: AnalyticsKey;

  /**
   * Key is the new credential. Save read and MCP keys now; later reads omit their
   * values. Public keys remain available.
   */
  key: string;

  status: 'success';
}

export interface KeyCreateParams {
  /**
   * Purpose distinguishes player ingestion, read-only API access and a separate
   * read-only MCP credential. Read and MCP keys have the same collector permissions.
   */
  purpose: 'player' | 'read' | 'mcp';
}

export declare namespace Keys {
  export {
    type AnalyticsKey as AnalyticsKey,
    type KeyCreateResponse as KeyCreateResponse,
    type KeyListResponse as KeyListResponse,
    type KeyRotateResponse as KeyRotateResponse,
    type KeyCreateParams as KeyCreateParams,
  };
}
