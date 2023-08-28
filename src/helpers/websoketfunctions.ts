import fs from "fs";
import WebSocket from "ws";

export function sendfile(
  filePath: string,
  filePath2: string,
  client: WebSocket
) {
  fs.readFile(filePath, (err: any, data: any) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    fs.readFile(filePath2, (err: any, data2: any) => {
      if (err) {
        console.error("Error reading file:", err);
        return;
      }
      client.send(
        "file:" +
          JSON.stringify({
            filename: "1qdds4ssdfds",
            content1: data,
            content2: data2,
            ext1: "."+filePath.split(".").pop(),
            ext2: "."+filePath2.split(".").pop(),
          })
      );
    });
  });
}

export function saveFile(data: Uint8Array, name: String,callback : Function) {
  // Create a unique filename, e.g., using a timestamp
  const filename = "Content/" + name;
  // Write the file data to the server's file system
  fs.writeFile(filename, Buffer.from(data), (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return;
    }
    callback()
    console.log(`File saved as ${filename}`);
  });
}
