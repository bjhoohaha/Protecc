// initialise with ADMIN priviledges
const admin = require("firebase-admin");
const { spawn } = require("child_process");
// path to service account key JSON
const serviceAccount = require("./serviceAccountKey.json");

// initialize with ADMIN API
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://employee-manager-66213.firebaseio.com"
});

const db = admin.database();
// pointer to packets ref
const ref = db.ref("packetsTest");

// function classifyProtocol(protocol) {
//   let count = -1;
//   function removeDots(protocol) {
//     if (protocol.includes(".")) {
//       const index = protocol.indexOf(".");
//       return protocol.substring(0, index) + "-" + protocol.substring(index + 1);
//     } else {
//       return protocol;
//     }
//   }
//   const protocolSts = db.ref("stats/protocol/" + removeDots(protocol));
//
//   protocolSts.transaction(val => {
//     return val == null ? 1 : val++;
//   });
// }
//
// function classifyLength(length) {
//   let count = 0;
//   let path = "<1500";
//   if (length < 100) {
//     path = "0-100";
//   } else if (length < 200) {
//     path = "100-200";
//   } else if (length < 500) {
//     path = "200-500";
//   } else if (length < 1000) {
//     path = "500-1000";
//   } else if (length < 1500) {
//     path = "1000-1500";
//   }
//   const lengthSts = db.ref("stats/length/" + path);
//   lengthSts.transaction(val => {
//     return val == null ? 1 : val++;
//   });
// }
//
// function classifyDate(date) {
//   let count = 0;
//   const dateStr = date.substring(0, 10);
//   const dateSts = db.ref("stats/date/" + dateStr);
//   dateSts.transaction(val => {
//     return val == null ? 1 : val++;
//   });
// }

const tshark = spawn("tshark", ["-l", "-c 15"]);
let i = 1;
tshark.stdout.on("data", data => {
  data
    .toString()
    // split by new line
    .split("\n")
    .filter(str => str.length > 0)
    .map(str => {
      // split by whitespace
      const arr = str.split(/(\s+)/).filter(str => str.trim().length > 0);
      const data = {
        createdAt: new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, ""),
        updatedAt: new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, ""),
        sourceIp: arr[2],
        destinationIp: arr[4],
        protocol: arr[5],
        length: arr[6],
        info: arr.slice(7).join(" ")
      };
      ref.push(data, function(error) {
        if (error) {
          console.log(error);
        } else {
          console.log(i + " packets added");
          i++;
        }
      });
      tshark.on("SIGINT", function() {
        tshark.exit();
        console.log("tshark exits.");
      });
    });
});
