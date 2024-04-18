'use client';

import mainBanner from '@/app/(homepage)/images/main-banner.jpg';
import AboutTheme from '@/app/(homepage)/sections/AboutTheme';
import Activities from '@/app/(homepage)/sections/Activitites';
import CallToAction from '@/app/(homepage)/sections/CallToAction';
import HomeHeader from '@/app/(homepage)/sections/HomeHeader';
import PreviousEvents from '@/app/(homepage)/sections/PreviousEvents';
import Speakers from '@/app/(homepage)/sections/Speakers';
import Sponsors from '@/app/(homepage)/sections/Sponsors';
import Testimonial from '@/app/(homepage)/sections/Testimonial';
import Footer from '@/common/components/Footer';
import ParallaxText from '@/common/components/ParallaxText';
import { Button, Link } from '@nextui-org/react';
import Image from 'next/image';
import { useRef } from 'react';

export default function RootPage() {
    const aboutRef = useRef<HTMLDivElement>();

    function handleLearnMore() {
        aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <>
            <HomeHeader />
            <div className="flex flex-col gap-24">
                <section className=" bg-gray-900">
                    <div className="relative isolate overflow-hidden">
                        <Image
                            src={mainBanner}
                            priority
                            alt="Main banner"
                            className="absolute inset-0 -z-10 h-screen w-full scale-125 object-cover blur-md brightness-50"
                        />
                        <div
                            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                            aria-hidden="true"
                        >
                            <div
                                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                                style={{
                                    clipPath:
                                        'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                                }}
                            />
                        </div>
                        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                                <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20">
                                    Announcing the 4th return of our yearly event.{' '}
                                    <Link
                                        onClick={handleLearnMore}
                                        className="cursor-pointer text-xs font-semibold text-white"
                                    >
                                        <span className="absolute inset-0" aria-hidden="true" />
                                        Read more <span aria-hidden="true">&rarr;</span>
                                    </Link>
                                </div>
                            </div>
                            <div className="text-center">
                                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                                    TEDxFPTUniversityHCMC 2024
                                </h1>
                                <p className="mt-6 text-lg leading-8 text-gray-300">
                                    TEDxFPTUniversity HCMC is an annual event organized by the Skills and Languages Club
                                    - Skillcetera under FPT University for the past four years.
                                </p>
                                <div className="mt-10 flex items-center justify-center gap-x-6">
                                    <a
                                        href="https://beta.ticketbox.vn/tedxfptuniversityhcmc2024-startsmall-89808"
                                        target="_blank"
                                    >
                                        <Button
                                            type="button"
                                            color="primary"
                                            className="px-3.5 py-2.5 text-sm font-semibold"
                                        >
                                            Get tickets
                                        </Button>
                                    </a>
                                    <Link
                                        onClick={handleLearnMore}
                                        className="cursor-pointer text-sm font-semibold leading-6 text-white"
                                    >
                                        Learn more <span aria-hidden="true">→</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div
                            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                            aria-hidden="true"
                        >
                            <div
                                className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                                style={{
                                    clipPath:
                                        'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                                }}
                            />
                        </div>
                    </div>
                </section>
                <AboutTheme ref={aboutRef as any} />
                <PreviousEvents />
                {/* <AboutTEDx /> */}
                <CallToAction />
                <Speakers />
                <div>
                    <ParallaxText baseVelocity={-5}>TEDx FPT University HCMC</ParallaxText>
                    <ParallaxText baseVelocity={5}>Consistency is Flexibility </ParallaxText>
                </div>
                <Activities />
                <Testimonial />
                <Sponsors />
            </div>
            <Footer className="mt-32" />
        </>
    );
}
