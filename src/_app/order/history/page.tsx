/* eslint-disable @next/next/no-img-element */
'use client';

import { domain } from '@/api';
import { AuthHandler } from '@/custom-components/AuthHandler';
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline';
import { Card, Modal, QRCode } from 'antd';
import { randomUUID } from 'crypto';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import useSWR from 'swr';

function toFormattedDate(date: Date | string) {
    if (typeof date === 'string') {
        date = new Date(date);
    }

    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export default function Example() {
    const orders = useSWR(`${domain}/ticket-order-user/get-orders`, async (url) =>
        fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${AuthHandler.getToken()}`,
                'Content-Type': 'application/json',
            },
        }).then((res) => res.json()),
    );
    const [currentOrderTicket, setCurrentOrderTicket] = useState<any | undefined>(undefined);
    const searchParams = useSearchParams();

    const page = useMemo(() => searchParams.get('page') || 1, [searchParams]);

    if (orders.isLoading || !orders.data) {
        return 'Loading...';
    }

    return (
        <div className="bg-white">
            <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:pb-24">
                <div className="max-w-xl">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Order history</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Check the status of recent orders, manage returns, and download invoices.
                    </p>
                </div>

                <section aria-labelledby="recent-heading" className="mt-16">
                    <h2 id="recent-heading" className="sr-only">
                        Recent orders
                    </h2>

                    <div className="space-y-10">
                        {orders.data.data
                            .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                            .slice((Number(page) - 1) * 4, Number(page) * 4)
                            .map((order: any) => (
                                <Card key={order.number} className="shadow-sm">
                                    <h3 className="sr-only">
                                        Order placed on{' '}
                                        <time dateTime={order.createdAt}>{toFormattedDate(order.createdAt)}</time>
                                    </h3>

                                    <div className="rounded-lg bg-gray-50 px-4 py-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8">
                                        <dl className="flex-auto space-y-6 divide-y divide-gray-200 text-sm text-gray-600 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:space-y-0 sm:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8">
                                            <div className="flex justify-between sm:block">
                                                <dt className="font-medium text-gray-900">Date placed</dt>
                                                <dd className="sm:mt-1">
                                                    <time dateTime={order.createdAt}>
                                                        {toFormattedDate(order.createdAt)}
                                                    </time>
                                                </dd>
                                            </div>
                                            <div className="flex justify-between pt-6 sm:block sm:pt-0">
                                                <dt className="font-medium text-gray-900">Vouchers Applied</dt>
                                                <dd className="sm:mt-1">{order.ticketVoucher.name || 'None'}</dd>
                                            </div>
                                            <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
                                                <dt>Total amount</dt>
                                                <dd className="sm:mt-1">{order.total.toLocaleString()} VND</dd>
                                            </div>
                                        </dl>
                                        <a
                                            href={order.invoiceHref}
                                            className="mt-6 flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto"
                                        >
                                            View Invoice
                                            <span className="sr-only">for order {order.number}</span>
                                        </a>
                                    </div>

                                    <table className="mt-4 w-full text-gray-500 sm:mt-6">
                                        <caption className="sr-only">Products</caption>
                                        <thead className="sr-only text-left text-sm text-gray-500 sm:not-sr-only">
                                            <tr>
                                                <th scope="col" className="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3">
                                                    Ticket Name
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell"
                                                >
                                                    Quantity
                                                </th>
                                                <th scope="col" className="hidden py-3 pr-8 font-normal sm:table-cell">
                                                    Price
                                                </th>
                                                <th scope="col" className="w-0 py-3 text-right font-normal">
                                                    Info
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t">
                                            {order.items.map((item: any) => (
                                                <tr key={item.id}>
                                                    <td className="py-6 pr-8">
                                                        <div className="flex items-center">
                                                            <div>
                                                                <div className="font-medium text-gray-900">
                                                                    {item.name}
                                                                </div>
                                                                <div className="mt-1 sm:hidden">{item.price}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="hidden py-6 pr-8 sm:table-cell">{item.quantity}</td>
                                                    <td className="hidden py-6 pr-8 sm:table-cell">
                                                        {item.price.toLocaleString()} VND
                                                    </td>
                                                    <td className="whitespace-nowrap py-6 text-right font-medium">
                                                        <button
                                                            onClick={() =>
                                                                setCurrentOrderTicket({
                                                                    idOrder: order.id,
                                                                    idItem: item.id,
                                                                })
                                                            }
                                                            className="text-indigo-600"
                                                        >
                                                            View<span className="hidden lg:inline"> Ticket</span>
                                                            <span className="sr-only">, {item.name}</span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </Card>
                            ))}
                        <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
                            <div className="-mt-px flex w-0 flex-1">
                                <Link
                                    href={`/order/history?page=${Number(page) - 1 < 1 ? 1 : Number(page) - 1}`}
                                    className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                >
                                    <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                    Previous
                                </Link>
                            </div>
                            <div className="hidden md:-mt-px md:flex">
                                {new Array(Math.ceil(orders.data.data.length / 4)).fill(null).map((_, index) => (
                                    <Link
                                        key={index}
                                        href={`/order/history?page=${index + 1}`}
                                        replace
                                        className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                    >
                                        {index + 1}
                                    </Link>
                                ))}
                            </div>
                            <div className="-mt-px flex w-0 flex-1 justify-end">
                                <Link
                                    href={`/order/history?page=${Number(page) + 1 > orders.data.data.length / 4 ? Math.ceil(orders.data.data.length / 4) : Number(page) + 1}`}
                                    className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                >
                                    Next
                                    <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                </Link>
                            </div>
                        </nav>
                    </div>
                </section>
            </main>
            <Modal
                open={currentOrderTicket !== undefined}
                onCancel={() => setCurrentOrderTicket(undefined)}
                title="Ticket Check-in"
                footer={null}
                classNames={{
                    body: 'flex justify-center items-center flex-col gap-5',
                }}
            >
                <Card className="w-full">This is your ticket, please show this to the staff to check-in</Card>
                <QRCode
                    value={JSON.stringify({
                        idOrder: currentOrderTicket?.idOrder,
                        idItem: currentOrderTicket?.idItem,
                        id: Math.random().toString(8) + '_' + Date.now(),
                    })}
                    type="svg"
                    errorLevel="L"
                    size={300}
                />
            </Modal>
        </div>
    );
}
