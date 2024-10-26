import fs from "fs/promises";

export function encodeBase64(str) {
  return Buffer.from(str).toString("base64");
}

export function decodeBase64(base64String) {
  return Buffer.from(base64String, "base64").toString("utf-8");
}

export async function writeLog(logContent) {

  try {
    // \n tells to go next line
    logContent = new Date().toString()+ " : " +logContent + "\n";
    await fs.appendFile('./src/storage/logs/logger.log',logContent);

  } catch (error) {
    console.log("error :", error);
  }
}
