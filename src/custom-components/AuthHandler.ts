import { domain } from '@/api';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { auth } from '@/app/ticket/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export class AuthHandler {
    static async register(req: { username: string; phone: string; email: string; password: string }) {
        try {
            return await fetch(`${domain}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req),
            }).then((res) => res.json());
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async login(token: string) {
        Cookies.set('token', token, {
            expires: 1,
            sameSite: 'strict',
        });
    }

    static async logout() {
        Cookies.remove('token');
    }

    static async loginBasic(req: { email: string; password: string }) {
        try {
            const token = await fetch(`${domain}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req),
            }).then((res) => res.json());

            if (token.statusCode === 400) {
                return false;
            }

            await AuthHandler.login(token.data);

            return this.isLoggedIn();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async loginGoogle() {
        try {
            const provider = new GoogleAuthProvider().setCustomParameters({
                prompt: 'select_account',
            });
            const response = await signInWithPopup(auth, provider);
            const fbToken = await response.user.getIdToken();

            const token = await fetch(`${domain}/auth/login-firebase`, {
                method: 'POST',
                headers: {
                    Authorization: `${fbToken}`,
                },
            }).then((res) => res.json());

            if (token.statusCode === 200) {
                await AuthHandler.login(token.data);
                return this.isLoggedIn();
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static isLoggedIn() {
        const token = Cookies.get('token');

        if (!token) return false;

        const payload = jwtDecode(token);

        if (payload.exp && payload.exp * 1000 < new Date().getTime()) {
            AuthHandler.logout();
            return false;
        }

        return true;
    }

    static getPrincipal(): Principal | null {
        const token = Cookies.get('token');

        if (!token) return null;

        const payload = jwtDecode(token);

        if (payload.exp && payload.exp * 1000 < Date.now()) {
            AuthHandler.logout();
            return null;
        }

        return payload as Principal;
    }
}

type Principal = {
    id: string;
    username: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
};
