import { Injectable } from '@nestjs/common';
import {
  HumanMessage,
  MessageContent,
  SystemMessage,
} from '@langchain/core/messages';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

@Injectable()
export class ChatService {
  constructor(private readonly langChain: ChatGoogleGenerativeAI) {}

  async chatWithModel(message: string): Promise<MessageContent> {
    const messages = [
      new SystemMessage('Translate the following from English into Arabic'),
      new HumanMessage(message),
    ];

    const response = await this.langChain.invoke(messages);
    console.log(response.content);
    return response.content;
  }
}
