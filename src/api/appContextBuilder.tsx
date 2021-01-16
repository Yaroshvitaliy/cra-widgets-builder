import React from 'react';
import ReactDOM from 'react-dom';
import { AppContextProvider, IAppState, AppState, DefaultAppState } from '../contexts/AppContext';
import { createChildren } from '../utils/index';

/**
 * The Application Context.
 */
export interface AppContext {
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
   * Gets the language.
   */
  getLanguage: () => string;

  /**
   * Sets the language.
   * 
   * @param {string} language The language.
   */
  setLanguage: (language: string) => void;

  /**
   * Gets the theme.
   */
  getTheme: () => string;

  /**
   * Sets the theme.
   * 
   * @param {string} theme The theme.
   */
  setTheme: (theme: string) => void;
}

interface IComponentProps {
  children: React.ReactNode;
  appState: IAppState,
  language?: string;
  languageSetEvent?: (language: string) => void;
  theme?: string;
  themeSetEvent?: (theme: string) => void;
}

/**
 * Helps to build the Application Context and manage its state.
 */
export class AppContextBuilder {
    private props: IComponentProps = {
      children: undefined,
      appState: DefaultAppState,
      language: undefined,
      languageSetEvent: undefined,
      theme: undefined,
      themeSetEvent: undefined
    };

    /**
     * Builds the Application Context.
     * 
     * @returns {AppContext} The Application Context.
     */
    build() {
      const Component = () => {
        this.props.appState = AppState({ language: this.props.language, theme: this.props.theme });
        const { children, language, theme, ...rest } = this.props;
        return (
          <AppContextProvider {...rest}>
            { children }
          </AppContextProvider>
        )
      };

      const render = (container: Element | DocumentFragment | null) =>
        ReactDOM.render(
            <React.StrictMode>
                <Component />
            </React.StrictMode>,
            container || document.createElement('div')
        );
      
      const getLanguage = () => {
        const { languageState } = this.props.appState || {};
        return languageState;
      };

      const setLanguage = (language: string) => {
        const { setLanguageState } = this.props.appState || {};
        setLanguageState && setLanguageState(language);
      };

      const getTheme = () => {
        const { themeState } = this.props.appState || {};
        return themeState;
      };
     
      const setTheme = (theme: string) => {
        const { setThemeState } = this.props.appState || {};
        setThemeState && setThemeState(theme);
      };

      const context: AppContext = {
        Component,
        render,
        getLanguage,
        setLanguage,
        getTheme,
        setTheme
      };

      return context;
    }

    /**
     * Sets the children.
     * All the children within the context will have the same state (language, theme).
     * 
     * @param {() => JSX.Element) | (Array<() => JSX.Element>)} children The children.
     */
    withChildren(children: (() => JSX.Element) | (Array<() => JSX.Element>)) {
      this.props.children = createChildren(children);
      return this;
    }

    /**
     * Sets the language.
     * Default value: 'en'.
     * 
     * @param {string} language The language.
     */
    withLanguage(language: string) {
      this.props.language = language;
      return this;
    }

    /**
     * Sets the language set hander.
     * 
     * @param {(language: string) => void} languageSetEvent The language set event.
     */
    withLanguageSetEventHandler(languageSetEvent: (language: string) => void) {
      this.props.languageSetEvent = languageSetEvent;
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
  }

export default AppContextBuilder;