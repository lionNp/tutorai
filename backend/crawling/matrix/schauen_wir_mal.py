import random
import re
import time
from matrix_bot_api.matrix_bot_api import MatrixBotAPI
from matrix_bot_api.mregex_handler import MRegexHandler
from matrix_bot_api.mcommand_handler import MCommandHandler

# Global variables
USERNAME = "kleiner_bot"  # Bot's username
PASSWORD = "MatrixBotPasswort123"  # Bot's password
SERVER = "https://matrix-client.matrix.org"  # Matrix server URL


def bot_callback(room, event):
    # Somebody said hi, let's say Hi back
    body = event["content"]["body"];
    nachricht = body[5:len(body)]
    print(nachricht)



    room.send_text(nachricht + ' war deine Nachricht')

    #body_short = re.search('(?<=((\!bot)|(\!Bot)) ).*', body)
    #print(body_short[1])


def main():
    # Create an instance of the MatrixBotAPI
    bot = MatrixBotAPI(USERNAME, PASSWORD, SERVER)

    # Add a regex handler waiting for the word Hi
    bot_handler = MRegexHandler("!bot", bot_callback)
    bot.add_handler(bot_handler)

    bot_handler = MRegexHandler("!Bot", bot_callback)
    bot.add_handler(bot_handler)

    # Start polling
    bot.start_polling()
    print("bot is ready")


    while True:
        input()


if __name__ == "__main__":
    main()