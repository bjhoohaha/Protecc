try:
    # import mysql module
    import pyrebase
except:
    # print except if module is not found
    print("Module pyrebase not found. Run 'pip3 install pyrebase'")
import sys
import shutil
import os
import datetime
import subprocess

class FireBaseInit:
    __db=''
    __user=''

    def __init__(self, config, email, password):
        #setup database
        firebase = pyrebase.initialize_app(config)
        print("Firebase configured.")
        self.db = firebase.database()
        print("Firebase database selected.")
        auth = firebase.auth()
        #authenticate
        self.user = auth.sign_in_with_email_and_password(email, password)
        print("Firebase user authenticated.")

    def getUserIDToken(self):
        return self.user['idToken']

    def addPacket(self, source_ip, destination_ip, protocol, length, info) :
        data = {
            "created_at": '{:%Y-%m-%d %H:%M:%S}'.format(datetime.datetime.now()),
            "updated_at": '{:%Y-%m-%d %H:%M:%S}'.format(datetime.datetime.now()),
            "source_ip": source_ip,
            "destination_ip": destination_ip,
            "protocol": protocol,
            "length": length,
            "info": info
        }
        self.db.child('packets').push(data, self.getUserIDToken())

    def describeDatabase(self):
        for i in self.db.child('packets').get(self.getUserIDToken()).each():
            print("%s : %s" % (i.key(), i.val()))
try:
    #config options
    config = {
      "apiKey": 'AIzaSyBErUYGNUmFcbEg-nGY_HOO0tu2KcO0AUY',
      "authDomain": 'employee-manager-66213.firebaseapp.com',
      "databaseURL": 'https://employee-manager-66213.firebaseio.com',
      "projectId": 'employee-manager-66213',
      "storageBucket": 'employee-manager-66213.appspot.com',
      "messagingSenderId": '909669458330',
      "appId": '1:909669458330:web:5e65236fc44dcb75'
      # "serviceAccount": 'path/to/serviceAccountKey.json'
    }
    fb = FireBaseInit(config, "ong_bingjue@hotmail.com", "adminadminadmin")
    if shutil.which('tshark') is not None:
        sharkProcess = subprocess.Popen("tshark",stdout=subprocess.PIPE,
                                                 stderr=subprocess.PIPE)
        print("tshark is running with firebase.")
        for packet in sharkProcess.stdout:
           # string is in binary, hence decode to utf-8
           sharkStdOut = packet.decode("utf-8")[:-1]
           # split by whitespace to extract info
           packetInfoArray = sharkStdOut.split()
           fb.addPacket(packetInfoArray[2],
                        packetInfoArray[4],
                        packetInfoArray[5],
                        packetInfoArray[6],
                        " ".join(packetInfoArray[7:]))
           # print("Packet added")
    else:
        print("Wireshark not found in Bin. Please install Wireshark.")
except KeyboardInterrupt:
    print("Inserting data into firebase stopped.")
    # fb.describeDatabase()
