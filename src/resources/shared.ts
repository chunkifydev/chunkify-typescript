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

/**
 * Error response
 */
export interface ResponseError {
  /**
   * Error response details
   */
  error: ResponseError.Error;

  /**
   * Status indicates the response status "error"
   */
  status: 'error';
}

export namespace ResponseError {
  /**
   * Error response details
   */
  export interface Error {
    /**
     * Code is the HTTP status code
     */
    code: number;

    /**
     * Message is a human-readable error description
     */
    message: string;

    /**
     * Type indicates the error category
     */
    type:
      | 'ValidationError'
      | 'AuthenticationError'
      | 'NotFoundError'
      | 'UnexpectedError'
      | 'UnexpectedHandledError'
      | 'ForbiddenError'
      | 'ApiNotFoundError'
      | 'TooManyRequestsError';
  }
}
