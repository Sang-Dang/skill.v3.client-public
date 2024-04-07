/* eslint-disable @next/next/no-img-element */
import { domain } from '@/api';
import Card from '@/custom-components/shop-page/Cart';
import Image from 'next/image';
import Link from 'next/link';

export default async function Example() {
    const data = await fetch(`${domain}/ticket-user`, {
        next: {
            revalidate: 60,
        },
    });
    const products = (await data.json()).data;

    return (
        <>
            <Card />
            <div className="bg-white">
                <div className="relative bg-gray-800 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
                    <div className="absolute inset-0 overflow-hidden">
                        <Image
                            src="https://tailwindui.com/img/ecommerce-images/home-page-03-feature-section-full-width.jpg"
                            alt="banner"
                            layout="fill"
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                    <div aria-hidden="true" className="absolute inset-0 bg-gray-900 bg-opacity-50" />
                    <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            TEDxFPTUniversityHCMC 2024
                        </h2>
                        <p className="mt-3 text-xl text-white">
                            We&aposre committed to creating a more sustainable future.
                        </p>
                        <a
                            href="#"
                            className="mt-8 block w-full rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
                        >
                            Read our story
                        </a>
                    </div>
                </div>
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <header className="flex justify-between">
                        <h1 className="text-3xl font-bold">Tickets</h1>
                        <input />
                    </header>
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {products &&
                            products.length > 0 &&
                            products.map((product: any) => {
                                return (
                                    <div key={product.id} className="group relative">
                                        <div className="aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                                            <img
                                                style={{
                                                    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
                                                }}
                                                src={`${domain}/file/image/${product.images[0]}`}
                                                alt={'ticket-image'}
                                                className="object-cover object-center lg:h-full lg:w-full"
                                            />
                                        </div>
                                        <div className="mt-4 w-full">
                                            <h3 className="text-sm text-gray-700">
                                                <Link href={`/ticket/detail/${product.id}`}>
                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                    <div className="w-64 truncate">{product.ticketName}</div>
                                                </Link>
                                            </h3>
                                            <div className="flex w-full items-center justify-between">
                                                <p className="mt-1 text-sm text-gray-500">
                                                    {product.price.toLocaleString()} VND
                                                </p>
                                                <p className="text-sm font-medium text-gray-900">
                                                    {product.quantity} ticket{product.quantity !== 1 && 's'} left
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                    {products.length === 0 && (
                        <div className="text-center">
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    vectorEffect="non-scaling-stroke"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                                />
                            </svg>
                            <h3 className="mt-2 text-2xl font-semibold text-gray-900">There are no tickets yet.</h3>
                            <p className="mt-1 text-sm text-gray-500">Please come back later.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
