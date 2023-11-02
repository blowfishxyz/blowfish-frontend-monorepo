export function toUrlParam(request: unknown): string {
  return encodeURIComponent(window.btoa(JSON.stringify(request)));
}

export function fromUrlParam<T>(requestStr: string): T {
  return JSON.parse(window.atob(decodeURIComponent(requestStr))) as T;
}
