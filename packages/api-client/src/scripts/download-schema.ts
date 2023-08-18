import jsdom from "jsdom";
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

async function fetchSchemas(url: string, targetDir: string) {
  if (!existsSync(targetDir)) {
    await mkdir(targetDir);
  }

  const res = await fetch(url).then((x) => x.text());
  const doc = new jsdom.JSDOM(res, {
    url: url,
    contentType: "text/html",
  });

  const links = Array.from(doc.window.document.querySelectorAll("a"));

  const promises = links.map((link) => {
    // Ex: "v20220601.yaml"
    const href = link.getAttribute("href");
    if (href?.endsWith(".yaml")) {
      const schemaUrl = url + link.getAttribute("href");
      const targetFilePath = join(targetDir, href);

      return fetchSingleSchema(schemaUrl, targetFilePath);
    } else {
      return Promise.resolve();
    }
  });

  await Promise.all(promises);
}

async function fetchSingleSchema(url: string, targetPath: string) {
  try {
    const file = await fetch(url).then((x) => x.text());
    await writeFile(targetPath, file);
  } catch (err) {
    console.error(`Failed to download: ${url}. Error: ${err}`);
  }
}

fetchSchemas("https://api.blowfish.xyz/openapi/", process.argv[2]);
