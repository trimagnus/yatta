import '../styles.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
import '../favicon.svg';

import storage from "./storage.js";
import App from "./app.js";

console.log("here")

let appData = storage.retrieveData();
document.querySelector('body').appendChild(new App(appData.projects));