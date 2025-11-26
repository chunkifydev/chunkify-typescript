// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

export interface ChunkifyError {
  /**
   * Additional error details or output
   */
  detail: string;

  /**
   * Main error message
   */
  message: string;

  /**
   * Type of error
   */
  type:
    | 'setup'
    | 'ffmpeg'
    | 'source'
    | 'upload'
    | 'download'
    | 'ingest'
    | 'job'
    | 'unexpected'
    | 'permission'
    | 'timeout'
    | 'cancelled';
}
