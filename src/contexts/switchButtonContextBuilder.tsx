// Generated by cra-context-generator@1.1.0 on Sat, 04 Jun 2022 10:51:34 GMT.
// Do not edit this file manually unless you disabled its code generation.
import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import { History, Location } from 'history';
import { CustomRouter } from './CustomRouter';
import { SwitchButtonContextProvider, ISwitchButtonState, SwitchButtonState, DefaultSwitchButtonState } from './switchButtonContext';
import { createChildren, getHistory, deserializePathname, serializePathname } from './contextBuilderUtils';

/**
 * The SwitchButton context interface.
 */
export interface ISwitchButtonContext {
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
     * Gets the enabled.
     */
    getEnabled: () => boolean;

    /**
     * Sets the enabled.
     */
    setEnabled: (enabled: boolean) => void;
}

interface IComponentProps {
    children: React.ReactNode;
    switchButtonState: ISwitchButtonState;
    enabled?: boolean;
    enabledUrlParam?: string;
    enabledSetEventHandler?: (enabled: boolean) => void;
}

/**
 * The SwitchButton context builder.
 * Helps to build the SwitchButton context and manage its state.
 */
export class SwitchButtonContextBuilder {
    private props: IComponentProps = {
        children: undefined,
        switchButtonState: DefaultSwitchButtonState,
        enabled: DefaultSwitchButtonState.enabledState,
        enabledSetEventHandler: undefined,
        enabledUrlParam: undefined,
    };

    /**
     * Builds the SwitchButton Context.
     *
     * @returns {ISwitchButtonContext} The SwitchButton Context Interface.
     */
    build() {
        const {
            enabled: initialEnabled,
            enabledUrlParam,
        } = this.props;

        const syncStateWithLocation = (switchButtonState: ISwitchButtonState, location: Location) => {
            const {
                setEnabledState,
            } = switchButtonState;
            const pathname = deserializePathname(location.pathname);
            const enabled = enabledUrlParam && pathname[enabledUrlParam] && JSON.parse(decodeURIComponent(pathname[enabledUrlParam]));
            enabled && setEnabledState && setEnabledState(enabled);
        };

        const syncLocationWithState = (switchButtonState: ISwitchButtonState, history: History) => {
            const {
                enabledState,
            } = switchButtonState;
            const pathname = deserializePathname(history.location.pathname);
            enabledUrlParam && (pathname[enabledUrlParam] = encodeURIComponent(enabledState));
            const serializedPathname = serializePathname(pathname);
            history.replace({ pathname: serializedPathname});
        };

        const RouteComponent = () => {
            const history = getHistory();
            const switchButtonState = SwitchButtonState({
                enabled: initialEnabled,
            });
            const {
                children,
                enabled,
                enabledUrlParam,
                ...rest
            } = this.props;
            React.useEffect(() => syncStateWithLocation(switchButtonState, history.location), []);
            React.useEffect(() => syncLocationWithState(switchButtonState, history), [switchButtonState, history]);
            this.props.switchButtonState = switchButtonState;
            return (
                <SwitchButtonContextProvider {...rest} switchButtonState={switchButtonState}>
                    {children}
                </SwitchButtonContextProvider>
            );
        };

        const Component = () => (
            <CustomRouter history={getHistory()}>
                <Route>
                    <RouteComponent />
                </Route>
            </CustomRouter>
        );

        const render = (container: Element | DocumentFragment | null) =>
            ReactDOM.render(
                <React.StrictMode>
                    <Component />
                </React.StrictMode>,
                container || document.createElement('div')
            );

        const getEnabled = () => {
            const { enabledState } = this.props.switchButtonState || {};
            return enabledState;
        };

        const setEnabled = (enabled: boolean) => {
            const { setEnabledState } = this.props.switchButtonState || {};
            setEnabledState && setEnabledState(enabled);
        };

        const context: ISwitchButtonContext = {
            Component,
            render,
            getEnabled,
            setEnabled,
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
     * Sets the enabled. Default value: false.
     *
     * @param {boolean} enabled The enabled.
     */
    withEnabled(enabled: boolean) {
        this.props.enabled = enabled;
        return this;
    }

    /**
     * Sets the enabled url param to be synchronized with the enabled state.
     *
     * @param {string} enabledUrlParam The enabled url param.
     */
    withEnabledUrlParam(enabledUrlParam: string) {
        this.props.enabledUrlParam = enabledUrlParam;
        return this;
    }

    /**
     * Sets the enabled set event handler.
     *
     * @param {(enabled: boolean) => void} enabledSetEventHandler The enabled set event handler.
     */
    withEnabledSetEventHandler(enabledSetEventHandler: (enabled: boolean) => void) {
        this.props.enabledSetEventHandler = enabledSetEventHandler;
        return this;
    }
};

export default SwitchButtonContextBuilder;
