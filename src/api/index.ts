import * as Logger from '../services/logger';
import { AppContextBuilder } from './appContextBuilder';
import { WidgetContextBuilder } from './widgetContextBuilder';
import { SwitchButtonContextBuilder } from './switchButtonContextBuilder';
import CurrentLanguage from '../components/CurrentLanguage';
import LanguageSwitcher from '../components/LanguageSwitcher';
import SwitchButton from '../components/SwitchButton';

const Api = {
    Logger,
    AppContextBuilder,
    WidgetContextBuilder,
    SwitchButtonContextBuilder,
    CurrentLanguage,
    LanguageSwitcher,
    SwitchButton
}

export default Api;