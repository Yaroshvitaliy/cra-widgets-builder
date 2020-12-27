import React from 'react';

export interface IAppStateProps {
  language?: string;
  theme?: string;
}

export interface IAppState {
  languageState: string;
  setLanguageState: undefined | React.Dispatch<React.SetStateAction<string>>;
  themeState: string;
  setThemeState: undefined | React.Dispatch<React.SetStateAction<string>>;
}

export interface IAppContextProviderProps {
  children: React.ReactNode;
  appState: IAppState,
  languageSetEvent?: (language: string) => void;
  themeSetEvent?: (theme: string) => void;
}

export interface IAppContextValue {
  language: string;
  setLanguage: (language: string) => void;
  theme: string;
  setTheme: (theme: string) => void;
}

export const DefaultLanguage = 'en';
export const DefaultTheme = 'default';

export const DefaultAppState: IAppState = {
  languageState: DefaultLanguage,
  setLanguageState: undefined,
  themeState: DefaultTheme,
  setThemeState: undefined
};

const DefaultAppContextValue: IAppContextValue = {
  language: DefaultLanguage,
  setLanguage: (language: string) => {},
  theme: DefaultTheme,
  setTheme: (theme: string) => {}
};

export const AppState = ({ language, theme }: IAppStateProps) => {
  const [ languageState, setLanguageState ] = React.useState<string>(language || DefaultLanguage);
  const [ themeState, setThemeState ] = React.useState<string>(theme || DefaultTheme);
  
  const appState: IAppState = {
    languageState,
    setLanguageState,
    themeState,
    setThemeState
  };

  return appState;
};

export const AppContext = React.createContext<IAppContextValue>(DefaultAppContextValue);

export const AppContextProvider = ({ 
    children, 
    appState,
    languageSetEvent,
    themeSetEvent
  }: IAppContextProviderProps) => {
    
    const { languageState, setLanguageState, themeState, setThemeState } = appState || {};

    React.useEffect(() => {
      languageSetEvent && languageSetEvent(languageState);
    }, [ languageState, setLanguageState, languageSetEvent ]);
    
    React.useEffect(() => {
      themeSetEvent && themeSetEvent(themeState);
    }, [ themeState, setThemeState, themeSetEvent ]);

    const contextValue: IAppContextValue = {
      language: languageState,
      theme: themeState,
      setLanguage: (language: string) => setLanguageState && setLanguageState(language),
      setTheme: (theme: string) => setThemeState && setThemeState(theme)
    }

    return (
      <AppContext.Provider value={contextValue}>
        {children}
      </AppContext.Provider>
  )};