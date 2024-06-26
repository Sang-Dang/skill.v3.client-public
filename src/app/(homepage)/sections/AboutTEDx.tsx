'use client';

import Image from 'next/image';
import aboutTedx1 from '@/app/(homepage)/images/about-tedx-1.jpg';
import { motion } from 'framer-motion';

const MotionImage = motion(Image);

export default function AboutTEDx() {
    return (
        <section className="bg-white">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                    <p className="text-base font-semibold leading-7 text-primary-600">Deploy faster</p>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">About TEDx</h1>
                    <div className="mt-10 grid max-w-xl grid-cols-1 gap-8 text-base leading-7 text-gray-700 lg:max-w-none lg:grid-cols-2">
                        <div>
                            <p>
                                Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris
                                semper sed amet vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus
                                viverra tellus varius sit neque erat velit. Faucibus commodo massa rhoncus, volutpat.
                                Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis id.
                            </p>
                            <p className="mt-8">
                                Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id et. Id blandit
                                molestie auctor fermentum dignissim. Lacus diam tincidunt ac cursus in vel. Mauris
                                varius vulputate et ultrices hac adipiscing egestas.
                            </p>
                        </div>
                        <div>
                            <p>
                                Erat pellentesque dictumst ligula porttitor risus eget et eget. Ultricies tellus felis
                                id dignissim eget. Est augue maecenas risus nulla ultrices congue nunc tortor.
                            </p>
                            <p className="mt-8">
                                Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id et. Id blandit
                                molestie auctor fermentum dignissim. Lacus diam tincidunt ac cursus in vel. Mauris
                                varius vulputate et ultrices hac adipiscing egestas. Iaculis convallis ac tempor et ut.
                                Ac lorem vel integer orci.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative overflow-hidden pt-16 lg:pt-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <MotionImage
                        className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-gray-900/10"
                        src={aboutTedx1}
                        alt=""
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        viewport={{
                            once: true,
                        }}
                    />
                    <div className="relative" aria-hidden="true">
                        <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-white pt-[7%]" />
                    </div>
                </div>
            </div>
        </section>
    );
}
