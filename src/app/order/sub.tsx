'use client'
import { domain } from '@/api';
import { Button, Form, Row, message } from 'antd';
import Link from 'next/link'
import React from 'react';
import { redirect } from 'next/navigation'


export default function Sub() {

    const [form] = Form.useForm();

    const [items, setItems] = React.useState([]);

    const [isDisabled, setIsDisabled] = React.useState(false);

    React.useEffect(() => {
        if (typeof window !== "undefined") {
            const cart = localStorage.getItem('cart');
            if (cart && cart.length > 0) {
                setItems(JSON.parse(cart));
            } else {
                redirect('/shop')
            }
        }
    }, [])

    async function onFinish() {
        if (typeof window !== "undefined") {
            var payload = {
                username: form.getFieldValue('firstName') + ' ' + form.getFieldValue('lastName'),
                email: form.getFieldValue('email'),
                address: form.getFieldValue('address'),
                phone: form.getFieldValue('phone'),
                total: items.reduce((acc: number, product: any) => {
                    return acc + product.price * product.quantity
                }, 0),
                products: items.map((product: any, index) => {
                    return {
                        id: product.id,
                        name: product.name,
                        product_name: product.product_name,
                        quantity: product.quantity,
                        price: parseInt(product.price)
                    }
                }),
                type_payment: 'MONEY'
            }
            if (
                !form.getFieldValue('firstName') ||
                !form.getFieldValue('lastName') ||
                !form.getFieldValue('email') ||
                !form.getFieldValue('address') ||
                !form.getFieldValue('phone')
            ) {
                message.error('Please fill all fields')
                return
            }
            // setIsDisabled(true);
            fetch(`${domain}/payment/create-link`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
                .then((res) => res.json())
                .then((json) => {
                    console.log(json)
                    if (json.statusCode === 201) {
                        success(json.data.id)
                    } else if (json.statusCode === 400) {
                        message.loading('Order products invalid')
                        localStorage.removeItem('cart')
                        setTimeout(() => {
                            window.location.href = '/shop'
                        }, 4000);
                    } else {
                        message.error('Order failed')
                    }
                })
                .catch((err) => {
                    message.error('Order too fast, please wait a moment and try again')
                    setIsDisabled(false)
                })
        }
    };

    const [messageApi, contextHolder] = message.useMessage();

    function success(id: number) {
        if (typeof window !== "undefined") {
        messageApi.open({
            type: 'loading',
            content: 'Action in progress..',
            duration: 0,
        });
        setTimeout(messageApi.destroy, 5000);
        setTimeout(() => {
            fetch(`${domain}/payment/get-link/${id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
                .then((json) => {
                    console.log(json);
                    if (json.statusCode === 200) {
                        localStorage.removeItem('cart')
                        var url = json.data.returnvalue.data.checkoutUrl;
                        window.location.href = url;
                    } else {
                        message.error('Order failed')
                        setIsDisabled(false)
                    }
                })
                .catch((err) => {
                    message.error('Have some problems, please wait a moment and try again')
                    setIsDisabled(false)
                })
        }, 5000);
    }
    };

    return (
        <Row style={{ padding: '2rem 1rem' }} justify={'center'}>
            <Form
                name="basic"
                form={form}
            >
                {/* items vs notice */}
                <div className="space-y-12">
                    {/* info user */}
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Provide a Permanent Email Address for Order Confirmation</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    First name
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={(e) => { form.setFieldsValue({ firstName: e.target.value }) }}
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        style={{ paddingLeft: '0.5rem' }}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Last name
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={(e) => { form.setFieldsValue({ lastName: e.target.value }) }}
                                        type="text"
                                        name="last-name"
                                        id="last-name"
                                        autoComplete="family-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        style={{ paddingLeft: '0.5rem' }}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={(e) => { form.setFieldsValue({ email: e.target.value }) }}
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        style={{ paddingLeft: '0.5rem' }}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Phone number
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={(e) => { form.setFieldsValue({ phone: e.target.value }) }}
                                        style={{ paddingLeft: '0.5rem' }}
                                        id="email"
                                        name="phone"
                                        autoComplete="phone"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                    Street address
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={(e) => { form.setFieldsValue({ address: e.target.value }) }}
                                        style={{ paddingLeft: '0.5rem' }}
                                        type="text"
                                        name="street-address"
                                        id="street-address"
                                        autoComplete="street-address"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                    {/* items */}
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Items</h2>

                        <ul role="list" className="divide-y divide-gray-100">
                            {Array.isArray(items) && items.map((item: any, index) => (
                                <li key={index} className="flex justify-between gap-x-6 py-5">
                                    <div className="flex min-w-0 gap-x-4">
                                        <img className="h-12 w-12 flex-none bg-gray-50" src={`${domain}/file/image/${item.image}`} alt="" />
                                        <div className="min-w-0 flex-auto">
                                            <p className="text-sm font-semibold leading-6 text-gray-900">{item.name}</p>
                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{item.product_name}</p>
                                        </div>
                                    </div>
                                    <div className=" sm:flex sm:flex-col sm:items-end">
                                        <p className="text-sm leading-6 text-gray-900">{`${item.price} VND`}</p>
                                        <p className="mt-1 text-xs leading-5 text-gray-500">
                                            x {item.quantity}
                                        </p>
                                    </div>
                                </li>
                            ))}
                            <li>
                                <br />
                                <br />
                                <br />
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Subtotal</p>
                                    <p>
                                        {
                                            items.reduce((acc, product: any) => {
                                                return acc + product.price * product.quantity
                                            }, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' VND'
                                        }
                                    </p>
                                </div>
                            </li>
                        </ul>

                    </div>

                    {/* noti user */}
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Ensuring accuracy at this stage is crucial, as our shop cannot be held responsible for any inaccuracies or errors resulting from incorrect data provided by the user.
                        </p>
                    </div>
                </div>
                {/* button action */}
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Link href="/shop">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                            Cancel
                        </button>
                    </Link>
                    <button
                        disabled={isDisabled}
                        onClick={onFinish}
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Payment
                    </button>
                    {contextHolder}
                </div>
            </Form>
        </Row>
    )
}
