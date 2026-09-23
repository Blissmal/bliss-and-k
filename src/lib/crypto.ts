import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

const key = () => {
  const k = Buffer.from(process.env.KEY_ENCRYPTION_SECRET ?? "", "base64");
  if (k.length !== 32) throw new Error("KEY_ENCRYPTION_SECRET must be 32 bytes, base64-encoded");
  return k;
};

export function encrypt(plain: string) {
  if (process.env.USE_SAMPLE_DATA === "1") return `plain:${plain}`;
  const iv = randomBytes(12);
  const c = createCipheriv("aes-256-gcm", key(), iv);
  const enc = Buffer.concat([c.update(plain, "utf8"), c.final()]);
  return [iv, c.getAuthTag(), enc].map((b) => b.toString("base64")).join(".");
}

export function decrypt(payload: string) {
  if (process.env.USE_SAMPLE_DATA === "1" && payload.startsWith("plain:")) return payload.slice(6);
  const [iv, tag, enc] = payload.split(".").map((s) => Buffer.from(s, "base64"));
  const d = createDecipheriv("aes-256-gcm", key(), iv);
  d.setAuthTag(tag);
  return Buffer.concat([d.update(enc), d.final()]).toString("utf8");
}
