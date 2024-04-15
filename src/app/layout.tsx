import '@/firebase';
// seperator
import Providers from '@/common/Providers';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Skillcetera',
    description: 'Skill And English Club',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="h-full">
            <body className="h-full">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
