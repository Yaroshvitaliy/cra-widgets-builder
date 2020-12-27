import * as React from 'react';
import { AppContext } from '../contexts/AppContext';
import { SwitchButtonContext } from '../contexts/SwitchButtonContext';
import translate from '../services/translationService';
import './SwitchButton.scss';

const SwitchButton = () => {
    const { language } = React.useContext(AppContext);
    const { enabled, setEnabled } = React.useContext(SwitchButtonContext);

    return (     
        <div>
            <label className="switch">
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