"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pingDatabase = void 0;
var fs = require("fs");
var path = require("path");
var databasePath = path.join(__dirname, '../db.json');
var pingDatabase = function () {
    try {
        var rawData = fs.readFileSync(databasePath, 'utf8');
        var data = JSON.parse(rawData);
        console.log("Database successfully pinged!");
        return true;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Database ping not successful", error.message);
        }
        else {
            console.error("Unknown error.", error);
        }
        return false;
    }
};
exports.pingDatabase = pingDatabase;
