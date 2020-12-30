import * as Logger from '../services/logger';
import { AppBuilder } from './appBuilder';
import { WidgetBuilder } from './widgetBuilder';
import { SwitchButtonBuilder } from './switchButtonBuilder';
import CurrentLanguage from '../components/CurrentLanguage';
import LanguageSwitcher from '../components/LanguageSwitcher';
import SwitchButton from '../components/SwitchButton';

const Api = {
    Logger,
    AppBuilder,
    WidgetBuilder,
    SwitchButtonBuilder,
    CurrentLanguage,
    LanguageSwitcher,
    SwitchButton
}

export default Api;