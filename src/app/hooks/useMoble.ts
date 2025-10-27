"use client";

import {useEffect, useState} from "react";

export function useMobile(breakpoint: number = 768) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // chạy lúc mount
        const check = () => setIsMobile(window.innerWidth < breakpoint);

        check(); // check lần đầu
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, [breakpoint]);

    return isMobile;
}
