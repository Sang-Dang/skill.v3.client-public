'use client';

import denisDang from '@/app/(homepage)/images/denis-dang.jpg';
import duUyen from '@/app/(homepage)/images/du-uyen.jpg';
import hhTrung from '@/app/(homepage)/images/hh-trung.jpg';
import davidKaye from '@/app/(homepage)/images/david-kaye.jpg';
import markBain from '@/app/(homepage)/images/mark-bain.jpg';
import ncThanh from '@/app/(homepage)/images/nc-thanh.jpg';
import nttQuan from '@/app/(homepage)/images/ntt-quan.jpg';
import javix from '@/app/(homepage)/images/javix.jpg';
import Image from 'next/image';
import { motion } from 'framer-motion';

const people = [
    {
        name: 'Hoàng Hoa Trung',
        role: 'FORBES 30UNDER30 VIETNAM',
        imageUrl: hhTrung,
        bio: 'Founder of “Nuôi em” and “Sức mạnh 2000”',
    },
    {
        name: 'Denis Đặng',
        role: 'Creative director/actor',
        imageUrl: denisDang,
        bio: 'The manip wizard of creative art',
    },
    {
        name: 'Mark Bain',
        role: 'Graphic Designer',
        imageUrl: markBain,
        bio: "Creative Director of Pizza 4P's",
    },
    {
        name: 'Du Uyên',
        role: 'Singer - a shining star of the Vietnamese music scene',
        imageUrl: duUyen,
        bio: 'With famous songs such as Bánh Mì Không, Khó Vẽ Nụ Cười, Duyên Duyên Số Số, she has won the hearts of young audiences.',
    },
    {
        name: 'Nguyễn Trần Trung Quân',
        role: 'Ballad singer and National Vocal Music Teacher',
        imageUrl: nttQuan,
        bio: 'In 2015, he was the youngest singer in Vietnam to receive a double music award for Album of the Year/Khoi Hanh Album - his first physical album in his career—and Outstanding New Artist of the Year.',
    },
    {
        name: 'DJ Javix - Lê Anh Dũng',
        role: 'Music producer',
        imageUrl: javix,
        bio: 'Javix has made his own mark in various roles, various roles, from music producer, piano player, DJ, composer, and recording artist to music director and producer.',
    },
    {
        name: 'Nguyễn Chí Thành',
        role: 'A promising musical talent',
        imageUrl: ncThanh,
        bio: 'A top student in the Violin major at Hue Academy of Music, both at the junior college and university levels',
    },
    // More people...
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
                    className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-3 lg:mx-0 lg:max-w-none lg:gap-x-8 xl:col-span-2"
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
                        >
                            <Image
                                className="aspect-[1] w-full rounded-2xl object-cover"
                                src={person.imageUrl}
                                alt=""
                            />
                            <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">{person.name}</h3>
                            <p className="text-base leading-7 text-gray-600">{person.role}</p>
                            <p className="mt-4 line-clamp-2 text-ellipsis text-base leading-7 text-gray-600">
                                {person.bio}
                            </p>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
