import { Server } from 'socket.io';

export default function handler(req, res) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    // クライアントと接続
    io.on('connection', (socket) => {
      console.log('新しいクライアントが接続されました');

      // クライアントからのメッセージを受信
      socket.on('message', (msg) => {
        console.log('クライアントからのメッセージ:', msg);
        io.emit('message', msg); // 全クライアントにメッセージをブロードキャスト
      });
    });
  }
  res.end();
}
