# import files
from flask import Flask, render_template, request
from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer
from chatterbot.trainers import ListTrainer

import numpy as np
import nltk
import string
import random

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

import chatbot

# from chatbot import TrumpBot

bot = ChatBot('Ron Obvious')

# Create a new trainer for the chatbot
trainer = ChatterBotCorpusTrainer(chatbot)

# Train the chatbot based on the english corpus
trainer.train("chatterbot.corpus.english")


app = Flask(__name__)


@app.route("/")
def home():
    return render_template("home.html")


@app.route("/get")
def get_bot_response():
    lag = True
string =  "Trump: My name is Donald, Let's talk about CHINA! Also if you want to exit any time, just type 'delete emails'"
    chatbot()
    while flag == True:
        user_response = input()
    user_response = user_response.lower()

    if user_response != 'delete emails':
        if user_response == "thanks" or user_response == "thank you":
            flag = False
            print("Trump: You are welcome, Make America Great Again!")
        else:
            if greet(user_response) != None:
                print("Trump: " + greet(user_response))
            else:
                sent_tokens.append(user_response)
                word_tokens = word_tokens + nltk.word_tokenize(user_response)
                final_words = list(set(word_tokens))
                print("Trump: ", end="")
                print(response(user_response))
                sent_tokens.remove(user_response)
    else:
        flag = False
        string = "Trump: This has been the worst trade deal in the history of trade deals, maybe ever!"
    
    return str(chatbot.TrumBot())


if __name__ == "__main__":
    app.run()
