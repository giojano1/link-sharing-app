export interface ApiErrorDetails {
  message: string;
  code?: string;
  fields?: Record<string, string[]>;
}

export class ApiError extends Error {
  code?: string;
  fields?: Record<string, string[]>;
  status: number;

  constructor(details: ApiErrorDetails, status: number = 400) {
    super(details.message);
    this.code = details.code;
    this.fields = details.fields;
    this.status = status;
    this.name = "ApiError";

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}
