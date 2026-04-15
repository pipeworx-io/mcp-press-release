# mcp-press-release

press-release MCP — wraps StupidAPIs (requires X-API-Key)

Part of the [Pipeworx](https://pipeworx.io) open MCP gateway.

## Tools

| Tool | Description |
|------|-------------|
| `press_release_generate` | Transform any announcement into a press release of considerable importance. No announcement too small. No claim too large. |

## Quick Start

Add to your MCP client config:

```json
{
  "mcpServers": {
    "press-release": {
      "url": "https://gateway.pipeworx.io/press-release/mcp"
    }
  }
}
```

Or use the CLI:

```bash
npx pipeworx use press-release
```

## License

MIT
