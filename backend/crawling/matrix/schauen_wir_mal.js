import { MatrixClient as _MatrixClient, SimpleFsStorageProvider as _SimpleFsStorageProvider, AutojoinRoomsMixin as _AutojoinRoomsMixin } from "matrix-bot-sdk";
import sdk from 'matrix-js-sdk';
import * as fs from 'fs';
const MatrixClient = _MatrixClient;
const SimpleFsStorageProvider = _SimpleFsStorageProvider;
const AutojoinRoomsMixin = _AutojoinRoomsMixin;

//Der Code Speichert alle neu hinzukommenden Nachrichten aus allen Chats in denen der Bot-Account ist.
//Damit muss der Bot eine gültige homeserverUrl und accessToken haben. Dieser muss ggf. angepasst werden, ist aber so voreingestellt, dass der Bot ua. auf dem Matrixchat unserer Gruppe zugreift


//const homeserverUrl = "https://matrix.tu-berlin.de";
//const accessToken = "MDAyMWxvY2F0aW9uIG1hdHJpeC50dS1iZXJsaW4uZGUKMDAxM2lkZW50aWZpZXIga2V5CjAwMTBjaWQgZ2VuID0gMQowMDJkY2lkIHVzZXJfaWQgPSBAbGlvbm46bWF0cml4LnR1LWJlcmxpbi5kZQowMDE2Y2lkIHR5cGUgPSBhY2Nlc3MKMDAyMWNpZCBub25jZSA9ICNSLi1-QnJUY2dLSlM3ZUYKMDAyZnNpZ25hdHVyZSBXrcwkFw9LljIrtcNhVuj85_C-8HdxtrZxVGqlJVL1GAo";
const homeserverUrl = "https://matrix-client.matrix.org";
const accessToken = "MDAxOGxvY2F0aW9uIG1hdHJpeC5vcmcKMDAxM2lkZW50aWZpZXIga2V5CjAwMTBjaWQgZ2VuID0gMQowMDJhY2lkIHVzZXJfaWQgPSBAa2xlaW5lcl9ib3Q6bWF0cml4Lm9yZwowMDE2Y2lkIHR5cGUgPSBhY2Nlc3MKMDAyMWNpZCBub25jZSA9IDFuRkBSaGpsMitNQUNvOlIKMDAyZnNpZ25hdHVyZSAMXyeCntnbGbveGvxfxNT4ujVVQeeT2q8bH0lGnpbdFwo";
const storage = new SimpleFsStorageProvider("bot.json");

const client = new MatrixClient(homeserverUrl, accessToken, storage);
AutojoinRoomsMixin.setupOnClient(client);

client.start().then(() => console.log("Client started!"));


client.on("room.message", (roomId, event) => {
  if (!event["content"]) return;
  const sender = event["sender"];
  const body = event["content"]["body"];
  const replyText = `OMG du hast much angesprochen!!!.\nVielen Dank ${sender}, ich werde dir ergeben dienen`



  
  //daten speichern
  let json_string = `{"sender":"${sender}", "room":"${roomId}", "body":"${body}"}`
  
  let verläufe = fs.readFileSync("chatverläufe.json")
  let verläufe_json = JSON.parse(verläufe)
  let new_json_Data = JSON.parse(json_string)
  verläufe_json.push(new_json_Data)
  fs.writeFile('chatverläufe.json', JSON.stringify(verläufe_json), (error) => {if (error) console.log('file couldnt be created');})

  if (body.startsWith("!bot")) {
    console.log(`${sender} says ${body}`);
    
    client.sendMessage(roomId, {"msgtype": "m.notice", "body": replyText,});
    console.log('omg ich wurde angesprochen!')
}

});
  

