import { Border } from '@/app/(homepage)/utils/Border';
import { FadeIn, FadeInStagger } from '@/app/(homepage)/utils/FadeIn';
import clsx from 'clsx';

export function List({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <FadeInStagger>
            <ul role="list" className={clsx('text-base text-neutral-600', className)}>
                {children}
            </ul>
        </FadeInStagger>
    );
}

export function ListItem({ children, title }: { children: React.ReactNode; title?: string }) {
    return (
        <li className="group mt-10 first:mt-0">
            <FadeIn>
                <Border className="pt-10 group-first:pt-0 group-first:before:hidden group-first:after:hidden">
                    {title && <strong className="font-semibold text-primary-600">{`${title}. `}</strong>}
                    {children}
                </Border>
            </FadeIn>
        </li>
    );
}
