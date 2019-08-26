/*
////////////////////////// DEVELOPER's NOTES ///////////////////////////////////

This javscript file was never used in the database.

However, it was built with the intention of using js to spawn tshark.
Thus, maintaining all dependencies within Package.json.

However, during development it was found that child_process module in js runs
tshark asynchronously. This led to a lot of problems where the js file was able
to send 1000+ packets to the database in matter of seconds. This was faster than
what the web listener could pick up, which is used on the client side to
generate statistics since firebase is unable to do any data analytics. Setting
a timeout was trialed but the interval between each packet push to firebase was
still extremely fast.

Node js child process module allow child process to run synchornously but it
will need to wait for the process to finish. As tshark run forever. The object
never gets returned.

////////////////////////////////////////////////////////////////////////////////
*/

// initialise with ADMIN priviledges
const admin = require("firebase-admin");
const {
    spawn
} = require("child_process");
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
            const arr = str.split(/(\s+)/).filter(str => str.trim()
                .length > 0);
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
            // push data to firebase
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