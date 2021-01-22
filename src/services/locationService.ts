import { createHashHistory } from 'history';

const history = createHashHistory();

export const getHistory = () => history;

export const deserializePathname = (pathname: string) => {
    const normalizedPathname = (pathname ? (pathname[0] === '/' ? pathname.substr(1) : pathname) : '');
    const deserializedPathname = normalizedPathname.length
        ? normalizedPathname
            .split('&')
            .reduce((acc, kv) => {
                const [key, value] = kv.split('=');
                acc[key] = value;
                return acc;
            }, {} as any)
        : {};
    return deserializedPathname;
}

export const serializePathName = (pathname: any) =>
    Object.keys(pathname)
        .map(key => `${key}=${pathname[key]}`)
        .sort()
        .join('&');