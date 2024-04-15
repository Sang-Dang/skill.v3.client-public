import { instance } from '@/api/default.axios';
import { transformRes } from '@/api/utils';
import { AuthModel } from '@/lib/model/auth.model';

type Request = {
    username: string;
    email: string;
    phone: string;
    password: string;
};
type Response = AuthModel;

export async function Auth_Register(req: Request) {
    return instance.post<Response>('/auth/register', req, {
        transformResponse: [(data) => transformRes(data, (res) => AuthModel.fromJSON(res.data))],
    });
}
