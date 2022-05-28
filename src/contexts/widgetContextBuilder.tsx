// Generated by cra-context-generator@1.0.0 on Sat, 28 May 2022 08:30:27 GMT.
// Do not edit this file manually unless you disabled its code generation.
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, useHistory } from 'react-router-dom';
import { History, Location } from 'history';
import { WidgetContextProvider, IWidgetState, WidgetState, DefaultWidgetState } from './widgetContext';
import { createChildren, getHistory, deserializePathname, serializePathname } from './contextBuilderUtils';
import Widget from '../components/Widget';

/**
 * The Widget context interface.
 */
export interface IWidgetContext {
    /**
     * The component to be rendered.
     */
    Component: () => JSX.Element;

    /**
     * Renderes the component.
     *
     * @param {Element | DocumentFragment | null} container The container. Optional parameter.
     */
    render: (container: Element | DocumentFragment | null) => void;

    /**
     * Gets the theme.
     */
    getTheme: () => string;

    /**
     * Sets the theme.
     */
    setTheme: (theme: string) => void;
}

interface IComponentProps {
    children: React.ReactNode;
    widgetState: IWidgetState;
    theme?: string;
    themeUrlParam?: string;
    themeSetEventHandler?: (theme: string) => void;
    container?: Element | null;
}

/**
 * The Widget context builder.
 * Helps to build the Widget context and manage its state.
 */
export class WidgetContextBuilder {
    private props: IComponentProps = {
        children: undefined,
        widgetState: DefaultWidgetState,
        theme: undefined,
        themeSetEventHandler: undefined,
        themeUrlParam: undefined,
        container: undefined,
    };

    /**
     * Builds the Widget Context.
     *
     * @returns {IWidgetContext} The Widget Context Interface.
     */
    build() {
        const {
            theme: initialTheme,
            themeUrlParam,
        } = this.props;

        const syncStateWithLocation = (widgetState: IWidgetState, location: Location<any>) => {
            const {
                setThemeState,
            } = widgetState;
            const pathname = deserializePathname(location.pathname);
            const theme = themeUrlParam && pathname[themeUrlParam] && decodeURIComponent(pathname[themeUrlParam]);
            theme && setThemeState && setThemeState(theme);
        };

        const syncHistoryWithState = (widgetState: IWidgetState, history: History<any>) => {
            const {
                themeState,
            } = widgetState;
            const pathname = deserializePathname(history.location.pathname);
            themeUrlParam && (pathname[themeUrlParam] = encodeURIComponent(themeState));
            const serializedPathname = serializePathname(pathname);
            history.replace({ pathname:  serializedPathname});
        };

        const RouteComponent  = () => {
            const history = useHistory();
            const widgetState = WidgetState({
                theme: initialTheme,
            });
            const {
                children,
                theme,
                themeUrlParam,
                container,
                ...rest
            } = this.props;
            React.useEffect(() => syncStateWithLocation(widgetState, history.location), []);
            React.useEffect(() => syncHistoryWithState(widgetState, history), [widgetState, history]);
            this.props.widgetState = widgetState;
            return (
                <WidgetContextProvider {...rest} widgetState={widgetState}>
                    <Widget container={container}>
                        {children}
                    </Widget>
                </WidgetContextProvider>
            );
        };

        const Component = () => (
            <Router history={getHistory()}>
                <Route>
                    <RouteComponent />
                </Route>
            </Router>
        );

        const render = (container: Element | DocumentFragment | null) =>
            ReactDOM.render(
                <React.StrictMode>
                    <Component />
                </React.StrictMode>,
                container || document.createElement('div')
            );

        const getTheme = () => {
            const { themeState } = this.props.widgetState || {};
            return themeState;
        };

        const setTheme = (theme: string) => {
            const { setThemeState } = this.props.widgetState || {};
            setThemeState && setThemeState(theme);
        };

        const context: IWidgetContext = {
            Component,
            render,
            getTheme,
            setTheme,
        };

        return context;
    }

    /**
     * Sets the children.
     * All the children within the context will have the same state.
     *
     * @param {(() => JSX.Element) | (Array<() => JSX.Element>)} children The children.
     */
    withChildren(children: (() => JSX.Element) | (Array<() => JSX.Element>)) {
        this.props.children = createChildren(children);
        return this;
    }

    /**
     * Sets the theme. Default value: 'en'.
     *
     * @param {string} theme The theme.
     */
    withTheme(theme: string) {
        this.props.theme = theme;
        return this;
    }

    /**
     * Sets the theme url param to be synchronized with the theme state.
     *
     * @param {string} themeUrlParam The theme url param.
     */
    withThemeUrlParam(themeUrlParam: string) {
        this.props.themeUrlParam = themeUrlParam;
        return this;
    }

    /**
     * Sets the theme set event handler.
     *
     * @param {(theme: string) => void} themeSetEventHandler The theme set event handler.
     */
    withThemeSetEventHandler(themeSetEventHandler: (theme: string) => void) {
        this.props.themeSetEventHandler = themeSetEventHandler;
        return this;
    }

    /**
     * Sets the container. Default value: undefined.
     *
     * @param {Element | null} container The container.
     */
    withContainer(container: Element | null) {
        this.props.container = container;
        return this;
    }
};

export default WidgetContextBuilder;
