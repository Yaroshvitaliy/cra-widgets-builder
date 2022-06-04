import React from 'react';
import { createHashHistory } from 'history';

const createKey = () => Math.random().toString(36).substr(2, 5);

const createChild = (type: () => JSX.Element) => React.createElement(type);

const createChildWithKey = (type: () => JSX.Element) => React.createElement(type, { key: createKey() });

export const createChildren = (content: (() => JSX.Element) | (Array<() => JSX.Element>)) => {
    let children: React.ReactNode;
    
    if (Array.isArray(content)) {
        children = (content as Array<() => JSX.Element>).map(createChildWithKey)
    } else {
        children = createChild(content as () => JSX.Element);
    }

    return children;
};

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
};

export const serializePathname = (pathname: any) =>
    Object.keys(pathname)
        .map(key => `${key}=${pathname[key]}`)
        .sort()
        .join('&');