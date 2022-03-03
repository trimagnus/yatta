import Project from "./project.js";
import NewProjectPopup from "./modals/newProjectPopup.js";
import storage from "./storage.js";

export default class App extends HTMLElement {
  constructor(appData) {
    super();
    this.appData = appData;
    this.newProjectPopup = this.newProjectPopup.bind(this);
    this.removePopup = this.removePopup.bind(this);

    this.render();
    this.popup = null;
  }

  newProjectPopup() {
    this.popup = new NewProjectPopup(this);
    this.appendChild(this.popup);
    document.querySelector('body').classList.add('ModalOpen');

    //Not sure if I need preventScroll
    this.popup.inputFocus();
  }

  newProject(title) {
    const projectUID = storage.getNextProjectUID();
    storage.newProject(projectUID, title);
    this.render();
    window.scroll({
      top: document.body.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }

  removePopup() {
    if(this.popup) {
      this.popup.remove();
    }
    this.popup = null;
    document.querySelector('body').classList.remove('ModalOpen');
  }

  render() {
    this.innerHTML = `
    <header class="SiteHeader">
      <h1 class="SiteHeader-HeaderText">YATTA</h1>
    </header>
    <div class="Site-NewProject">+New Project</div>
    `;
    this.appData.forEach(pData => this.appendChild(new Project(this, pData)));

    this.querySelector('.Site-NewProject').addEventListener('click', this.newProjectPopup)
  }
}

customElements.define('app-element', App);