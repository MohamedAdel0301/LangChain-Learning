// langchain/langchain.service.ts
import { Injectable } from '@nestjs/common';
import {
  START,
  END,
  MessagesAnnotation,
  StateGraph,
  MemorySaver,
} from '@langchain/langgraph';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { v4 as uuidv4 } from 'uuid';
import { Runnable } from '@langchain/core/runnables';

@Injectable()
export class LangchainService {
  private app: Runnable<any, any>;

  constructor(private readonly langChain: ChatGoogleGenerativeAI) {
    const callModel = async (state: typeof MessagesAnnotation.State) => {
      const response = await langChain.invoke(state.messages);
      return { messages: response };
    };
    const workflow = new StateGraph(MessagesAnnotation)
      .addNode('model', callModel)
      .addEdge(START, 'model')
      .addEdge('model', END);

    const memory = new MemorySaver();
    this.app = workflow.compile({ checkpointer: memory });
  }

  async runWorkflow(
    input: { role: string; content: string }[],
    threadId?: string,
  ): Promise<any> {
    const config = { configurable: { thread_id: threadId || uuidv4() } };
    return await this.app.invoke({ messages: input }, config);
  }
}
