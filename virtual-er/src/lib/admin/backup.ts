import fs from 'fs';

export function backup() {
    fs.copyFile('db.json', 'backup.json', (err) => {
        if (err) throw err;
        console.log('Backup created');
    })
}

export function restore() {
    fs.copyFile('backup.json', 'db.json', (err) => {
        if (err) throw err;
        console.log('Backup restored');
    })
}