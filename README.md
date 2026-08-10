# DirtyDialogues MCP — give your AI agent a chat automation engine

Let Claude, Cursor, or any MCP-compatible agent **run fan conversations at scale** — send DMs, launch mass-message campaigns, and draft on-brand replies — all through one API.

**[▶ Get your API key →](https://dirtydialogues.com/signup?ref=mcp)** · [Docs](https://dirtydialogues.com/docs) · [Pricing](https://dirtydialogues.com/pricing)

![status](https://img.shields.io/badge/example-MIT-blue) ![mcp](https://img.shields.io/badge/MCP-server-black) ![node](https://img.shields.io/badge/node-18+-green)

---

## What this is

A minimal, MIT-licensed [MCP](https://modelcontextprotocol.io) server (TypeScript/Node) that exposes the DirtyDialogues chat API as agent tools. Get a key, add the server to your agent, and it can pull conversations, send and schedule messages, run mass-message campaigns, and generate reply drafts. Intentionally tiny — it just calls the public API and returns the result. Nothing proprietary. Copy it and go.

## Quickstart (~5 min)

**1. Get your API key** → **[dirtydialogues.com/signup](https://dirtydialogues.com/signup?ref=mcp)**

**2. Install & build**
```bash
npm install
npm run build
```

**3. Add to your agent** — e.g. Claude Desktop `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "dirtydialogues": {
      "command": "node",
      "args": ["/path/to/dirtydialogues-mcp/dist/index.js"],
      "env": { "DIRTYDIALOGUES_API_KEY": "dd_live_..." }
    }
  }
}
```

Your agent now has these tools:

| Tool | What it does |
|------|--------------|
| `list_conversations` | Recent conversations, newest first |
| `send_message` | Send a message in one conversation |
| `send_campaign` | Queue a mass message to a segment of fans |
| `suggest_reply` | Get an AI-drafted reply for a conversation |

## Try it

Ask your agent:

> "Draft a warm reply to my newest conversation, then show it to me before sending."

Your agent calls `suggest_reply` and gets back:

```json
{
  "conversation_id": "c_4b1e...",
  "suggested_reply": "Hey! So glad you're here 💕 ...",
  "tone": "warm"
}
```

## Ready to build?

**[▶ Get your API key →](https://dirtydialogues.com/signup?ref=mcp)** — see [pricing](https://dirtydialogues.com/pricing).

## Links & notes

[Docs](https://dirtydialogues.com/docs) · [API reference](https://dirtydialogues.com/docs/api) · [Pricing](https://dirtydialogues.com/pricing) · [Dashboard](https://dirtydialogues.com/dashboard) · [Support](https://dirtydialogues.com/support)

> This is an **example integration**, not production code — it omits retries, pagination, and rich error handling (see the [docs](https://dirtydialogues.com/docs) for those). It talks only to the public DirtyDialogues API; there's no proprietary logic here.

MIT licensed.
