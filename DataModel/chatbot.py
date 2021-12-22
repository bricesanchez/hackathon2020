import numpy as np
import nltk
import string
import random

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity



f = open('data.txt', 'r', errors='ignore')
raw_doc = f.read()
raw_doc = raw_doc.lower()
sent_tokens = nltk.sent_tokenize(raw_doc)
word_tokens = nltk.word_tokenize(raw_doc)
lemmer = nltk.stem.WordNetLemmatizer()

def LemTokens(tokens):
    return [lemmer.lemmatize(token) for token in tokens]

remove_punct_dict = dict((ord(punct), None) for punct in string.punctuation)

def LemNormalize(text):
    return LemTokens(nltk.word_tokenize(text.lower().translate(remove_punct_dict)))

GREET_INPUTS = ("hello", "hi", "greetings", "sup", "what's up", "hey")
GREET_RESPONSES = ["hi", "hey", "*nods", "hi there", "hello", "I am glad! You are talking to me"]

def greet(sentence):

    for word in sentence.split():
        if word.lower() in GREET_INPUTS:
            return random.choice(GREET_RESPONSES)

# To-do : improve bot with https://medium.com/analytics-vidhya/a-simple-chatbot-using-python-and-nltk-c413b40e9441

def response(user_response):
    robo1_response = ''
    TfidfVec = TfidfVectorizer(tokenizer=LemNormalize, stop_words='english')
    tfidf = TfidfVec.fit_transform(sent_tokens)

    vals = cosine_similarity(tfidf[-1], tfidf)
    idx = vals.argsort()[0][-2]
    flat = vals.flatten()
    flat.sort()
    req_tfidf = flat[-2]
    if req_tfidf == 0:
        robo1_response = robo1_response + "I am sorry! my hand are too huge to understand you"
        return robo1_response
    else:
        robo1_response = robo1_response + sent_tokens[idx]
        return robo1_response

flag = True
print(
    "Trump: My name is Donald, Let's talk about CHINA! Also if you want to exit any time, just type 'delete emails'"
)
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
        print("Trump: This has been the worst trade deal in the history of trade deals, maybe ever!")
