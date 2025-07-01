import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const LangChainProvider: Provider = {
  provide: ChatGoogleGenerativeAI,
  useFactory: (configService: ConfigService) => {
    return new ChatGoogleGenerativeAI({
      model: 'gemini-2.5-flash',
      apiKey: configService.get<string>('GEMINI_API_KEY'),
    });
  },
  inject: [ConfigService],
};
