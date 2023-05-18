import * as Sentry from "@sentry/nextjs";

const NODE_ENV = process.env.NODE_ENV;

export const logger = {
  /**
   * Logs a message to the console only when in development mode
   */
  debug: (...args: unknown[]) => {
    if (NODE_ENV === "development") {
      console.log("[DEBUG]: ", ...args);
    }
  },
  /*
   * Logs a message to the console in all modes
   */
  info: (...args: unknown[]) => {
    console.log("[INFO]: ", ...args);
  },
  /*
   * Logs a message to console.error in all modes
   */
  error: (...args: unknown[]) => {
    // Push any actual errors to Sentry
    // for now ignore string messages and other types
    for (const arg of args) {
      if (arg instanceof Error) {
        Sentry?.captureException(arg);
      }
    }
    console.error("[ERROR]: ", ...args);
  },
};
