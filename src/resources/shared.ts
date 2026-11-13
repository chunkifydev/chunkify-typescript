// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

/**
 * A customer-facing Asset output processing failure.
 */
export interface AssetOutputError {
  /**
   * Machine-readable processing error code.
   */
  code: string;

  /**
   * Description of the processing failure.
   */
  message: string;
}

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
