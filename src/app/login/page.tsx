'use client';

import logo from '/public/logo.svg';
import { AuthHandler } from '@/custom-components/AuthHandler';
import { Form, App } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type FieldType = {
    email: string;
    password: string;
};

/* eslint-disable @next/next/no-img-element */
export default function LoginForm() {
    const search = useSearchParams();
    const [form] = Form.useForm<FieldType>();
    const { message } = App.useApp();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleLoginBasic(values: FieldType) {
        setLoading(true);
        try {
            const response = await AuthHandler.loginBasic(values);
            if (response) {
                message.success('Login success');
                router.push(search.get('redirect') || '/');
            } else {
                throw new Error();
            }
        } catch (error) {
            console.error(error);
            message.error('Login failed');
        } finally {
            setLoading(false);
        }
    }

    async function handleLoginGoogle() {
        setLoading(true);
        try {
            const response = await AuthHandler.loginGoogle();
            if (response) {
                message.success('Login success');
                router.push(search.get('redirect') || '/');
            } else {
                throw new Error();
            }
        } catch (error) {
            console.error(error);
            message.error('Login failed');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (search.get('logout')) {
            message.success('Logout success');
            AuthHandler.logout();
        }
    }, [message, search]);

    useEffect(() => {
        if (loading) {
            message.loading({
                key: 'loading',
                content: 'Loading...',
            });
        } else {
            message.destroy('loading');
        }
    }, [loading, message]);

    return (
        <>
            <div className="flex min-h-full flex-1">
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
                            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Sign in to your account
                            </h2>
                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                Not a member?{' '}
                                <Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Register a new account
                                </Link>
                            </p>
                        </div>

                        <div className="mt-10">
                            <div>
                                <Form<FieldType>
                                    className="space-y-6"
                                    form={form}
                                    onFinish={async (values) => await handleLoginBasic(values)}
                                    onFinishFailed={(errors) => {
                                        message.error('Please fill all required fields');
                                    }}
                                >
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Email address
                                        </label>
                                        <div className="mt-2">
                                            <Form.Item<FieldType> noStyle name="email" rules={[{ required: true }]}>
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    required
                                                    disabled={loading}
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
                                            <Form.Item<FieldType> noStyle name="password" rules={[{ required: true }]}>
                                                <input
                                                    id="password"
                                                    name="password"
                                                    type="password"
                                                    disabled={loading}
                                                    required
                                                    autoComplete="current-password"
                                                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>

                                    {/* <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <input
                                                id="remember-me"
                                                name="remember-me"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                            <label
                                                htmlFor="remember-me"
                                                className="ml-3 block text-sm leading-6 text-gray-700"
                                            >
                                                Remember me
                                            </label>
                                        </div>

                                        <div className="text-sm leading-6">
                                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                                Forgot password?
                                            </a>
                                        </div>
                                    </div> */}

                                    <div className="mt-6">
                                        <button
                                            onClick={form.submit}
                                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
                                            disabled={loading}
                                        >
                                            Sign in
                                        </button>
                                    </div>
                                </Form>
                            </div>

                            <div className="mt-10">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                        <div className="w-full border-t border-gray-200" />
                                    </div>
                                    <div className="relative flex justify-center text-sm font-medium leading-6">
                                        <span className="bg-white px-6 text-gray-900">Or continue with</span>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-1 gap-4">
                                    <button
                                        disabled={loading}
                                        onClick={handleLoginGoogle}
                                        className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                                            <path
                                                d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                                                fill="#EA4335"
                                            />
                                            <path
                                                d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                                                fill="#4285F4"
                                            />
                                            <path
                                                d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                                                fill="#FBBC05"
                                            />
                                            <path
                                                d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                                                fill="#34A853"
                                            />
                                        </svg>
                                        <span className="text-sm font-semibold leading-6">Google</span>
                                    </button>
                                </div>
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
