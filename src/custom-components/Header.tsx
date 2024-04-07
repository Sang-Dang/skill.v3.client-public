'use client';

/* eslint-disable @next/next/no-img-element */
import { AuthHandler } from '@/custom-components/AuthHandler';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import logo from '/public/logo.svg';

const navigation = [
    { name: 'About us', href: '/about' },
    { name: 'Event', href: '/event' },
    { name: 'Tickets', href: '/ticket' },
];

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="bg-white">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">Skillcetera</span>
                        <Image
                            src={logo}
                            alt="skillcetera logo"
                            width={180}
                            height={180}
                            style={{
                                height: '2rem',
                                objectFit: 'cover',
                                userSelect: 'none',
                            }}
                        />
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
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
                            href={item.href}
                            className="text-sm font-semibold leading-6 text-gray-900"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {AuthHandler.isLoggedIn() ? (
                        <Menu as="div" className="relative inline-block text-left" key="loggedIn-desktop">
                            <div>
                                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                    Account
                                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                                </Menu.Button>
                            </div>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="px-4 py-3">
                                        <p className="text-sm">Signed in as</p>
                                        <p className="truncate text-sm font-medium text-gray-900">
                                            {AuthHandler.getPrincipal()!.email}
                                        </p>
                                    </div>
                                    <div className="py-1">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <Link
                                                    href="/history"
                                                    className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'block px-4 py-2 text-sm',
                                                    )}
                                                >
                                                    Order History
                                                </Link>
                                            )}
                                        </Menu.Item>
                                    </div>
                                    <div className="py-1">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <Link
                                                    href="/login?logout=true"
                                                    onClick={AuthHandler.logout}
                                                    className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'block w-full px-4 py-2 text-left text-sm',
                                                    )}
                                                >
                                                    Sign out
                                                </Link>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    ) : (
                        <Link href="/login" type="button" className="text-sm font-semibold leading-6 text-gray-900" key="notLoggedIn-desktop">
                            Log in <span aria-hidden="true">&rarr;</span>
                        </Link>
                    )}
                </div>
            </nav>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt=""
                            />
                        </a>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                            <div className="py-6">
                                {AuthHandler.isLoggedIn() ? (
                                    <div key="loggedIn">
                                        <Link
                                            href="/history"
                                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            Order History
                                        </Link>
                                        <Link
                                            href="/login?logout=true"
                                            onClick={AuthHandler.logout}
                                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            Sign out
                                        </Link>
                                    </div>
                                ) : (
                                    <Link
                                        key="notLoggedIn"
                                        href="/login"
                                        type="button"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        Log in
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    );
}

// export default function Header() {
//     return (
//         <Row
//             style={{
//                 padding: '1rem',
//                 height: 'fit-content',
//                 width: '100vw',
//                 userSelect: 'none',
//             }}
//             justify={'center'}
//             align="middle"
//         >
//             <Col sm={{ span: 24 }} lg={{ span: 18 }}>
//                 <Row align="middle" gutter={[20, 20]}>
//                     <Col sm={{ span: 24 }} lg={{ span: 6 }}>
//                         <Link href={'/'}>
//                             <Image
//                                 src={logo}
//                                 alt="skillcetera logo"
//                                 width={200}
//                                 height={200}
//                                 style={{
//                                     height: '3rem',
//                                     objectFit: 'cover',
//                                     userSelect: 'none',
//                                 }}
//                             />
//                         </Link>
//                     </Col>
//                     <Col sm={{ span: 24 }} lg={{ span: 18 }}>
//                         <Row gutter={[20, 20]} align="middle">
//                             <Col>
//                                 <Link href="/event" style={{ color: 'black', fontSize: '1rem' }}>
//                                     Event
//                                 </Link>
//                             </Col>
//                             <Col>
//                                 <Link href="/ticket" style={{ color: 'black', fontSize: '1rem' }}>
//                                     Ticket
//                                 </Link>
//                             </Col>
//                             <Col>
//                                 <Link href="/about" style={{ color: 'black', fontSize: '1rem' }}>
//                                     About us
//                                 </Link>
//                             </Col>
//                             <Col className="lg:hidden">
//                                 <LoginHeaderButton />
//                             </Col>
//                         </Row>
//                     </Col>
//                 </Row>
//             </Col>
//             <Col sm={{ span: 0 }} lg={{ span: 4 }}>
//                 <Row gutter={[10, 10]} align="middle" justify={'end'}>
//                     <Col className="hidden lg:block">
//                         <a target="blank" href="https://www.facebook.com/skillcetera">
//                             <FacebookOutlined style={{ fontSize: '26px', color: '#08c', alignItems: 'center' }} />
//                         </a>
//                     </Col>
//                     <Col className="hidden lg:block">
//                         <a target="blank" href="https://www.instagram.com/skillcetera">
//                             <InstagramOutlined style={{ fontSize: '26px', color: '#E4405F', alignItems: 'center' }} />
//                         </a>
//                     </Col>
//                     <Col style={{ userSelect: 'none' }} className="hidden lg:block">
//                         |
//                     </Col>
//                     <Col className="hidden lg:block">
//                         <LoginHeaderButton />
//                     </Col>
//                 </Row>
//             </Col>
//         </Row>
//     );
// }
