import objectHash from "object-hash";
import { Duplex } from "readable-stream";

export const sendAndAwaitResponseFromStream = (
  stream: Duplex,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any // TODO(kimpers): type this
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  return new Promise((resolve) => {
    const id = objectHash(
      data.transaction ?? data.typedData ?? data.message ?? data
    );
    stream.write({ id, data });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const callback = (response: any) => {
      if (response.id === id) {
        stream.off("data", callback);
        resolve(response.data);
      }
    };

    stream.on("data", callback);
  });
};
