'use client';

import HieuNM from '@/app/(homepage)/images/HieuNM.jpg';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@nextui-org/react';

const people = [
    {
        name: 'Ngô Minh Hiếu',
        role: 'Cyber Security Expert',
        imageUrl: HieuNM,
        bio: 'Mr. Ngo Minh Hieu, also known as Hieu PC, is an expert in the field of information security and safety. He currently works at the National Cyber Security Surveillance Center (NSCS) and operates the ChongLuaDao project, which was founded at the end of 2020. This project has been successful in raising awareness and preventing over-the-air fraud in Vietnamese cyberspace. Due to his significant contributions, he is also known by the nickname "White Hat Hacker".',
        href: 'https://www.facebook.com/photo?fbid=1228206118940692&set=a.682533043508005',
    },
];

export default function Speakers() {
    return (
        <div className="bg-white">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Our Speakers and Performers
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Throughout all three previous seasons, we&apos;ve featured various speakers and performers who
                        have graciously shared their stories and experiences with us.
                    </p>
                </div>
                <ul
                    role="list"
                    className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-8 xl:col-span-2"
                >
                    {people.map((person, index) => (
                        <motion.li
                            key={person.name + 'KEYYYY'}
                            initial={{
                                opacity: 0,
                                x: 20,
                            }}
                            whileInView={{
                                opacity: 1,
                                x: 0,
                            }}
                            viewport={{
                                once: true,
                            }}
                            transition={{
                                delay: index * 0.2,
                                duration: 0.5,
                                ease: 'easeOut',
                            }}
                            className="rounded-2xl bg-white shadow-md transition-all hover:shadow-xl"
                        >
                            <Image
                                className="aspect-[1] w-full rounded-2xl object-cover shadow-sm"
                                src={person.imageUrl}
                                alt=""
                            />
                            <div className="p-5 pt-0">
                                <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">{person.name}</h3>
                                <p className="text-base leading-7 text-gray-600">{person.role}</p>
                                <p className="mt-4 line-clamp-2 text-ellipsis text-base leading-7 text-gray-600">
                                    {person.bio}
                                </p>
                                <Button
                                    className="mt-6"
                                    size="sm"
                                    color="primary"
                                    onClick={() => (window.location.href = person.href)}
                                >
                                    View more
                                </Button>
                            </div>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
