import json
from flask import Flask, request, jsonify, redirect, session
from datetime import date, datetime, timedelta
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
import datetime
import bson
import time
from bson.json_util import dumps
from bson.json_util import loads
import requests
import os
url = os.environ['IPADDRESS']

app = Flask(__name__)
CORS(app)
# db = MongoClient(
#     "mongodb+srv://vrdhoke:vrdhoke@uber.c7iad.mongodb.net/UberDB?retryWrites=true&w=majority"
# )
db = MongoClient(
    "mongodb://vrdhoke:vrdhoke@uber-shard-00-00.c7iad.mongodb.net:27017,uber-shard-00-01.c7iad.mongodb.net:27017,uber-shard-00-02.c7iad.mongodb.net:27017/UberDB?ssl=true&replicaSet=atlas-qoj2dg-shard-0&authSource=admin&retryWrites=true&w=majority"
)
# url = "http://localhost:4000"


# @app.route("/user/bookings", methods=["POST"])
# def book_bus():
#         bus_id = request.json.get("bus_id")
#         username = request.json.get("username")
#         start = request.json.get("start")
#         end = request.json.get("end")
#         date = request.json.get("date")
#         duration = request.json.get("duration")
#         # time = request.json.get("time")
#         seats = request.json.get("seats")
#         print(start)
#         trip = dict(
#             busid=bus_id,
#             username=username,
#             start=start,
#             end=end,
#             duration=duration,
#             seats=seats,
#             date=datetime.datetime.strptime(date, "%d/%m/%Y"),
#             _id=str(ObjectId())
#         )
#         buses[trip["_id"]] = trip
#         db["UberDB"]["buses"].insert_one(trip)
#         return jsonify(trip)


class DateTimeEncoder(json.JSONEncoder):
    def default(self, z):
        if isinstance(z, datetime.datetime):
            return str(z)
        else:
            return super().default(z)


trips = dict()
buses = dict()
# !Admin Login Logout
@app.route("/admin/login", methods=["POST"])
def admin_login():
    username = request.json.get("username")
    password = request.json.get("password")

    if username == "admin" and password == "admin123":
        session["username"] = username
        print(session)
        return jsonify("Login Success")
    else:
        return jsonify("Login Failed")


@app.route("/admin/logout", methods=["GET"])
def admin_logout():
    if "username" in session:
        session.pop("username", None)
    return jsonify("Logout Success")

@app.route("/pythontest", methods=["GET"])
def test_end():
    return jsonify("Hello from Python")

@app.route("/pythontonode", methods=["GET"])
def test_comm():
    response = requests.get(f"{url}/user/nodetest")
    return jsonify(response.text)

# !Add Bus
@app.route("/bus/new", methods=["POST"])
def add_bus():
        authToken = request.json.get("authToken")
        bus_id = request.json.get("bus_id")
        start = request.json.get("start")
        end = request.json.get("end")
        date = request.json.get("date")
        duration = request.json.get("duration")
        time = request.json.get("time")
        seats = request.json.get("seats")
        a_json = {'token':authToken}  
        response = requests.post(url+"/user/authToken",json=a_json, headers={"content-type": "application/json"})
        print(response.text)
        if response.text == "Validated":
            trip = dict(
                start=start,
                end=end,
                duration=duration,
                seats=seats,
                date=datetime.datetime.strptime(date, "%Y-%m-%d"),
                time=time,
                _id=str(bus_id),
            )
            buses[trip["_id"]] = trip
            db["UberDB"]["buses"].insert_one(trip)
            return jsonify(trip)
        else:
            return jsonify("Token not valid")


# !Get all Bus
@app.route("/bus/all", methods=["GET"])
def all_buses():
    buses = list(db["UberDB"]["buses"].find())
    return json.dumps(buses, cls=DateTimeEncoder)


# !Delete Bus
@app.route("/bus/delete/<bus_id>", methods=["DELETE"])
def delete_bus(bus_id):
    db["UberDB"]["buses"].delete_one({"_id": str(bus_id)})
    return jsonify("success")


# !Get all  trips
@app.route("/trip/all", methods=["GET"])
def all_trips():
    trips = list(db["UberDB"]["trips"].find())
    return json.dumps(trips, cls=DateTimeEncoder)


# !Trip Booking
@app.route("/trip/search", methods=["POST"])
def search_buses():
    start = request.json.get("start")
    end = request.json.get("end")
    trip_date = datetime.datetime.strptime(request.json.get("date"), "%Y-%m-%d")
    buses = list(
        db["UberDB"]["buses"].find({"start": start, "end": end, "date": trip_date})
    )
    return json.dumps(buses, cls=DateTimeEncoder)


@app.route("/trip/new", methods=["POST"])
def new_trip():
    bus = str(request.json.get("bus"))
    user = request.json.get("user")
    seats = request.json.get("seats")
    authToken = request.json.get("authToken")
    a_json = {'token':authToken}  
    response = requests.post(url+"/user/authToken",json=a_json, headers={"content-type": "application/json"})
    print(response.text)
    print(authToken)
    print("from Krutik")
    print(bus)
    if response.text == "Validated":
        bus_object = db["UberDB"]["buses"].find_one({"_id": bus})
        print(bus_object["seats"])
        print("bet")
        print(seats)

        if int(seats)<=int(bus_object["seats"]):
            bus_object["seats"] = str(int(bus_object["seats"]) - int(seats))
            db["UberDB"]["buses"].update_one({"_id":bus},{"$set":{"seats":str(bus_object["seats"])}})
        else :
            return jsonify("Not sufficient seats")

        prevTrip = list(db["UberDB"]["trips"].find({"bus_id": bus, "user": user}))
        print("Vaibhav")
        print(len(prevTrip))
        tripret = dict()
        if len(prevTrip) == 0:
            trip = dict(
                user=user,
                bus_id=bus,
                bus=bus_object,
                seats=seats,
                booking_time=datetime.datetime.now(),
                _id=str(ObjectId()),
            )
            trips[trip["_id"]] = trip
            db["UberDB"]["trips"].insert_one(trip)
            tripret = trip
        else:
            db["UberDB"]["trips"].update_one({"_id":prevTrip[0]["_id"]},{"$set":{"seats":int(prevTrip[0]["seats"])+int(seats),"bus":bus_object}})
            ret = db["UberDB"]["trips"].find({"bus_id": bus, "user": user})
            tripret = ret[0]
            print(tripret)  
        return jsonify(tripret)
    else:
        return jsonify("Can not access")


# !Retrieve Booking
@app.route("/trip/booking", methods=["POST"])
def retrieve_booking():
    user = request.json.get("user")
    print("user "+user)
    # trip_id = request.json.get("trip_id")
    trips = list(db["UberDB"]["trips"].find({"user": user}))
    return json.dumps(trips, cls=DateTimeEncoder)


# !Delete Booking
@app.route("/trip/delete/<user>/<trip_id>", methods=["DELETE"])
def delete_booking(user, trip_id):
    trip = db["UberDB"]["trips"].find({"_id": trip_id, "user": user})
    trip[0]["seats"]
    bus_object = db["UberDB"]["buses"].find_one({"_id": trip[0]["bus_id"]})
    db["UberDB"]["buses"].update_one({"_id":trip[0]["bus_id"]},{"$set":{"seats":int(bus_object["seats"])+int(trip[0]["seats"])}})
    db["UberDB"]["trips"].delete_one({"_id": trip_id, "user": user})
    return jsonify("success")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
