import React from 'react';
import { AppContext } from '../contexts/AppContext';
import { WidgetContext } from '../contexts/WidgetContext';

/**
 * The Language Switcher Component.
 * Must reside inside the @see {AppContext}, the @see {WidgetContext}.
 */
const LanguageSwitcher = () => {
    const { theme } = React.useContext(WidgetContext);

    return (
        <AppContext.Consumer>
            { ({ setLanguage }) => (
                <div className={`language-switcher theme theme-${theme}`}>
                    <button onClick={() => setLanguage('en')}>En</button>
                    <span> | </span>
                    <button onClick={() => setLanguage('es')}>Es</button>
                    <span> | </span>
                    <button onClick={() => setLanguage('pt')}>Pt</button>
                    <span> | </span>
                    <button onClick={() => setLanguage('fr')}>Fr</button>
                    <span> | </span>
                    <button onClick={() => setLanguage('ru')}>Ru</button>
                </div>
            )}
        </AppContext.Consumer>
    )};

export default LanguageSwitcher;