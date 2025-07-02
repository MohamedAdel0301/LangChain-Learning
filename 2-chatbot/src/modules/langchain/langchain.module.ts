import { Module } from '@nestjs/common';
import { LangChainProvider } from './langchain.provider';
import { LangchainService } from './langchain.service';

@Module({
  providers: [LangChainProvider, LangchainService],
  exports: [LangChainProvider, LangchainService],
})
export class LangchainModule {}
