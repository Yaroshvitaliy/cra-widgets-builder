import React from 'react';
import { AppContext } from '../contexts/AppContext';
import { WidgetContext } from '../contexts/WidgetContext';

/**
 * The Current Language Component.
 * Must reside inside the @see {AppContext}, the @see {WidgetContext}.
 */
const CurrentLanguage = () => {
    const { theme } = React.useContext(WidgetContext);
    
    return (
        <AppContext.Consumer>
            { ({ language }) => (
                <div className={`current-language theme theme-${theme}`}>
                    Language: {language}
                </div>
            )}
        </AppContext.Consumer>
    )};

export default CurrentLanguage;