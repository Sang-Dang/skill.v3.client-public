import { domain } from '@/api';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { App } from 'antd';
import type { Metadata } from 'next';
import { useEffect } from 'react';
import './globals.scss';
import ProjectContextWrapper from '@/ProjectContext';

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
                <AntdRegistry>
                    <App className="h-full w-full">
                        <ProjectContextWrapper>{children}</ProjectContextWrapper>
                    </App>
                </AntdRegistry>
            </body>
        </html>
    );
}
