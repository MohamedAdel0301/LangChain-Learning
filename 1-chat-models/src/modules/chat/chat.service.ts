import { Injectable } from '@nestjs/common';
import { MessageContent } from '@langchain/core/messages';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

@Injectable()
export class ChatService {
  constructor(private readonly langChain: ChatGoogleGenerativeAI) {}

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
    console.log(response.content);
    return response.content;
  }
}
