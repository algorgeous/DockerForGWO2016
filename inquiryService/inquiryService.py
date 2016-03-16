import os
import json
from bson import json_util
import pymongo
from flask import Flask

app = Flask(__name__)

from pymongo import MongoClient

@app.route("/shoes")
def inquiryService():
    try:
        client = MongoClient()
        client = MongoClient(os.environ['MONGO_URL'])
        db = client.admin
        collection = db.shoes
        allTheShoes = collection.find()
        counter = 0
        json_docs = []
        for shoe in allTheShoes:
            counter += 1
#            json_doc = dumps(allTheShoes, default=json_util.default)
#            json_docs.append(json_doc)
            shoes_list = list(allTheShoes)
        return json.dumps(shoes_list, default=json_util.default)
#        return json_docs
        #return counter
        #return "Connected to inquiryService"
    except ErrorMessage as msg:
        return "oops"

if __name__ == "__main__":
    app.run(host='0.0.0.0')
