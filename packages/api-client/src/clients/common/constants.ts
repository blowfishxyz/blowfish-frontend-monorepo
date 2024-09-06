export type HTTPHeaders = { [key: string]: string };

export const BASE_HEADERS: HTTPHeaders = {
  ["Content-Type"]: "application/json",
  ["X-Api-Client-Version"]: "0.1.20",
};
