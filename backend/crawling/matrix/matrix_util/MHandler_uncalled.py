from matrix_bot_api.mhandler import MHandler

class MHandler_uncalled(MHandler):

    def __init__(self, handle_callback):
        MHandler.__init__(self, self.valid, handle_callback)

    def valid(self, room, event):
        if event['type'] == 'm.room.message' and event['content']['msgtype'] == 'm.text':
            return True
        return False