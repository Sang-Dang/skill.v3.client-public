import Footer from '@/common/components/Footer';
import Header from '@/app/(homepage)/components/Header';
import { ReactNode } from 'react';

export default function layout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}
