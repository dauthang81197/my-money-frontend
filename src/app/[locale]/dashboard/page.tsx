'use client';

import {useMobile} from "@/app/hooks/useMoble";
import DashboardMobile from "@/app/[locale]/dashboard/DardboardMoble";
import DashboardDesktop from "@/app/[locale]/dashboard/DashboadDesktop";

export default function Dashboard() {
    const isMobile = useMobile();
    return (
        isMobile ? <DashboardMobile/> : <DashboardDesktop/>
    );
}
