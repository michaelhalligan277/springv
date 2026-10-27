import { getStore } from "@netlify/blobs";
import type { Config } from "@netlify/functions";

// One blob per checked item (key "c/<item id>") so two people checking different
// items at the same moment never overwrite each other.
const open = () => getStore({ name: "shutdown-checks", consistency: "strong" });

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });

const cleanInitials = (v: unknown) =>
  String(v ?? "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 4);

export default async (req: Request) => {
  const store = open();

  if (req.method === "GET") {
    const { blobs } = await store.list({ prefix: "c/" });
    const entries = await Promise.all(
      blobs.map(async (b) => [b.key.slice(2), await store.get(b.key, { type: "json" })] as const)
    );
    const checks: Record<string, unknown> = {};
    for (const [id, value] of entries) if (value) checks[id] = value;
    return json({ checks });
  }

  if (req.method === "POST") {
    let body: any;
    try {
      body = await req.json();
    } catch {
      return json({ error: "Bad JSON" }, 400);
    }

    if (body?.op === "reset") {
      await store.deleteAll();
      return json({ ok: true });
    }

    const id = typeof body?.id === "string" ? body.id : "";
    if (!id || id.length > 120) return json({ error: "Bad id" }, 400);
    const key = "c/" + id;

    if (body.op === "uncheck") {
      await store.delete(key);
      return json({ ok: true });
    }

    if (body.op === "check") {
      // Trust the phone's timestamp (it may have been checked offline) unless it is nonsense.
      const now = Date.now();
      let at = new Date(body.at);
      if (isNaN(at.getTime()) || at.getTime() > now + 5 * 60 * 1000) at = new Date(now);
      await store.setJSON(key, { by: cleanInitials(body.by), at: at.toISOString() });
      return json({ ok: true });
    }

    return json({ error: "Bad op" }, 400);
  }

  return json({ error: "Method not allowed" }, 405);
};

export const config: Config = { path: "/api/shutdown" };
