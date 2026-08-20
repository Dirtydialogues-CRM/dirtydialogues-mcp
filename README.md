# DirtyDialogues MCP — chat-automation tools for your AI agent (example)

An open-source example [MCP](https://modelcontextprotocol.io) server that shows how any AI agent — Claude, Cursor, or any MCP client — can drive **OnlyFans chat automation** on top of [DirtyDialogues](https://dirtydialogues.com), the OnlyFans agency chat & CRM platform: manage fan conversations, run mass-message campaigns, and draft on-brand replies.

**[▶ Get started at dirtydialogues.com →](https://dirtydialogues.com)** · [Pricing](https://dirtydialogues.com/pricing)

![example](https://img.shields.io/badge/example-MIT-blue) ![mcp](https://img.shields.io/badge/MCP-server-black) ![node](https://img.shields.io/badge/node-18+-green)

---

## What this is

A minimal, MIT-licensed [MCP](https://modelcontextprotocol.io) server (TypeScript/Node) that demonstrates the **shape** of a DirtyDialogues chat-automation integration for AI agents. It shows how you'd expose fan-conversation actions — pull conversations, send and schedule messages, run mass-message campaigns, draft replies — as agent tools.

> **This is an open-source example.** The endpoint paths and response fields in the code are **illustrative placeholders** — DirtyDialogues is a managed OnlyFans agency platform, so head to **[dirtydialogues.com](https://dirtydialogues.com)** to get started. Nothing proprietary here: it's a clean pattern you can read, copy, and adapt.

## Why — the agency use case

OnlyFans management agencies run **fan conversations at scale** across many creator inboxes. [DirtyDialogues](https://dirtydialogues.com) is the platform they use to do it — a unified inbox, mass DMs, AI-assisted replies, and analytics in one place. This example shows the pattern for giving an AI agent tools that operate on top of that workflow.

## Install & build

```bash
npm install
npm run build
```

## Add to your agent

e.g. Claude Desktop `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "dirtydialogues": {
      "command": "node",
      "args": ["/path/to/dirtydialogues-mcp/dist/index.js"],
      "env": { "DIRTYDIALOGUES_API_KEY": "your-key" }
    }
  }
}
```

The tools in `src/index.ts` are intentionally tiny wrappers — read them, adapt the pattern to your own stack.

## About DirtyDialogues

[**DirtyDialogues**](https://dirtydialogues.com) is an OnlyFans agency platform for managing fan conversations at scale: unified inbox, mass DMs, automated & AI-assisted replies, scripts & templates, team shifts, and analytics.

**[Get started →](https://dirtydialogues.com)** · **[Pricing →](https://dirtydialogues.com/pricing)**

## License

MIT — see [LICENSE](./LICENSE). This is an independent open-source example.
