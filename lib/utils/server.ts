const fs = require("fs");
const crypto = require("crypto");

export const readFromFile = <T = any>(filename: string): Array<T> | null => {
  try {
    const jsonData = fs.readFileSync(`files/${filename}`, "utf8");
    return JSON.parse(jsonData) as Array<T>;
  } catch (err) {
    console.error("Error reading from file:", err);
    return null;
  }
};

export const writeToFile = <T = any>(
  filename: string,
  data: Array<T>
): void => {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(`files/${filename}`, jsonData, "utf8");
    console.log("Data written to file", filename);
  } catch (err) {
    console.error("Error writing to file:", err);
  }
};
// Initialization vector should be 16 bytes for AES-256-CBC
const IV_LENGTH: number = 16;
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY as string;
const key = Buffer.alloc(32, 1); // Creates a buffer of 32 bytes filled with 1's for AES-256
const iv = Buffer.alloc(16, 2); // Creates a buffer of 16 bytes filled with 2's for the IV

export function validateCookieSessionKey(key: any): boolean {
  console.log("validateCookieSessionKey", key);

  if (!key || key.length == 0) return false;
  if (key?.value) {
    const sessionKey: string = decrypt(key.value);
    if (key?.value && sessionKey === process.env.SESSION_KEY) return true;
  }
  return false;
}

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
