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
uid = sys.argv[1]
# pass in arguments if required
# e.g. options = ['-c 100', '-f tcp']
options = []
if(len(sys.argv) > 2):
    options= sys.argv[2:]
cred = credentials.Certificate("./serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://employee-manager-66213.firebaseio.com'
})

try:
    sharkProcess = subprocess.Popen(['tshark'] + options,stdout=subprocess.PIPE,
                                             stderr=subprocess.PIPE)
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
        db.reference('users/' + uid + '/packets').push(data)
        i += 1
        print(str(i) + " packets added")
except KeyboardInterrupt:
    print("Inserting data into firebase stopped.")
