'use client';

import { AuthHandler } from '@/custom-components/AuthHandler';
import { redirect, usePathname } from 'next/navigation';
import { ReactNode, useLayoutEffect } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    useLayoutEffect(() => {
        if (!AuthHandler.isLoggedIn()) redirect(`/login?redirect=${pathname}`);
    }, [pathname]);

    return <>{children}</>;
}
