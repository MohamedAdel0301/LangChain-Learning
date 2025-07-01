import { ChatOpenAI } from '@langchain/openai';
import { Injectable } from '@nestjs/common';
import {
  BaseMessage,
  HumanMessage,
  SystemMessage,
} from '@langchain/core/messages';

@Injectable()
export class ChatService {
  constructor(private readonly langChain: ChatOpenAI) {}

  async chatWithModel(message: string): Promise<BaseMessage> {
    const messages = [
      new SystemMessage('Translate the following from English into Arabic'),
      new HumanMessage(message),
    ];

    const response = await this.langChain.invoke(messages);
    console.log(response.content);
    return response;
  }
}
