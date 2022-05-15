import * as Logger from '../services/logger';
import { AppContextBuilder } from '../contexts/appContextBuilder';
import { WidgetContextBuilder } from '../contexts/widgetContextBuilder';
import { SwitchButtonContextBuilder } from '../contexts/switchButtonContextBuilder';
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