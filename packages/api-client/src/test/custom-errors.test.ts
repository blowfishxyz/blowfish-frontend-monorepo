import * as v20230605 from "../clients/v20230605";
import * as v20230517 from "../clients/v20230517";
import * as v20230308 from "../clients/v20230308";
import * as v20220601 from "../clients/v20220601";
import { describe, it, expect } from "vitest";

describe("ApiClient", () => {
  it("all clients should export custom errors", async () => {
    const errors = {
      v20230605: [
        v20230605.BlowfishBadRequestError,
        v20230605.BlowfishInternalServerError,
        v20230605.BlowfishRateLimitError,
        v20230605.BlowfishUnknownError,
      ],
      v20230517: [
        v20230517.BlowfishBadRequestError,
        v20230517.BlowfishInternalServerError,
        v20230517.BlowfishRateLimitError,
        v20230517.BlowfishUnknownError,
      ],
      v20230308: [
        v20230308.BlowfishBadRequestError,
        v20230308.BlowfishInternalServerError,
        v20230308.BlowfishRateLimitError,
        v20230308.BlowfishUnknownError,
      ],
      v20220601: [
        v20220601.BlowfishBadRequestError,
        v20220601.BlowfishInternalServerError,
        v20220601.BlowfishRateLimitError,
        v20220601.BlowfishUnknownError,
      ],
    };

    expect(errors.v20230605.length).toEqual(
      v20230605.BlowfishErrorTypes.length
    );
    expect(errors.v20230517.length).toEqual(
      v20230517.BlowfishErrorTypes.length
    );
    expect(errors.v20230308.length).toEqual(
      v20230308.BlowfishErrorTypes.length
    );
    expect(errors.v20220601.length).toEqual(
      v20220601.BlowfishErrorTypes.length
    );
  });
});
