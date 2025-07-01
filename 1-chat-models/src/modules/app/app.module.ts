import { Module } from '@nestjs/common';
import { ChatModule } from '../chat/chat.module';
import { LangchainModule } from '../langchain/langchain.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ChatModule,
    LangchainModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
