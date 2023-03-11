export const ALCHEMY_API_KEY = process.env
  .NEXT_PUBLIC_ALCHEMY_API_KEY as string;
if (!ALCHEMY_API_KEY) {
  throw new Error("Missing ALCHEMY_API_KEY");
}
