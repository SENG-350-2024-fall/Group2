'use client'

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ER } from "@/lib/interfaces";
import { useEffect, useState } from "react";

// Custom iterator generator function for ERs
function* ERIterator(ERs: ER[]) {
    for (const er of ERs) {
        yield er;
    }
}

export default function NearbyERs() {
    const [ERs, setERs] = useState<ER[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/ers`);
                let ERList = await result.json();
                console.log(ERList);
                setERs(ERList);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    })

    const erIterator = ERIterator(ERs);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5"> {/* Responsive grid */}
            {Array.from(erIterator).map((er, index) => (
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