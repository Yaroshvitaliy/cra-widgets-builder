import React from 'react';

/**
 * The Widget state props interface.
 */
export interface IWidgetStateProps {
    theme?: string;
}

/**
 * The Widget state interface.
 */
export interface IWidgetState {
    themeState: string;
    setThemeState: undefined | React.Dispatch<React.SetStateAction<string>>;
}

/**
 * The Widget context provider props interface.
 */
export interface IWidgetContextProviderProps {
    children: React.ReactNode;
    widgetState: IWidgetState;
    themeSetEventHandler?: (theme: string) => void;
}

/**
 * The Widget context value interface.
 */
export interface IWidgetContextValue {
    theme: string;
    setTheme: (theme: string) => void;
}

export const DefaultTheme = 'en';

/**
 * The default Widget state.
 */
export const DefaultWidgetState: IWidgetState = {
    themeState: DefaultTheme,
    setThemeState: undefined,
};

/**
 * The default Widget context value.
 */
export const DefaultWidgetContextValue: IWidgetContextValue = {
    theme: DefaultTheme,
    setTheme: (theme: string) => {},
};

/**
 * The Widget state.
 */
export const WidgetState = ({
            theme,
        }: IWidgetStateProps) => {

    const [ themeState, setThemeState ] = React.useState<string>(theme || DefaultTheme);

    const widgetState: IWidgetState = {
        themeState,
        setThemeState,
    };

    return widgetState;
};

/**
 * The Widget context.
 */
export const WidgetContext = React.createContext<IWidgetContextValue>(DefaultWidgetContextValue);

/**
 * The Widget context provider.
 */
export const WidgetContextProvider = ({
            children,
            widgetState,
            themeSetEventHandler,
        }: IWidgetContextProviderProps) => {

    const {
        themeState,
        setThemeState,
    } = widgetState || {};

    React.useEffect(() => {
        themeSetEventHandler && themeSetEventHandler(themeState);
    }, [ themeState, setThemeState, themeSetEventHandler ]);

    const contextValue: IWidgetContextValue = {
        theme: themeState,
        setTheme: (theme: string) => setThemeState && setThemeState(theme),
    };

    return (
        <WidgetContext.Provider value={contextValue}>
            {children}
        </WidgetContext.Provider>
    );
};
