import { AIService } from "./types";
import { GeminiProvider } from "./gemini-provider";
import { OpenAIProvider } from "./openai-provider";
import { AzureOpenAIProvider } from "./azure-provider";
import { DeepSeekProvider } from "./deepseek-provider";
import { XiaomiProvider } from "./xiaomi-provider";

export * from "./types";

import { getAppConfig, getActiveOpenAIConfig } from "../config";
import { createLogger } from "../logger";

const logger = createLogger('ai');

export function getAIService(): AIService {
    // Always get fresh config
    const config = getAppConfig();
    const provider = config.aiProvider;

    if (provider === "openai") {
        const activeConfig = getActiveOpenAIConfig();
        logger.info({ activeInstance: activeConfig?.name }, 'Using OpenAI Provider');
        return new OpenAIProvider(activeConfig);
    } else if (provider === "azure") {
        logger.info({ deployment: config.azure?.deploymentName }, 'Using Azure OpenAI Provider');
        return new AzureOpenAIProvider(config.azure);
    } else if (provider === "deepseek") {
        logger.info({ model: config.deepseek?.model }, 'Using DeepSeek Provider');
        return new DeepSeekProvider(config.deepseek);
    } else if (provider === "xiaomi") {
        logger.info({ model: config.xiaomi?.model }, 'Using Xiaomi MiMo Provider');
        return new XiaomiProvider(config.xiaomi);
    } else if (provider === "custom") {
        logger.info({ model: config.custom?.model, baseUrl: config.custom?.baseUrl }, 'Using Custom Provider');
        return new OpenAIProvider(config.custom);
    } else {
        logger.info('Using Gemini Provider');
        return new GeminiProvider(config.gemini);
    }
}

