import Footer from '@/custom-components/Footer';
import Header from '@/custom-components/Header';
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
