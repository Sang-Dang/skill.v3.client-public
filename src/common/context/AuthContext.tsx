'use client';

import { instance } from '@/api/default.axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { createContext, ReactNode, useContext, useState } from 'react';
import toast from 'react-hot-toast';

type AuthContextType =
    | {
          login: (token: string) => void;
          logout: () => void;
          isLoggedIn: () => boolean;
      }
    | undefined;

type TokenPayload = {
    id: string;
    username: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
};

const AuthContext = createContext<AuthContextType>(undefined);
export default function Auth({ children }: Readonly<{ children: ReactNode }>) {
    const [memoryToken, setMemoryToken] = useState<string | undefined>(undefined);
    const router = useRouter();

    function login(token: string) {
        setMemoryToken(token);
        Cookies.set('token', token, {
            expires: 1,
            sameSite: 'strict',
        });
        setRequestToken(token);
    }

    function logout() {
        setMemoryToken(undefined);
        Cookies.remove('token');
        setRequestToken();

        router.push('/');
        toast.success('Logged out');
    }

    function isLoggedIn() {
        const checkMemory = getMemoryToken();
        if (checkMemory) return !!checkMemory;

        const checkCookie = getCookieToken();
        if (checkCookie) {
            setMemoryToken(checkCookie.token);
            return true;
        }
        return false;
    }

    function setRequestToken(token?: string) {
        instance.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : undefined;
    }

    function getMemoryToken() {
        return validateToken(memoryToken);
    }

    function getCookieToken() {
        return validateToken(Cookies.get('token'));
    }

    function validateToken(token?: string) {
        if (!token) return null;

        const payload = jwtDecode(token) as TokenPayload;

        if (!payload) {
            return null;
        }

        if (payload.exp && payload.exp * 1000 < new Date().getTime()) {
            return null;
        }

        // TODO check on server if token valid

        return {
            token,
            payload,
        };
    }

    return (
        <AuthContext.Provider
            value={{
                login,
                logout,
                isLoggedIn,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

Auth.useAuth = function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider');
    }

    return context;
};
