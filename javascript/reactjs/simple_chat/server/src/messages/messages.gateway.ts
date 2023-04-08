import {
  WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Server } from 'socket.io';

@WebSocketGateway()
export class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessagesService) { }

  // @SubscribeMessage('createMessage')
  // create(@MessageBody() createMessageDto: CreateMessageDto) {
  //   console.log("SubscribeMessage('createMessage')")
  //   return this.messagesService.create(createMessageDto);
  // }

  handleConnection(client: any, ...args: any[]) {
    console.log("handleConnection client:")
    console.log("handleConnection args:", args)
  }

  handleDisconnect(client: any) {
    console.log("handleDisconnect client:")
  }

  @SubscribeMessage('client_id')
  create(@MessageBody() client_id: string) {
    console.log("SubscribeMessage('client_id') client_id:", client_id)
  }

  @SubscribeMessage('findAllMessages')
  findAll(@MessageBody() msg: string) {
    console.log("SubscribeMessage('findAllMessages') msg:", msg)
    this.server.emit("findAllMessages", "SubscribeMessage('findAllMessages') !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! " + msg)
    // return this.messagesService.findAll();
  }

  @SubscribeMessage('send_lots')
  sendLots() {
    console.log("SubscribeMessage('send_lots')")

    for (let i = 0; i < 1000; i++) {
      this.server.emit("send_lots_resp", "SubscribeMessage('send_lots') " + i)
    }
  }

  @SubscribeMessage('findOneMessage')
  findOne(@MessageBody() id: number) {
    console.log("SubscribeMessage('findOneMessage')")
    return this.messagesService.findOne(id);
  }

  @SubscribeMessage('updateMessage')
  update(@MessageBody() updateMessageDto: UpdateMessageDto) {
    console.log("SubscribeMessage('updateMessage')")
    return this.messagesService.update(updateMessageDto.id, updateMessageDto);
  }

  @SubscribeMessage('removeMessage')
  remove(@MessageBody() id: number) {
    console.log("SubscribeMessage('removeMessage')")
    return this.messagesService.remove(id);
  }
}
