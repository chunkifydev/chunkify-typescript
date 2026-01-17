// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Tokens extends APIResource {
  /**
   * Create a new access token for either account-wide or project-specific access.
   * Project tokens require a valid project slug.
   */
  create(body: TokenCreateParams, options?: RequestOptions): APIPromise<Token> {
    return (
      this._client.post('/api/tokens', {
        body,
        ...options,
        __security: { teamAccessTokenAuth: true },
      }) as APIPromise<{ data: Token }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Retrieve a list of all API tokens for your account, including both team-scoped
   * and project-scoped tokens. For each token, the response includes its name,
   * scope, creation date, and usage statistics. The token values are not included in
   * the response for security reasons.
   */
  list(options?: RequestOptions): APIPromise<TokenListResponse> {
    return this._client.get('/api/tokens', { ...options, __security: { teamAccessTokenAuth: true } });
  }

  /**
   * Revoke an access token by its ID. This action is irreversible and will
   * immediately invalidate the token.
   */
  revoke(tokenID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/api/tokens/${tokenID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: { teamAccessTokenAuth: true },
    });
  }
}

export interface Token {
  /**
   * Unique identifier of the token
   */
  id: string;

  /**
   * The actual token value (only returned on creation)
   */
  token: string;

  /**
   * Timestamp when the token was created
   */
  created_at: string;

  /**
   * Name given to the token
   */
  name: string;

  /**
   * ID of the project this token belongs to
   */
  project_id: string;

  /**
   * Access scope of the token
   */
  scope: 'project' | 'team';
}

/**
 * Response containing the list of all tokens for a team. Including project and
 * team tokens.
 */
export interface TokenListResponse {
  /**
   * Data contains the token items
   */
  data: Array<Token>;

  /**
   * Status indicates the response status "success"
   */
  status: 'success';
}

export interface TokenCreateParams {
  /**
   * Scope specifies the scope of the token, which must be either "team" or
   * "project".
   */
  scope: 'project' | 'team';

  /**
   * Name is the name of the token, which can be up to 64 characters long.
   */
  name?: string;

  /**
   * ProjectId is required if the scope is set to "project".
   */
  project_id?: string;
}

export declare namespace Tokens {
  export {
    type Token as Token,
    type TokenListResponse as TokenListResponse,
    type TokenCreateParams as TokenCreateParams,
  };
}
