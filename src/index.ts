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
 * press-release MCP — wraps StupidAPIs (requires X-API-Key)
 *
 * Transform any announcement into a press release of considerable importance. No a
 */


const API_KEY = '6e0ddbe88486dc354370290979829dc892b0386bd789ae5a';

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
    headers: { 'X-API-Key': API_KEY },
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
