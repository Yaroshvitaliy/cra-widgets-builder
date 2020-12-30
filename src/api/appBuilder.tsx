import React from 'react';
import ReactDOM from 'react-dom';
import { AppContextProvider, IAppState, AppState, DefaultAppState } from '../contexts/AppContext';
import { createChildren } from '../utils/index';

export interface AppApi {
  AppContainer: () => JSX.Element;
  render: (container: Element | DocumentFragment | null) => void;
  setLanguage: (language: string) => void;
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

export class AppBuilder {
    private props: IComponentProps = {
      children: undefined,
      appState: DefaultAppState,
      language: undefined,
      languageSetEvent: undefined,
      theme: undefined,
      themeSetEvent: undefined
    };

    build() {
      const AppContainer = () => {
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
                <AppContainer />
            </React.StrictMode>,
            container || document.createElement('div')
        );
      
      const setLanguage = () => (language: string)  => {
        const { setLanguageState } = this.props.appState || {};
        setLanguageState && setLanguageState(language)
      };
      
      const setTheme = () => (theme: string)  => {
        const { setThemeState } = this.props.appState || {};
        setThemeState && setThemeState(theme)
      };

      const api: AppApi = {
        render,
        AppContainer,
        setLanguage,
        setTheme
      };

      return api;
    }

    withChildren(children: (() => JSX.Element) | (Array<() => JSX.Element>)) {
      this.props.children = createChildren(children);
      return this;
    }

    withLanguage(language: string) {
      this.props.language = language;
      return this;
    }

    withLanguageSetEventHandler(languageSetEvent: (language: string) => void) {
      this.props.languageSetEvent = languageSetEvent;
      return this;
    }

    withTheme(theme: string) {
      this.props.theme = theme;
      return this;
    }

    withThemeSetEventHandler(themeSetEvent: (theme: string) => void) {
      this.props.themeSetEvent = themeSetEvent;
      return this;
    }
  }

export default AppBuilder;