'use client';

import { File_GetImage_Url } from '@/api/file/File_GetImage_Url';
import { qk_tickets } from '@/api/tickets/key.query';
import { Tickets_GetAllByProjectId } from '@/api/tickets/Tickets_GetAllByProjectId';
import { config } from '@/config.app';
import { Spinner } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';

export default function TicketsList() {
    const tickets = useQuery({
        queryKey: qk_tickets.GetAllByProjectId(config.SetProject),
        queryFn: () => Tickets_GetAllByProjectId({ projectId: config.SetProject }),
    });

    console.log('HELLO');
    console.log(tickets.data);

    return (
        <div className="bg-white">
            <main className="pb-24 pt-24">
                <div className="px-4 py-16 text-center sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">Tickets</h1>
                    <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
                        The secret to a tidy desk? Don&apos;t get rid of anything, just put it in really really nice
                        looking containers.
                    </p>
                </div>

                {/* Product grid */}
                <section
                    aria-labelledby="products-heading"
                    className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8"
                >
                    <h2 id="products-heading" className="sr-only">
                        Tickets
                    </h2>

                    <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
                        {tickets.isSuccess ? (
                            tickets.data.map((ticket) => (
                                <>
                                    <div
                                        key={ticket.key}
                                        className="group relative border-b border-r border-t border-gray-200 p-4 sm:p-6"
                                    >
                                        <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                                            <img
                                                src={File_GetImage_Url({ path: ticket.images[0] })}
                                                alt={ticket.ticketName + '-image'}
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>
                                        <div className="pb-4 pt-10 text-center">
                                            <h3 className="text-2xl font-medium text-gray-900">
                                                <a href={ticket.id}>
                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                    {ticket.ticketName}
                                                </a>
                                            </h3>
                                            <div className="mt-3 line-clamp-2 w-full">
                                                13123123jhlkf fsjdalfksa f dasjflsa fsaf sdaf sadf sadf asd fasd fasd
                                                fas f adsf
                                            </div>
                                            <div className="mt-3 flex flex-col items-center">
                                                <p className="mt-1 text-sm text-gray-500">{ticket.quantity} Tickets</p>
                                            </div>
                                            <p className="mt-4 text-base font-medium text-gray-900">
                                                {ticket.price.toLocaleString()} VND
                                            </p>
                                        </div>
                                    </div>
                                </>
                            ))
                        ) : (
                            <div className="col-span-full grid h-24 place-items-center">
                                {tickets.isPending && <Spinner />}
                                {tickets.isError && <div>Failed to load tickets</div>}
                            </div>
                        )}
                    </div>
                </section>

                {/* Pagination */}
                <nav
                    aria-label="Pagination"
                    className="mx-auto mt-6 flex max-w-7xl justify-between px-4 text-sm font-medium text-gray-700 sm:px-6 lg:px-8"
                >
                    <div className="min-w-0 flex-1">
                        <a
                            href="#"
                            className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600"
                        >
                            Previous
                        </a>
                    </div>
                    <div className="hidden space-x-2 sm:flex">
                        {/* Current: "border-indigo-600 ring-1 ring-indigo-600", Default: "border-gray-300" */}
                        <a
                            href="#"
                            className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600"
                        >
                            1
                        </a>
                        <a
                            href="#"
                            className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600"
                        >
                            2
                        </a>
                        <a
                            href="#"
                            className="inline-flex h-10 items-center rounded-md border border-indigo-600 bg-white px-4 ring-1 ring-indigo-600 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600"
                        >
                            3
                        </a>
                        <span className="inline-flex h-10 items-center px-1.5 text-gray-500">...</span>
                        <a
                            href="#"
                            className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600"
                        >
                            8
                        </a>
                        <a
                            href="#"
                            className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600"
                        >
                            9
                        </a>
                        <a
                            href="#"
                            className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600"
                        >
                            10
                        </a>
                    </div>
                    <div className="flex min-w-0 flex-1 justify-end">
                        <a
                            href="#"
                            className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600"
                        >
                            Next
                        </a>
                    </div>
                </nav>
            </main>
        </div>
    );
}
