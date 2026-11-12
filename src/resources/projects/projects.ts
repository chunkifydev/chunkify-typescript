// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AnalyticsConnectionsAPI from './analytics-connections/analytics-connections';
import {
  AnalyticsConnection,
  AnalyticsConnectionCreateParams,
  AnalyticsConnectionCreateResponse,
  AnalyticsConnectionDeleteParams,
  AnalyticsConnectionListResponse,
  AnalyticsConnectionRetrieveParams,
  AnalyticsConnectionUpdateParams,
  AnalyticsConnections,
} from './analytics-connections/analytics-connections';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Projects extends APIResource {
  analyticsConnections: AnalyticsConnectionsAPI.AnalyticsConnections =
    new AnalyticsConnectionsAPI.AnalyticsConnections(this._client);

  /**
   * Create a new project with the specified name. The project will be created with
   * default Chunkify storage settings.
   *
   * @example
   * ```ts
   * const project = await client.projects.create({
   *   name: 'My Project',
   * });
   * ```
   */
  create(body: ProjectCreateParams, options?: RequestOptions): APIPromise<Project> {
    return (
      this._client.post('/projects', {
        body,
        ...options,
        __security: { teamAccessTokenAuth: true },
      }) as APIPromise<{ data: Project }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Retrieve details of a specific project by its slug
   *
   * @example
   * ```ts
   * const project = await client.projects.retrieve('projectId');
   * ```
   */
  retrieve(projectID: string, options?: RequestOptions): APIPromise<Project> {
    return (
      this._client.get(path`/projects/${projectID}`, {
        ...options,
        __security: { teamAccessTokenAuth: true },
      }) as APIPromise<{ data: Project }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Update a project's name or storage settings. Only team owners can update
   * projects.
   *
   * @example
   * ```ts
   * await client.projects.update('projectId');
   * ```
   */
  update(projectID: string, body: ProjectUpdateParams, options?: RequestOptions): APIPromise<void> {
    return this._client.patch(path`/projects/${projectID}`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: { teamAccessTokenAuth: true },
    });
  }

  /**
   * Retrieve a list of all projects for a team
   *
   * @example
   * ```ts
   * const projects = await client.projects.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<ProjectListResponse> {
    return this._client.get('/projects', { ...options, __security: { teamAccessTokenAuth: true } });
  }

  /**
   * Delete a project and revoke all associated access tokens. Only team owners can
   * delete projects. Customer output files remain in Storage; managed temporary
   * files retain their original expiry.
   *
   * @example
   * ```ts
   * await client.projects.delete('projectId');
   * ```
   */
  delete(projectID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/projects/${projectID}`, {
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
   * Defaults for new Assets, including Assets created from Uploads.
   */
  asset_defaults: Project.AssetDefaults;

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

  /**
   * DefaultWorkflowId specifies the default Workflow for new Assets. Set null to
   * clear it.
   */
  default_workflow_id?: string | null;
}

export namespace Project {
  /**
   * Defaults for new Assets, including Assets created from Uploads.
   */
  export interface AssetDefaults {
    /**
     * Delete generated and partial files from the output Storage when a new Asset
     * fails. The Asset record and original Source are preserved. Cleanup is attempted
     * once after a delay and requires delete permission on the Storage. Defaults to
     * false. Existing Assets are unchanged.
     */
    delete_files_on_failure?: boolean;

    /**
     * Maximum streaming resolution. Defaults to 1080p on Hobby and 2160p on other
     * plans. 2160p requires Starter or above. Smaller sources are not upscaled. Does
     * not affect static renditions.
     */
    max_resolution?: '1080p' | '2160p';

    /**
     * Minimum streaming resolution. Defaults to auto, with no minimum. Must not exceed
     * max_resolution. Smaller sources are not upscaled. Does not affect static
     * renditions.
     */
    min_resolution?: 'auto' | '240p' | '360p' | '540p' | '720p' | '1080p' | '1440p' | '2160p';

    /**
     * PathTemplate specifies the Asset output folder relative to Storage base_prefix.
     * Supports {assetID} and case-sensitive {metadata.<key>}; referenced values must
     * be non-empty. Ignored for Chunkify storage, which always uses {assetID}.
     * Defaults to {assetID}. Maximum template size: 1024 UTF-8 bytes. Expanded prefix:
     * 768 bytes including base_prefix and trailing slash.
     */
    path_template?: string;

    /**
     * Allow public preview access for new Assets without an API token. Defaults to
     * true. Existing Assets are unchanged.
     */
    preview_enabled?: boolean;
  }
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
   * Defaults for new Assets and automatic Uploads. Replaces the whole object.
   * Omitted fields reset to their defaults. Existing Assets are unchanged.
   */
  asset_defaults?: ProjectUpdateParams.AssetDefaults;

  /**
   * DefaultWorkflowId specifies the default Workflow for new Assets. Set null to
   * clear it.
   */
  default_workflow_id?: string | null;

  /**
   * Project name.
   */
  name?: string;

  /**
   * ID of this Project's default Storage.
   */
  storage_id?: string;
}

export namespace ProjectUpdateParams {
  /**
   * Defaults for new Assets and automatic Uploads. Replaces the whole object.
   * Omitted fields reset to their defaults. Existing Assets are unchanged.
   */
  export interface AssetDefaults {
    /**
     * Delete generated and partial files from the output Storage when a new Asset
     * fails. The Asset record and original Source are preserved. Cleanup is attempted
     * once after a delay and requires delete permission on the Storage. Defaults to
     * false. Existing Assets are unchanged.
     */
    delete_files_on_failure?: boolean;

    /**
     * Maximum streaming resolution. Defaults to 1080p on Hobby and 2160p on other
     * plans. 2160p requires Starter or above. Smaller sources are not upscaled. Does
     * not affect static renditions.
     */
    max_resolution?: '1080p' | '2160p';

    /**
     * Minimum streaming resolution. Defaults to auto, with no minimum. Must not exceed
     * max_resolution. Smaller sources are not upscaled. Does not affect static
     * renditions.
     */
    min_resolution?: 'auto' | '240p' | '360p' | '540p' | '720p' | '1080p' | '1440p' | '2160p';

    /**
     * PathTemplate specifies the Asset output folder relative to Storage base_prefix.
     * Supports {assetID} and case-sensitive {metadata.<key>}; referenced values must
     * be non-empty. Ignored for Chunkify storage, which always uses {assetID}.
     * Defaults to {assetID}. Maximum template size: 1024 UTF-8 bytes. Expanded prefix:
     * 768 bytes including base_prefix and trailing slash.
     */
    path_template?: string;

    /**
     * Allow public preview access for new Assets without an API token. Defaults to
     * true. Existing Assets are unchanged.
     */
    preview_enabled?: boolean;
  }
}

Projects.AnalyticsConnections = AnalyticsConnections;

export declare namespace Projects {
  export {
    type Project as Project,
    type ProjectListResponse as ProjectListResponse,
    type ProjectCreateParams as ProjectCreateParams,
    type ProjectUpdateParams as ProjectUpdateParams,
  };

  export {
    AnalyticsConnections as AnalyticsConnections,
    type AnalyticsConnection as AnalyticsConnection,
    type AnalyticsConnectionCreateResponse as AnalyticsConnectionCreateResponse,
    type AnalyticsConnectionListResponse as AnalyticsConnectionListResponse,
    type AnalyticsConnectionCreateParams as AnalyticsConnectionCreateParams,
    type AnalyticsConnectionRetrieveParams as AnalyticsConnectionRetrieveParams,
    type AnalyticsConnectionUpdateParams as AnalyticsConnectionUpdateParams,
    type AnalyticsConnectionDeleteParams as AnalyticsConnectionDeleteParams,
  };
}
