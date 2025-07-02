import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { LangchainModule } from '../langchain/langchain.module';
import { ChatModule } from '../chat/chat.module';

@Module({
  imports: [
    LangchainModule,
    ChatModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
})
export class AppModule {}
