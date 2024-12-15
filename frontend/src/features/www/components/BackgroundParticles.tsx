"use client";

import Particles from "@/lib/shadcn/components/ui/particles";
import { useState } from "react";

export function BackgroundParticles() {
    const [color, setColor] = useState("#ffffff");

    return (
        <div className="fixed  inset-0  w-screen h-screen overflow-hidden">
            <Particles className="absolute inset-0" quantity={100} ease={80} color={color} refresh />
        </div>
    );
}
