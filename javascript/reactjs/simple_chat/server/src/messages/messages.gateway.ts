import {
  WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Server } from 'socket.io';
import { Socket } from 'net';

type Client = Socket & { client_id: string }

@WebSocketGateway({ namespace: 'simple_chat' })
export class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  static clients = {}

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

  handleDisconnect(@ConnectedSocket() client: Client) {
    console.log("handleDisconnect client:")

    delete MessagesGateway.clients[client.client_id]

    console.log("SubscribeMessage('client_id') MessagesGateway.clients:", MessagesGateway.clients)
  }

  @SubscribeMessage('client_id')
  create(@ConnectedSocket() client: Client, @MessageBody() client_id: string) {
    console.log("SubscribeMessage('client_id') client_id:", client_id)

    client.client_id = client_id

    MessagesGateway.clients[client_id] = client

    console.log("SubscribeMessage('client_id') MessagesGateway.clients:", MessagesGateway.clients)
  }

  @SubscribeMessage('findAllMessages')
  findAll(@ConnectedSocket() client: Socket, @MessageBody() msg: string) {
    console.log("SubscribeMessage('findAllMessages') msg:", msg)
    console.log("SubscribeMessage('findAllMessages') this.server:", this.server)

    client.emit("findAllMessages", "SubscribeMessage('findAllMessages') !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! " + msg)
    // this.server.emit("findAllMessages", "SubscribeMessage('findAllMessages') !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! " + msg)
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
