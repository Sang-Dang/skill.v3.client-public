'use client';

import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import logo from '/public/logo.svg';
import { AuthHandler } from '@/custom-components/AuthHandler';
import { Form, message } from 'antd';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

type FieldType = {
    email: string;
    password: string;
    phone: string;
    username: string;
    confirmPassword: string;
};

/* eslint-disable @next/next/no-img-element */
export default function RegisterForm() {
    const [form] = Form.useForm<FieldType>();
    const [messageApi, contextHolder] = message.useMessage();
    const router = useRouter();

    async function handleRegister(values: FieldType) {
        try {
            const response = await AuthHandler.register(values);
            if (response.statusCode === 201) {
                messageApi.success('Account created successfully. Please log in.');
                router.push('/');
            } else {
                throw new Error();
            }
        } catch (error) {
            messageApi.error('An error occurred while creating your account. Please try again.');
        }
    }

    return (
        <>
            <div className="flex min-h-full flex-1">
                {contextHolder}
                <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            <Link href="/">
                                <Image
                                    src={logo}
                                    alt="Skillcetera"
                                    width={180}
                                    height={150}
                                    style={{
                                        height: '2rem',
                                        objectFit: 'cover',
                                        userSelect: 'none',
                                    }}
                                />
                            </Link>
                            <div className="mt-8 flex items-center gap-3 ">
                                <Link href="/login">
                                    <ArrowLeftIcon className="w-5" />
                                </Link>
                                <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                    Create a new account
                                </h2>
                            </div>
                        </div>

                        <div className="mt-3">
                            <div>
                                <Form<FieldType>
                                    className="space-y-6"
                                    form={form}
                                    onFinish={handleRegister}
                                    onFinishFailed={(errors) => {
                                        messageApi.error('Please fill all required fields');
                                    }}
                                >
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Username
                                        </label>
                                        <div className="mt-2">
                                            <Form.Item<FieldType>
                                                name="username"
                                                rules={[
                                                    { required: true },
                                                    {
                                                        type: 'string',
                                                        min: 3,
                                                    },
                                                ]}
                                            >
                                                <input
                                                    id="username"
                                                    name="username"
                                                    type="username"
                                                    required
                                                    autoComplete="username"
                                                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Phone
                                        </label>
                                        <div className="mt-2">
                                            <Form.Item<FieldType>
                                                name="phone"
                                                rules={[
                                                    { required: true },
                                                    {
                                                        type: 'string',
                                                        pattern: /^\+\d{2}\d{9,11}$/,
                                                        message:
                                                            'Phone number must start with +CC and have 9-11 digits.',
                                                    },
                                                ]}
                                            >
                                                <input
                                                    id="phone"
                                                    name="phone"
                                                    type="phone"
                                                    required
                                                    autoComplete="phone"
                                                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Email address
                                        </label>
                                        <div className="mt-2">
                                            <Form.Item<FieldType>
                                                name="email"
                                                rules={[{ required: true }, { type: 'email' }]}
                                            >
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    required
                                                    autoComplete="email"
                                                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Password
                                        </label>
                                        <div className="mt-2">
                                            <Form.Item<FieldType> name="password" rules={[{ required: true }]}>
                                                <input
                                                    id="password"
                                                    name="password"
                                                    type="password"
                                                    required
                                                    autoComplete="current-password"
                                                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Confirm Password
                                        </label>
                                        <div className="mt-2">
                                            <Form.Item<FieldType>
                                                name="confirmPassword"
                                                dependencies={['password']}
                                                rules={[
                                                    {
                                                        validator(_, value) {
                                                            if (value !== form.getFieldValue('password')) {
                                                                return Promise.reject('Password does not match');
                                                            }

                                                            return Promise.resolve();
                                                        },
                                                    },
                                                ]}
                                            >
                                                <input
                                                    id="confirm-password"
                                                    name="confirm-password"
                                                    type="password"
                                                    required
                                                    autoComplete="current-confirm-password"
                                                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <button
                                            onClick={form.submit}
                                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Create Account
                                        </button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative hidden w-0 flex-1 lg:block">
                    <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
                        alt=""
                    />
                </div>
            </div>
        </>
    );
}
