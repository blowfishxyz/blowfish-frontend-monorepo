import download from "download";
import fs from "fs/promises";
import path from "path";

const getMetamaskRelease = async () => {
  try {
    const response = await fetch(
      "https://api.github.com/repos/metamask/metamask-extension/releases"
    );
    const responseJson = await response.json();
    const filename = responseJson[0].assets[0].name;
    const downloadUrl = responseJson[0].assets[0].browser_download_url;
    const tagName = responseJson[0].tag_name;

    return {
      filename,
      downloadUrl,
      tagName,
    };
  } catch (e) {
    throw new Error(
      `An error occurred while fetching the latest release:\n${e}`
    );
  }
};

const downloadZip = async (url: string, destination: string) => {
  try {
    await download(url, destination, {
      extract: true,
    });
  } catch (e) {
    throw new Error(
      `Unable to download metamask release from: ${url} to: ${destination} with following error:\n${e}`
    );
  }
};

const createDirIfNotExist = async (path: string) => {
  try {
    await fs.access(path);
    return true;
  } catch (e: any) {
    if (e.code === "ENOENT") {
      await fs.mkdir(path);
      return true;
    }

    throw new Error(
      `[createDirIfNotExist]Unhandled error from fs.access() with following error:\n${e}`
    );
  }
};

const checkDirOrFileExist = async (path: string) => {
  try {
    await fs.access(path);
    return true;
  } catch (e: any) {
    if (e.code === "ENOENT") {
      return false;
    }

    throw new Error(
      `[checkDirOrFileExist] Unhandled error from fs.access() with following error:\n${e}`
    );
  }
};

const getLocalMetamaskVersion = async (path: string) => {
  try {
    const directory = await fs.opendir(path);
    const entry = await directory.read();
    await directory.close();

    return entry;
  } catch (error) {
    return null;
  }
};

/**
 * Check if there is a metamask version in the build/metamask directory. If not, download the latest release from Github.
 * @returns {string} metamask tag to use
 */
const prepareMetamask = async () => {
  const downloadsDirectory = path.resolve(__dirname, "../build/metamask");
  const metamaskVersion = await getLocalMetamaskVersion(downloadsDirectory);

  if (!metamaskVersion) {
    const metamaskRelease = await getMetamaskRelease();

    await createDirIfNotExist(downloadsDirectory);

    const metamaskDirectory = path.join(
      downloadsDirectory,
      metamaskRelease.tagName
    );
    const metamaskDirectoryExists = await checkDirOrFileExist(
      metamaskDirectory
    );
    const metamaskManifestFilePath = path.join(
      downloadsDirectory,
      metamaskRelease.tagName,
      "manifest.json"
    );
    const metamaskManifestFileExists = await checkDirOrFileExist(
      metamaskManifestFilePath
    );

    if (!metamaskDirectoryExists && !metamaskManifestFileExists) {
      await downloadZip(metamaskRelease.downloadUrl, metamaskDirectory);
    }
    return metamaskRelease.tagName;
  }

  return metamaskVersion.name;
};

export default prepareMetamask;
