import React from 'react';
 import { 
  SwitchButtonContextProvider, 
  ISwitchButtonState, 
  SwitchButtonState, 
  DefaultSwitchButtonState
} from '../contexts/SwitchButtonContext';
import { createChildren } from '../utils/index';

export interface SwitchButtonApi {
  SwitchButtonContainer: () => JSX.Element;
  setEnabled: (enabled: boolean) => void;
}

interface IComponentProps {
  children: React.ReactNode;
  switchButtonState: ISwitchButtonState,
  enabled?: boolean;
  enabledSetEvent?: (enabled: boolean) => void;
}

export class SwitchButtonBuilder {
    private props: IComponentProps = {
      children: () => [],
      switchButtonState: DefaultSwitchButtonState,
      enabled: undefined,
      enabledSetEvent: undefined
    };

    build() {
      const SwitchButtonContainer = () => {
        this.props.switchButtonState = SwitchButtonState({ enabled: this.props.enabled });
        const { children, enabled, ...rest } = this.props;
        return (
          <SwitchButtonContextProvider {...rest}>
            {children}
          </SwitchButtonContextProvider>
        );
      };

      const setEnabled = (enabled: boolean)  => {
        const { setEnabledState } = this.props.switchButtonState || {};
        setEnabledState && setEnabledState(enabled)
      };

      const api: SwitchButtonApi = {
        SwitchButtonContainer,
        setEnabled
      };

      return api;
    }

    withChildren(children: (() => JSX.Element) | (Array<() => JSX.Element>)) {
      this.props.children = createChildren(children);
      return this;
    }

    withEnabled(enabled: boolean) {
      this.props.enabled = enabled;
      return this;
    }

    withThemeSetEventHandler(enabledSetEvent: (enabled: boolean) => void) {
      this.props.enabledSetEvent = enabledSetEvent;
      return this;
    }
  }

export default SwitchButtonBuilder;