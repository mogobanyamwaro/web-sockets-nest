import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly io;
  private readonly http;

  constructor() {
    this.io = require('socket.io')(this.http, {
      cors: '*',
      methods: ['GET', 'POST'],
      transports: ['websocket', 'polling'],
    });

    let usersOnline = [];

    this.io.on('connection', (socket) => {
      console.log('Connection established', socket.id);

      // all get social room
      socket.on('join_get_social_room', (data) => {
        socket.join(data.room);
        console.log(`${data.user} Join Get Social Room ${data.room}`);
        console.log(socket.rooms);
      });
      socket.on('leave_get_social_room', (data) => {
        socket.leave(data.room);
        socket.local.to(data.room).emit('user_left');
      });
    });
  }
}
