'use client';

import Headers from '@/common/components/Header';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useRef, useState } from 'react';

export default function AboutHeader() {
    const [isHeaderVisible, setIsHeaderVisible] = useState(false);
    const { scrollY } = useScroll();
    const headerRef = useRef<HTMLDivElement>(null);

    useMotionValueEvent(scrollY, 'change', (y) => {
        const header = headerRef.current;

        if (!header) return;

        if (y > header.offsetHeight) {
            setIsHeaderVisible(true);
        } else {
            setIsHeaderVisible(false);
        }
    });

    return <Headers ref={headerRef} headerBackground={isHeaderVisible ? 'light' : 'transparent'} textColor="dark" />;
}
