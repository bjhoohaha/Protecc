import sys
import time
import logging
import os
try:
    from watchdog.observers import Observer
    from watchdog.events import FileSystemEventHandler
except:
    print("Module watchdog not found. Run 'pip3 install watchdog'")
# event when file is modified
dir = "/usr/local/Cellar/snort/2.9.12/log"

# def readLogs(event):
#     if event.event_type == 'created' and not event.is_directory:
#         print(event.src_path)
#         fileobject = open(event.src_path, "r")
#         print(fileobject.read())

def readAlerts():
    global dir
    filelength = 0
    filedir = "." +  "/alert"
    try:
        fileobject = open(filedir, "r")
        while True:
            # read new line that is written into file
            for filelength, line in enumerate(fileobject):
                filelength += 1
                print(line, end = '')
        fileobject.close()
    except FileNotFoundError:
        print("Alert file not found in " + dir)

readAlerts()
# myEventHandler = FileSystemEventHandler()
# myEventHandler.on_created = readLogs
# observer = Observer()
# observer.schedule(myEventHandler, dir, False)
# try:
#     observer.start()
# except KeyboardInterrupt:
#     observer.stop()
# observer.join()
