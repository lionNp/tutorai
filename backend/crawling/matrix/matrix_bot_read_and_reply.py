import random
import re
import time
import matrix_util.matrix_util as mutil
import json_util.json_util as jutil
from matrix_util.MHandler_uncalled import MHandler_uncalled
from matrix_bot_api.matrix_bot_api import MatrixBotAPI
from matrix_bot_api.mregex_handler import MRegexHandler

USERNAME = "kleiner_bot" 
PASSWORD = "MatrixBotPasswort123"  
SERVER = "https://matrix-client.matrix.org"  

# https://matrix.org/docs/spec/client_server/latest#id43
def bot_callback_called(room, event):
    if not mutil.valid_text_msg(event):
        return

    sender = mutil.get_sender(event)
    body = mutil.get_body(event)
    type = mutil.get_type(event)
    msgtype = mutil.get_msgtype(event)
    nachricht = body[5:len(body)]

    print(body)
    print("cought called msg by " + sender)
    print("type:    " + type)
    print("msgtype: " + msgtype)

    return

    #cyper
    with driver.session() as session:
            resp = session.write_transaction(ask_for_modul, nachricht, 1)

    room.send_text('Cypher Ergebnis:\n' + resp)

    url = "http://localhost:3000/moses/"
    resp = urlopen(url + nachricht +"/")
    room.send_text('Volltextsuche Ergebnis:\n' + resp)
            
def bot_callback_uncalled(room, event):
    if not mutil.valid_text_msg(event):
        return

    sender = mutil.get_sender(event)
    body = mutil.get_body(event)
    type = mutil.get_type(event)
    msgtype = mutil.get_msgtype(event)

    print(body)
    print("cought uncalled msg by " + sender)
    print("type:    " + type)
    print("msgtype: " + msgtype)

    jutil.json_do_your_thing(event, room)

    return


def main():
    bot = MatrixBotAPI(USERNAME, PASSWORD, SERVER)

    bot_handler_called_1 = MRegexHandler("!bot", bot_callback_called)
    bot_handler_called_2 = MRegexHandler("!Bot", bot_callback_called)
    bot_handler_uncalled = MHandler_uncalled(bot_callback_uncalled)

    bot.add_handler(bot_handler_called_1)
    bot.add_handler(bot_handler_called_2)
    bot.add_handler(bot_handler_uncalled)

    bot.start_polling()
    print("bot is ready")

    while True:
        input()


if __name__ == "__main__":
    main()


