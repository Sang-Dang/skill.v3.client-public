import React from 'react'

type Props = {}

export default function Intro({ }: Props) {
    return (
        <div className="relative overflow-hidden bg-white" id='intro'>
            <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
                <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                    <div className="sm:max-w-lg">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                            TEDxFPTUniversityHCMC
                        </h1>
                        <p className="mt-4 text-l text-gray-500">
                            TEDxFPTUniversityHCMC is a program authorized by the global non-profit organization TED,
                            and this project is managed by Skillcetera - English and Skills Club at FPT University Ho Chi Minh City.
                        </p>
                        <p className="mt-4 text-l text-gray-500">
                            TEDxFPTUniversityHCMC is a program authorized by the global non-profit organization TED,
                            and this project is managed by Skillcetera - English and Skills Club at FPT University Ho Chi Minh City.
                        </p>
                        <p className="mt-4 text-l text-gray-500">
                            TEDxFPTUniversityHCMC is a program authorized by the global non-profit organization TED,
                            and this project is managed by Skillcetera - English and Skills Club at FPT University Ho Chi Minh City.
                        </p>
                        <p className="mt-4 text-l text-gray-500">
                            TEDxFPTUniversityHCMC is a program authorized by the global non-profit organization TED,
                            and this project is managed by Skillcetera - English and Skills Club at FPT University Ho Chi Minh City.
                        </p>
                        <p className="mt-4 text-l text-gray-500">
                            TEDxFPTUniversityHCMC is a program authorized by the global non-profit organization TED,
                            and this project is managed by Skillcetera - English and Skills Club at FPT University Ho Chi Minh City.
                        </p>
                    </div>
                    <div>
                        <div className="mt-10">
                            {/* Decorative image grid */}
                            <div
                                aria-hidden="true"
                                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                            >
                                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                                    <div className="flex items-center space-x-6 lg:space-x-8">
                                        <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                            <div className="h-60 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                                                <img
                                                    src="./image/event/chitien.jpeg"
                                                    alt=""
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </div>
                                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                <img
                                                    src="./image/event/hoangnamtien.jpeg"
                                                    alt=""
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                <img
                                                    src="./image/event/robinhoot.jpeg"
                                                    alt=""
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </div>
                                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                <img
                                                    src="./image/event/kathy.jpeg"
                                                    alt=""
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </div>
                                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                <img
                                                    src="./image/event/robinhoot.jpeg"
                                                    alt=""
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                <img
                                                    src="./image/event/david.jpeg"
                                                    alt=""
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </div>
                                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                <img
                                                    src="./image/event/hoatrung.jpeg"
                                                    alt=""
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <a
                                href="#"
                                className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
                            >
                                Buy Ticket
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}