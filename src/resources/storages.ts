// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as FilesAPI from './files';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Storages extends APIResource {
  /**
   * Create a new storage configuration for cloud storage providers like AWS S3,
   * Cloudflare R2, etc. The storage credentials will be validated before saving.
   */
  create(body: StorageCreateParams, options?: RequestOptions): APIPromise<StorageCreateResponse> {
    return this._client.post('/api/storages', { body, ...options });
  }

  /**
   * Retrieve details of a specific storage configuration by its id.
   */
  retrieve(storageID: string, options?: RequestOptions): APIPromise<StorageRetrieveResponse> {
    return this._client.get(path`/api/storages/${storageID}`, options);
  }

  /**
   * Retrieve a list of all storage configurations for the current project.
   */
  list(options?: RequestOptions): APIPromise<StorageListResponse> {
    return this._client.get('/api/storages', options);
  }

  /**
   * Delete a storage configuration. The storage must not be currently attached to
   * the project.
   */
  delete(storageID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/api/storages/${storageID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface Storage {
  /**
   * Unique identifier of the storage configuration
   */
  id?: string;

  /**
   * Name of the storage bucket
   */
  bucket?: string;

  /**
   * Created at timestamp
   */
  created_at?: string;

  /**
   * Endpoint of the storage provider
   */
  endpoint?: string;

  /**
   * Continent location of the storage (eg. US, EU, ASIA)
   */
  location?: string;

  /**
   * Name of the storage provider (e.g. AWS, GCP)
   */
  provider?: string;

  /**
   * Whether the storage bucket is publicly accessible
   */
  public?: boolean;

  /**
   * Geographic region where the storage is located
   */
  region?: string;

  /**
   * Unique identifier of the storage configuration
   */
  slug?: string;
}

/**
 * Successful response
 */
export interface StorageCreateResponse extends FilesAPI.ResponseOk {
  data?: Storage;
}

/**
 * Successful response
 */
export interface StorageRetrieveResponse extends FilesAPI.ResponseOk {
  data?: Storage;
}

/**
 * Successful response
 */
export interface StorageListResponse extends FilesAPI.ResponseOk {
  data?: Array<Storage>;
}

export interface StorageCreateParams {
  /**
   * Provider specifies the storage provider.
   */
  provider: 'chunkify' | 'aws' | 'cloudflare';
}

export declare namespace Storages {
  export {
    type Storage as Storage,
    type StorageCreateResponse as StorageCreateResponse,
    type StorageRetrieveResponse as StorageRetrieveResponse,
    type StorageListResponse as StorageListResponse,
    type StorageCreateParams as StorageCreateParams,
  };
}
