'use client';

import { Auth_LoginFirebase } from '@/api/auth/Auth_LoginFirebase';
import Modal from '@/common/components/Modal';
import Auth from '@/common/context/AuthContext';
import { auth } from '@/firebase';
import { Button, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { ReactNode } from 'react';
import toast from 'react-hot-toast';

export default function LoginModal({ children }: { children: (onOpen: () => void) => ReactNode }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const authHandler = Auth.useAuth();

    const login = useMutation({
        mutationFn: Auth_LoginFirebase,
        onMutate: () => {
            toast.loading('Logging in...', {
                id: 'login',
            });
        },
        onSuccess: () => {
            toast.success('Logged in', {});
        },
        onError: () => {
            toast.error('Failed to login', {});
            authHandler.logout();
        },
        onSettled: () => {
            toast.dismiss('login');
        },
    });

    async function showLoginGoogle() {
        try {
            const provider = new GoogleAuthProvider().setCustomParameters({
                prompt: 'select_account',
            });
            const ggResponse = await signInWithPopup(auth, provider);
            const fbToken = await ggResponse.user.getIdToken();
            login.mutate(
                { firebase: fbToken },
                {
                    onSuccess: (response) => {
                        onOpenChange();
                        authHandler.login(response.data);
                    },
                },
            );
        } catch (error) {
            devLog(error);
            toast.error('Failed to login');
        }
    }

    return (
        <>
            {children(onOpen)}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader>Login to your account</ModalHeader>
                            <ModalBody>
                                <Button onClick={showLoginGoogle}>Continue with Google</Button>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
