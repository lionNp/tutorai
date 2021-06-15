def get_body(json):
    return(json["content"]["body"])

def get_sender(json):
    return(json["sender"])

def get_type(json):
    return(json["type"])

def get_msgtype(json):
    return(json["content"]["msgtype"])

def valid_text_msg(json):
    return (json["type"]== "m.room.message" and json["content"]["msgtype"] == "m.text")
