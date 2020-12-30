# Getting Started with Widgets Builder Library
This project was bootstrapped with ejected [Create React App](https://github.com/facebook/create-react-app).
Before running an example, you have to build the project (see instructions bellow).
The name of library is specified in package.json:
```
{
    ...
    "library": "wb",
    ...
}
```

## Example of using Widgets Builder Library API
```
      const {
          Logger,               // Logger service
          AppBuilder,           // application builder
          WidgetBuilder,        // widget builder    
          SwitchButtonBuilder,  // switch button component builder
          CurrentLanguage,      // current language component
          LanguageSwitcher,     // language switcher component
          SwitchButton          // switch button component
      } = wb;

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
          .withContainerId('container-1')
          .withChildren(SwitchButton)
          .withThemeSetEventHandler(theme => 
              Logger.debug(`Theme set event for widget3: '${theme}'`)
          )
          .build();

      const widgetContainer2 = new WidgetBuilder()
          .withContainerId('container-2')
          .withChildren(SwitchButton)
          .withThemeSetEventHandler(theme => 
              Logger.debug(`Theme set event for widget4: '${theme}'`)
          )
          .build();

      const widgetContainer3 = new WidgetBuilder()
          .withContainerId('container-3')
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

      app.render(document.getElementById('container'));

      // Test API
      widgetContainer3.setTheme('blue');

      setTimeout(() => {
          app.setLanguage('ru');
          app.setTheme('light');
          switchButton3.setEnabled(true);
          widgetContainer3.setTheme('dark');
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

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
