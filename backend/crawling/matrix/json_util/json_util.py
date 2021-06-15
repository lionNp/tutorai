import json
from os import supports_effective_ids
import re

def get_time_stamp(json):
    return(json["origin_server_ts"])
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

def json_do_your_thing(event, room):
    searchables = Searchables()

    with open('json_util/nsa_wäre_stolz.json', 'a') as jfile:
        json.dump(event, jfile)

##todo
    primkw = get_primitive_keywords(get_body(event))
    if primkw == []:
        return

    suffixfreie_usefprimkw = entf_suffix(primkw)
##

    hash_suffrusefprimkw = hashing_suffrusefprimkw(suffixfreie_usefprimkw)
    exisiting_words = searchables.return_exisiting_words(hash_suffrusefprimkw)

    if exisiting_words != [[], [], []]:
        i = 0
        for ind in range(len(exisiting_words[0])):
            if get_time_stamp(json.loads(exisiting_words[2][i])) > get_time_stamp(json.loads(exisiting_words[2][ind])):
                i = ind

        send_message(room, exisiting_words[0][i], exisiting_words[1][i], exisiting_words[2][i])
        print('send message for:')
        print(exisiting_words[0][i])
        print(exisiting_words[1][i])
        print(exisiting_words[2][i])

    # neue Nachricht abspeichern
    searchables.add_to(suffixfreie_usefprimkw, hash_suffrusefprimkw, json.dumps(event))

def get_primitive_keywords(message):
    message_without_special_keys = re.sub('[^A-Za-z0-9]+', ' ', message)
    words_as_array = re.sub('[^\w]', ' ', message_without_special_keys).split()
    return get_usefull_primitive_keywords(words_as_array)

def get_usefull_primitive_keywords(keywords):
    usefprimkw = []

    for word in keywords:
        if(len(word) > 5):
            usefprimkw.append(word.lower())

    return usefprimkw

def entf_suffix(usefprimkw):
    suffixfreie_usefprimkw = []
    
    for word in usefprimkw:
        suffixfreie_usefprimkw.append(word[:])    #nutzlos, so wie ich mir das vorstelle

    return suffixfreie_usefprimkw

def hashing_suffrusefprimkw(suffixfreie_usefprimkw):
    hashes = []

    for word in suffixfreie_usefprimkw:
        hash = 0
        for ind in range(0, len(word)):
            if ind%2 == 1:
                hash += 2*ord(word[ind])
            else:
                hash += ord(word[ind])
            ind += 1
        hashes.append(hash)

    return hashes

def send_message(room, word, index, event):
    jevent = json.loads(event)
    ursprungsnachricht = get_body(jevent)
    room.send_text('Diese Nachricht scheint in Zusammenhang zu stehen und hilft vielleicht weiter:\n' + ursprungsnachricht)


class Searchables:
    words = []      #Keywords einer Nachricht
    hashes = []     #Hashes der Keywords
    event = []      #gesamte Json der Nachricht

    def __init__ (self):
        return

    def add_to(self, words, hashes, event):
        self.words.append(words)
        self.hashes.append(hashes)
        self.event.append(event)
    
    def get_words(self):
        return self.words

    def get_hashes(self):
        return self.hashes

    def return_exisiting_words(self, hashes):       #returnt array, [0] ist liste der gefundenen Wörter, [1] ist Liste in welcher Nachricht diese gefunden wurden
        findings_words = []                         #               [2] returnt Events (Json der Nachricht)
        findings_nachrichtindex = []
        findings_events = []

        findings = [findings_words, findings_nachrichtindex, findings_events]

        for hash in hashes:
            ind_hashes = 0
            for saved_hashes in self.hashes:
                ind_hash = 0
                for saved_hash in saved_hashes:
                    if hash == saved_hash:
                        findings_words.append(self.words[ind_hashes][ind_hash])
                        findings_nachrichtindex.append(ind_hashes)
                        findings_events.append(self.event[ind_hashes])

                    ind_hash += 1
                ind_hashes += 1

        return findings