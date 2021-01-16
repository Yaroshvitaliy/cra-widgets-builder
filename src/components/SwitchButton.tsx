import * as React from 'react';
import { AppContext } from '../contexts/AppContext';
import { WidgetContext } from '../contexts/WidgetContext';
import { SwitchButtonContext } from '../contexts/SwitchButtonContext';
import translate from '../services/translationService';
import './SwitchButton.scss';

/**
 * The Switch Button Component.
 * Must reside inside the @see {AppContext}, the @see {SwitchButtonContext}, the @see {WidgetContext}.
 */
const SwitchButton = () => {
    const { language } = React.useContext(AppContext);
    const { theme } = React.useContext(WidgetContext);
    const { enabled, setEnabled } = React.useContext(SwitchButtonContext);

    return (     
        <div>
            <label className={`switch theme theme-${theme}`}>
                {translate('off', language)}
                <input type="checkbox" 
                       checked={ enabled } 
                       onChange={ ({ target: { checked } }) => setEnabled(checked)} />
                <i></i>
                {translate('on', language)}
            </label>         
        </div>       

    )};

export default SwitchButton;