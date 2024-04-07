/* eslint-disable @next/next/no-img-element */
'use client';
import { domain } from '@/api';
import Card from '@/custom-components/shop-page/Cart';
import { addToCart } from '@/custom-components/shop-page/CartAction';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import useSWR from 'swr';

export default function TicketDetails({ params }: { params: { id: string } }) {
    const {
        data: ticket,
        isLoading,
        error,
    } = useSWR(`${domain}/ticket-user/${encodeURIComponent(params.id)}`, (url) =>
        fetch(url, { next: { revalidate: 60 } })
            .then((res) => res.json())
            .then((res) => {
                const data = res.data[0];
                if (data === undefined) {
                    throw new Error('Not found');
                }
                return data;
            }),
    );
    const [refreshCart, setRefreshCart] = useState(false);

    function refresh() {
        setRefreshCart((prev) => !prev);
    }

    if (error) {
        if (error.message === 'Not found') {
            redirect('/404');
        }

        return (
            <div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-base font-semibold text-red-600">Error: {error.message}</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Card onChange={refreshCart} />
            {isLoading && (
                <div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                    <div className="text-center">
                        <p className="text-base font-semibold text-indigo-600">Loading...</p>
                    </div>
                </div>
            )}
            {ticket && (
                <div className="bg-white">
                    <div className="pt-6">
                        <nav aria-label="Breadcrumb">
                            <ol
                                role="list"
                                className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
                            >
                                <li>
                                    <div className="flex items-center">
                                        <a href={'/ticket'} className="mr-2 text-sm font-medium text-gray-900">
                                            Tickets
                                        </a>
                                        <svg
                                            width={16}
                                            height={20}
                                            viewBox="0 0 16 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                            className="h-5 w-4 text-gray-300"
                                        >
                                            <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                        </svg>
                                    </div>
                                </li>
                                <li className="text-sm">
                                    <a aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                        {ticket?.ticketName}
                                    </a>
                                </li>
                            </ol>
                        </nav>

                        {/* Image gallery */}
                        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                                <img
                                    src={`${domain}/file/image/${ticket?.images[0]}`}
                                    alt={ticket?.name}
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                                    <img
                                        src={`${domain}/file/image/${ticket?.images[1]}`}
                                        alt={ticket?.name}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                                    <img
                                        src={`${domain}/file/image/${ticket?.images[2]}`}
                                        alt={ticket?.name}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                            </div>
                            <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                                <img
                                    src={`${domain}/file/image/${ticket?.images[3]}`}
                                    alt={ticket?.name}
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                        </div>

                        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                    {ticket.ticketName}
                                </h1>
                            </div>

                            {/* Options */}
                            <div className="mt-4 lg:row-span-3 lg:mt-0">
                                <h2 className="sr-only">Ticket information</h2>
                                <p className="text-3xl tracking-tight text-gray-900">
                                    {ticket.price.toLocaleString()} VND
                                </p>

                                <button
                                    type="submit"
                                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    onClick={() => {
                                        addToCart(ticket);
                                        refresh();
                                    }}
                                >
                                    Add to Cart
                                </button>
                            </div>

                            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                                {/* Description and details */}
                                <div>
                                    <h3 className="sr-only">Description</h3>

                                    <div className="space-y-6">
                                        <p
                                            className="text-base text-gray-900"
                                            dangerouslySetInnerHTML={{
                                                __html: ticket.description,
                                            }}
                                        ></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
