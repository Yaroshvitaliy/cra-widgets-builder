import React from 'react';

/**
 * The App state props interface.
 */
export interface IAppStateProps {
    language?: string;
    theme?: string;
}

/**
 * The App state interface.
 */
export interface IAppState {
    languageState: string;
    setLanguageState: undefined | React.Dispatch<React.SetStateAction<string>>;
    themeState: string;
    setThemeState: undefined | React.Dispatch<React.SetStateAction<string>>;
}

/**
 * The App context provider props interface.
 */
export interface IAppContextProviderProps {
    children: React.ReactNode;
    appState: IAppState;
    languageSetEventHandler?: (language: string) => void;
    themeSetEventHandler?: (theme: string) => void;
}

/**
 * The App context value interface.
 */
export interface IAppContextValue {
    language: string;
    setLanguage: (language: string) => void;
    theme: string;
    setTheme: (theme: string) => void;
}

export const DefaultLanguage = 'en';
export const DefaultTheme = 'default';

/**
 * The default App state.
 */
export const DefaultAppState: IAppState = {
    languageState: DefaultLanguage,
    setLanguageState: undefined,
    themeState: DefaultTheme,
    setThemeState: undefined,
};

/**
 * The default App context value.
 */
export const DefaultAppContextValue: IAppContextValue = {
    language: DefaultLanguage,
    setLanguage: (language: string) => {},
    theme: DefaultTheme,
    setTheme: (theme: string) => {},
};

/**
 * The App state.
 */
export const AppState = ({
            language,
            theme,
        }: IAppStateProps) => {

    const [ languageState, setLanguageState ] = React.useState<string>(language || DefaultLanguage);
    const [ themeState, setThemeState ] = React.useState<string>(theme || DefaultTheme);

    const appState: IAppState = {
        languageState,
        setLanguageState,
        themeState,
        setThemeState,
    };

    return appState;
};

/**
 * The App context.
 */
export const AppContext = React.createContext<IAppContextValue>(DefaultAppContextValue);

/**
 * The App context provider.
 */
export const AppContextProvider = ({
            children,
            appState,
            languageSetEventHandler,
            themeSetEventHandler,
        }: IAppContextProviderProps) => {

    const {
        languageState,
        setLanguageState,
        themeState,
        setThemeState,
    } = appState || {};

    React.useEffect(() => {
        languageSetEventHandler && languageSetEventHandler(languageState);
    }, [ languageState, setLanguageState, languageSetEventHandler ]);

    React.useEffect(() => {
        themeSetEventHandler && themeSetEventHandler(themeState);
    }, [ themeState, setThemeState, themeSetEventHandler ]);

    const contextValue: IAppContextValue = {
        language: languageState,
        setLanguage: (language: string) => setLanguageState && setLanguageState(language),
        theme: themeState,
        setTheme: (theme: string) => setThemeState && setThemeState(theme),
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};
