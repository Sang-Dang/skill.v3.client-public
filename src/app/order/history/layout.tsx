import Footer from '@/custom-components/Footer';
import Header from '@/custom-components/Header';
import React, { ReactNode, Suspense } from 'react';

export default function layout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />
            <Suspense fallback="Loading...">{children}</Suspense>
            <Footer />
        </>
    );
}
