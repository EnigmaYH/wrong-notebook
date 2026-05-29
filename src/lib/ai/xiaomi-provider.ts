import { AIService, AIConfig } from "./types";
import { OpenAIProvider } from "./openai-provider";
import { createLogger } from '../logger';

const logger = createLogger('ai:xiaomi');

/**
 * Xiaomi MiMo Provider - 基于 OpenAI 兼容 API
 * 默认 Base URL: https://api.xiaomimimo.com
 */
export class XiaomiProvider extends OpenAIProvider implements AIService {
    constructor(config?: AIConfig) {
        const xiaomiConfig: AIConfig = {
            ...config,
            baseUrl: config?.baseUrl || 'https://api.xiaomimimo.com/v1',
            model: config?.model || 'mimo-chat',
        };

        logger.info({
            provider: 'Xiaomi MiMo',
            model: xiaomiConfig.model,
            baseURL: xiaomiConfig.baseUrl,
            apiKeyPrefix: xiaomiConfig.apiKey ? xiaomiConfig.apiKey.substring(0, 8) + '...' : 'undefined'
        }, 'Xiaomi MiMo Provider initialized');

        super(xiaomiConfig);
    }
}
