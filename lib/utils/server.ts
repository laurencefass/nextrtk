const fs = require("fs");
const crypto = require("crypto");

export const readFromFile = (filename: string) => {
  try {
    const jsonData = fs.readFileSync("files/" + filename, "utf8");
    return JSON.parse(jsonData);
  } catch (err) {
    console.error("Error reading from file:", err);
    return null;
  }
};

export const writeToFile = (filename: string, data: any) => {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync("files/" + filename, jsonData, "utf8");
    console.log("Data written to file", jsonData, filename);
  } catch (err) {
    console.error("Error writing to file:", err);
  }
};

import {
  randomBytes,
  createCipheriv,
  createDecipheriv,
  CipherKey,
} from "crypto";

// Initialization vector should be 16 bytes for AES-256-CBC
const IV_LENGTH: number = 16;
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY as string;
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

//Encrypting text
export function encrypt(text: string) {
  let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString("hex");
}

// Decrypting text
export function decrypt(text: string) {
  let encryptedText = Buffer.from(text, "hex");
  let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
