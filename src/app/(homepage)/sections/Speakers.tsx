'use client';

import HieuNM from '@/app/(homepage)/images/HieuNM.jpg';
import Teresa from '@/app/(homepage)/images/teresa.jpg';
import TrinhDN from '@/app/(homepage)/images/trinhDN.jpg';
import OanhH from '@/app/(homepage)/images/oanhH.jpg';
import LongDM from '@/app/(homepage)/images/longDM.jpg';
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
    {
        name: 'Teresa X. Nguyen',
        role: 'Vietnamese Female Professor',
        imageUrl: Teresa,
        bio: 'Meet Teresa X. Nguyen, the Department Chair and Professor of ESL, ELL, and GED programs at Golden West College in southern California. Teresa is also deepening her expertise through doctoral studies at the University of Southern California, focusing her research on the underrepresentation of Asian American leaders in higher education. In addition to her academic pursuits, she enriches the global community as an English Language Specialist for the U.S. Department of State and as a published author. Teresa also engages a wide audience through her bilingual YouTube channel, which has over 20,000 subscribers.',
        href: 'https://www.facebook.com/photo?fbid=1234170198344284&set=a.682533043508005',
    },
    {
        name: 'Dương Ngọc Trinh',
        role: 'Journalist, TV Program Host',
        imageUrl: TrinhDN,
        bio: 'Ms. Duong Ngoc Trinh is an MC, Journalist and Production Organization at Vietnam Television (VTV), with over 17 years of experience hosting popular programs such as "Chuyển động 24h," "Tài chính kinh doanh," "Moneytalk," and more. In 2016, she won the "Impressive Host" award at the VTV Awards and was recently honored as the "TV Host - Editor of the Year 2023" by Her World magazine. Not only does she host news programs, but she also participates in planning strategies and production work, earning the affection of many television viewers for her modern beauty and intelligent and engaging hosting style.',
        href: 'https://www.facebook.com/photo?fbid=1233482095079761&set=a.682533043508005',
    },
    {
        name: 'Hoàng Oanh',
        role: 'MC, Actress',
        imageUrl: OanhH,
        bio: 'With a sweet and captivating voice, Hoang Oanh is a familiar name on the Vietnamese stage, serving as an MC for numerous prime-time shows. Resilience and confidence are what people see in her, a strong woman who rises from setbacks to take care of her family. Even today, her heart burns passionately for the arts and for those who always support her.',
        href: 'https://www.facebook.com/photo?fbid=1232825848478719&set=a.682533043508005',
    },
    {
        name: 'Dương Minh Long',
        role: 'Photographer',
        imageUrl: LongDM,
        bio: 'Photographer Duong Minh Long is known as the only Vietnamese photojournalist covering photo stories of coups and historical events in Russia for over a decade. In Vietnam, he served as the head of the photography department at Lao Dong Newspaper in Ho Chi Minh City, contributing unique and sharp-angle photo stories and becoming a prominent face in Vietnamese journalism in the 1990s.',
        href: 'https://www.facebook.com/photo?fbid=1231395011955136&set=a.682533043508005',
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
                                className="aspect-[1] w-full rounded-2xl object-cover object-top shadow-sm"
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
                                    onClick={() => window.open(person.href, '_blank')}
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
