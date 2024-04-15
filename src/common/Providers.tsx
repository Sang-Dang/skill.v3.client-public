'use client';

import Auth from '@/common/context/AuthContext';
import Cart from '@/common/context/CartContext';
import Query from '@/common/context/QueryContext';
import { NextUIProvider } from '@nextui-org/react';
import { Toaster } from 'react-hot-toast';

export default function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <Query>
            <Auth>
                <NextUIProvider>
                    <Cart>{children}</Cart>
                    <Toaster toastOptions={{}} />
                </NextUIProvider>
            </Auth>
        </Query>
    );
}
