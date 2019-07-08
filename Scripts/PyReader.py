import sys
import time
import logging
import os
try:
    from watchdog.events import FileModifiedEvent
    from watchdog.observers import Observer
    from watchdog.events import FileSystemEventHandler
except:
    print("Module watchdog not found. Run 'pip install watchdog'")
# event when file is modified
dir = "/usr/local/Cellar/snort/2.9.12/log"

filelength = 0

def readAlerts(event):
    global filelength, dir
    filedir = dir + "/alert"
    if not event.is_directory and "alert" in event.src_path:
        fileobject = open(filedir, "r")
        for filelength, line in enumerate(fileobject):
            filelength += 1
            print(line, end = '')
        fileobject.close()

myEventHandler = FileSystemEventHandler()
myEventHandler.on_modified = readAlerts
observer = Observer()
#Schedule observer to list for myEventHandler in dir, subdirectories=False
observer.schedule(myEventHandler, dir, False)
try:
    observer.start()
    while True:
        #update modified date every 5s
        time.sleep(5)
        #Ensure file modified date is up to date
        os.system("touch " + dir + "/alert")
except KeyboardInterrupt:
    observer.stop()
observer.join()
