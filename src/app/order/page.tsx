'use client';

/* eslint-disable @next/next/no-img-element */
import { defaultProjectId, domain } from '@/api';
import { AuthHandler } from '@/custom-components/AuthHandler';
import { clearCart, getCart } from '@/custom-components/shop-page/CartAction';
import { Dialog, Popover, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import { App, Form, Tag } from 'antd';
import { redirect } from 'next/navigation';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';

type FieldType = {
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    voucher: string;
};

export default function OrderPage() {
    const [form] = Form.useForm<FieldType>();
    const [items, setItems] = useState<any[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [discounts, setDiscounts] = useState<any[] | undefined>(undefined);
    const [currentDiscount, setCurrentDiscount] = useState<any | undefined>();
    const [paymentUrl, setPaymentUrl] = useState<string | undefined>();
    const { message } = App.useApp();
    const debounceRef = useRef<any>();

    useEffect(() => {
        const store = getCart();
        setItems(store);
        if (store.length === 0) redirect('/');
        fetch(`${domain}/ticket-voucher-user/get-available-vouchers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${AuthHandler.getToken()}`,
            },
            body: JSON.stringify({
                ticketIds: store.map((item) => item.id),
            }),
        })
            .then((res) => res.json())
            .then((res) => setDiscounts(res.data));
        setIsLoading(false);
    }, []);

    const subTotal = useMemo(() => {
        const results = items.reduce((prev, curr) => {
            const returnValue = curr.price * curr.quantity + prev;
            return returnValue;
        }, 0);

        return results;
    }, [items]);

    const total = useMemo(() => {
        if (currentDiscount) {
            console.log(subTotal, currentDiscount.discount, subTotal - currentDiscount.discount);
            return subTotal - currentDiscount.discount > 0 ? subTotal - currentDiscount.discount : 0;
        }
        return subTotal;
    }, [currentDiscount, subTotal]);

    async function handleAddVoucher(e: React.ChangeEvent<HTMLInputElement>) {
        clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            const value = e.target.value;

            if (value === '') {
                setCurrentDiscount(0);
                return;
            }

            if (!discounts || discounts.length === 0) {
                console.log('No discounts exist');
                form.setFields([
                    {
                        name: 'voucher',
                        errors: ['Voucher code is not available'],
                    },
                ]);
                return;
            }

            const currentVoucher = discounts.find((discount) => discount.voucherCode === value);
            if (!currentVoucher) {
                console.log('Voucher code is not available');
                form.setFields([
                    {
                        name: 'voucher',
                        errors: ['Voucher code is not available'],
                    },
                ]);
                return;
            }

            const today = new Date();
            const startDate = new Date(currentVoucher.startDate);
            const endDate = new Date(currentVoucher.endDate);

            if (today < startDate || today > endDate) {
                console.log('Voucher code has expired');
                form.setFields([
                    {
                        name: 'voucher',
                        errors: ['Voucher code is not available'],
                    },
                ]);
                return;
            }

            if (currentVoucher.quantity === 0) {
                console.log('Voucher out of stock');
                form.setFields([
                    {
                        name: 'voucher',
                        errors: ['Voucher code is not available'],
                    },
                ]);
                return;
            }

            form.setFields([
                {
                    name: 'voucher',
                    errors: [],
                },
            ]);
            setCurrentDiscount(currentVoucher);
        }, 1000);
    }

    async function handleFinish(values: FieldType) {
        setIsSubmitting(true);
        const auth = AuthHandler.getPrincipal();
        if (!auth) {
            message.error('Please login to continue');
            setIsSubmitting(false);
            redirect('/login');
        }
        try {
            const response = await fetch(`${domain}/ticket-order-user/create-link`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${AuthHandler.getToken()}`,
                },
                body: JSON.stringify({
                    username: values.firstName + '_' + values.lastName,
                    email: auth.email,
                    phone: '+84' + values.phone.slice(1, values.phone.length),
                    total,
                    items: items.map((item) => ({
                        ticketId: item.id,
                        name: item.ticketName,
                        quantity: item.quantity,
                        price: item.price,
                    })),
                    project: defaultProjectId,
                    ticketVoucher: currentDiscount?.id || '',
                }),
            })
                .then((res) => res.json())
                .then((res) => res.data);

            const orderId = response.id;
            const delay = Number(response.delay);

            console.log(response);

            await new Promise((resolve) => setTimeout(resolve, delay * 2));

            const orderResultFull = await fetch(`${domain}/ticket-order-user/get-result/${orderId}`, {
                method: 'GET',
            }).then((res) => res.json());

            console.log(orderResultFull);

            const orderResult = orderResultFull.data.returnvalue;

            if (orderResult.status === 400) {
                console.error(orderResult);
                clearCart();
                message.error("An error occurred. Please try again later or contact the site's administrator");
                return;
            }

            if ('desc' in orderResult && orderResult.desc === 'success') {
                const paymentUrl = orderResult.data.checkoutUrl;
                console.log(paymentUrl);
                setPaymentUrl(paymentUrl);
            } else {
                throw new Error('An error occurred. Please try again later or contact the site administrator');
            }
        } catch (error) {
            console.error(error);
        } finally {
            clearCart();
            setIsSubmitting(false);
        }
    }

    return (
        <>
            <div className="bg-white">
                {/* Background color split screen for large screens */}
                <div className="fixed left-0 top-0 hidden h-full w-1/2 bg-white lg:block" aria-hidden="true" />
                <div className="fixed right-0 top-0 hidden h-full w-1/2 bg-gray-50 lg:block" aria-hidden="true" />

                <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48">
                    <h1 className="sr-only">Order information</h1>

                    <section
                        aria-labelledby="summary-heading"
                        className="bg-gray-50 px-4 pb-10 pt-16 sm:px-6 lg:col-start-2 lg:row-start-1 lg:bg-transparent lg:px-0 lg:pb-16"
                    >
                        <div className="mx-auto max-w-lg lg:max-w-none">
                            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                                Order summary
                            </h2>

                            <ul role="list" className="divide-y divide-gray-200 text-sm font-medium text-gray-900">
                                {isLoading && (
                                    <>
                                        <li className="flex items-start space-x-4 py-6">
                                            <div className="h-20 w-20 flex-none rounded-md bg-gray-200" />
                                            <div className="flex-auto space-y-1">
                                                <div className="h-4 w-3/4 rounded bg-gray-200" />
                                                <div className="h-4 w-1/2 rounded bg-gray-200" />
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div className="h-4 w-1/2 rounded bg-gray-200" />
                                                <div className="h-4 w-1/2 rounded bg-gray-200" />
                                            </div>
                                        </li>
                                        <li className="flex items-start space-x-4 py-6">
                                            <div className="h-20 w-20 flex-none rounded-md bg-gray-200" />
                                            <div className="flex-auto space-y-1">
                                                <div className="h-4 w-3/4 rounded bg-gray-200" />
                                                <div className="h-4 w-1/2 rounded bg-gray-200" />
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div className="h-4 w-1/2 rounded bg-gray-200" />
                                                <div className="h-4 w-1/2 rounded bg-gray-200" />
                                            </div>
                                        </li>
                                        <li className="flex items-start space-x-4 py-6">
                                            <div className="h-20 w-20 flex-none rounded-md bg-gray-200" />
                                            <div className="flex-auto space-y-1">
                                                <div className="h-4 w-3/4 rounded bg-gray-200" />
                                                <div className="h-4 w-1/2 rounded bg-gray-200" />
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div className="h-4 w-1/2 rounded bg-gray-200" />
                                                <div className="h-4 w-1/2 rounded bg-gray-200" />
                                            </div>
                                        </li>
                                    </>
                                )}
                                {!isLoading &&
                                    items.map((item) => (
                                        <li key={item.id} className="flex items-start space-x-4 py-6">
                                            <img
                                                src={`${domain}/file/image/${item.images[0]}`}
                                                alt={item.ticketName + ' image'}
                                                className="h-20 w-20 flex-none rounded-md object-cover object-center"
                                            />
                                            <div className="flex-auto space-y-1">
                                                <h3 className="w-32 truncate text-base sm:text-xl md:w-40 lg:w-52">
                                                    {item.ticketName}
                                                </h3>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <p className="text-base font-medium">
                                                    {item.price.toLocaleString()} VND
                                                </p>
                                                <p className="text-base font-normal">x{item.quantity}</p>
                                            </div>
                                        </li>
                                    ))}
                            </ul>

                            <dl className="hidden space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-900 lg:block">
                                <div className="flex items-center justify-between">
                                    <dt className="text-gray-600">Subtotal</dt>
                                    <dd>{subTotal.toLocaleString()} VND</dd>
                                </div>

                                <div className="flex items-center justify-between">
                                    <dt className="text-gray-600">Shipping</dt>
                                    <dd>0 VND</dd>
                                </div>

                                <div className="flex items-center justify-between">
                                    <dt className="text-gray-600">Discount</dt>
                                    <dd>
                                        {currentDiscount && <Tag>{currentDiscount.voucherCode}</Tag>}
                                        {!!currentDiscount && '-'}
                                        {currentDiscount ? currentDiscount.discount.toLocaleString() : 0} VND
                                    </dd>
                                </div>

                                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                                    <dt className="text-base">Total</dt>
                                    <dd className="text-base">{total.toLocaleString()} VND</dd>
                                </div>
                            </dl>

                            <Popover className="fixed inset-x-0 bottom-0 flex flex-col-reverse text-sm font-medium text-gray-900 lg:hidden">
                                <div className="relative z-10 border-t border-gray-200 bg-white px-4 sm:px-6">
                                    <div className="mx-auto max-w-lg">
                                        <Popover.Button className="flex w-full items-center py-6 font-medium">
                                            <span className="mr-auto text-base">Total</span>
                                            <span className="mr-2 text-base">{subTotal.toLocaleString()} VND</span>
                                            <ChevronUpIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                                        </Popover.Button>
                                    </div>
                                </div>

                                <Transition.Root as={Fragment}>
                                    <div>
                                        <Transition.Child
                                            as={Fragment}
                                            enter="transition-opacity ease-linear duration-300"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="transition-opacity ease-linear duration-300"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Popover.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                                        </Transition.Child>

                                        <Transition.Child
                                            as={Fragment}
                                            enter="transition ease-in-out duration-300 transform"
                                            enterFrom="translate-y-full"
                                            enterTo="translate-y-0"
                                            leave="transition ease-in-out duration-300 transform"
                                            leaveFrom="translate-y-0"
                                            leaveTo="translate-y-full"
                                        >
                                            <Popover.Panel className="relative bg-white px-4 py-6 sm:px-6">
                                                <dl className="mx-auto max-w-lg space-y-6">
                                                    <div className="flex items-center justify-between">
                                                        <dt className="text-gray-600">Subtotal</dt>
                                                        <dd>{subTotal.toLocaleString()} VND</dd>
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <dt className="text-gray-600">Shipping</dt>
                                                        <dd>0 VND</dd>
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <dt className="text-gray-600">Discount</dt>
                                                        <dd>
                                                            {currentDiscount && (
                                                                <Tag>{currentDiscount.voucherCode}</Tag>
                                                            )}
                                                            {!!currentDiscount && '-'}
                                                            {currentDiscount
                                                                ? currentDiscount.discount.toLocaleString()
                                                                : 0}{' '}
                                                            VND
                                                        </dd>
                                                    </div>
                                                </dl>
                                            </Popover.Panel>
                                        </Transition.Child>
                                    </div>
                                </Transition.Root>
                            </Popover>
                        </div>
                    </section>

                    <div className="px-4 pb-36 pt-16 sm:px-6 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-16">
                        <Form
                            noValidate
                            form={form}
                            validateMessages={{
                                required: 'This field is required',
                                types: {
                                    email: "This doesn't look like an email address...",
                                },
                                string: {
                                    min: 'This field is not long enough.',
                                },
                            }}
                            onFinish={handleFinish}
                            onFinishFailed={() => message.error('Please fill in all required fields')}
                        >
                            <div className="mx-auto max-w-lg lg:max-w-none">
                                <section aria-labelledby="contact-info-heading">
                                    <h2 id="contact-info-heading" className="text-lg font-medium text-gray-900">
                                        Contact information
                                    </h2>

                                    <div className="mt-6">
                                        <label
                                            htmlFor="email-address"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Email address
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                value={AuthHandler.getPrincipal()?.email}
                                                disabled
                                                type="email"
                                                id="email-address"
                                                name="email-address"
                                                autoComplete="email"
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-70 sm:text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 sm:gap-5 ">
                                        <div className="w-full">
                                            <label
                                                htmlFor="email-address"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                First Name
                                            </label>
                                            <div className="mt-1">
                                                <Form.Item<FieldType>
                                                    name="firstName"
                                                    rules={[{ required: true }, { type: 'string' }, { min: 3 }]}
                                                >
                                                    <input
                                                        type="text"
                                                        disabled={isSubmitting}
                                                        id="first-name"
                                                        name="first-name"
                                                        autoComplete="firstName"
                                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>

                                        <div className="w-full">
                                            <label
                                                htmlFor="email-address"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Last Name
                                            </label>
                                            <div className="mt-1">
                                                <Form.Item<FieldType>
                                                    name="lastName"
                                                    rules={[{ required: true }, { type: 'string' }, { min: 3 }]}
                                                >
                                                    <input
                                                        type="text"
                                                        disabled={isSubmitting}
                                                        id="last-name"
                                                        name="last-name"
                                                        autoComplete="lastName"
                                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="">
                                        <label
                                            htmlFor="email-address"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Address
                                        </label>
                                        <div className="mt-1">
                                            <Form.Item<FieldType>
                                                name="address"
                                                rules={[{ required: true }, { type: 'string' }, { min: 3 }]}
                                            >
                                                <input
                                                    type="text"
                                                    disabled={isSubmitting}
                                                    id="address"
                                                    name="address"
                                                    autoComplete="address"
                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div className="">
                                        <label
                                            htmlFor="email-address"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Phone Number
                                        </label>
                                        <div className="mt-1">
                                            <Form.Item<FieldType>
                                                name="phone"
                                                rules={[{ required: true }, { type: 'string', len: 10 }]}
                                            >
                                                <input
                                                    type="text"
                                                    disabled={isSubmitting}
                                                    id="phone"
                                                    name="phone"
                                                    autoComplete="phone"
                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </section>

                                <section aria-labelledby="billing-heading" className="mt-10">
                                    <h2 id="billing-heading" className="text-lg font-medium text-gray-900">
                                        Vouchers
                                    </h2>

                                    <div className="">
                                        <div className=" mt-1">
                                            <Form.Item<FieldType> name="voucher" hasFeedback>
                                                <input
                                                    type="text"
                                                    disabled={isSubmitting}
                                                    id="voucher"
                                                    name="voucher"
                                                    autoComplete="voucher"
                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    onChange={handleAddVoucher}
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </section>

                                <div className="mt-10 border-t border-gray-200 pt-6 sm:flex sm:items-center sm:justify-between">
                                    <button
                                        type="submit"
                                        className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:order-last sm:ml-6 sm:w-auto"
                                    >
                                        Continue
                                    </button>
                                    <p className="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-left">
                                        You won&apos;t be charged until the next step.
                                    </p>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
            <Transition.Root show={paymentUrl !== undefined} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setPaymentUrl(undefined)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                    <div>
                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                            <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-5">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-base font-semibold leading-6 text-gray-900"
                                            >
                                                Order successfully created
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Your order has been created successfully and added to the queue.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6">
                                        <a
                                            href={paymentUrl!}
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Proceed to payment
                                        </a>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}
