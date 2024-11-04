"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var heartbeat_1 = require("./heartbeat");
var ping_1 = require("./ping");
console.log("Checking if database is available:");
var isDatabaseAccessible = (0, ping_1.pingDatabase)();
if (isDatabaseAccessible) {
    console.log("Database is accessible.");
}
else {
    console.error("Database is not accessible.");
}
console.log("Beginning heartbeat:");
var heartbeat = heartbeat_1.default.getInstance();
heartbeat.startHeartbeat(ping_1.pingDatabase, 1000);
setTimeout(function () { heartbeat.stopHeartbeat(); }, 5000);
