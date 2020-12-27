import React from 'react';

export interface IWidgetStateProps {
  theme?: string;
}

export interface IWidgetState {
  themeState: string;
  setThemeState: undefined | React.Dispatch<React.SetStateAction<string>>;
}

interface IWidgetContextProviderProps {
  children: React.ReactNode;
  widgetState: IWidgetState;
  theme?: string;
  themeSetEvent?: (theme: string) => void;
}

export interface IWidgetContextValue {
  theme: string;
  setTheme: (theme: string) => void;
}

export const DefaultTheme = 'default';

export const DefaultWidgetState: IWidgetState = {
  themeState: DefaultTheme,
  setThemeState: undefined
};

const DefaultWidgetContextValue: IWidgetContextValue = {
  theme: DefaultTheme,
  setTheme: (theme: string) => {}
};

export const WidgetState = ({ theme }: IWidgetStateProps) => {
  const [ themeState, setThemeState ] = React.useState<string>(theme || DefaultTheme);
  
  const appContextState: IWidgetState = {
    themeState,
    setThemeState
  };

  return appContextState;
};

export const WidgetContext = React.createContext<IWidgetContextValue>(DefaultWidgetContextValue);

export const WidgetContextProvider = ({ 
    children,
    widgetState,
    themeSetEvent 
  }: IWidgetContextProviderProps) => {

    const { themeState, setThemeState } = widgetState;

    React.useEffect(() => {
      themeSetEvent && themeSetEvent(themeState);
    }, [ themeState, setThemeState, themeSetEvent ])

    const contextValue: IWidgetContextValue = {
      theme: themeState,
      setTheme: (theme: string) => setThemeState && setThemeState(theme)
    }

    return (
      <WidgetContext.Provider value={contextValue}>
        {children}
      </WidgetContext.Provider>
  )};