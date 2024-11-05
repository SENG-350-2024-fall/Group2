'use client'

import { Button } from "@/components/ui/button";

export default function BackupRestore() {
    function backup() {
        fetch('/api/admin/backup')
            .catch(error => console.error('Error:', error));
    }

    function restore() {
        fetch('/api/admin/restore')
            .catch(error => console.error('Error:', error));
    }

    return (
        <div className="p-6">
            <p className="text-lg">Backup and Restore Database</p>

            <div className="space-x-2">
                <Button onClick={backup}>Backup</Button>
                <Button onClick={restore}>Restore</Button>
            </div>
        </div>
    )
}