
import React from 'react';
import { Router } from 'react-router-dom';
import { History } from 'history'

export interface ICustomRouterProps {
    children: React.ReactNode;
    history: History;
}
        
export const CustomRouter = ({ history, ...props }: ICustomRouterProps) => {
    const [state, setState] = React.useState({
        action: history.action,
        location: history.location
    });
    
    React.useLayoutEffect(() => history.listen((location, action) => setState({ location, action })), [history]);
    
    return (
        <Router {...props} history={history} />
    );
};

export default CustomRouter;