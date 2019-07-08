try:
    # import mysql module
    import mysql.connector
    from mysql.connector import errorcode
except:
    # print except if module is not found
    print("Module msql.connector not found. Run 'pip install mysql-connector-python'")
import sys
import shutil
import os
import subprocess

def createMySQLDatabase(connection, commands):
    commands.execute("CREATE DATABASE IF NOT EXISTS protecctest")
    connection.database = 'protecctest'
    commands.execute("CREATE TABLE IF NOT EXISTS packets( \
                            packet_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, \
                            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \
                            source_ip VARCHAR(30) NOT NULL, \
                            destination_ip VARCHAR(30) NOT NULL, \
                            protocol VARCHAR(10) NOT NULL, \
                            length INT UNSIGNED NOT NULL, \
                            info TEXT NULL)")

def addPacket(source_ip, destination_ip, protocol, length, info) :
    mycmds.execute("INSERT INTO packets VALUES(NULL, \
                                               NOW(), \
                                               %s, \
                                               %s, \
                                               %s, \
                                               %s, \
                                               %s)",
                   (source_ip,
                    destination_ip,
                    protocol,
                    length,
                    info));

try:
    #connect to mysql server
    cnx = mysql.connector.connect(
        user='root',
        password='NUScsimfc2018!',
        host='localhost',
    )
    print("Connected to mysql server.")
    mycmds = cnx.cursor()
    createMySQLDatabase(cnx, mycmds)
    print("Database selected.")
    if shutil.which('tshark') is not None:
        sharkProcess = subprocess.Popen("tshark",stdout=subprocess.PIPE,stderr=subprocess.PIPE)
        print("tshark is running...")
        for packet in sharkProcess.stdout:
           # string is in binary, hence decode to utf-8
           sharkStdOut = packet.decode("utf-8")[:-1]
           # split by ' ' to extract info
           packetInfoArray = sharkStdOut.split()
           addPacket(packetInfoArray[2], packetInfoArray[4], packetInfoArray[5], packetInfoArray[6], " ".join(packetInfoArray[7:]))
           cnx.commit()
    else:
        print("Wireshark not found in Bin. Please install Wireshark.")

except mysql.connector.Error as err:
    if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print("Incorrect username or password")
    else:
        print(err)
except KeyboardInterrupt:
    print("Insertion to mySQL Server stopped.")
finally:
    mycmds.close()
    cnx.close()
