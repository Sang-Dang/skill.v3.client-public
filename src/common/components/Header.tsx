'use client';

import logo from '@/assets/logo.svg';
import Auth from '@/common/context/AuthContext';
import Cart from '@/common/context/CartContext';
import { cn } from '@/common/util/cn';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { ForwardedRef, forwardRef, useEffect, useState } from 'react';

const navigation = [
    { name: 'About us', href: '/about' },
    { name: 'Tickets', href: '' },
    { name: 'Merchandise', href: '' },
    { name: 'Contact', href: '/contact' },
];

type Props = {
    headerBackground?: 'transparent' | 'dark' | 'light';
    textColor?: 'dark' | 'light';
};

const Header = forwardRef(function HeaderComponent(
    { textColor = 'dark', headerBackground = 'light' }: Props,
    ref?: ForwardedRef<HTMLDivElement>,
) {
    const cart = Cart.useCart();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState<undefined | boolean>(undefined);
    const auth = Auth.useAuth();

    useEffect(() => {
        setIsLoggedIn(auth.isLoggedIn());
    }, [auth]);

    return (
        <>
            <header
                ref={ref}
                className={cn(
                    'fixed inset-x-0 top-0 z-50 text-black transition-all',
                    headerBackground === 'dark' && 'bg-black',
                    headerBackground === 'light' && 'bg-white shadow-lg',
                    headerBackground === 'transparent' && 'bg-transparent',
                )}
                style={{}}
            >
                <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <Link href="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">Skillcetera</span>
                            <Image
                                className={cn(
                                    'h-12 w-24 scale-[200%] ',
                                    textColor === 'light' && 'transform invert filter',
                                )}
                                src={logo}
                                alt=""
                            />
                        </Link>
                    </div>
                    <div className="flex gap-4 lg:hidden">
                        <button
                            type="button"
                            className={cn(
                                '-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 transition-all',
                                textColor === 'light' && 'text-white',
                                textColor === 'dark' && 'text-black',
                            )}
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href as any}
                                className={cn(
                                    'text-sm font-semibold leading-6 text-white transition-all',
                                    textColor === 'light' && 'text-white',
                                    textColor === 'dark' && 'text-black',
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end"></div>
                </nav>
                <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                    <div className="fixed inset-0 z-50" />
                    <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-500/10">
                        <div className="flex items-center justify-between">
                            <a href="#" className="-m-1.5 p-1.5">
                                <span className="sr-only">Your Company</span>
                                <Image className="h-12 w-24 scale-[200%] " src={logo} alt="" />
                            </a>
                            <button
                                type="button"
                                className={cn(
                                    '-m-2.5 rounded-md p-2.5',
                                    textColor === 'light' && 'text-white',
                                    textColor === 'dark' && 'text-black',
                                )}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-black/25">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black hover:bg-gray-200"
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </header>
        </>
    );
});

export default Header;
