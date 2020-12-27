import React from 'react';
import { AppContext } from '../contexts/AppContext';

const LanguageSwitcher = () => (
    <AppContext.Consumer>
        { ({ setLanguage }) => (
            <>
                <div>
                    <button onClick={() => setLanguage('en')}>En</button>
                    <span> | </span>
                    <button onClick={() => setLanguage('ru')}>Ru</button>
                </div>
            </>
        )}
    </AppContext.Consumer>
);

export default LanguageSwitcher;