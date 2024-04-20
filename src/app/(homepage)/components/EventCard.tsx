import type { PostType } from '@/app/(homepage)/utils/PostType';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

export default function EventCard({ post, index = 0 }: { post: PostType; index?: number }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.article
            key={post.id}
            className="group relative isolate flex h-[500px] flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
            initial={{ opacity: 0, y: 20 }}
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
            viewport={{
                once: true,
            }}
            whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                    delay: index * 0.2,
                },
            }}
            whileHover={{
                scale: 1.05,
                transition: {
                    delay: 0,
                },
            }}
        >
            <Image
                src={post.imageUrl}
                alt={post.title + ' banner'}
                className="absolute inset-0 -z-10 h-full w-full object-cover"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
            <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

            <AnimatePresence>
                {!isHovered && (
                    <motion.div
                        initial={{
                            x: 0,
                            opacity: 1,
                        }}
                        exit={{
                            x: 50,
                            opacity: 0,
                        }}
                    >
                        <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                            <time dateTime={post.datetime} className="mr-8">
                                {post.date}
                            </time>
                            <div className="-ml-4 flex items-center gap-x-4">
                                <svg viewBox="0 0 2 2" className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
                                    <circle cx={1} cy={1} r={1} />
                                </svg>
                                <div className="flex gap-x-2.5">
                                    <Image
                                        src={post.author.imageUrl}
                                        alt=""
                                        className="h-6 w-6 flex-none rounded-full bg-white/10"
                                    />
                                    {post.author.name}
                                </div>
                            </div>
                        </div>
                        <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                            <a target="_blank" href={post.href}>
                                <span className="absolute inset-0" />
                                {post.title}
                            </a>
                        </h3>
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {isHovered && (
                    <motion.a
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            y: 20,
                        }}
                        className="absolute left-0 top-0 flex h-full w-full cursor-pointer flex-col bg-black/70 p-8 text-white"
                        href={post.href}
                        target="_blank"
                    >
                        <div className="flex-grow">{post.description}</div>
                        <motion.div
                            initial={{
                                x: -50,
                                opacity: 0,
                            }}
                            animate={{
                                x: 0,
                                opacity: 1,
                            }}
                            transition={{
                                delay: 0.2,
                            }}
                            exit={{
                                x: 100,
                                opacity: 0,
                            }}
                        >
                            <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                                <time dateTime={post.datetime} className="mr-8">
                                    {post.date}
                                </time>
                                <div className="-ml-4 flex items-center gap-x-4">
                                    <svg viewBox="0 0 2 2" className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
                                        <circle cx={1} cy={1} r={1} />
                                    </svg>
                                    <div className="flex gap-x-2.5">
                                        <Image
                                            src={post.author.imageUrl}
                                            alt=""
                                            className="h-6 w-6 flex-none rounded-full bg-white/10"
                                        />
                                        {post.author.name}
                                    </div>
                                </div>
                            </div>
                            <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                                <a target="_blank" href={post.href}>
                                    <span className="absolute inset-0" />
                                    {post.title}
                                </a>
                            </h3>
                        </motion.div>
                    </motion.a>
                )}
            </AnimatePresence>
        </motion.article>
    );
}
