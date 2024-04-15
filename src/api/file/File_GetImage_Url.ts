import { config } from '@/config.app';

type Request = {
    path: string;
};

export function File_GetImage_Url(req: Request) {
    return config.BackendURL + `/file/image/${req.path}`;
}
