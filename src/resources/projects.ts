// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Projects extends APIResource {
  /**
   * Create a new project with the specified name. The project will be created with
   * default Chunkify storage settings.
   */
  create(body: ProjectCreateParams, options?: RequestOptions): APIPromise<Project> {
    return (
      this._client.post('/api/projects', {
        body,
        ...options,
        __security: { teamAccessTokenAuth: true },
      }) as APIPromise<{ data: Project }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Retrieve details of a specific project by its slug
   */
  retrieve(projectID: string, options?: RequestOptions): APIPromise<Project> {
    return (
      this._client.get(path`/api/projects/${projectID}`, {
        ...options,
        __security: { teamAccessTokenAuth: true },
      }) as APIPromise<{ data: Project }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Update a project's name or storage settings. Only team owners can update
   * projects.
   */
  update(projectID: string, body: ProjectUpdateParams, options?: RequestOptions): APIPromise<void> {
    return this._client.patch(path`/api/projects/${projectID}`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: { teamAccessTokenAuth: true },
    });
  }

  /**
   * Retrieve a list of all projects for a team
   */
  list(options?: RequestOptions): APIPromise<ProjectListResponse> {
    return this._client.get('/api/projects', { ...options, __security: { teamAccessTokenAuth: true } });
  }

  /**
   * Delete a project and revoke all associated access tokens. Only team owners can
   * delete projects.
   */
  delete(projectID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/api/projects/${projectID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: { teamAccessTokenAuth: true },
    });
  }
}

export interface Project {
  /**
   * Id is the unique identifier for the project.
   */
  id: string;

  /**
   * Timestamp when the project was created
   */
  created_at: string;

  /**
   * Name of the project
   */
  name: string;

  /**
   * Slug is the slug for the project.
   */
  slug: string;

  /**
   * StorageId identifier where project files are stored
   */
  storage_id: string;
}

/**
 * Response containing the list of projects for a team
 */
export interface ProjectListResponse {
  /**
   * Data contains the project items
   */
  data: Array<Project>;

  /**
   * Status indicates the response status "success"
   */
  status: 'success';
}

export interface ProjectCreateParams {
  /**
   * Name is the name of the project, which must be between 4 and 32 characters.
   */
  name: string;
}

export interface ProjectUpdateParams {
  /**
   * Name is the name of the project. Required when storage_id is not provided.
   */
  name?: string;

  /**
   * StorageId is the storage id of the project. Required when name is not provided.
   */
  storage_id?: string;
}

export declare namespace Projects {
  export {
    type Project as Project,
    type ProjectListResponse as ProjectListResponse,
    type ProjectCreateParams as ProjectCreateParams,
    type ProjectUpdateParams as ProjectUpdateParams,
  };
}
