export const DEFAULT_CHAT_MODEL = "gemini-2.0-flash";

export const titleModel = {
  id: "gemini-2.0-flash-lite",
  name: "Gemini 2.0 Flash Lite",
  provider: "google",
  description: "Fast model for title generation",
};

export type ModelCapabilities = {
  tools: boolean;
  vision: boolean;
  reasoning: boolean;
};

export type ChatModel = {
  id: string;
  name: string;
  provider: string;
  description: string;
  gatewayOrder?: string[];
  reasoningEffort?: "none" | "minimal" | "low" | "medium" | "high";
};

export const chatModels: ChatModel[] = [
  {
    id: "gemini-2.0-flash",
    name: "Gemini 2.0 Flash",
    provider: "google",
    description: "Fast and capable model with tool use and vision",
  },
  {
    id: "gemini-2.0-flash-lite",
    name: "Gemini 2.0 Flash Lite",
    provider: "google",
    description: "Lightweight, fastest model for everyday tasks",
  },
  {
    id: "gemini-1.5-flash",
    name: "Gemini 1.5 Flash",
    provider: "google",
    description: "Balanced speed and quality with long context",
  },
  {
    id: "gemini-1.5-pro",
    name: "Gemini 1.5 Pro",
    provider: "google",
    description: "Most capable model for complex reasoning",
  },
];

const GEMINI_CAPABILITIES: Record<string, ModelCapabilities> = {
  "gemini-2.0-flash": { tools: true, vision: true, reasoning: false },
  "gemini-2.0-flash-lite": { tools: true, vision: true, reasoning: false },
  "gemini-1.5-flash": { tools: true, vision: true, reasoning: false },
  "gemini-1.5-pro": { tools: true, vision: true, reasoning: false },
};

export async function getCapabilities(): Promise<
  Record<string, ModelCapabilities>
> {
  return Object.fromEntries(
    chatModels.map((model) => [
      model.id,
      GEMINI_CAPABILITIES[model.id] ?? {
        tools: true,
        vision: false,
        reasoning: false,
      },
    ])
  );
}

export const isDemo = process.env.IS_DEMO === "1";

type GatewayModel = {
  id: string;
  name: string;
  type?: string;
  tags?: string[];
};

export type GatewayModelWithCapabilities = ChatModel & {
  capabilities: ModelCapabilities;
};

export async function getAllGatewayModels(): Promise<
  GatewayModelWithCapabilities[]
> {
  return chatModels.map((model) => ({
    ...model,
    capabilities: GEMINI_CAPABILITIES[model.id] ?? {
      tools: true,
      vision: false,
      reasoning: false,
    },
  }));
}

export function getActiveModels(): ChatModel[] {
  return chatModels;
}

export const allowedModelIds = new Set(chatModels.map((m) => m.id));

export const modelsByProvider = chatModels.reduce(
  (acc, model) => {
    if (!acc[model.provider]) {
      acc[model.provider] = [];
    }
    acc[model.provider].push(model);
    return acc;
  },
  {} as Record<string, ChatModel[]>
);
