import { readFile, readdir, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import Yaml, { YAMLMap } from "yaml";

convertSchemas(process.argv[2], process.argv[3]);

async function convertSchemas(sourceDir: string, targetDir: string) {
  await mkdir(targetDir, { recursive: true });
  const files = await readdir(sourceDir);
  const paths: [string, string][] = [];

  try {
    for (const file of files) {
      if (!file.endsWith(".yaml")) {
        continue;
      }

      const sourcePath = join(sourceDir, file);
      const targetPath = join(targetDir, file);

      paths.push([sourcePath, targetPath]);
    }

    await Promise.all(
      paths.map(([sourcePath, targetPath]) => parseFile(sourcePath, targetPath))
    );

    console.log(`Converted ${paths.length} files`);
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

async function parseFile(
  path: string,
  convertedPath: string,
  // HACK: deleting inside the visitor skips some nodes
  examplesNodesFns: Function[] = []
) {
  const file = (await readFile(path)).toString();
  const parsed = Yaml.parseDocument(file);

  Yaml.visit(parsed, {
    Pair(_, node, path) {
      if (!Yaml.isPair(node) || !Yaml.isScalar(node.key)) {
        return;
      }

      const { key } = node;

      // downgrade version
      if (
        Yaml.isScalar(node.value) &&
        key.value === "openapi" &&
        node.value.value === "3.1.0"
      ) {
        node.value.value = "3.0.3";
        return node;
      }

      if (key.value === "parameters") {
        const pathParent = path.at(-4);
        if (
          Yaml.isPair(pathParent) &&
          Yaml.isScalar(pathParent.key) &&
          pathParent.key.value === "/ethereum/v0/mainnet/scan/transactions"
        ) {
          if (Yaml.isSeq(node.value)) {
            pathParent.key.value =
              "/{chain-family}/v0/{chain-network}/scan/transactions";
            node.value.add(createChainFamily());
            node.value.add(createChainNetwork());
          }
        }
      }

      if (key.value === "parameters") {
        const pathParent = path.at(-4);
        if (
          Yaml.isPair(pathParent) &&
          Yaml.isScalar(pathParent.key) &&
          pathParent.key.value === "/ethereum/v0/mainnet/scan/transaction"
        ) {
          if (Yaml.isSeq(node.value)) {
            pathParent.key.value =
              "/{chain-family}/v0/{chain-network}/scan/transaction";
            node.value.add(createChainFamily());
            node.value.add(createChainNetwork());
          }
        }
      }

      if (key.value === "parameters") {
        const pathParent = path.at(-4);
        if (
          Yaml.isPair(pathParent) &&
          Yaml.isScalar(pathParent.key) &&
          pathParent.key.value === "/ethereum/v0/mainnet/scan/message"
        ) {
          if (Yaml.isSeq(node.value)) {
            pathParent.key.value =
              "/{chain-family}/v0/{chain-network}/scan/message";
            node.value.add(createChainFamily());
            node.value.add(createChainNetwork());
          }
        }
      }

      if (
        Yaml.isScalar(node.value) &&
        key.value === "type" &&
        node.value.value === "null"
      ) {
        // remove - type: "null", add nullable: true
        const parent = path.at(-2);
        if (Yaml.isSeq(parent)) {
          const deleted = parent.delete(parent.items.length - 1);
          const prevParent = path.at(-4);
          if (deleted && Yaml.isCollection(prevParent)) {
            prevParent.add(new Yaml.Pair("nullable", true));
            return;
          }
        }
      }

      // remove all "examples" nodes
      if (key.value === "examples") {
        const parent = path.at(-2);

        if (Yaml.isSeq(parent)) {
          examplesNodesFns.push(() => parent.delete(parent.items.length - 1));
        } else if (Yaml.isPair(parent) && Yaml.isMap(parent.value)) {
          examplesNodesFns.push(
            () => Yaml.isMap(parent.value) && parent.value.delete(node.key)
          );
        }
      }
    },
  });

  examplesNodesFns.forEach((fn) => fn());

  const data = Yaml.stringify(parsed);

  await writeFile(convertedPath, data);
}

function createChainFamily() {
  const parsed = Yaml.parse(`
    name: chain-family
    in: path
    description: The chain family to use
    schema:
      type: string
      enum:
        - ethereum
        - polygon
        - bnb
        - arbitrum
        - optimism
    required: true
  `) as YAMLMap;

  return parsed;
}

function createChainNetwork() {
  const parsed = Yaml.parse(`
    name: chain-network
    in: path
    description: The chain network to use
    schema:
      type: string
      enum:
        - mainnet
        - one
        - goerli
    required: true
  `) as YAMLMap;

  return parsed;
}

export {};
