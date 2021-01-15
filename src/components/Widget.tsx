import React from 'react';
import ReactDOM from 'react-dom';

interface IWidgetProps {
    children: React.ReactNode;
    container?: Element | null;
  }

const Widget = ({ children, container }: IWidgetProps) => {

    return (
        <>
            { container && ReactDOM.createPortal(children, container) }    
            { !container && children}
        </>
)};

export default Widget;