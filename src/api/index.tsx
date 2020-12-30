import React from 'react';
import ReactDOM from 'react-dom';
import * as Logger from '../services/logger';
import { AppBuilder } from './appBuilder';
import { WidgetBuilder } from './widgetBuilder';
import { SwitchButtonBuilder } from './switchButtonBuilder';
import CurrentLanguage from '../components/CurrentLanguage';
import LanguageSwitcher from '../components/LanguageSwitcher';
import SwitchButton from '../components/SwitchButton';

const renderApp = (children: () => JSX.Element, container: Element | DocumentFragment | null) =>
    ReactDOM.render(
        <React.StrictMode>
            { React.createElement(children) }
        </React.StrictMode>,
        container
    );

const Api = {
    renderApp,
    Logger,
    AppBuilder,
    WidgetBuilder,
    SwitchButtonBuilder,
    CurrentLanguage,
    LanguageSwitcher,
    SwitchButton
}

export default Api;