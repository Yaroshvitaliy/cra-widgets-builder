import React from 'react';
import ReactDOM from 'react-dom';

interface IWidgetProps {
    children: React.ReactNode;
    containerId?: string;
  }

const Widget = ({ children, containerId }: IWidgetProps) => {
    const containerElement = containerId && document.getElementById(containerId);
    return (
        <>
            { containerElement && ReactDOM.createPortal(children, containerElement) }    
            { !containerElement && children}
        </>
)};

export default Widget;