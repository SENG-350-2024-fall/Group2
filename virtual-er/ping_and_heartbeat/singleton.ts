import Heartbeat from './heartbeat';
import { pingDatabase } from './ping';

console.log("Checking if database is available:")

const isDatabaseAccessible = pingDatabase();

if (isDatabaseAccessible) {
    console.log("Database is accessible.");
} else {
    console.error("Database is not accessible.")
}

console.log("Beginning heartbeat:")

const heartbeat = Heartbeat.getInstance();
heartbeat.startHeartbeat(pingDatabase, 1000);
setTimeout(() => { heartbeat.stopHeartbeat() }, 5000);