import './App.scss';
import * as Logger from './services/logger';
import Api from './api/index';

const {
    AppBuilder,
    WidgetBuilder,
    SwitchButtonBuilder,
    CurrentLanguage,
    LanguageSwitcher,
    SwitchButton
} = Api;

const widgetLanguageSwitcher = new WidgetBuilder()
    .withChildren(LanguageSwitcher)
    .withThemeSetEventHandler(theme => 
        Logger.debug(`Theme set event for widget1: '${theme}'`)
    )
    .build();

const widgetCurrentLanguage = new WidgetBuilder()
    .withChildren(CurrentLanguage)
    .withThemeSetEventHandler(theme => 
        Logger.debug(`Theme set event for widget2: '${theme}'`)
    )
    .build();

const widgetContainer1 = new WidgetBuilder()
    .withContainerId('widget-1')
    .withChildren(SwitchButton)
    .withThemeSetEventHandler(theme => 
        Logger.debug(`Theme set event for widget3: '${theme}'`)
    )
    .build();

const widgetContainer2 = new WidgetBuilder()
    .withContainerId('widget-2')
    .withChildren(SwitchButton)
    .withThemeSetEventHandler(theme => 
        Logger.debug(`Theme set event for widget4: '${theme}'`)
    )
    .build();

const widgetContainer3 = new WidgetBuilder()
    .withContainerId('widget-3')
    .withChildren(SwitchButton)
    .withThemeSetEventHandler(theme => 
        Logger.debug(`Theme set event for widget5: '${theme}'`)
    )
    .build();

const switchButton1 = new SwitchButtonBuilder()
    .withChildren([
        widgetContainer1.WidgetContainer, 
        widgetContainer2.WidgetContainer
    ])
    .build();

const switchButton2 = new SwitchButtonBuilder()
    .withChildren(widgetContainer3.WidgetContainer)
    .build();

const switchButton3 = new SwitchButtonBuilder()
    .withChildren([
        SwitchButton, 
        SwitchButton
    ])
    .build();

const app = new AppBuilder()
    .withLanguage('en')
    .withTheme('default')
    .withLanguageSetEventHandler(language => 
        Logger.debug(`Language set event: '${language}'`)
    )
    .withThemeSetEventHandler(theme => 
        Logger.debug(`Theme set event: '${theme}'`)
    )
    .withChildren([ 
        widgetLanguageSwitcher.WidgetContainer,
        widgetCurrentLanguage.WidgetContainer,
        switchButton1.SwitchButtonContainer,
        switchButton2.SwitchButtonContainer,
        switchButton3.SwitchButtonContainer
    ])
    .build();

// const App = () => (
//   <>
//     { React.createElement(app.AppContainer) }
//   </>
// );

export default app;

// Test API
widgetContainer3.setTheme('blue');

setTimeout(() => {
    app.setLanguage('ru');
    app.setTheme('light');
    switchButton3.setEnabled(true);
    widgetContainer3.setTheme('dark');
}, 3000);