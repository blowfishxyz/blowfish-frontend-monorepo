const EXTENSION_ENV = process.env.EXTENSION_ENV;

export const logger = {
  /**
   * Logs a message to the console only when in development mode
   */
  debug: (...args: unknown[]) => {
    if (EXTENSION_ENV === "development") {
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
    console.error("[ERROR]: ", ...args);
  },
};
