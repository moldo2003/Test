// websocket-client.ts
import WebSocket from 'ws';
import { saveFile, sendfile } from './helpers/websoketfunctions';
import { Clients,Servers } from './models/websocketmodel';
import { decodeMessage } from './router/messagedecoder';

const server = new WebSocket.Server({ port: 8080 });
export const clients = new Clients();
export const servers = new Servers();

server.on("connection", (socket: WebSocket) => {
  console.log("Client connected.");
  socket.send('message:' + JSON.stringify({route : "connect"}))
  sendfile("./Content/ultimu.mp4","./Content/petcu.png",socket)

  socket.on("message", (arrayBuffer: ArrayBuffer) => {
    const data = new TextDecoder().decode(arrayBuffer);
    if (data.startsWith('message:')) {
        const message = JSON.parse(data.substring(8));
        decodeMessage(message,socket)
    } else if (data.startsWith('file:')) {
        const file = JSON.parse(data.substring(5));
        saveFile(file['content'], file['filename'],()=>{});
        saveFile(file['content2'], file['filename2'],()=>{sendfile("./Content/"+file['filename'],"./Content/"+file['filename2'],servers.clientList[servers.clientArray[0]+""])});
    }
  });

  socket.on("close", () => {
    console.log("Client disconnected.");
  });
});


//old code
//const client = new WebSocket('ws://localhost:8080');
// client.on('open', () => {
//   console.log('Connected to WebSocket server.');
//   sendfile("./test/Download.mp4","./test/petcu.png",client)
//   client.send('message:' + JSON.stringify({ message: 'Hello, this is a message' }));
// });

// client.on('message', (arrayBuffer: ArrayBuffer) => {
//   const data = new TextDecoder().decode(arrayBuffer);
//   if (data.startsWith('message:')) {
//       const message = JSON.parse(data.substring(8));
//       console.log(message);
//   } else if (data.startsWith('file:')) {
//       const file = JSON.parse(data.substring(5));
//       saveFile(file['content'], file['filename']+".mp4");
//   }
// });

// client.on('close', () => {
//   console.log('Disconnected from WebSocket server.');
// });

// const key = Date.now().toString(36) + Math.random().toString(36).substring(2, 15)
// clients.saveClient(key,socket)
// clients.clientList[key].send('message:' + JSON.stringify({route : "test",key : key}))