import * as fs from 'fs';
import * as path from 'path';

const databasePath = path.join(__dirname, '../db.json');

export const pingDatabase = (): boolean => {
    try {
        const rawData = fs.readFileSync(databasePath, 'utf8');
        const data = JSON.parse(rawData);
        console.log("Database successfully pinged!");
        return true;
    } catch (error) {
        if (error instanceof Error) {
            console.error("Database ping not successful", error.message);
        } else {
            console.error("Unknown error.", error);
        }       
        return false;
    }
};