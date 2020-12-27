import React from 'react';

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