import { AIService, AIConfig } from "./types";
import { OpenAIProvider } from "./openai-provider";
import { createLogger } from '../logger';

const logger = createLogger('ai:deepseek');

/**
 * DeepSeek Provider - 基于 OpenAI 兼容 API
 * 默认 Base URL: https://api.deepseek.com
 * DeepSeek API 完全兼容 OpenAI SDK，因此直接复用 OpenAIProvider
 */
export class DeepSeekProvider extends OpenAIProvider implements AIService {
    constructor(config?: AIConfig) {
        // 如果未指定 baseUrl，使用 DeepSeek 默认地址
        const deepseekConfig: AIConfig = {
            ...config,
            baseUrl: config?.baseUrl || 'https://api.deepseek.com',
            model: config?.model || 'deepseek-chat',
        };

        logger.info({
            provider: 'DeepSeek',
            model: deepseekConfig.model,
            baseURL: deepseekConfig.baseUrl,
            apiKeyPrefix: deepseekConfig.apiKey ? deepseekConfig.apiKey.substring(0, 8) + '...' : 'undefined'
        }, 'DeepSeek Provider initialized');

        super(deepseekConfig);
    }
}
