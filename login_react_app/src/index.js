import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import { getCurrentLanguage } from './helpers/common';
import configureStore from './configureStore';
import common_es from './languages/en/common.json'

const { store } = configureStore();

const languageWithoutRegionCode = getCurrentLanguage();

i18next.init({
    interpolation: { escapeValue: false },  // React already does escaping
    lng: languageWithoutRegionCode,
    fallbackLng: "en",
    resources: {
        en: {
            common: common_es
        },
        es:{

        }
    },
});

ReactDOM.render(
    <Provider store={store}>
        <I18nextProvider i18n={i18next}>
            <App />
        </I18nextProvider>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
