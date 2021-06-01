from matrixbot import MatrixBot

bot = MatrixBot(
    host="example.com",
    display_name="Example Bot",
    token=access_token,
    user_id="@bot:example.com"
)
# run forever
bot.start()