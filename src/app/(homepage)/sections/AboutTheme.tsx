'use client';

import themeImage1 from '@/app/(homepage)/images/home-theme-1.jpg';
import themeImage2 from '@/app/(homepage)/images/home-theme-2.jpg';
import themeImage3 from '@/app/(homepage)/images/home-theme-3.jpg';
import themeImage4 from '@/app/(homepage)/images/home-theme-4.jpg';
import { Button } from '@nextui-org/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { forwardRef, type ForwardedRef } from 'react';

const MotionImage = motion(Image);

const AboutTheme = forwardRef(function Component(_, ref: ForwardedRef<HTMLDivElement>) {
    return (
        <section className="overflow-hidden bg-white" id="about" ref={ref}>
            <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
                    <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our theme</h2>
                        <div className="mt-6 text-xl leading-8 text-gray-600">
                            <div className="inline font-bold text-primary-500">Start Small</div>, understood as “Nhen
                            Nhúm” in Vietnamese, symbolizes{' '}
                            <div className="inline text-primary-300">a gradual, steady growth</div> that ultimately
                            culminates in remarkable triumphs.
                        </div>
                        <p className="mt-6 text-base leading-7 text-gray-600">
                            Perfection is not a must. Let us lay down the first brick, solve the first puzzle, and
                            expect infinite possibilities. Building upon this existing foundation, we will uncover
                            something far more fascinating and significant.
                        </p>
                        <div className="mt-10 flex">
                            <a
                                href="https://beta.ticketbox.vn/tedxfptuniversityhcmc2024-startsmall-89808"
                                target="_blank"
                            >
                                <Button color="primary" className="px-3.5 py-2.5 text-sm font-semibold">
                                    Get your tickets <span aria-hidden="true">&rarr;</span>
                                </Button>
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
                        <div className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
                            <MotionImage
                                src={themeImage2}
                                alt=""
                                className="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                                initial={{ opacity: 0, y: -100 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{
                                    once: true,
                                }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            />
                        </div>
                        <div className="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
                            <div className="order-first flex w-64 flex-none justify-end self-end lg:w-auto">
                                <MotionImage
                                    src={themeImage3}
                                    alt=""
                                    className="aspect-[4/3] w-[24rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                                    initial={{ opacity: 0, y: 100 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{
                                        once: true,
                                    }}
                                    transition={{ duration: 0.5, delay: 0 }}
                                />
                            </div>
                            <div className="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                                <MotionImage
                                    src={themeImage1}
                                    alt=""
                                    className="aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                                    initial={{ opacity: 0, y: 100 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{
                                        once: true,
                                    }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                />
                            </div>
                            <div className="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                                <MotionImage
                                    src={themeImage4}
                                    alt=""
                                    className="aspect-[4/3] w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                                    initial={{ opacity: 0, y: 100 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{
                                        once: true,
                                    }}
                                    transition={{ duration: 0.5, delay: 0.5 }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});

export default AboutTheme;
