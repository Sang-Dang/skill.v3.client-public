import type { StaticImageData } from 'next/image';

export type PostType = {
    id: number;
    title: string;
    href: string;
    description: string;
    imageUrl: string | StaticImageData;
    date: string;
    datetime: string;
    author: {
        name: string;
        imageUrl: string | StaticImageData;
    };
};
