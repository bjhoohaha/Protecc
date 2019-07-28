#!/usr/local/bin/python3
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import sys
import shutil
import os
import datetime
import subprocess
# initialize credentials
# print(sys.argv)
# uid = sys.argv[1]
# options = []
# if(len(sys.argv) > 2):
#     options= sys.argv[2:]
# pass in arguments if required
# options = ['-c', str(sys.argv[1])]
cred = credentials.Certificate("/users/tishya/Desktop/Protecc-master/serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://employee-manager-66213.firebaseio.com'
})
################################################################################

# def increment(val):
#     if(val == None):
#         return 1
#     else:
#         val += 1
#         return val
#
# def classifyProtocol(protocol):
#   count = 0;
#   def removeDots(protocol) :
#     index = protocol.find(".")
#     if index == -1:
#         return protocol;
#     else:
#         return protocol[0:index] + protocol[index+1:]
#   protocolSts = db.reference("stats/protocol/" + removeDots(protocol));
#   protocolSts.transaction(increment)
#
# def classifyLength(length) :
#     num = int(length)
#     path = "1500-"
#     if (num < 100) : path = "0-100";
#     elif (num < 200) : path = "100-200";
#     elif (num < 500) : path = "200-500";
#     elif (num < 1000) : path = "500-1000";
#     elif (num < 1500) : path = "1000-1500";
#     lengthSts = db.reference("stats/length/" + path);
#     lengthSts.transaction(increment)
#
# def classifyDate(date) :
#     dateStr = date[0:10]
#     dateSts = db.reference("stats/date/" + dateStr);
#     dateSts.transaction(increment)

################################################################################
try:
    sharkProcess = subprocess.Popen(['tshark'],stdout=subprocess.PIPE,
                                             stderr=subprocess.PIPE)
    print("tshark is running...", file=sys.stdout)
    i = 0
    for packet in sharkProcess.stdout:
        # string is in binary, hence decode to utf-8
        sharkStdOut = packet.decode("utf-8")[:-1]
        # split by whitespace to extract info
        packetInfoArray = sharkStdOut.split()
        now = '{:%Y-%m-%d %H:%M:%S}'.format(datetime.datetime.now())
        data = {
           "createdAt": now,
           "updatedAt": now,
           "sourceIp": packetInfoArray[2],
           "destinationIp": packetInfoArray[4],
           "protocol": packetInfoArray[5],
           "length": packetInfoArray[6],
           "info": " ".join(packetInfoArray[7:])
        }
        # classifyProtocol(packetInfoArray[5])
        # classifyLength(packetInfoArray[6])
        # classifyDate(now)
        db.reference('packets').push(data)
        i += 1
        print(str(i) + " packets added")
except KeyboardInterrupt:
    print("Inserting data into firebase stopped.")
