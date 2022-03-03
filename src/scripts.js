import storage from "./storage.js";
import App from "./app.js";

console.log("here")

let appData = storage.retrieveData();
document.querySelector('body').appendChild(new App(appData.projects));