import React from 'react';
import ReactDOM from 'react-dom';
import { WidgetContextProvider, IWidgetState, WidgetState, DefaultWidgetState } from '../contexts/WidgetContext';
import Widget from '../components/Widget';
import { createChildren } from '../utils/index';

/**
 * The widget Context.
 */
export interface WidgetContext {
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
  themeSetEventHandler?: (theme: string) => void;
  container?: Element | null;
}

/**
 * Helps to build the widget Contex and manage its state.
 */
export class WidgetContextBuilder {
    private props: IComponentProps = {
      children: () => [],
      widgetState: DefaultWidgetState,
      theme: undefined,
      themeSetEventHandler: undefined,
      container: undefined
    };

    /**
     * Builds the Widget Context.
     * 
     * @returns {WidgetContext} The Widget Context.
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

      const context: WidgetContext = {
        Component,
        render,
        getTheme,
        setTheme
      };

      return context;
    }

    /**
     * Sets the children.
     * All the children within the context will have the same state (container, theme).
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
     * @param {(theme: string) => void} themeSetEventHandler The theme set event handler.
     */
    withThemeSetEventHandler(themeSetEventHandler: (theme: string) => void) {
      this.props.themeSetEventHandler = themeSetEventHandler;
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

export default WidgetContextBuilder;