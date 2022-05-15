import React from 'react';

/**
 * The SwitchButton state props interface.
 */
export interface ISwitchButtonStateProps {
    enabled?: boolean;
}

/**
 * The SwitchButton state interface.
 */
export interface ISwitchButtonState {
    enabledState: boolean;
    setEnabledState: undefined | React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * The SwitchButton context provider props interface.
 */
export interface ISwitchButtonContextProviderProps {
    children: React.ReactNode;
    switchButtonState: ISwitchButtonState;
    enabledSetEventHandler?: (enabled: boolean) => void;
}

/**
 * The SwitchButton context value interface.
 */
export interface ISwitchButtonContextValue {
    enabled: boolean;
    setEnabled: (enabled: boolean) => void;
}

export const DefaultEnabled = false;

/**
 * The default SwitchButton state.
 */
export const DefaultSwitchButtonState: ISwitchButtonState = {
    enabledState: DefaultEnabled,
    setEnabledState: undefined,
};

/**
 * The default SwitchButton context value.
 */
export const DefaultSwitchButtonContextValue: ISwitchButtonContextValue = {
    enabled: DefaultEnabled,
    setEnabled: (enabled: boolean) => {},
};

/**
 * The SwitchButton state.
 */
export const SwitchButtonState = ({
            enabled,
        }: ISwitchButtonStateProps) => {

    const [ enabledState, setEnabledState ] = React.useState<boolean>(enabled || DefaultEnabled);

    const switchButtonState: ISwitchButtonState = {
        enabledState,
        setEnabledState,
    };

    return switchButtonState;
};

/**
 * The SwitchButton context.
 */
export const SwitchButtonContext = React.createContext<ISwitchButtonContextValue>(DefaultSwitchButtonContextValue);

/**
 * The SwitchButton context provider.
 */
export const SwitchButtonContextProvider = ({
            children,
            switchButtonState,
            enabledSetEventHandler,
        }: ISwitchButtonContextProviderProps) => {

    const {
        enabledState,
        setEnabledState,
    } = switchButtonState || {};

    React.useEffect(() => {
        enabledSetEventHandler && enabledSetEventHandler(enabledState);
    }, [ enabledState, setEnabledState, enabledSetEventHandler ]);

    const contextValue: ISwitchButtonContextValue = {
        enabled: enabledState,
        setEnabled: (enabled: boolean) => setEnabledState && setEnabledState(enabled),
    };

    return (
        <SwitchButtonContext.Provider value={contextValue}>
            {children}
        </SwitchButtonContext.Provider>
    );
};
