// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as FilesAPI from './files';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Projects extends APIResource {
  /**
   * Create a new project with the specified name. The project will be created with
   * default Chunkify storage settings.
   */
  create(body: ProjectCreateParams, options?: RequestOptions): APIPromise<ProjectCreateResponse> {
    return this._client.post('/api/projects', { body, ...options });
  }

  /**
   * Retrieve details of a specific project by its slug
   */
  retrieve(projectID: string, options?: RequestOptions): APIPromise<ProjectRetrieveResponse> {
    return this._client.get(path`/api/projects/${projectID}`, options);
  }

  /**
   * Update a project's name or storage settings. Only team owners can update
   * projects.
   */
  update(projectID: string, body: ProjectUpdateParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.patch(path`/api/projects/${projectID}`, { body, ...options });
  }

  /**
   * Retrieve a list of all projects with optional filtering and pagination
   */
  list(
    query: ProjectListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ProjectListResponse> {
    return this._client.get('/api/projects', { query, ...options });
  }

  /**
   * Delete a project and revoke all associated access tokens. Only team owners can
   * delete projects.
   */
  delete(projectID: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.delete(path`/api/projects/${projectID}`, options);
  }
}

export interface Project {
  /**
   * Id is the unique identifier for the project.
   */
  id?: string;

  /**
   * Timestamp when the project was created
   */
  created_at?: string;

  /**
   * Name of the project
   */
  name?: string;

  /**
   * Slug is the slug for the project.
   */
  slug?: string;

  /**
   * StorageId identifier where project files are stored
   */
  storage_id?: string;
}

/**
 * Successful response
 */
export interface ProjectCreateResponse extends FilesAPI.ResponseOk {
  data?: Project;
}

/**
 * Successful response
 */
export interface ProjectRetrieveResponse extends FilesAPI.ResponseOk {
  data?: Project;
}

/**
 * No content response
 */
export type ProjectUpdateResponse = unknown;

/**
 * Successful response
 */
export interface ProjectListResponse extends FilesAPI.ResponseOk {
  data?: Array<Project>;
}

/**
 * No content response
 */
export type ProjectDeleteResponse = unknown;

export interface ProjectCreateParams {
  /**
   * Name is the name of the project, which must be between 4 and 32 characters.
   */
  name: string;
}

export interface ProjectUpdateParams {
  /**
   * Name is the new name for the project, which must be between 4 and 32 characters.
   */
  name?: string;

  /**
   * StorageId specifies the storage configuration for the project, which must be
   * between 4 and 64 characters.
   */
  storage_id?: string;
}

export interface ProjectListParams {
  /**
   * Pagination limit (max 100)
   */
  limit?: number;

  /**
   * Pagination offset
   */
  offset?: number;
}

export declare namespace Projects {
  export {
    type Project as Project,
    type ProjectCreateResponse as ProjectCreateResponse,
    type ProjectRetrieveResponse as ProjectRetrieveResponse,
    type ProjectUpdateResponse as ProjectUpdateResponse,
    type ProjectListResponse as ProjectListResponse,
    type ProjectDeleteResponse as ProjectDeleteResponse,
    type ProjectCreateParams as ProjectCreateParams,
    type ProjectUpdateParams as ProjectUpdateParams,
    type ProjectListParams as ProjectListParams,
  };
}
