'use client'

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useERs } from "@/lib/data";
import type { ER } from "@/lib/interfaces";
import { useEffect, useState } from "react";

// Custom iterator generator function for ERs
function* ERIterator(ERs: ER[]) {
    for (const er of ERs) {
        yield er;
    }
}

export default function NearbyERs() {
    const { ers: ERs, isLoading } = useERs();

    const erIterator = ERIterator(ERs);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5"> {/* Responsive grid */}
            {isLoading ? <span>Loading ERs...</span> : Array.from(erIterator).map((er, index) => (
                <Card key={index}>
                    <CardHeader>
                        <h3>{er.name}</h3>
                    </CardHeader>
                    <CardContent>
                        <p>Wait Time: {er.waitTime}</p>
                        <p>Capacity: {er.capacity}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}