import { LangchainService } from './../langchain/langchain.service';
import { Injectable } from '@nestjs/common';
import { MessageContent } from '@langchain/core/messages';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

@Injectable()
export class ChatService {
  constructor(
    private readonly langChain: ChatGoogleGenerativeAI,
    private readonly langchainService: LangchainService,
  ) {}

  async chatWithModel(lang: string, message: string): Promise<MessageContent> {
    const systemTemplate = 'Translate the following from English into {lang}';

    const promptTemplate = ChatPromptTemplate.fromMessages([
      ['system', systemTemplate],
      ['user', '{message}'],
    ]);

    const promptValue = await promptTemplate.invoke({
      lang,
      message,
    });
    const response = await this.langChain.invoke(promptValue);
    return response.content;
  }

  async chatWithPersistence(message: string, threadId?: string): Promise<any> {
    const input = [
      {
        role: 'user',
        content: message,
      },
    ];
    const output = await this.langchainService.runWorkflow(input, threadId);
    console.log(output);
    return output;
  }
}
