import React from 'react';
import { WidgetContextProvider, IWidgetState, WidgetState, DefaultWidgetState } from '../contexts/WidgetContext';
import Widget from '../components/Widget';
import { createChildren } from '../utils/index';

export interface WidgetApi {
  WidgetContainer: () => JSX.Element;
  setTheme: (theme: string) => void;
}

interface IComponentProps {
  children: React.ReactNode;
  widgetState: IWidgetState,
  theme?: string;
  themeSetEvent?: (theme: string) => void;
  containerId?: string;
}

export class WidgetBuilder {
    private props: IComponentProps = {
      children: () => [],
      widgetState: DefaultWidgetState,
      theme: undefined,
      themeSetEvent: undefined,
      containerId: undefined
    };

    build() {
      const WidgetContainer = () => {
        this.props.widgetState = WidgetState({ theme: this.props.theme });
        const { children, containerId, theme, ...rest } = this.props;
      
        return (
          <WidgetContextProvider {...rest}>
              <Widget containerId={containerId}>
                {children}
              </Widget>
          </WidgetContextProvider>
        )
      };
      
      const setTheme = (theme: string)  => {
        const { setThemeState } = this.props.widgetState || {};
        setThemeState && setThemeState(theme)
      };


      const api: WidgetApi = {
        WidgetContainer,
        setTheme
      };

      return api;
    }

    withChildren(children: (() => JSX.Element) | (Array<() => JSX.Element>)) {
      this.props.children = createChildren(children);
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

    withContainerId(containerId: string) {
      this.props.containerId = containerId;
      return this;
    }
  }

export default WidgetBuilder;