import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, useHistory } from 'react-router-dom';
import { History, Location } from 'history';
import { AppContextProvider, IAppState, AppState, DefaultAppState } from '../contexts/AppContext';
import { createChildren } from '../utils/index';
import { getHistory, deserializePathname, serializePathName } from '../services/locationService';

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
  appState: IAppState;
  language?: string;
  languageUrlParam?: string;
  languageSetEventHandler?: (language: string) => void;
  theme?: string;
  themeUrlParam?: string;
  themeSetEventHandler?: (theme: string) => void;
}

/**
 * Helps to build the Application Context and manage its state.
 */
export class AppContextBuilder {
    private props: IComponentProps = {
      children: undefined,
      appState: DefaultAppState,
      language: undefined,
      languageSetEventHandler: undefined,
      languageUrlParam: undefined,
      theme: undefined,
      themeSetEventHandler: undefined,
      themeUrlParam: undefined
    };

    /**
     * Builds the Application Context.
     * 
     * @returns {AppContext} The Application Context.
     */
    build() {
      const { language: initialLanguage, languageUrlParam, theme: initialTheme, themeUrlParam } = this.props;

      const syncStateWithLocation = (appState: IAppState, location: Location<any>) => {
        const { setLanguageState, setThemeState } = appState;
        const pathname = deserializePathname(location.pathname);
        const language = languageUrlParam && pathname[languageUrlParam] && decodeURIComponent(pathname[languageUrlParam]);
        const theme = themeUrlParam && pathname[themeUrlParam] && decodeURIComponent(pathname[themeUrlParam]);
        
        language && setLanguageState && setLanguageState(language);
        theme && setThemeState && setThemeState(theme);
      };

      const syncHistoryWithState = (appState: IAppState, history: History<any>) => {
        const { languageState, themeState } = appState;
        const pathname = deserializePathname(history.location.pathname);

        languageUrlParam && (pathname[languageUrlParam] = encodeURIComponent(languageState));
        themeUrlParam && (pathname[themeUrlParam] = encodeURIComponent(themeState));

        const serializedPathname = serializePathName(pathname);
        history.replace({ pathname:  serializedPathname});
      };

      const RouteComponent = () => {
        const appState = AppState({ language: initialLanguage, theme: initialTheme });
        const { children, language, languageUrlParam, theme, themeUrlParam, ...rest } = this.props;
        const history = useHistory();  

        React.useEffect(() => syncStateWithLocation(appState, history.location), []);
        React.useEffect(() => syncHistoryWithState(appState, history), [appState, history]);

        this.props.appState = appState;

        return (
          <AppContextProvider {...rest} appState={appState}>
            { children }
          </AppContextProvider>
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
     * Sets the language URL param to be synchronized with the language state.
     * 
     * @param {string} languageUrlParam The language URL param.
     */
    withLanguageUrlParam(languageUrlParam: string) {
      this.props.languageUrlParam = languageUrlParam;
      return this;
    }

    /**
     * Sets the language set event hander.
     * 
     * @param {(language: string) => void} languageSetEventHandler The language set event handler.
     */
    withLanguageSetEventHandler(languageSetEventHandler: (language: string) => void) {
      this.props.languageSetEventHandler = languageSetEventHandler;
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
     * Sets the theme URL param to be synchronized with the theme state.
     * 
     * @param {string} themeUrlParam The theme URL param.
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
  }

export default AppContextBuilder;