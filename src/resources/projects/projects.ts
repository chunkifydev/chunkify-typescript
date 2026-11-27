// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AssetsAPI from '../assets/assets';
import * as AnalyticsAPI from './analytics/analytics';
import { Analytics } from './analytics/analytics';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Projects extends APIResource {
  analytics: AnalyticsAPI.Analytics = new AnalyticsAPI.Analytics(this._client);

  /**
   * Create a Project in your team with a name of 4 to 32 characters. New Projects
   * start with Chunkify storage until you connect your own Storage.
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
   * Retrieve a Project in your team by its ID, including its name, slug, default
   * Storage, Asset defaults, and default Workflow.
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
   * Update a Project's name, default Storage, Asset defaults, or default Workflow.
   * Only team owners can update Projects, and project names must be unique.
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
   * List the Projects in the team that owns the access token, with each Project's
   * name, slug, default Storage, and Asset defaults.
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

export interface PlayerAppearance {
  /**
   * Dark specifies the player colours in dark mode.
   */
  dark: PlayerPalette;

  /**
   * HiddenControls lists the player buttons to hide. Other buttons appear when the
   * browser and video support them.
   */
  hidden_controls: Array<PlayerControl>;

  /**
   * Light specifies the player colours in light mode.
   */
  light: PlayerPalette;

  /**
   * Mode specifies which palette the player uses. auto follows the viewer's system
   * setting.
   */
  mode: PlayerThemeMode;
}

export interface PlayerAppearanceParams {
  /**
   * Dark specifies the player colours in dark mode. Omit to use the default dark
   * colours.
   */
  dark?: PlayerPaletteParams;

  /**
   * HiddenControls lists the player buttons to hide. Defaults to an empty list.
   * Other buttons appear when the browser and video support them.
   */
  hidden_controls?: Array<PlayerControl>;

  /**
   * Light specifies the player colours in light mode. Omit to use the default light
   * colours.
   */
  light?: PlayerPaletteParams;

  /**
   * Mode specifies which palette the player uses. auto follows the viewer's system
   * setting. An embed can override it with its theme URL parameter. Defaults to
   * auto.
   */
  mode?: PlayerThemeMode;
}

export type PlayerControl = 'captions' | 'settings' | 'pip' | 'fullscreen' | 'cast' | 'airplay' | 'mute';

export interface PlayerPalette {
  /**
   * Accent specifies the colour of progress and active controls.
   */
  accent: string;

  /**
   * Primary specifies the colour of text and control icons.
   */
  primary: string;

  /**
   * Secondary specifies the colour of player buttons.
   */
  secondary: string;
}

export interface PlayerPaletteParams {
  /**
   * Accent specifies the colour of progress and active controls, as #rrggbb.
   */
  accent: string;

  /**
   * Primary specifies the colour of text and control icons, as #rrggbb.
   */
  primary: string;

  /**
   * Secondary specifies the colour of player buttons, as #rrggbb.
   */
  secondary: string;
}

export type PlayerThemeMode = 'auto' | 'light' | 'dark';

export interface Project {
  /**
   * Id is the unique identifier for the project.
   */
  id: string;

  /**
   * Defaults for new Assets, including Assets created from Uploads.
   */
  asset_defaults: AssetsAPI.AssetDefaults;

  /**
   * Timestamp when the project was created
   */
  created_at: string;

  /**
   * Name of the project
   */
  name: string;

  /**
   * Player colours and controls used by Chunkify-hosted playback pages, such as
   * embeds.
   */
  player_appearance: PlayerAppearance;

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
  asset_defaults?: AssetsAPI.AssetDefaultsParams;

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
   * Player colours and controls for Chunkify-hosted playback pages, such as embeds.
   * Replaces the whole object. Omitted fields reset to their defaults. Existing
   * embeds use the new values.
   */
  player_appearance?: PlayerAppearanceParams;

  /**
   * ID of this Project's default Storage.
   */
  storage_id?: string;
}

Projects.Analytics = Analytics;

export declare namespace Projects {
  export {
    type PlayerAppearance as PlayerAppearance,
    type PlayerAppearanceParams as PlayerAppearanceParams,
    type PlayerControl as PlayerControl,
    type PlayerPalette as PlayerPalette,
    type PlayerPaletteParams as PlayerPaletteParams,
    type PlayerThemeMode as PlayerThemeMode,
    type Project as Project,
    type ProjectListResponse as ProjectListResponse,
    type ProjectCreateParams as ProjectCreateParams,
    type ProjectUpdateParams as ProjectUpdateParams,
  };

  export { Analytics as Analytics };
}
