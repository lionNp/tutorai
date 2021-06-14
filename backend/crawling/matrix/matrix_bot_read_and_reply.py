import random
import re
import time
from matrix_bot_api.matrix_bot_api import MatrixBotAPI
from matrix_bot_api.mregex_handler import MRegexHandler
from matrix_bot_api.mcommand_handler import MCommandHandler

USERNAME = "kleiner_bot" 
PASSWORD = "MatrixBotPasswort123"  
SERVER = "https://matrix-client.matrix.org"  

# https://matrix.org/docs/spec/client_server/latest#id43
def bot_callback(room, event):
    sender = event["sender"]
    body = event["content"]["body"]

    print("cought msg by " + sender)
    print("type:    " + event["type"])
    print("msgtype: " + event["content"]["msgtype"])


    if(sender is None or body is None):
        return


    if(event["type"]== "m.room.message" and event["content"]["msgtype"] == "m.text"):
        nachricht = body[5:len(body)] #cutted die 
        print(nachricht)


        room.send_text('hallo')
        return



        with driver.session() as session:
                resp = session.write_transaction(ask_for_modul, nachricht, 1)

        room.send_text('Cypher Ergebnis:\n' + resp)

        url = "http://localhost:3000/moses/"
        resp = urlopen(url + nachricht +"/")
        room.send_text('Volltextsuche Ergebnis:\n' + resp)
            


def main():
    bot = MatrixBotAPI(USERNAME, PASSWORD, SERVER)

    bot_handler = MRegexHandler("!bot", bot_callback)
    bot.add_handler(bot_handler)

    bot_handler = MRegexHandler("!Bot", bot_callback)
    bot.add_handler(bot_handler)

    #Bot startet

    bot.start_polling()
    print("bot is ready")


    while True:
        input()


if __name__ == "__main__":
    main()