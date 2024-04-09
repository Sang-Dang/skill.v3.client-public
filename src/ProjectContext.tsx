'use client';

import { domain } from '@/api';
import dayjs from 'dayjs';
import { createContext, ReactNode, useEffect } from 'react';

type ProjectContextType = {
    projectId: string;
};

export const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export default function ProjectContextWrapper({ children }: Readonly<{ children: ReactNode }>) {
    useEffect(() => {
        fetch(`${domain}/ticket-user`, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {
                const list = data.data.filter(
                    (item: any) => dayjs(item.startDate).isAfter(dayjs()) && dayjs(item.endDate).isBefore(dayjs()),
                );
            });
    });

    return <ProjectContext.Provider value={{ projectId: '123' }}>{children}</ProjectContext.Provider>;
}
