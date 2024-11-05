"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Heartbeat = /** @class */ (function () {
    function Heartbeat() {
        this.intervalID = null;
    }
    Heartbeat.getInstance = function () {
        if (!this.instance) {
            this.instance = new Heartbeat();
        }
        return this.instance;
    };
    Heartbeat.prototype.startHeartbeat = function (checkFunction, interval) {
        if (this.intervalID) {
            console.log("Heartbeating.");
            return;
        }
        this.intervalID = setInterval(function () { checkFunction(); }, interval);
        console.log('Heartbeating...');
    };
    Heartbeat.prototype.stopHeartbeat = function () {
        if (this.intervalID) {
            clearInterval(this.intervalID);
            this.intervalID = null;
            console.log("Heartbeat off");
        }
        else {
            return;
        }
    };
    return Heartbeat;
}());
exports.default = Heartbeat;
