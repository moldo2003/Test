import WebSocket from "ws";
import { servers, clients } from "../app";
export function decodeMessage(message: any, socket: WebSocket) {
  if (message["route"] === "connect") {
    if (message["type"] === "server") {
      servers.saveClient(message["key"], socket);
      servers.clientList[message["key"]].send(
        "message:" + JSON.stringify({ route: "connected" })
      );
    } else {
      clients.saveClient(message["key"], socket);
      clients.clientList[message["key"]].send(
        "message:" + JSON.stringify({ route: "connected" })
      );
    }
  }
}
