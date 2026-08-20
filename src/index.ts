#!/usr/bin/env node
/**
 * DirtyDialogues MCP server — expose the DirtyDialogues chat API as agent tools.
 *
 * Minimal EXAMPLE: a pure client wrapper over the public DirtyDialogues REST
 * API. key -> endpoint -> result. Nothing else.
 *
 * Get an API key at https://dirtydialogues.com
 *
 * Run:
 *   npm install && npm run build
 *   DIRTYDIALOGUES_API_KEY="dd_live_..." node dist/index.js
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Base URL for the public DirtyDialogues API (override via env).
const API_BASE =
  process.env.DIRTYDIALOGUES_API_BASE ?? "https://api.dirtydialogues.com/v1";
const API_KEY = process.env.DIRTYDIALOGUES_API_KEY;

async function call(path: string, init: RequestInit = {}): Promise<unknown> {
  if (!API_KEY) {
    throw new Error(
      "DIRTYDIALOGUES_API_KEY is not set. Get a key at " +
        "https://dirtydialogues.com and set it in your MCP config."
    );
  }
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
  if (res.status === 401) {
    return {
      error: "unauthorized",
      message:
        "Invalid or missing API key. Get one at https://dirtydialogues.com",
    };
  }
  if (!res.ok)
    throw new Error(`DirtyDialogues API ${res.status}: ${await res.text()}`);
  return res.json();
}

function result(data: unknown) {
  return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
}

const server = new McpServer({ name: "dirtydialogues", version: "0.1.0" });

server.registerTool(
  "list_conversations",
  {
    title: "List conversations",
    description: "List recent conversations, newest first.",
    inputSchema: {
      limit: z.number().int().min(1).max(100).optional().describe("Max conversations (default 20)."),
    },
  },
  async ({ limit }) =>
    result(await call(`/conversations?limit=${limit ?? 20}`))
);

server.registerTool(
  "send_message",
  {
    title: "Send message",
    description: "Send a message in one conversation.",
    inputSchema: {
      conversation_id: z.string(),
      text: z.string(),
    },
  },
  async ({ conversation_id, text }) =>
    result(
      await call(`/conversations/${encodeURIComponent(conversation_id)}/messages`, {
        method: "POST",
        body: JSON.stringify({ text }),
      })
    )
);

server.registerTool(
  "send_campaign",
  {
    title: "Send campaign",
    description: "Queue a mass message to a segment of fans.",
    inputSchema: {
      segment: z.string().describe('A segment key from your dashboard (e.g. "active_7d").'),
      text: z.string(),
      scheduled_for: z
        .string()
        .optional()
        .describe("Optional ISO-8601 timestamp; omit = send now."),
    },
  },
  async ({ segment, text, scheduled_for }) => {
    const body: Record<string, unknown> = { segment, text };
    if (scheduled_for) body.scheduled_for = scheduled_for;
    return result(await call("/campaigns", { method: "POST", body: JSON.stringify(body) }));
  }
);

server.registerTool(
  "suggest_reply",
  {
    title: "Suggest reply",
    description: "Get an AI-drafted reply for a conversation (review before sending).",
    inputSchema: {
      conversation_id: z.string(),
      tone: z.string().optional().describe('Desired tone (default "warm").'),
    },
  },
  async ({ conversation_id, tone }) =>
    result(
      await call(`/conversations/${encodeURIComponent(conversation_id)}/suggest`, {
        method: "POST",
        body: JSON.stringify({ tone: tone ?? "warm" }),
      })
    )
);

const transport = new StdioServerTransport();
await server.connect(transport);