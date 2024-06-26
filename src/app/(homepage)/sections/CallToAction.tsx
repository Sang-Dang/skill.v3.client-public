'use client';

import { motion } from 'framer-motion';
import React from 'react';

export default function CallToAction() {
    return (
        <section className="relative isolate overflow-hidden bg-gray-900">
            <motion.div
                className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8"
                initial={{
                    transform: 'scale(1.3)',
                }}
                whileInView={{
                    transform: 'scale(1)',
                    transition: {
                        duration: 0.5,
                        ease: 'easeOut',
                    },
                }}
                viewport={{
                    once: true,
                }}
            >
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Get your own tickets
                        <br />
                        to TEDxFPTUniversityHCMC 2024
                    </h2>
                    <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
                        Don&apos;t miss out on the opportunity to join us at TEDxFPTUniversityHCMC 2024. Get your
                        tickets now
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a
                            href="https://beta.ticketbox.vn/tedxfptuniversityhcmc2024-startsmall-89808"
                            className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            target="_blank"
                        >
                            Buy tickets
                        </a>
                        <a
                            href="https://beta.ticketbox.vn/tedxfptuniversityhcmc2024-startsmall-89808#:~:text=Book%20now-,About,-TEDxFPTUniversityHCMC"
                            className="text-sm font-semibold leading-6 text-white"
                            target="_blank"
                        >
                            Learn more <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
            </motion.div>
            <svg
                viewBox="0 0 1024 1024"
                className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
                aria-hidden="true"
            >
                <circle cx={512} cy={512} r={512} fill="url(#8d958450-c69f-4251-94bc-4e091a323369)" fillOpacity="0.7" />
                <defs>
                    <radialGradient id="8d958450-c69f-4251-94bc-4e091a323369">
                        <stop stopColor="#7775D6" />
                        <stop offset={1} stopColor="#E935C1" />
                    </radialGradient>
                </defs>
            </svg>
        </section>
    );
}
