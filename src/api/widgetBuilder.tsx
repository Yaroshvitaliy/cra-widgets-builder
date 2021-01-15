import React from 'react';
import ReactDOM from 'react-dom';
import { WidgetContextProvider, IWidgetState, WidgetState, DefaultWidgetState } from '../contexts/WidgetContext';
import Widget from '../components/Widget';
import { createChildren } from '../utils/index';

/**
 * The widget API.
 */
export interface WidgetApi {
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
  widgetState: IWidgetState,
  theme?: string;
  themeSetEvent?: (theme: string) => void;
  container?: Element | null;
}

/**
 * Helps to build the widget API.
 */
export class WidgetBuilder {
    private props: IComponentProps = {
      children: () => [],
      widgetState: DefaultWidgetState,
      theme: undefined,
      themeSetEvent: undefined,
      container: undefined
    };

    /**
     * Builds the widget API.
     * 
     * @returns {WidgetApi} The Widget API.
     */
    build() {
      const Component = () => {
        this.props.widgetState = WidgetState({ theme: this.props.theme });
        const { children, container, theme, ...rest } = this.props;
      
        return (
          <WidgetContextProvider {...rest}>
              <Widget container={container}>
                {children}
              </Widget>
          </WidgetContextProvider>
        )
      };

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
      }
        
      const setTheme = (theme: string)  => {
        const { setThemeState } = this.props.widgetState || {};
        setThemeState && setThemeState(theme);
      };

      const api: WidgetApi = {
        Component,
        render,
        getTheme,
        setTheme
      };

      return api;
    }

    /**
     * Sets the children.
     * 
     * @param {() => JSX.Element) | (Array<() => JSX.Element>)} children The children.
     */
    withChildren(children: (() => JSX.Element) | (Array<() => JSX.Element>)) {
      this.props.children = createChildren(children);
      return this;
    }

    /**
     * Sets the theme.
     * Default value: 'default'.
     * 
     * @param {string} theme The theme. 
     */
    withTheme(theme: string) {
      this.props.theme = theme;
      return this;
    }

    /**
     * Sets the theme set event handler.
     * 
     * @param {(theme: string) => void} themeSetEvent The theme set event.
     */
    withThemeSetEventHandler(themeSetEvent: (theme: string) => void) {
      this.props.themeSetEvent = themeSetEvent;
      return this;
    }

    /**
     * Sets the container the widget will be rendered in.
     * 
     * @param {string} container The container.
     */
    withContainer(container: Element | null) {
      this.props.container = container;
      return this;
    }
  }

export default WidgetBuilder;