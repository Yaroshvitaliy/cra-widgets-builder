import React from 'react';
import { AppContext } from '../contexts/AppContext';

const CurrentLanguage = () => (
    <AppContext.Consumer>
        { ({ language }) => (
            <>
                Language: {language}
            </>
        )}
    </AppContext.Consumer>
);

export default CurrentLanguage;