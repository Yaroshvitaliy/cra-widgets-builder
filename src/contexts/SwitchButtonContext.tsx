import React from 'react';

export interface ISwitchButtonStateProps {
  enabled?: boolean;
}

export interface ISwitchButtonState {
  enabledState: boolean;
  setEnabledState: undefined | React.Dispatch<React.SetStateAction<boolean>>;
}

interface ISwitchButtonContextProviderProps {
  children: React.ReactNode;
  switchButtonState: ISwitchButtonState,
  enabledSetEventHandler?: (enabled: boolean) => void;
}

export interface ISwitchButtonContextValue {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
}

export const DefaulEnabled = false;

export const DefaultSwitchButtonState: ISwitchButtonState = {
  enabledState: DefaulEnabled,
  setEnabledState: undefined
};

const DefaultSwitchButtonContextValue: ISwitchButtonContextValue = {
  enabled: DefaulEnabled,
  setEnabled: (enabled: boolean) => {}
};

export const SwitchButtonState = ({ enabled }: ISwitchButtonStateProps) => {
    const [ enabledState, setEnabledState ] = React.useState<boolean>(DefaulEnabled);
    
    const switchButtonState: ISwitchButtonState = {
      enabledState,
      setEnabledState
    };

    return switchButtonState;
  };

export const SwitchButtonContext = React.createContext<ISwitchButtonContextValue>(DefaultSwitchButtonContextValue);

export const SwitchButtonContextProvider = ({ 
    children,
    switchButtonState, 
    enabledSetEventHandler 
  }: ISwitchButtonContextProviderProps) => {
    const { enabledState, setEnabledState } = switchButtonState;
    
    React.useEffect(() => {
      enabledSetEventHandler && enabledSetEventHandler(enabledState);      
    }, [ enabledState, setEnabledState, enabledSetEventHandler ])

    const contextValue: ISwitchButtonContextValue = {
      enabled: enabledState,
      setEnabled: (enabled: boolean) => setEnabledState && setEnabledState(enabled)
    }

    return (
        <SwitchButtonContext.Provider value={contextValue}>
          {children}
        </SwitchButtonContext.Provider>
    )};