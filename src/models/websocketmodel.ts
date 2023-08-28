import WebSocket from "ws";

export class Clients {
    public clientList: { [key: string]: WebSocket };
    constructor() {
        this.clientList = {};
    }

    saveClient(username: string, client: WebSocket) {
        this.clientList[username] = client;
    }
}

export class Servers {
    public clientList: { [key: string]: WebSocket };
    public clientArray: String[];
    constructor() {
        this.clientList = {};
        this.clientArray =[]
    }

    saveClient(username: string, client: WebSocket) {
        this.clientList[username] = client;
        this.clientArray.push(...[username])
    }
    
}