import { ReactNode, Suspense } from 'react';

export default function layout({ children }: { children: ReactNode }) {
    return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
}
