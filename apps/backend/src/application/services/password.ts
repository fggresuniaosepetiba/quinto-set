import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

const KEY_LENGTH = 64;

function parseHash(hash: string): { salt: Buffer; key: Buffer } {
  const [saltHex, keyHex] = hash.split(":");
  if (!saltHex || !keyHex) {
    throw new Error("Hash de senha inválido");
  }
  return {
    salt: Buffer.from(saltHex, "hex"),
    key: Buffer.from(keyHex, "hex"),
  };
}

export function hashPassword(password: string): string {
  const salt = randomBytes(16);
  const key = scryptSync(password, salt, KEY_LENGTH);
  return `${salt.toString("hex")}:${key.toString("hex")}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const { salt, key } = parseHash(stored);
  const candidate = scryptSync(password, salt, key.length);
  return timingSafeEqual(candidate, key);
}
