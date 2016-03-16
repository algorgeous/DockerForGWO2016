import json
from bson import json_util
from pymongo import MongoClient
from flask import Flask

app = Flask(__name__)

@app.route("/shoes")
def hello():
    client = MongoClient()
    client = MongoClient('mongodb://admin:kgC2HDivyoup@172.99.73.242:27017/admin')
    db = client.admin
    collection = db.shoes
    allTheShoes = collection.find()
    json_docs=[]
    for shoe in allTheShoes:
        json_doc = json.dumps(shoe, default=json_util.default)
        json_docs.append(json_doc)

    docs = [json.loads(j_doc, object_hook=json_util.object_hook) for j_doc in json_docs]
    return str(docs)

if __name__ == "__main__":
    app.run()
