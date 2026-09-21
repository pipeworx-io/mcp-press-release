interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

/**
 * press-release MCP — wraps StupidAPIs' satirical press-release generator.
 *
 * Output is FABRICATED parody for entertainment; nothing here is a real company
 * announcement. Keyless: the endpoint answers a bare request (verified
 * 2026-09-21, HTTP 200 with no X-API-Key), so the credential that used to sit
 * in this file was removed. Note the pack was renamed on the gateway to
 * `satire-press-release` (tool `satirical_release_generate`); the old remote URL
 * below still resolves to it.
 */


const HEADERS = { 'User-Agent': 'pipeworx-satire-press-release/1.0 (+https://pipeworx.io)' };

const tools: McpToolExport['tools'] = [
  {
    name: 'press_release_generate',
    description: 'Transform any announcement into a press release of considerable importance. No announcement too small. No claim too large.',
    inputSchema: {
      type: 'object' as const,
      properties: {"announcement": {"type": "string"}, "company": {"type": "string"}, "tone": {"type": "string", "enum": ["visionary", "disrupting", "humbled", "transparent", "pivoting"]}, "location": {"type": "string"}},
      required: ["announcement"],
    },
  },
];

async function callApi(url: string, args: Record<string, unknown>): Promise<unknown> {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(args)) {
    if (v !== undefined && v !== null && v !== '') {
      params.set(k, String(v));
    }
  }
  const fullUrl = params.toString() ? url + '?' + params.toString() : url;
  const res = await fetch(fullUrl, {
    headers: HEADERS,
  });
  if (!res.ok) throw new Error('press-release API error: ' + res.status);
  return res.json();
}

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'press_release_generate':
      return callApi('https://api.stupidapis.com/press-release/generate', args);
    default:
      throw new Error('Unknown tool: ' + name);
  }
}

export default { tools, callTool } satisfies McpToolExport;
