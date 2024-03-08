type ErrorObject = {
  error: string;
  requestId: string;
};

interface BlowfishError extends Error {
  status: number;
  requestId: string;
  type: BlowfishErrorType;
}

export type BlowfishErrorType = (typeof BlowfishErrorTypes)[number];

export const BlowfishErrorTypes = [
  "BlowfishBadRequestError",
  "BlowfishRateLimitError",
  "BlowfishInternalServerError",
  "BlowfishUnknownError",
] as const;

export class BlowfishBadRequestError implements BlowfishError {
  name = "BlowfishBadRequestError";
  type = "BlowfishBadRequestError" as const;
  status = 400;
  requestId: string;
  message: string;
  constructor(error: ErrorObject) {
    this.message = error.error;
    this.requestId = error.requestId;
  }
}

export class BlowfishRateLimitError implements BlowfishError {
  name = "BlowfishRateLimitError";
  type = "BlowfishRateLimitError" as const;
  status = 429;
  requestId: string;
  message: string;
  constructor(error: ErrorObject) {
    this.message = error.error;
    this.requestId = error.requestId;
  }
}

export class BlowfishInternalServerError implements BlowfishError {
  name = "BlowfishInternalServerError";
  type = "BlowfishInternalServerError" as const;
  status = 500;
  requestId: string;
  message: string;
  constructor(error: ErrorObject) {
    this.message = error.error;
    this.requestId = error.requestId;
  }
}

export class BlowfishUnknownError implements BlowfishError {
  name = "BlowfishUnknownError";
  type = "BlowfishUnknownError" as const;
  status: number;
  requestId: string;
  message: string;
  constructor(error: ErrorObject, status: number) {
    this.message = error.error;
    this.requestId = error.requestId;
    this.status = status;
  }
}
