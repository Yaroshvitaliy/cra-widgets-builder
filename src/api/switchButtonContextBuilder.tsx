import React from 'react';
import ReactDOM from 'react-dom';
 import { 
  SwitchButtonContextProvider, 
  ISwitchButtonState, 
  SwitchButtonState, 
  DefaultSwitchButtonState
} from '../contexts/SwitchButtonContext';
import { createChildren } from '../utils/index';

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
  switchButtonState: ISwitchButtonState,
  enabled?: boolean;
  enabledSetEvent?: (enabled: boolean) => void;
}

/**
 * Helps to build the Switch Button Context and manage its state.
 */
export class SwitchButtonContextBuilder {
    private props: IComponentProps = {
      children: () => [],
      switchButtonState: DefaultSwitchButtonState,
      enabled: undefined,
      enabledSetEvent: undefined
    };

    /**
     * Builds the Switch Button Context.
     * 
     * @returns {SwitchButtonContext} The Switch Button Context.
     */
    build() {
      const Component = () => {
        this.props.switchButtonState = SwitchButtonState({ enabled: this.props.enabled });
        const { children, enabled, ...rest } = this.props;
        return (
          <SwitchButtonContextProvider {...rest}>
            {children}
          </SwitchButtonContextProvider>
        );
      };

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
     * @param {() => JSX.Element) | (Array<() => JSX.Element>)} children The children.
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
     * Sets the enabled set event handler.
     * 
     * @param {(enabled: boolean) => void} enabledSetEvent The enabled set event.
     */
    withEnabledSetEventHandler(enabledSetEvent: (enabled: boolean) => void) {
      this.props.enabledSetEvent = enabledSetEvent;
      return this;
    }
  }

export default SwitchButtonContextBuilder;