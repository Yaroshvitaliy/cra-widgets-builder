# Getting Started with Widgets Builder Library
Widgets Builder Library is an example of a project that shows how to build widgets that behave like a single application and embed them into any place in html document.\
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).\
[react-app-rewired](https://www.npmjs.com/package/react-app-rewired) package was installed to set up Webpack (in config-overrides.js).
Before running an example, you have to build the project (see instructions bellow).\
The name of library is specified in package.json:
```javascript
{
    ...
    "library": "wb",
    ...
}
```

## Example of using Widgets Builder Library API
#### index.html
```html
<h3>App Context Builder</h3>
<h5>Language Switcher</h5>
<div id="app-language-switcher-container"></div>
<h5>Current Language</h5>
<div id="app-current-language-container"></div>
<h5>Switch Button Widget 1</h5>
<div id="app-widget-container-1"></div>
<h5>Switch Button Widget 2</h5>
<div id="app-widget-container-2"></div>
<h5>Switch Button Widget 3</h5>
<div id="app-widget-container-3"></div>
<button id="test-api-btn">Test api</button>
```
#### index.js
```javascript
const {
    Logger,                     // logger service
    AppContextBuilder,          // application context builder
    WidgetContextBuilder,       // widget context builder    
    SwitchButtonContextBuilder, // switch button context builder
    CurrentLanguage,            // current language component
    LanguageSwitcher,           // language switcher component
    SwitchButton                // switch button component
} = wb;

// Build Language Switcher Widget Context
const languageSwitcherWidgetContext = new WidgetContextBuilder()
    .withChildren(LanguageSwitcher)
    .withContainer(document.getElementById('app-language-switcher-container'))
    .build();

// Build Current Language Widget Context
const currentLanguageWidgetContext = new WidgetContextBuilder()
    .withChildren(CurrentLanguage)
    .withContainer(document.getElementById('app-current-language-container'))
    .build();

// Build Widget Context 1
const widgetContext1 = new WidgetContextBuilder()
    .withChildren(SwitchButton)
    .withContainer(document.getElementById('app-widget-container-1'))
    .build();

// Build Widget Context 2
const widgetContext2 = new WidgetContextBuilder()
    .withChildren(SwitchButton)
    .withContainer(document.getElementById('app-widget-container-2'))
    .build();

// Build Widget Context 3
const widgetContext3 = new WidgetContextBuilder()
    .withChildren(SwitchButton)
    .withContainer(document.getElementById('app-widget-container-3'))
    .build();

// Build Switch Button Context 1
const switchButtonContext1 = new SwitchButtonContextBuilder()
    .withChildren(widgetContext1.Component)
    .withEnabledUrlParam('switch-enabled-1')
    .build();            

// Build Switch Button Context 2
const switchButtonContext2 = new SwitchButtonContextBuilder()
    .withChildren([widgetContext2.Component, widgetContext3.Component])
    .withEnabledUrlParam('switch-enabled-2')
    .build();

// Build App Context
const appContext = new AppContextBuilder()
    .withLanguage('en')
    .withLanguageUrlParam('app-lang')
    .withTheme('default')
    .withThemeUrlParam('app-theme')
    .withLanguageSetEventHandler(language => 
        Logger.debug(`Language set event: '${language}'`)
    )
    .withThemeSetEventHandler(theme => {
        Logger.debug(`Theme set event: '${theme}'`);
        document.body.dataset.theme = theme;
    })
    .withChildren([
        languageSwitcherWidgetContext.Component,
        currentLanguageWidgetContext.Component,
        switchButtonContext1.Component,
        switchButtonContext2.Component
    ])
    .build();

// Render app
appContext.render();

const testApi = () => {
    appContext.setLanguage('pt');

    Logger.debug(`Current language: '${appContext.getLanguage()}'`);
    Logger.debug(`Current theme: '${appContext.getTheme()}'`);
    Logger.debug(`Current state of switchButton2: ${switchButtonContext2.getEnabled() ? 'on' : 'off'}`);
    Logger.debug(`Current theme of widget3: '${widgetContext3.getTheme()}'`);

    widgetContext3.setTheme('blue');
    appContext.setLanguage('pt');
    appContext.setTheme('light');
    switchButtonContext2.setEnabled(!switchButtonContext2.getEnabled());

    Logger.debug(`Current language: '${appContext.getLanguage()}'`);
    Logger.debug(`Current theme: '${appContext.getTheme()}'`);
    Logger.debug(`Current state of switchButton2: ${switchButtonContext2.getEnabled() ? 'on': 'off'}`);
    Logger.debug(`Current theme of widget3: '${widgetContext3.getTheme()}'`);
};

document.getElementById('test-api-btn')
    .addEventListener('click', function() {
        testApi();
    });
```

## Screenshots of the example
![ContextBuilders](https://raw.githubusercontent.com/Yaroshvitaliy/cra-widgets-builder/main/assets/img/ContextBuilders.jpg)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `yarn docs:api`

Generates documentation of the API and saves it in `docs/api.md` file.\
Based on JSDoc markup comments in the code.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
