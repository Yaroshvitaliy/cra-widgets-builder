
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Api from './api/index';

const { renderApp } = Api;

if (document.getElementById('root')) {
  renderApp(App, document.getElementById('root'));
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export default Api;