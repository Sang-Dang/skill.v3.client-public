'use client';

import s3Banner from '@/app/(homepage)/images/previous/s3-banner.jpg';
import s2Banner from '@/app/(homepage)/images/previous/s2-banner.jpg';
import s1Banner from '@/app/(homepage)/images/previous/s1-banner.jpg';
import sLogo from '@/app/(homepage)/images/s-logo.jpg';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { PostType } from '@/app/(homepage)/utils/PostType';
import EventCard from '@/app/(homepage)/components/EventCard';

const posts: PostType[] = [
    {
        id: 1,
        title: 'Season 1: Extraordinary Steps',
        href: '#',
        description:
            "Extraordinary steps are always a key element in each individual's journey of personal development. They foster growth, resilience, and readiness to confront future challenges with greater strength",
        imageUrl: s1Banner,
        date: 'Oct 13, 2020',
        datetime: '2020-10-13',
        author: {
            name: 'Skillcetera',
            imageUrl: sLogo,
        },
    },
    {
        id: 2,
        title: 'Season 2: Value Transition',
        href: '#',
        description:
            'Inspired by the image of “Chim Lạc” throughout - the transition, inheritance, and enhancement of the value of the predecessors are not only a challenge but also an opportunity for students to grasp, preserve, promote, and spread across the world.',
        imageUrl: s2Banner,
        date: 'Feb 02, 2022',
        datetime: '2022-20-02',
        author: {
            name: 'Skillcetera',
            imageUrl: sLogo,
        },
    },
    {
        id: 3,
        title: 'Season 3: With or Without?',
        href: '#',
        description:
            'Drawing from the Japanese concept of "Ma", which represents “gap” and “pause”. Similarly in life, we must discern when to pause, let go, keep, or eliminate for balance.',
        imageUrl: s3Banner,
        date: 'Apr 16, 2023',
        datetime: '2023-04-16',
        author: {
            name: 'Skillcetera',
            imageUrl: sLogo,
        },
    },
];

export default function PreviousEvents() {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Previous Events</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        Welcome to <strong className="text-primary-500">TEDxFPTUniversityHCMC</strong>, where we embark
                        on a journey of discovery, reflection, and growth. Across our past seasons, we&apos;ve explored
                        the essence of personal development through the lens of extraordinary steps, the rich tapestry
                        of cultural heritage symbolized by &apos;Chim Lạc,&apos; and the delicate balance of life&apos;s
                        pauses inspired by the Japanese concept of &apos;Ma.&apos;
                    </p>
                </div>
                <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {posts.map((post, index) => (
                        <EventCard key={post.id} post={post} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}
