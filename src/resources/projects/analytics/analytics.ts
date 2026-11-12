// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as ConnectionsAPI from './connections/connections';
import {
  AnalyticsConnection,
  ConnectionCreateParams,
  ConnectionCreateResponse,
  ConnectionListResponse,
  ConnectionUpdateParams,
  Connections,
} from './connections/connections';

export class Analytics extends APIResource {
  connections: ConnectionsAPI.Connections = new ConnectionsAPI.Connections(this._client);
}

Analytics.Connections = Connections;

export declare namespace Analytics {
  export {
    Connections as Connections,
    type AnalyticsConnection as AnalyticsConnection,
    type ConnectionCreateResponse as ConnectionCreateResponse,
    type ConnectionListResponse as ConnectionListResponse,
    type ConnectionCreateParams as ConnectionCreateParams,
    type ConnectionUpdateParams as ConnectionUpdateParams,
  };
}
