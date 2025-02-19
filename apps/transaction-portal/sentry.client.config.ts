// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://1b5b97ca62204632a6c0cd1763b46834@o4505204941979648.ingest.sentry.io/4505204944404480",

  enabled: false,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  replaysOnErrorSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // You can remove this option if you're not planning to use the Sentry Session Replay feature:
  integrations: [
    // TODO(kimpers): Figure out if we want to use Replays and what the implications are
    //new Sentry.Replay({
    //// Additional Replay configuration goes in here, for example:
    //maskAllText: true,
    //blockAllMedia: true,
    //}),
  ],

  // Since web is cursed and there is no way of a good error detection Sentry recommends ignoring errors that are not relevant
  // https://docs.sentry.io/platforms/javascript/legacy-sdk/tips/#decluttering-sentry
  ignoreErrors: [
    // Random plugins/extensions
    "top.GLOBALS",
    /connector not found/i,
    "Cannot read properties of undefined (reading 'id')",
    "Cannot redefine property: ethereum",
  ],
  denyUrls: [/extensions\//i, /^chrome:\/\//i, /^chrome-extension:\/\//i],
});
