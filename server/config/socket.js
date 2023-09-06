import { Server } from 'socket.io';

export const io = new Server({
  cors: {
    origin: 'http://localhost:5000', 
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
