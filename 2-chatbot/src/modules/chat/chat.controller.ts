import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @Post()
  async chatWithModel(@Body() body: { message: string; lang: string }) {
    return this.chatService.chatWithModel(body.lang, body.message);
  }
  @Post('/persistence')
  async chatWithPersistence(
    @Body() body: { message: string; threadId?: string },
  ): Promise<any> {
    return this.chatService.chatWithPersistence(body.message, body.threadId);
  }
}
