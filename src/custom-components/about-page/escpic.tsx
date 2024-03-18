'use client'
import { Variants, motion } from "framer-motion";
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'


type Props = {}

const features = [
    {
        name: 'Push to deploy.',
        description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
        icon: CloudArrowUpIcon,
    },
    {
        name: 'SSL certificates.',
        description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
        icon: LockClosedIcon,
    },
    {
        name: 'Database backups.',
        description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
        icon: ServerIcon,
    },
]

const cardVariants: Variants = {
    offscreen: {
        opacity: 0,
        fontSize: '0rem',
        x: -400,
    },
    onscreen: {
        opacity: 1,
        x: -340,
        transition: {
            type: 'spring',
            stiffness: 200,
            damping: 80,
        },
    },
};

const detailVariants: Variants = {
    offscreen: {
        opacity: 0,
        x: 200,
    },
    onscreen: {
        opacity: 1,
        x: 50,
        transition: {
            type: 'spring',
            stiffness: 200,
            damping: 80,
        },
    },
};

export default function ESCPic({ }: Props) {
    return (
        <>
            <div className="hidden lg:block overflow-hidden bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <motion.div
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.9 }}
                        >
                            <motion.div variants={cardVariants}>
                                <img
                                    src="/image/about/about3.jpeg"
                                    alt="Product screenshot"
                                    className="w-[4rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                                    width={2432}
                                    height={1442}
                                />
                            </motion.div>
                        </motion.div>
                        <motion.div
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.9 }}
                        >
                            <motion.div variants={detailVariants}>
                                <div className="lg:pr-8 lg:pt-4">
                                    <div className="lg:max-w-lg">
                                        <h2 className="text-base font-semibold leading-7 text-indigo-600">Deploy faster</h2>
                                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">A better workflow</p>
                                        <p className="mt-6 text-lg leading-8 text-gray-600">
                                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque,
                                            iste dolor cupiditate blanditiis ratione.
                                        </p>
                                        <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                                            {features.map((feature) => (
                                                <div key={feature.name} className="relative pl-9">
                                                    <dt className="inline font-semibold text-gray-900">
                                                        <feature.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                                                        {feature.name}
                                                    </dt>{' '}
                                                    <dd className="inline">{feature.description}</dd>
                                                </div>
                                            ))}
                                        </dl>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
            <div className="lg:hidden overflow-hidden bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div className="lg:pr-8 lg:pt-4">
                            <div className="lg:max-w-lg">
                                <h2 className="text-base font-semibold leading-7 text-indigo-600">Deploy faster</h2>
                                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">A better workflow</p>
                                <p className="mt-6 text-lg leading-8 text-gray-600">
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque,
                                    iste dolor cupiditate blanditiis ratione.
                                </p>
                                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                                    {features.map((feature) => (
                                        <div key={feature.name} className="relative pl-9">
                                            <dt className="inline font-semibold text-gray-900">
                                                <feature.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                                                {feature.name}
                                            </dt>{' '}
                                            <dd className="inline">{feature.description}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </div>
                        <img
                            src="/image/about/about3.jpeg"
                            alt="Product screenshot"
                            className="w-[48rem] max-w-none rounded-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                            width={2432}
                            height={1442}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}