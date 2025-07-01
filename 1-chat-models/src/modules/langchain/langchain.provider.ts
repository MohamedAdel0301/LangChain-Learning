import { ChatOpenAI } from '@langchain/openai';
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const LangChainProvider: Provider = {
  provide: ChatOpenAI,
  useFactory: (configService: ConfigService) => {
    return new ChatOpenAI({
      modelName: 'gpt-4',
      apiKey: configService.get<string>('OPENAI_API_KEY'),
    });
  },
  inject: [ConfigService],
};
