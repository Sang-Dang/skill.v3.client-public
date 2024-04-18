import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid';
import banner from '@/app/(homepage)/images/banner.png';
import Image from 'next/image';

export default function Theme() {
    return (
        <div className="relative isolate overflow-hidden bg-white px-6 pt-24 lg:overflow-visible lg:px-0">
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <svg
                    className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
                    aria-hidden="true"
                >
                    <defs>
                        <pattern
                            id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                            width={200}
                            height={200}
                            x="50%"
                            y={-1}
                            patternUnits="userSpaceOnUse"
                        >
                            <path d="M100 200V.5M.5 .5H200" fill="none" />
                        </pattern>
                    </defs>
                    <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
                        <path
                            d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                            strokeWidth={0}
                        />
                    </svg>
                    <rect
                        width="100%"
                        height="100%"
                        strokeWidth={0}
                        fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
                    />
                </svg>
            </div>
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="lg:pr-4">
                        <div className="lg:max-w-lg">
                            <p className="text-base font-semibold leading-7 text-primary-600">About our Theme</p>
                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                                Start Small
                            </h1>
                            <p className="mt-6 text-xl leading-8 text-gray-700">
                                a philosophy seemingly simple but laden with values.
                            </p>
                            <div className="mt-8 max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                                <p>
                                    &quot;Start Small&quot; carries the meaning that it is not necessary to do
                                    everything at once because small actions, though small, contribute to helping us get
                                    closer to our big goals or in other words, &quot;All big things have small
                                    beginnings&quot; (Joe M. Easterling). Because the distance between the current
                                    situation and the destination is infinite, start with the first brick, the first
                                    puzzle piece, to pave the way for the next step, and then the next steps, and who
                                    knows what meaningful and significant things we will discover.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                    <Image
                        className="w-[24rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[48rem]"
                        src={banner}
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
}
