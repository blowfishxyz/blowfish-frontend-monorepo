import {
  BlowfishBadRequestError,
  BlowfishInternalServerError,
  BlowfishRateLimitError,
  BlowfishUnknownError,
  BlowfishErrorTypes,
} from "../clients/v20230605";
import { describe, it, expect } from "vitest";

describe("ApiClient", () => {
  it("should export custom errors", async () => {
    const errors = [
      BlowfishBadRequestError,
      BlowfishInternalServerError,
      BlowfishRateLimitError,
      BlowfishUnknownError,
    ];

    expect(errors.length).toEqual(BlowfishErrorTypes.length);
  });
});
