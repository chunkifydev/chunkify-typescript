// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Storages extends APIResource {
  /**
   * Create a new storage configuration for cloud storage providers like AWS S3,
   * Cloudflare R2, etc. The storage credentials will be validated before saving.
   */
  create(params: StorageCreateParams, options?: RequestOptions): APIPromise<Storage> {
    const { storage } = params;
    return (
      this._client.post('/api/storages', { body: storage, ...options }) as APIPromise<{ data: Storage }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Retrieve details of a specific storage configuration by its id.
   */
  retrieve(storageID: string, options?: RequestOptions): APIPromise<Storage> {
    return (
      this._client.get(path`/api/storages/${storageID}`, options) as APIPromise<{ data: Storage }>
    )._thenUnwrap((obj) => obj.data);
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

export type Storage = Storage.Chunkify | Storage.Cloudflare | Storage.Aws;

export namespace Storage {
  export interface Chunkify {
    /**
     * Unique identifier of the storage configuration
     */
    id: string;

    /**
     * Created at timestamp
     */
    created_at: string;

    /**
     * Provider specifies the storage provider.
     */
    provider: 'chunkify';

    /**
     * Region specifies the region of the storage provider.
     */
    region:
      | 'us-east-1'
      | 'us-east-2'
      | 'us-west-1'
      | 'us-west-2'
      | 'eu-west-1'
      | 'eu-west-2'
      | 'ap-northeast-1'
      | 'ap-southeast-1';

    /**
     * Unique identifier of the storage configuration
     */
    slug: string;
  }

  export interface Cloudflare {
    /**
     * Unique identifier of the storage configuration
     */
    id: string;

    /**
     * Bucket is the name of the storage bucket.
     */
    bucket: string;

    /**
     * Created at timestamp
     */
    created_at: string;

    /**
     * Endpoint is the endpoint of the storage provider.
     */
    endpoint: string;

    /**
     * Location specifies the location of the storage provider.
     */
    location: 'US' | 'EU' | 'ASIA';

    /**
     * Provider specifies the storage provider.
     */
    provider: 'cloudflare';

    /**
     * Public indicates whether the storage is publicly accessible.
     */
    public: boolean;

    /**
     * Region specifies the region of the storage provider.
     */
    region: 'auto';

    /**
     * Unique identifier of the storage configuration
     */
    slug: string;
  }

  export interface Aws {
    /**
     * Unique identifier of the storage configuration
     */
    id: string;

    /**
     * Bucket is the name of the storage bucket.
     */
    bucket: string;

    /**
     * Created at timestamp
     */
    created_at: string;

    /**
     * Provider specifies the storage provider.
     */
    provider: 'aws';

    /**
     * Public indicates whether the storage is publicly accessible.
     */
    public: boolean;

    /**
     * Region specifies the region of the storage provider.
     */
    region:
      | 'us-east-1'
      | 'us-east-2'
      | 'us-central-1'
      | 'us-west-1'
      | 'us-west-2'
      | 'eu-west-1'
      | 'eu-west-2'
      | 'eu-west-3'
      | 'eu-central-1'
      | 'eu-north-1'
      | 'ap-east-1'
      | 'ap-east-2'
      | 'ap-northeast-1'
      | 'ap-northeast-2'
      | 'ap-south-1'
      | 'ap-southeast-1'
      | 'ap-southeast-2';

    /**
     * Unique identifier of the storage configuration
     */
    slug: string;
  }
}

export interface StorageListResponse {
  data: Array<Storage>;

  /**
   * Status indicates the response status "success"
   */
  status: string;
}

export interface StorageCreateParams {
  /**
   * The parameters for creating a new storage configuration.
   */
  storage: StorageCreateParams.Aws | StorageCreateParams.Chunkify | StorageCreateParams.Cloudflare;
}

export namespace StorageCreateParams {
  /**
   * Storage parameters for AWS S3 storage.
   */
  export interface Aws {
    /**
     * AccessKeyId is the access key for the storage provider. Required if not using
     * Chunkify storage.
     */
    access_key_id: string;

    /**
     * Bucket is the name of the storage bucket.
     */
    bucket: string;

    /**
     * Provider specifies the storage provider.
     */
    provider: 'aws';

    /**
     * Region specifies the region of the storage provider.
     */
    region:
      | 'us-east-1'
      | 'us-east-2'
      | 'us-central-1'
      | 'us-west-1'
      | 'us-west-2'
      | 'eu-west-1'
      | 'eu-west-2'
      | 'eu-west-3'
      | 'eu-central-1'
      | 'eu-north-1'
      | 'ap-east-1'
      | 'ap-east-2'
      | 'ap-northeast-1'
      | 'ap-northeast-2'
      | 'ap-south-1'
      | 'ap-southeast-1'
      | 'ap-southeast-2';

    /**
     * SecretAccessKey is the secret key for the storage provider. Required if not
     * using Chunkify storage.
     */
    secret_access_key: string;

    /**
     * Public indicates whether the storage is publicly accessible.
     */
    public?: boolean;
  }

  /**
   * Storage parameters for Chunkify ephemeral storage.
   */
  export interface Chunkify {
    /**
     * Provider specifies the storage provider.
     */
    provider: 'chunkify';

    /**
     * Region specifies the region of the storage provider.
     */
    region:
      | 'us-east-1'
      | 'us-east-2'
      | 'us-west-1'
      | 'us-west-2'
      | 'eu-west-1'
      | 'eu-west-2'
      | 'ap-northeast-1'
      | 'ap-southeast-1';
  }

  /**
   * Storage parameters for Cloudflare R2 storage.
   */
  export interface Cloudflare {
    /**
     * AccessKeyId is the access key for the storage provider.
     */
    access_key_id: string;

    /**
     * Bucket is the name of the storage bucket.
     */
    bucket: string;

    /**
     * Endpoint is the endpoint of the storage provider.
     */
    endpoint: string;

    /**
     * Location specifies the location of the storage provider.
     */
    location: 'US' | 'EU' | 'ASIA';

    /**
     * Provider specifies the storage provider.
     */
    provider: 'cloudflare';

    /**
     * Region must be set to 'auto'.
     */
    region: 'auto';

    /**
     * SecretAccessKey is the secret key for the storage provider.
     */
    secret_access_key: string;

    /**
     * Public indicates whether the storage is publicly accessible.
     */
    public?: boolean;
  }
}

export declare namespace Storages {
  export {
    type Storage as Storage,
    type StorageListResponse as StorageListResponse,
    type StorageCreateParams as StorageCreateParams,
  };
}
