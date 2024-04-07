import type { Metadata } from "next";
import "./globals.scss";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { App } from 'antd';

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
            <head>
                <link rel="icon" type="images/x-icon" href="http://localhost:3000/favicon.ico" />
            </head>
            <body className="h-full">
                <AntdRegistry>
                    <App className="h-full w-full">{children}</App>
                </AntdRegistry>
            </body>
        </html>
    );
}
