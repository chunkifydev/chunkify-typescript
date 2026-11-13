// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AssetsAPI from './assets';
import { APIPromise } from '../../core/api-promise';
import { PagePromise, PaginatedResults, type PaginatedResultsParams } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Automatic video-on-demand Assets and independent H.264 MP4 static renditions.
 */
export class Outputs extends APIResource {
  /**
   * Create one caption, static rendition or additional thumbnail output. The
   * accepted output processes asynchronously and is returned in the same envelope as
   * output reads.
   *
   * @example
   * ```ts
   * const assetOutput = await client.assets.outputs.create(
   *   'assetId',
   *   {
   *     output: {
   *       params: { resolution: '1080p' },
   *       type: 'static_rendition',
   *     },
   *   },
   * );
   * ```
   */
  create(assetID: string, params: OutputCreateParams, options?: RequestOptions): APIPromise<AssetOutput> {
    const { output } = params;
    return (
      this._client.post(path`/assets/${assetID}/outputs`, {
        body: output,
        ...options,
        __security: { projectAccessTokenAuth: true },
      }) as APIPromise<{ data: AssetOutput }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Retrieve one output belonging to the specified Asset and authenticated Project.
   * Delivery URLs follow the output resource retention and expiry rules.
   *
   * @example
   * ```ts
   * const assetOutput = await client.assets.outputs.retrieve(
   *   'outputId',
   *   { assetId: 'assetId' },
   * );
   * ```
   */
  retrieve(
    outputID: string,
    params: OutputRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<AssetOutput> {
    const { assetId } = params;
    return (
      this._client.get(path`/assets/${assetId}/outputs/${outputID}`, {
        ...options,
        __security: { projectAccessTokenAuth: true },
      }) as APIPromise<{ data: AssetOutput }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * List outputs requested directly or by a Workflow. Results are ordered by
   * creation date, newest first, with descending output ID as a tie-breaker.
   * Pagination and total apply after type and status filters. Core playback, poster
   * and default timeline previews remain on the Asset.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const assetOutput of client.assets.outputs.list(
   *   'assetId',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    assetID: string,
    query: OutputListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<AssetOutputsPaginatedResults, AssetOutput> {
    return this._client.getAPIList(path`/assets/${assetID}/outputs`, PaginatedResults<AssetOutput>, {
      query,
      ...options,
      __security: { projectAccessTokenAuth: true },
    });
  }

  /**
   * Delete one output belonging to this Asset and Project. Its type is resolved from
   * the output ID. Type-specific processing and dependency restrictions still apply.
   *
   * @example
   * ```ts
   * await client.assets.outputs.delete('outputId', {
   *   assetId: 'assetId',
   * });
   * ```
   */
  delete(outputID: string, params: OutputDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { assetId, delete_files } = params;
    return this._client.delete(path`/assets/${assetId}/outputs/${outputID}`, {
      query: { delete_files },
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: { projectAccessTokenAuth: true },
    });
  }
}

export type AssetOutputsPaginatedResults = PaginatedResults<AssetOutput>;

/**
 * A resource produced for an Asset, requested directly or by a Workflow. Its type
 * selects the details schema. Output state is independent of Asset playback
 * readiness.
 */
export type AssetOutput =
  | AssetsAPI.AssetCaptionOutput
  | AssetsAPI.AssetStaticRenditionOutput
  | AssetsAPI.AssetThumbnailOutput
  | AssetsAPI.AssetTranscriptOutput;

export interface OutputCreateParams {
  /**
   * Create one output for an Asset. Type selects its required, strictly validated
   * parameters.
   */
  output:
    | AssetsAPI.AssetCaptionOutputCreateParams
    | AssetsAPI.AssetStaticRenditionOutputCreateParams
    | AssetsAPI.AssetThumbnailOutputCreateParams
    | AssetsAPI.AssetTranscriptOutputCreateParams;
}

export interface OutputRetrieveParams {
  /**
   * ID of the Asset.
   */
  assetId: string;
}

export interface OutputListParams extends PaginatedResultsParams {
  /**
   * Status specifies the current output state to include. Omit it to include all
   * states.
   */
  status?: 'preparing' | 'ready' | 'failed' | 'expired';

  /**
   * Type specifies the output kind to include. Omit it to include all kinds.
   */
  type?: 'caption' | 'transcript' | 'static_rendition' | 'thumbnail';
}

export interface OutputDeleteParams {
  /**
   * Path param: AssetId identifies the Asset that owns the output within the
   * authenticated Project.
   */
  assetId: string;

  /**
   * Query param: DeleteFiles specifies whether to remove this output's published
   * media files from Storage. Defaults to false, preserving those files. Transcript
   * deletion always schedules removal of its private text and saved subtitle copy,
   * regardless of this option. The Asset, Source, and other outputs are preserved.
   * File cleanup failures retain the output record for retry; files already removed
   * cannot be restored.
   */
  delete_files?: boolean;
}

export declare namespace Outputs {
  export {
    type AssetOutput as AssetOutput,
    type AssetOutputsPaginatedResults as AssetOutputsPaginatedResults,
    type OutputCreateParams as OutputCreateParams,
    type OutputRetrieveParams as OutputRetrieveParams,
    type OutputListParams as OutputListParams,
    type OutputDeleteParams as OutputDeleteParams,
  };
}
