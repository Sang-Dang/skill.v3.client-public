'use client';

import { AuthHandler } from '@/custom-components/AuthHandler';
import Link from 'next/link';

export default function LoginHeaderButton() {
    return (
        <div>
            {AuthHandler.isLoggedIn() ? (
                <Link href="/login" onClick={AuthHandler.logout}>
                    Log out
                </Link>
            ) : (
                <Link
                    href="/login"
                    type="button"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                    Log in
                </Link>
            )}
        </div>
    );
}
