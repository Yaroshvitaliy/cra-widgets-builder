import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, useHistory } from 'react-router-dom';
import { History, Location } from 'history';
import { 
  SwitchButtonContextProvider, 
  ISwitchButtonState, 
  SwitchButtonState, 
  DefaultSwitchButtonState
} from './switchButtonContext';
import { createChildren } from '../utils/index';
import { getHistory, deserializePathname, serializePathName } from '../services/locationService';

/**
 * The Switch Button Context.
 */
export interface SwitchButtonContext {
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
   * Gets the state of the switch button.
   */
  getState: () => boolean;

  /**
   * Sets the state of the switch button.
   */
  setState: (state: boolean) => void;

  /**
   * Toggles the state of the switch button.
   */
  toggleState: () => void;
}

interface IComponentProps {
  children: React.ReactNode;
  switchButtonState: ISwitchButtonState;
  enabled?: boolean;
  enabledUrlParam?: string;
  enabledSetEventHandler?: (enabled: boolean) => void;
}

/**
 * Helps to build the Switch Button Context and manage its state.
 */
export class SwitchButtonContextBuilder {
    private props: IComponentProps = {
      children: () => [],
      switchButtonState: DefaultSwitchButtonState,
      enabled: undefined,
      enabledSetEventHandler: undefined
    };

    /**
     * Builds the Switch Button Context.
     * 
     * @returns {SwitchButtonContext} The Switch Button Context.
     */
    build() {
      const { enabled: initialEnabled, enabledUrlParam } = this.props;

      const syncStateWithLocation = (switchButtonState: ISwitchButtonState, location: Location<any>) => {
        const { setEnabledState } = switchButtonState;
        const pathname = enabledUrlParam ? deserializePathname(location.pathname) : {};
        const enabled = enabledUrlParam && pathname[enabledUrlParam] && (decodeURIComponent(pathname[enabledUrlParam]) === 'true');

        enabled && setEnabledState && setEnabledState(enabled);
      };

      const syncHistoryWithState = (switchButtonState: ISwitchButtonState, history: History<any>) => {
        const { enabledState } = switchButtonState;
        const pathname = deserializePathname(history.location.pathname);

        enabledUrlParam && (pathname[enabledUrlParam] = encodeURIComponent(enabledState));

        const serializedPathname = serializePathName(pathname);
        history.replace({ pathname:  serializedPathname});     
      };

      const RouteComponent = () => {
        const switchButtonState = SwitchButtonState({ enabled: initialEnabled });
        const { children, enabled, ...rest } = this.props;
        const history = useHistory(); 

        React.useEffect(() => syncStateWithLocation(switchButtonState, history.location), []);
        React.useEffect(() => syncHistoryWithState(switchButtonState, history), [switchButtonState, history]);

        this.props.switchButtonState = switchButtonState;
        
        return (
          <SwitchButtonContextProvider {...rest} switchButtonState={switchButtonState}>
            {children}
          </SwitchButtonContextProvider>
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

      const getState = () => {
        const { enabledState } = this.props.switchButtonState || {};
        return enabledState;
      }

      const setState = (enabled: boolean)  => {
        const { setEnabledState } = this.props.switchButtonState || {};
        setEnabledState && setEnabledState(enabled);
      };

      const toggleState = () => {
        const { enabledState, setEnabledState } = this.props.switchButtonState || {};
        setEnabledState && setEnabledState(!enabledState);
      }

      const context: SwitchButtonContext = {
        Component,
        render,
        getState,
        setState,
        toggleState
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
     * Sets the state of the Switch Button.
     * false is 'off' state, true is 'on' state.
     * Default value: false ('off').
     * 
     * @param {boolean} enabled The state of the Switch Button.
     */
    withEnabled(enabled: boolean) {
      this.props.enabled = enabled;
      return this;
    }

    /**
     * Sets the enabled URL param to be synchronized with the enabled state.
     * 
     * @param {string} enabledUrlParam The enabled URL param.
     */
    withEnabledUrlParam(enabledUrlParam: string) {
      this.props.enabledUrlParam = enabledUrlParam;
      return this;
    }

    /**
     * Sets the enabled set event handler.
     * 
     * @param {(enabled: boolean) => void} enabledSetEvent The enabled set event handler.
     */
    withEnabledSetEventHandler(enabledSetEventHandler: (enabled: boolean) => void) {
      this.props.enabledSetEventHandler = enabledSetEventHandler;
      return this;
    }
  }

export default SwitchButtonContextBuilder;