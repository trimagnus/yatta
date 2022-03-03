import './styles.css';
import './node_modules/@fortawesome/fontawesome-free/css/all.css';
import './favicon.svg';

import storage from "./src/storage.js";
import App from "./src/app.js";

let appData = storage.retrieveData();
document.querySelector('body').appendChild(new App(appData.projects));