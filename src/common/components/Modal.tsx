import React, { ReactNode } from 'react';
import { ModalProps, Modal as NextModal } from '@nextui-org/react';

export default function Modal({ children, ...props }: { children: ReactNode } & ModalProps) {
    return (
        <NextModal
            classNames={{
                body: 'py-6',
                base: 'border-gray-200 bg-primary-foreground',
                header: 'border-b-[1px] border-gray-200',
                footer: 'border-t-[1px] border-gray-200',
            }}
            {...props}
        >
            {children}
        </NextModal>
    );
}
