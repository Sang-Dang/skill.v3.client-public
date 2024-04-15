import { config } from '@/config.app';

export default function withUrl(url: string) {
    if (url.startsWith('/')) {
        return config.BackendURL + url;
    }

    return config.BackendURL + '/' + url;
}
