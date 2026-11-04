import { createHash, createHmac, randomBytes, scryptSync, timingSafeEqual } from "crypto";
import fs from "fs";
import path from "path";
import { cookies } from "next/headers";

const COOKIE = "fm_admin";
const WEEK_SECONDS = 60 * 60 * 24 * 7;
const adminFile = path.join(process.cwd(), "data", "admin.json");

type AdminRecord = {
  salt: string;
  hash: string;
  secret: string;
};

function readAdmin(): AdminRecord | null {
  if (!fs.existsSync(adminFile)) return null;
  try {
    const parsed = JSON.parse(fs.readFileSync(adminFile, "utf8")) as AdminRecord;
    if (!parsed.salt || !parsed.hash || !parsed.secret) return null;
    return parsed;
  } catch {
    return null;
  }
}

function secret() {
  return process.env.ADMIN_SESSION_SECRET || readAdmin()?.secret || "";
}

function envPassword() {
  return process.env.ADMIN_PASSWORD || "";
}

function sign(value: string) {
  const key = secret();
  if (!key) return "";
  return createHmac("sha256", key).update(value).digest("hex");
}

function safeEqual(a: string, b: string) {
  const left = createHash("sha256").update(a).digest();
  const right = createHash("sha256").update(b).digest();
  return timingSafeEqual(left, right);
}

function hashPassword(password: string, salt: string) {
  return scryptSync(password, salt, 32).toString("hex");
}

export function adminIsConfigured() {
  if (envPassword() && secret()) return true;
  const saved = readAdmin();
  return Boolean(saved?.hash && saved.secret);
}

export function passwordMatches(input: string) {
  if (!input) return false;
  const fromEnv = envPassword();
  if (fromEnv) return safeEqual(input, fromEnv);
  const saved = readAdmin();
  if (!saved) return false;
  const next = hashPassword(input, saved.salt);
  return safeEqual(next, saved.hash);
}

export function createAdminPassword(password: string) {
  if (envPassword()) {
    throw new Error("ADMIN_PASSWORD is already set in the environment.");
  }
  if (readAdmin()) {
    throw new Error("An admin password already exists.");
  }
  const salt = randomBytes(16).toString("hex");
  const record: AdminRecord = {
    salt,
    hash: hashPassword(password, salt),
    secret: randomBytes(32).toString("hex"),
  };
  fs.mkdirSync(path.dirname(adminFile), { recursive: true });
  fs.writeFileSync(adminFile, `${JSON.stringify(record, null, 2)}\n`);
}

export async function setAdminSession() {
  const exp = Date.now() + WEEK_SECONDS * 1000;
  const payload = String(exp);
  const token = `${payload}.${sign(payload)}`;
  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: WEEK_SECONDS,
  });
}

export async function clearAdminSession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function isAdmin() {
  if (!secret()) return false;
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return false;
  const [payload, mac] = token.split(".");
  if (!payload || !mac) return false;
  const expected = sign(payload);
  if (!expected || !safeEqual(mac, expected)) return false;
  return Number(payload) > Date.now();
}
