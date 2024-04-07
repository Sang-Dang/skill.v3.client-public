'use client';

/* eslint-disable @next/next/no-img-element */
import { Fragment, use, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ShoppingCartOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { addToCart, getCart, reductFromCart, removeFromCart } from './CartAction';
import { Badge, Input } from 'antd';
import Link from 'next/link';
import { domain } from '@/api';

export default function Card({ onChange }: { onChange?: any }) {
    const [open, setOpen] = useState(false);
    const [products, setProducts] = useState<any[]>(getCart());

    const updateCart = () => {
        setProducts(getCart());
    };

    useEffect(() => {
        updateCart();
    }, [onChange]);

    return (
        <>
            <div
                style={{
                    position: 'fixed',
                    right: '20px',
                    bottom: '20px',
                }}
            >
                <Badge count={products.length} overflowCount={99}>
                    <ShoppingCartOutlined
                        onClick={() => {
                            updateCart();
                            setOpen(true);
                        }}
                        style={{
                            backgroundColor: 'white',
                            fontSize: '23px',
                            alignItems: 'center',
                            borderRadius: '50%',
                            padding: '10px',
                            boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
                        }}
                    />
                </Badge>
            </div>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                                <div className="flex items-start justify-between">
                                                    <Dialog.Title className="text-lg font-medium text-gray-900">
                                                        Shopping cart
                                                    </Dialog.Title>
                                                    <div className="ml-3 flex h-7 items-center">
                                                        <button
                                                            type="button"
                                                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                            onClick={() => setOpen(false)}
                                                        >
                                                            <span className="absolute -inset-0.5" />
                                                            <span className="sr-only">Close panel</span>
                                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="mt-8">
                                                    <div className="flow-root">
                                                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                            {products.map((product) => (
                                                                <li key={product.id} className="flex py-6">
                                                                    <Link
                                                                        href={`/ticket/detail/${product.id}`}
                                                                        onClick={() => setOpen(false)}
                                                                    >
                                                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                            <img
                                                                                src={`${domain}/file/image/${product.images[0]}`}
                                                                                alt={product.name}
                                                                                className="h-full w-full object-cover object-center"
                                                                            />
                                                                        </div>
                                                                    </Link>

                                                                    <div className="ml-4 flex flex-1 flex-col">
                                                                        <div>
                                                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                                                <h3
                                                                                    className="w-72 truncate"
                                                                                    title={product.ticketName}
                                                                                >
                                                                                    {product.ticketName}
                                                                                </h3>
                                                                            </div>
                                                                            <p>{product.price.toLocaleString()} VND</p>
                                                                        </div>
                                                                        <div className="flex flex-1 items-end justify-between text-sm">
                                                                            <Input
                                                                                className="text-gray-500"
                                                                                addonBefore={
                                                                                    <button
                                                                                        onClick={() => {
                                                                                            reductFromCart(product.id);
                                                                                            updateCart();
                                                                                        }}
                                                                                    >
                                                                                        <MinusOutlined />
                                                                                    </button>
                                                                                }
                                                                                addonAfter={
                                                                                    <button
                                                                                        onClick={() => {
                                                                                            addToCart(product);
                                                                                            updateCart();
                                                                                        }}
                                                                                    >
                                                                                        <PlusOutlined />
                                                                                    </button>
                                                                                }
                                                                                value={product.quantity}
                                                                                style={{
                                                                                    width: '115px',
                                                                                    textAlign: 'center',
                                                                                    userSelect: 'none',
                                                                                }}
                                                                            />

                                                                            <div className="flex">
                                                                                <button
                                                                                    type="button"
                                                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                                    onClick={() => {
                                                                                        removeFromCart(product.id);
                                                                                        updateCart();
                                                                                    }}
                                                                                >
                                                                                    Remove
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <p>Subtotal</p>
                                                    <p>
                                                        {products
                                                            .reduce((acc, product) => {
                                                                return acc + product.price * product.quantity;
                                                            }, 0)
                                                            .toLocaleString()}{' '}
                                                        VND
                                                    </p>
                                                </div>
                                                {/* <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p> */}
                                                <div className="mt-6">
                                                    <Link
                                                        href={'/order'}
                                                        className="flex items-center justify-center rounded-md border border-transparent bg-rose-700 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-rose-800"
                                                    >
                                                        Checkout
                                                    </Link>
                                                </div>
                                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                    or{' '}
                                                    <button
                                                        type="button"
                                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                                        onClick={() => {
                                                            setOpen(false);
                                                        }}
                                                    >
                                                        Continue Shopping
                                                        <span aria-hidden="true"> &rarr;</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}
