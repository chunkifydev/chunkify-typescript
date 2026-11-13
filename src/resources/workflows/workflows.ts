// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as RevisionsAPI from './revisions';
import { RevisionRetrieveParams, Revisions, WorkflowRevision } from './revisions';
import * as RunsAPI from './runs/runs';
import {
  RunListParams,
  RunRetrieveParams,
  Runs,
  WorkflowRun,
  WorkflowRunsPaginatedResults,
} from './runs/runs';
import { APIPromise } from '../../core/api-promise';
import { PagePromise, PaginatedResults, type PaginatedResultsParams } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Workflows extends APIResource {
  revisions: RevisionsAPI.Revisions = new RevisionsAPI.Revisions(this._client);
  runs: RunsAPI.Runs = new RunsAPI.Runs(this._client);

  /**
   * Create a Workflow with its first definition revision. Select it when creating an
   * Asset or Upload, or set it as the Project default.
   *
   * @example
   * ```ts
   * const workflow = await client.workflows.create({
   *   name: 'x',
   *   rules: [
   *     {
   *       id: 'id',
   *       actions: [
   *         {
   *           id: 'id',
   *           params: { resolution: 'highest' },
   *           type: 'create_static_rendition',
   *         },
   *       ],
   *       event: 'asset.ready',
   *     },
   *   ],
   *   schema_version: 1,
   * });
   * ```
   */
  create(body: WorkflowCreateParams, options?: RequestOptions): APIPromise<Workflow> {
    return (
      this._client.post('/workflows', {
        body,
        ...options,
        __security: { projectAccessTokenAuth: true },
      }) as APIPromise<{ data: Workflow }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Retrieve a Workflow and its current definition, including archived Workflows.
   *
   * @example
   * ```ts
   * const workflow = await client.workflows.retrieve(
   *   'workflowId',
   * );
   * ```
   */
  retrieve(workflowID: string, options?: RequestOptions): APIPromise<Workflow> {
    return (
      this._client.get(path`/workflows/${workflowID}`, {
        ...options,
        __security: { projectAccessTokenAuth: true },
      }) as APIPromise<{ data: Workflow }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Update the Workflow name or replace its rules. Replacing rules requires the
   * current revision. A changed definition creates a new revision; unchanged rules
   * and name-only edits preserve it. Existing Assets and Uploads keep their selected
   * revision until a ready Asset explicitly updates to the latest revision. Archived
   * Workflows cannot be updated.
   *
   * @example
   * ```ts
   * await client.workflows.update('workflowId');
   * ```
   */
  update(workflowID: string, body: WorkflowUpdateParams, options?: RequestOptions): APIPromise<void> {
    return this._client.patch(path`/workflows/${workflowID}`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: { projectAccessTokenAuth: true },
    });
  }

  /**
   * List Workflows in the Project, newest first. Archived Workflows are excluded
   * unless archived is true.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const workflow of client.workflows.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: WorkflowListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<WorkflowsPaginatedResults, Workflow> {
    return this._client.getAPIList('/workflows', PaginatedResults<Workflow>, {
      query,
      ...options,
      __security: { projectAccessTokenAuth: true },
    });
  }

  /**
   * Archive the Workflow and clear it from the Project default. New Assets cannot
   * select it and new events do not start runs. Accepted actions finish, and outputs
   * and retained history remain available.
   *
   * @example
   * ```ts
   * await client.workflows.delete('workflowId');
   * ```
   */
  delete(workflowID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/workflows/${workflowID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: { projectAccessTokenAuth: true },
    });
  }
}

export type WorkflowsPaginatedResults = PaginatedResults<Workflow>;

/**
 * A reusable definition of actions triggered by Asset events.
 */
export interface Workflow {
  /**
   * Unique Workflow ID.
   */
  id: string;

  /**
   * When the Workflow was archived, or null if it is available for selection.
   * Archiving stops new runs; accepted actions finish.
   */
  archived_at: string | null;

  /**
   * When the Workflow was created.
   */
  created_at: string;

  /**
   * Name specifies the Workflow name. Use 1 to 128 characters.
   */
  name: string;

  /**
   * Current definition revision. Starts at 1 and increases when rules are replaced.
   */
  revision: number;

  /**
   * Rules specifies the event subscriptions and actions in this definition. Provide
   * exactly one asset.ready rule and up to 15 connected rules, with at most 32
   * actions and 65536 encoded bytes across all rules. Array order affects display
   * only.
   */
  rules: Array<Workflow.Rule>;

  /**
   * SchemaVersion specifies the Workflow definition format. The supported version
   * is 1.
   */
  schema_version: number;

  /**
   * When the Workflow was last updated.
   */
  updated_at: string;
}

export namespace Workflow {
  /**
   * A starting or connected step with one or more independent actions.
   */
  export interface Rule {
    /**
     * Id specifies a stable rule key, unique within this Workflow definition. Use 1 to
     * 64 characters, starting with a letter and containing only letters, digits, or
     * underscores.
     */
    id: string;

    /**
     * Actions specifies the work to start when the rule matches. Actions can run
     * concurrently; array order does not define execution order. Provide 1 to 32
     * actions per rule, with at most 32 across the definition.
     */
    actions: Array<
      | Rule.WorkflowStaticAction
      | Rule.WorkflowCaptionAction
      | Rule.WorkflowTranslationAction
      | Rule.WorkflowThumbnailAction
      | Rule.WorkflowTranscriptAction
    >;

    /**
     * Event specifies when this rule starts. Use asset.ready for the single starting
     * rule. Output ready events require an origin caption or static rendition action
     * in this Workflow.
     */
    event: 'asset.ready' | 'asset.output.ready';

    /**
     * Origin specifies the action whose ready output starts this rule. Required for
     * asset.output.ready; omit it for asset.ready. Translation steps must connect to a
     * create_caption action. References must point to a compatible action in this
     * definition and must not form a cycle.
     */
    origin?: Rule.Origin;
  }

  export namespace Rule {
    /**
     * Creates or reuses one static rendition for the Asset.
     */
    export interface WorkflowStaticAction {
      /**
       * Id specifies a stable action key, unique within its rule. Use 1 to 64
       * characters, starting with a letter and containing only letters, digits, or
       * underscores.
       */
      id: string;

      /**
       * Params specifies the static rendition resolution.
       */
      params: WorkflowStaticAction.Params;

      /**
       * Type specifies the action to perform. Must be create_static_rendition.
       */
      type: 'create_static_rendition';
    }

    export namespace WorkflowStaticAction {
      /**
       * Params specifies the static rendition resolution.
       */
      export interface Params {
        /**
         * Resolution specifies the H.264 MP4 output resolution. highest selects the
         * largest supported output without upscaling. Hobby supports up to 1080p; other
         * plans support up to 2160p. Streaming resolution limits do not apply.
         */
        resolution: 'highest' | '240p' | '360p' | '480p' | '540p' | '720p' | '1080p' | '1440p' | '2160p';
      }
    }

    /**
     * Generates or reuses original captions and their transcript from the Asset's
     * speech.
     */
    export interface WorkflowCaptionAction {
      /**
       * Id specifies a stable action key, unique within its rule. Use 1 to 64
       * characters, starting with a letter and containing only letters, digits, or
       * underscores.
       */
      id: string;

      /**
       * Params specifies caption generation settings. Pass an empty object.
       */
      params: unknown;

      /**
       * Type specifies the action to perform. Must be create_caption.
       */
      type: 'create_caption';

      /**
       * TranscriptId binds caption publication to the transcript in the triggering
       * event. Use it only when connected to create_transcript. When omitted, creates or
       * reuses the Asset’s original transcript.
       */
      transcript_id?: WorkflowCaptionAction.TranscriptID;
    }

    export namespace WorkflowCaptionAction {
      /**
       * TranscriptId binds caption publication to the transcript in the triggering
       * event. Use it only when connected to create_transcript. When omitted, creates or
       * reuses the Asset’s original transcript.
       */
      export interface TranscriptID {
        /**
         * From specifies where to read the input output ID. Use event.output.id to consume
         * the output in the triggering asset.output.ready event.
         */
        from: 'event.output.id';
      }
    }

    /**
     * Translates or reuses an original caption in one target language. Requires an
     * asset.output.ready rule connected to an original caption creation action.
     */
    export interface WorkflowTranslationAction {
      /**
       * Id specifies a stable action key, unique within its rule. Use 1 to 64
       * characters, starting with a letter and containing only letters, digits, or
       * underscores.
       */
      id: string;

      /**
       * CaptionId specifies the binding to the original caption in the triggering event.
       */
      caption_id: WorkflowTranslationAction.CaptionID;

      /**
       * Params specifies the target language.
       */
      params: WorkflowTranslationAction.Params;

      /**
       * Type specifies the action to perform. Must be translate_caption.
       */
      type: 'translate_caption';
    }

    export namespace WorkflowTranslationAction {
      /**
       * CaptionId specifies the binding to the original caption in the triggering event.
       */
      export interface CaptionID {
        /**
         * From specifies where to read the input output ID. Use event.output.id to consume
         * the output in the triggering asset.output.ready event.
         */
        from: 'event.output.id';
      }

      /**
       * Params specifies the target language.
       */
      export interface Params {
        /**
         * LanguageCode specifies the target language for the translated subtitle track,
         * such as en or fr. The same code appears in the caption and HLS manifest.
         */
        language_code:
          | 'en'
          | 'fr'
          | 'es'
          | 'de'
          | 'it'
          | 'pt'
          | 'nl'
          | 'ja'
          | 'ko'
          | 'zh'
          | 'ar'
          | 'hi'
          | 'ru'
          | 'tr'
          | 'pl'
          | 'sv';
      }
    }

    /**
     * Creates an independent thumbnail request after asset.ready. Replaying this
     * action uses its accepted request; separate actions create separate requests.
     */
    export interface WorkflowThumbnailAction {
      /**
       * Id specifies a stable action key, unique within its rule.
       */
      id: string;

      /**
       * Params specifies sampling and image settings. Outputs use the Asset folder and
       * Storage.
       */
      params: WorkflowThumbnailAction.Params;

      /**
       * Type specifies the action to perform. Must be create_thumbnails.
       */
      type: 'create_thumbnails';
    }

    export namespace WorkflowThumbnailAction {
      /**
       * Params specifies sampling and image settings. Outputs use the Asset folder and
       * Storage.
       */
      export interface Params {
        /**
         * Count specifies 1 to 100 thumbnails at the middle of equal sections of the
         * selected range.
         */
        count?: number;

        /**
         * Format selects JPEG or WebP. Defaults to JPEG.
         */
        format?: 'jpeg' | 'webp';

        /**
         * Metadata attaches string values to this request. The serialized object may
         * contain at most 2048 bytes.
         */
        metadata?: { [key: string]: string };

        /**
         * Output selects images or sprites. Defaults to images.
         */
        output?: 'images' | 'sprites';

        /**
         * Range limits sampling to part of the Source. Defaults to the whole Source
         * duration.
         */
        range?: Params.Range;

        /**
         * Size specifies the maximum image or tile edge in pixels, from 64 to 1920.
         * Defaults to 320. Odd sizes are supported. Preserves display aspect ratio without
         * cropping or upscaling.
         */
        size?: number;

        /**
         * Timestamps specifies 1 to 100 Source-relative target times in seconds. Times
         * outside the selected range are skipped when the action runs. If none remain, the
         * action is skipped without a charge. Repeated targets produce separate outputs.
         */
        timestamps?: Array<number>;
      }

      export namespace Params {
        /**
         * Range limits sampling to part of the Source. Defaults to the whole Source
         * duration.
         */
        export interface Range {
          /**
           * End specifies the exclusive upper bound in seconds. Defaults to the Source
           * duration.
           */
          end?: number;

          /**
           * Start specifies the inclusive lower bound in seconds. Defaults to zero.
           */
          start?: number;
        }
      }
    }

    /**
     * Creates or reuses the original-language transcript. Can run alongside caption
     * generation in the same asset.ready rule.
     */
    export interface WorkflowTranscriptAction {
      /**
       * Id specifies a stable action key, unique within its rule. Use 1 to 64
       * characters, starting with a letter and containing only letters, digits, or
       * underscores.
       */
      id: string;

      /**
       * Params specifies transcript settings. Pass an empty object.
       */
      params: unknown;

      /**
       * Type specifies the action to perform. Must be create_transcript.
       */
      type: 'create_transcript';
    }

    /**
     * Origin specifies the action whose ready output starts this rule. Required for
     * asset.output.ready; omit it for asset.ready. Translation steps must connect to a
     * create_caption action. References must point to a compatible action in this
     * definition and must not form a cycle.
     */
    export interface Origin {
      /**
       * ActionId specifies the ID of the producing action within that rule. Use 1 to 64
       * characters, starting with a letter and containing only letters, digits, or
       * underscores.
       */
      action_id: string;

      /**
       * RuleId specifies the ID of the rule containing the producing action. Use 1 to 64
       * characters, starting with a letter and containing only letters, digits, or
       * underscores.
       */
      rule_id: string;
    }
  }
}

export interface WorkflowCreateParams {
  /**
   * Name specifies the Workflow name. Use 1 to 128 characters.
   */
  name: string;

  /**
   * Rules specifies the event subscriptions and actions in this definition. Provide
   * exactly one asset.ready rule and up to 15 connected rules, with at most 32
   * actions and 65536 encoded bytes across all rules. Array order affects display
   * only.
   */
  rules: Array<WorkflowCreateParams.Rule>;

  /**
   * SchemaVersion specifies the Workflow definition format. The supported version
   * is 1.
   */
  schema_version: 1;
}

export namespace WorkflowCreateParams {
  /**
   * A starting or connected step with one or more independent actions.
   */
  export interface Rule {
    /**
     * Id specifies a stable rule key, unique within this Workflow definition. Use 1 to
     * 64 characters, starting with a letter and containing only letters, digits, or
     * underscores.
     */
    id: string;

    /**
     * Actions specifies the work to start when the rule matches. Actions can run
     * concurrently; array order does not define execution order. Provide 1 to 32
     * actions per rule, with at most 32 across the definition.
     */
    actions: Array<
      | Rule.WorkflowStaticAction
      | Rule.WorkflowCaptionAction
      | Rule.WorkflowTranslationAction
      | Rule.WorkflowThumbnailAction
      | Rule.WorkflowTranscriptAction
    >;

    /**
     * Event specifies when this rule starts. Use asset.ready for the single starting
     * rule. Output ready events require an origin caption or static rendition action
     * in this Workflow.
     */
    event: 'asset.ready' | 'asset.output.ready';

    /**
     * Origin specifies the action whose ready output starts this rule. Required for
     * asset.output.ready; omit it for asset.ready. Translation steps must connect to a
     * create_caption action. References must point to a compatible action in this
     * definition and must not form a cycle.
     */
    origin?: Rule.Origin;
  }

  export namespace Rule {
    /**
     * Creates or reuses one static rendition for the Asset.
     */
    export interface WorkflowStaticAction {
      /**
       * Id specifies a stable action key, unique within its rule. Use 1 to 64
       * characters, starting with a letter and containing only letters, digits, or
       * underscores.
       */
      id: string;

      /**
       * Params specifies the static rendition resolution.
       */
      params: WorkflowStaticAction.Params;

      /**
       * Type specifies the action to perform. Must be create_static_rendition.
       */
      type: 'create_static_rendition';
    }

    export namespace WorkflowStaticAction {
      /**
       * Params specifies the static rendition resolution.
       */
      export interface Params {
        /**
         * Resolution specifies the H.264 MP4 output resolution. highest selects the
         * largest supported output without upscaling. Hobby supports up to 1080p; other
         * plans support up to 2160p. Streaming resolution limits do not apply.
         */
        resolution: 'highest' | '240p' | '360p' | '480p' | '540p' | '720p' | '1080p' | '1440p' | '2160p';
      }
    }

    /**
     * Generates or reuses original captions and their transcript from the Asset's
     * speech.
     */
    export interface WorkflowCaptionAction {
      /**
       * Id specifies a stable action key, unique within its rule. Use 1 to 64
       * characters, starting with a letter and containing only letters, digits, or
       * underscores.
       */
      id: string;

      /**
       * Params specifies caption generation settings. Pass an empty object.
       */
      params: unknown;

      /**
       * Type specifies the action to perform. Must be create_caption.
       */
      type: 'create_caption';

      /**
       * TranscriptId binds caption publication to the transcript in the triggering
       * event. Use it only when connected to create_transcript. When omitted, creates or
       * reuses the Asset’s original transcript.
       */
      transcript_id?: WorkflowCaptionAction.TranscriptID;
    }

    export namespace WorkflowCaptionAction {
      /**
       * TranscriptId binds caption publication to the transcript in the triggering
       * event. Use it only when connected to create_transcript. When omitted, creates or
       * reuses the Asset’s original transcript.
       */
      export interface TranscriptID {
        /**
         * From specifies where to read the input output ID. Use event.output.id to consume
         * the output in the triggering asset.output.ready event.
         */
        from: 'event.output.id';
      }
    }

    /**
     * Translates or reuses an original caption in one target language. Requires an
     * asset.output.ready rule connected to an original caption creation action.
     */
    export interface WorkflowTranslationAction {
      /**
       * Id specifies a stable action key, unique within its rule. Use 1 to 64
       * characters, starting with a letter and containing only letters, digits, or
       * underscores.
       */
      id: string;

      /**
       * CaptionId specifies the binding to the original caption in the triggering event.
       */
      caption_id: WorkflowTranslationAction.CaptionID;

      /**
       * Params specifies the target language.
       */
      params: WorkflowTranslationAction.Params;

      /**
       * Type specifies the action to perform. Must be translate_caption.
       */
      type: 'translate_caption';
    }

    export namespace WorkflowTranslationAction {
      /**
       * CaptionId specifies the binding to the original caption in the triggering event.
       */
      export interface CaptionID {
        /**
         * From specifies where to read the input output ID. Use event.output.id to consume
         * the output in the triggering asset.output.ready event.
         */
        from: 'event.output.id';
      }

      /**
       * Params specifies the target language.
       */
      export interface Params {
        /**
         * LanguageCode specifies the target language for the translated subtitle track,
         * such as en or fr. The same code appears in the caption and HLS manifest.
         */
        language_code:
          | 'en'
          | 'fr'
          | 'es'
          | 'de'
          | 'it'
          | 'pt'
          | 'nl'
          | 'ja'
          | 'ko'
          | 'zh'
          | 'ar'
          | 'hi'
          | 'ru'
          | 'tr'
          | 'pl'
          | 'sv';
      }
    }

    /**
     * Creates an independent thumbnail request after asset.ready. Replaying this
     * action uses its accepted request; separate actions create separate requests.
     */
    export interface WorkflowThumbnailAction {
      /**
       * Id specifies a stable action key, unique within its rule.
       */
      id: string;

      /**
       * Params specifies sampling and image settings. Outputs use the Asset folder and
       * Storage.
       */
      params: WorkflowThumbnailAction.Params;

      /**
       * Type specifies the action to perform. Must be create_thumbnails.
       */
      type: 'create_thumbnails';
    }

    export namespace WorkflowThumbnailAction {
      /**
       * Params specifies sampling and image settings. Outputs use the Asset folder and
       * Storage.
       */
      export interface Params {
        /**
         * Count specifies 1 to 100 thumbnails at the middle of equal sections of the
         * selected range.
         */
        count?: number;

        /**
         * Format selects JPEG or WebP. Defaults to JPEG.
         */
        format?: 'jpeg' | 'webp';

        /**
         * Metadata attaches string values to this request. The serialized object may
         * contain at most 2048 bytes.
         */
        metadata?: { [key: string]: string };

        /**
         * Output selects images or sprites. Defaults to images.
         */
        output?: 'images' | 'sprites';

        /**
         * Range limits sampling to part of the Source. Defaults to the whole Source
         * duration.
         */
        range?: Params.Range;

        /**
         * Size specifies the maximum image or tile edge in pixels, from 64 to 1920.
         * Defaults to 320. Odd sizes are supported. Preserves display aspect ratio without
         * cropping or upscaling.
         */
        size?: number;

        /**
         * Timestamps specifies 1 to 100 Source-relative target times in seconds. Times
         * outside the selected range are skipped when the action runs. If none remain, the
         * action is skipped without a charge. Repeated targets produce separate outputs.
         */
        timestamps?: Array<number>;
      }

      export namespace Params {
        /**
         * Range limits sampling to part of the Source. Defaults to the whole Source
         * duration.
         */
        export interface Range {
          /**
           * End specifies the exclusive upper bound in seconds. Defaults to the Source
           * duration.
           */
          end?: number;

          /**
           * Start specifies the inclusive lower bound in seconds. Defaults to zero.
           */
          start?: number;
        }
      }
    }

    /**
     * Creates or reuses the original-language transcript. Can run alongside caption
     * generation in the same asset.ready rule.
     */
    export interface WorkflowTranscriptAction {
      /**
       * Id specifies a stable action key, unique within its rule. Use 1 to 64
       * characters, starting with a letter and containing only letters, digits, or
       * underscores.
       */
      id: string;

      /**
       * Params specifies transcript settings. Pass an empty object.
       */
      params: unknown;

      /**
       * Type specifies the action to perform. Must be create_transcript.
       */
      type: 'create_transcript';
    }

    /**
     * Origin specifies the action whose ready output starts this rule. Required for
     * asset.output.ready; omit it for asset.ready. Translation steps must connect to a
     * create_caption action. References must point to a compatible action in this
     * definition and must not form a cycle.
     */
    export interface Origin {
      /**
       * ActionId specifies the ID of the producing action within that rule. Use 1 to 64
       * characters, starting with a letter and containing only letters, digits, or
       * underscores.
       */
      action_id: string;

      /**
       * RuleId specifies the ID of the rule containing the producing action. Use 1 to 64
       * characters, starting with a letter and containing only letters, digits, or
       * underscores.
       */
      rule_id: string;
    }
  }
}

export interface WorkflowUpdateParams {
  /**
   * ExpectedRevision specifies the current Workflow revision when replacing rules.
   * The update returns a conflict if it no longer matches. Required when rules is
   * provided. Must be at least 1.
   */
  expected_revision?: number;

  /**
   * Name specifies the Workflow name. Use 1 to 128 characters.
   */
  name?: string;

  /**
   * Rules specifies the event subscriptions and actions in this definition. Provide
   * exactly one asset.ready rule and up to 15 connected rules, with at most 32
   * actions and 65536 encoded bytes across all rules. Array order affects display
   * only. Replaces the complete definition and requires schema_version and
   * expected_revision. Existing Assets and Uploads keep their pinned revision.
   */
  rules?: Array<WorkflowUpdateParams.Rule>;

  /**
   * SchemaVersion specifies the Workflow definition format. The supported version
   * is 1. Required when rules is provided.
   */
  schema_version?: 1;
}

export namespace WorkflowUpdateParams {
  /**
   * A starting or connected step with one or more independent actions.
   */
  export interface Rule {
    /**
     * Id specifies a stable rule key, unique within this Workflow definition. Use 1 to
     * 64 characters, starting with a letter and containing only letters, digits, or
     * underscores.
     */
    id: string;

    /**
     * Actions specifies the work to start when the rule matches. Actions can run
     * concurrently; array order does not define execution order. Provide 1 to 32
     * actions per rule, with at most 32 across the definition.
     */
    actions: Array<
      | Rule.WorkflowStaticAction
      | Rule.WorkflowCaptionAction
      | Rule.WorkflowTranslationAction
      | Rule.WorkflowThumbnailAction
      | Rule.WorkflowTranscriptAction
    >;

    /**
     * Event specifies when this rule starts. Use asset.ready for the single starting
     * rule. Output ready events require an origin caption or static rendition action
     * in this Workflow.
     */
    event: 'asset.ready' | 'asset.output.ready';

    /**
     * Origin specifies the action whose ready output starts this rule. Required for
     * asset.output.ready; omit it for asset.ready. Translation steps must connect to a
     * create_caption action. References must point to a compatible action in this
     * definition and must not form a cycle.
     */
    origin?: Rule.Origin;
  }

  export namespace Rule {
    /**
     * Creates or reuses one static rendition for the Asset.
     */
    export interface WorkflowStaticAction {
      /**
       * Id specifies a stable action key, unique within its rule. Use 1 to 64
       * characters, starting with a letter and containing only letters, digits, or
       * underscores.
       */
      id: string;

      /**
       * Params specifies the static rendition resolution.
       */
      params: WorkflowStaticAction.Params;

      /**
       * Type specifies the action to perform. Must be create_static_rendition.
       */
      type: 'create_static_rendition';
    }

    export namespace WorkflowStaticAction {
      /**
       * Params specifies the static rendition resolution.
       */
      export interface Params {
        /**
         * Resolution specifies the H.264 MP4 output resolution. highest selects the
         * largest supported output without upscaling. Hobby supports up to 1080p; other
         * plans support up to 2160p. Streaming resolution limits do not apply.
         */
        resolution: 'highest' | '240p' | '360p' | '480p' | '540p' | '720p' | '1080p' | '1440p' | '2160p';
      }
    }

    /**
     * Generates or reuses original captions and their transcript from the Asset's
     * speech.
     */
    export interface WorkflowCaptionAction {
      /**
       * Id specifies a stable action key, unique within its rule. Use 1 to 64
       * characters, starting with a letter and containing only letters, digits, or
       * underscores.
       */
      id: string;

      /**
       * Params specifies caption generation settings. Pass an empty object.
       */
      params: unknown;

      /**
       * Type specifies the action to perform. Must be create_caption.
       */
      type: 'create_caption';

      /**
       * TranscriptId binds caption publication to the transcript in the triggering
       * event. Use it only when connected to create_transcript. When omitted, creates or
       * reuses the Asset’s original transcript.
       */
      transcript_id?: WorkflowCaptionAction.TranscriptID;
    }

    export namespace WorkflowCaptionAction {
      /**
       * TranscriptId binds caption publication to the transcript in the triggering
       * event. Use it only when connected to create_transcript. When omitted, creates or
       * reuses the Asset’s original transcript.
       */
      export interface TranscriptID {
        /**
         * From specifies where to read the input output ID. Use event.output.id to consume
         * the output in the triggering asset.output.ready event.
         */
        from: 'event.output.id';
      }
    }

    /**
     * Translates or reuses an original caption in one target language. Requires an
     * asset.output.ready rule connected to an original caption creation action.
     */
    export interface WorkflowTranslationAction {
      /**
       * Id specifies a stable action key, unique within its rule. Use 1 to 64
       * characters, starting with a letter and containing only letters, digits, or
       * underscores.
       */
      id: string;

      /**
       * CaptionId specifies the binding to the original caption in the triggering event.
       */
      caption_id: WorkflowTranslationAction.CaptionID;

      /**
       * Params specifies the target language.
       */
      params: WorkflowTranslationAction.Params;

      /**
       * Type specifies the action to perform. Must be translate_caption.
       */
      type: 'translate_caption';
    }

    export namespace WorkflowTranslationAction {
      /**
       * CaptionId specifies the binding to the original caption in the triggering event.
       */
      export interface CaptionID {
        /**
         * From specifies where to read the input output ID. Use event.output.id to consume
         * the output in the triggering asset.output.ready event.
         */
        from: 'event.output.id';
      }

      /**
       * Params specifies the target language.
       */
      export interface Params {
        /**
         * LanguageCode specifies the target language for the translated subtitle track,
         * such as en or fr. The same code appears in the caption and HLS manifest.
         */
        language_code:
          | 'en'
          | 'fr'
          | 'es'
          | 'de'
          | 'it'
          | 'pt'
          | 'nl'
          | 'ja'
          | 'ko'
          | 'zh'
          | 'ar'
          | 'hi'
          | 'ru'
          | 'tr'
          | 'pl'
          | 'sv';
      }
    }

    /**
     * Creates an independent thumbnail request after asset.ready. Replaying this
     * action uses its accepted request; separate actions create separate requests.
     */
    export interface WorkflowThumbnailAction {
      /**
       * Id specifies a stable action key, unique within its rule.
       */
      id: string;

      /**
       * Params specifies sampling and image settings. Outputs use the Asset folder and
       * Storage.
       */
      params: WorkflowThumbnailAction.Params;

      /**
       * Type specifies the action to perform. Must be create_thumbnails.
       */
      type: 'create_thumbnails';
    }

    export namespace WorkflowThumbnailAction {
      /**
       * Params specifies sampling and image settings. Outputs use the Asset folder and
       * Storage.
       */
      export interface Params {
        /**
         * Count specifies 1 to 100 thumbnails at the middle of equal sections of the
         * selected range.
         */
        count?: number;

        /**
         * Format selects JPEG or WebP. Defaults to JPEG.
         */
        format?: 'jpeg' | 'webp';

        /**
         * Metadata attaches string values to this request. The serialized object may
         * contain at most 2048 bytes.
         */
        metadata?: { [key: string]: string };

        /**
         * Output selects images or sprites. Defaults to images.
         */
        output?: 'images' | 'sprites';

        /**
         * Range limits sampling to part of the Source. Defaults to the whole Source
         * duration.
         */
        range?: Params.Range;

        /**
         * Size specifies the maximum image or tile edge in pixels, from 64 to 1920.
         * Defaults to 320. Odd sizes are supported. Preserves display aspect ratio without
         * cropping or upscaling.
         */
        size?: number;

        /**
         * Timestamps specifies 1 to 100 Source-relative target times in seconds. Times
         * outside the selected range are skipped when the action runs. If none remain, the
         * action is skipped without a charge. Repeated targets produce separate outputs.
         */
        timestamps?: Array<number>;
      }

      export namespace Params {
        /**
         * Range limits sampling to part of the Source. Defaults to the whole Source
         * duration.
         */
        export interface Range {
          /**
           * End specifies the exclusive upper bound in seconds. Defaults to the Source
           * duration.
           */
          end?: number;

          /**
           * Start specifies the inclusive lower bound in seconds. Defaults to zero.
           */
          start?: number;
        }
      }
    }

    /**
     * Creates or reuses the original-language transcript. Can run alongside caption
     * generation in the same asset.ready rule.
     */
    export interface WorkflowTranscriptAction {
      /**
       * Id specifies a stable action key, unique within its rule. Use 1 to 64
       * characters, starting with a letter and containing only letters, digits, or
       * underscores.
       */
      id: string;

      /**
       * Params specifies transcript settings. Pass an empty object.
       */
      params: unknown;

      /**
       * Type specifies the action to perform. Must be create_transcript.
       */
      type: 'create_transcript';
    }

    /**
     * Origin specifies the action whose ready output starts this rule. Required for
     * asset.output.ready; omit it for asset.ready. Translation steps must connect to a
     * create_caption action. References must point to a compatible action in this
     * definition and must not form a cycle.
     */
    export interface Origin {
      /**
       * ActionId specifies the ID of the producing action within that rule. Use 1 to 64
       * characters, starting with a letter and containing only letters, digits, or
       * underscores.
       */
      action_id: string;

      /**
       * RuleId specifies the ID of the rule containing the producing action. Use 1 to 64
       * characters, starting with a letter and containing only letters, digits, or
       * underscores.
       */
      rule_id: string;
    }
  }
}

export interface WorkflowListParams extends PaginatedResultsParams {
  /**
   * Archived specifies whether to include archived Workflows. Defaults to false.
   */
  archived?: boolean;
}

Workflows.Revisions = Revisions;
Workflows.Runs = Runs;

export declare namespace Workflows {
  export {
    type Workflow as Workflow,
    type WorkflowsPaginatedResults as WorkflowsPaginatedResults,
    type WorkflowCreateParams as WorkflowCreateParams,
    type WorkflowUpdateParams as WorkflowUpdateParams,
    type WorkflowListParams as WorkflowListParams,
  };

  export {
    Revisions as Revisions,
    type WorkflowRevision as WorkflowRevision,
    type RevisionRetrieveParams as RevisionRetrieveParams,
  };

  export {
    Runs as Runs,
    type WorkflowRun as WorkflowRun,
    type WorkflowRunsPaginatedResults as WorkflowRunsPaginatedResults,
    type RunRetrieveParams as RunRetrieveParams,
    type RunListParams as RunListParams,
  };
}
