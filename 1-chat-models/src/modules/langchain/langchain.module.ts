import { Module } from '@nestjs/common';
import { LangChainProvider } from './langchain.provider';

@Module({
  providers: [LangChainProvider],
  exports: [LangChainProvider],
})
export class LangchainModule {}
