export const DEFAULT_CHAT_MODEL = "llama-3.3-70b-versatile";

export const titleModel = {
  id: "llama-3.1-8b-instant",
  name: "Llama 3.1 8B Instant",
  provider: "groq",
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
    id: "llama-3.3-70b-versatile",
    name: "Llama 3.3 70B",
    provider: "groq",
    description: "Most capable model with tool use",
  },
  {
    id: "llama-3.1-8b-instant",
    name: "Llama 3.1 8B Instant",
    provider: "groq",
    description: "Fastest model for everyday tasks",
  },
  {
    id: "openai/gpt-oss-120b",
    name: "GPT OSS 120B",
    provider: "groq",
    description: "Open-source 120B reasoning model",
  },
  {
    id: "openai/gpt-oss-20b",
    name: "GPT OSS 20B",
    provider: "groq",
    description: "Compact open-source model",
  },
];

const GROQ_CAPABILITIES: Record<string, ModelCapabilities> = {
  "llama-3.3-70b-versatile": { tools: true, vision: false, reasoning: false },
  "llama-3.1-8b-instant": { tools: true, vision: false, reasoning: false },
  "openai/gpt-oss-120b": { tools: true, vision: false, reasoning: true },
  "openai/gpt-oss-20b": { tools: true, vision: false, reasoning: true },
};

export async function getCapabilities(): Promise<
  Record<string, ModelCapabilities>
> {
  return Object.fromEntries(
    chatModels.map((model) => [
      model.id,
      GROQ_CAPABILITIES[model.id] ?? {
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
    capabilities: GROQ_CAPABILITIES[model.id] ?? {
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
