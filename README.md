# Getting Started with Widgets Builder Library
Widgets Builder Library helps to build widgets that behave like an application and embed them into any place in html document.\
This project was bootstrapped with ejected [Create React App](https://github.com/facebook/create-react-app).\
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
<h3>App Builder</h3>
<h5>Language Switcher</h5>
<div id="app-language-switcher"></div>
<h5>Current Language</h5>
<div id="app-current-language"></div>
<h5>Switch Button Widget 1</h5>
<div id="app-switch-button-widget-1"></div>
<h5>Switch Button Widget 2</h5>
<div id="app-switch-button-widget-2"></div>
<h5>Switch Button Widget 3</h5>
<div id="app-switch-button-widget-3"></div>
```
#### index.js
```javascript
const {
    Logger,               // logger service
    AppBuilder,           // application builder
    WidgetBuilder,        // widget builder    
    SwitchButtonBuilder,  // switch button component builder
    CurrentLanguage,      // current language component
    LanguageSwitcher,     // language switcher component
    SwitchButton          // switch button component
} = wb;

// Build Language Switcher Widget
const widgetLanguageSwitcher = new WidgetBuilder()
    .withChildren(LanguageSwitcher)
    .withContainer(document.getElementById('app-language-switcher'))
    .build();

// Build Current Language Widget
const widgetCurrentLanguage = new WidgetBuilder()
    .withChildren(CurrentLanguage)
    .withContainer(document.getElementById('app-current-language'))
    .build();

// Build Switch Button Widget 1
const widget1 = new WidgetBuilder()
    .withChildren(SwitchButton)
    .withContainer(document.getElementById('app-switch-button-widget-1'))
    .build();

// Build Switch Button Widget 2
const widget2 = new WidgetBuilder()
    .withChildren(SwitchButton)
    .withContainer(document.getElementById('app-switch-button-widget-2'))
    .build();

// Build Switch Button Widget 3
const widget3 = new WidgetBuilder()
    .withChildren(SwitchButton)
    .withContainer(document.getElementById('app-switch-button-widget-3'))
    .build();

// Build Switch Button 1
const switchButton1 = new SwitchButtonBuilder()
    .withChildren(widget1.Component)
    .build();            

// Build Switch Button 2
const switchButton2 = new SwitchButtonBuilder()
    .withChildren([widget2.Component, widget3.Component])
    .build();

// Build App
const app = new AppBuilder()
    .withLanguage('en')
    .withTheme('default')
    .withLanguageSetEventHandler(language => 
        Logger.debug(`Language set event: '${language}'`)
    )
    .withThemeSetEventHandler(theme => {
        Logger.debug(`Theme set event: '${theme}'`);
        document.body.dataset.theme = theme;
    })
    .withChildren([
        widgetLanguageSwitcher.Component,
        widgetCurrentLanguage.Component,
        switchButton1.Component,
        switchButton2.Component
    ])
    .build();

// Render app
app.render();

// Test API
Logger.debug(`Current language: '${app.getLanguage()}'`);
Logger.debug(`Current theme: '${app.getTheme()}'`);
Logger.debug(`Current state of switchButton2: ${switchButton2.getState() ? 'on' : 'off'}`);

Logger.debug(`Current theme of widget3: '${widget3.getTheme()}'`);

widget3.setTheme('blue');

Logger.debug(`Current theme of widget3: '${widget3.getTheme()}'`);

setTimeout(() => {
    app.setLanguage('pt');
    app.setTheme('light');
    switchButton2.toggleState();

    Logger.debug(`Current language: '${app.getLanguage()}'`);
    Logger.debug(`Current theme: '${app.getTheme()}'`);
    Logger.debug(`Current state of switchButton2: ${switchButton2.getState() ? 'on': 'off'}`);
}, 3000);
```

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

### `yarn docs:api`

Generates documentation of the API and saves it in `docs/api.md` file.\
Based on JSDoc markup comments in the code.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
