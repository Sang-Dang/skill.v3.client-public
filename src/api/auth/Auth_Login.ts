import { instance } from '@/api/default.axios';
import { transformRes } from '@/api/utils';

type Request = {
    email: string;
    password: string;
};
type Response = string; // the jwt token

export async function Auth_Login(req: Request) {
    return instance.post<Response>('/auth/login', req, {
        transformResponse: [(data) => transformRes(data)],
    });
}
