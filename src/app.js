import Project from "./project.js";
import NewProjectPopup from "./modals/newProjectPopup.js";
import storage from "./storage.js";

export default class App extends HTMLElement {
  constructor(appData) {
    super();
    this.appData = appData;
    this.newProjectPopup = this.newProjectPopup.bind(this);
    this.clickedAllProjectsButton = this.clickedAllProjectsButton.bind(this);
    this.clickedAllTasksButton = this.clickedAllTasksButton.bind(this);
    this.clickedFilterButton = this.clickedFilterButton.bind(this);
    this.removePopup = this.removePopup.bind(this);

    this.render();
    this.popup = null;
  }

  newProjectPopup() {
    this.popup = new NewProjectPopup(this);
    // this.appendChild(this.popup);
    document.body.appendChild(this.popup);
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

  clickedAllProjectsButton() {
    this.showAllProjects();
  }

  clickedAllTasksButton() {
    this.showAllTasks();
  }

  clickedFilterButton() {
    this.showFilter();
  }

  showAllProjects() {
    let content = this.querySelector('.Site-Content');
    content.innerHTML = '';
    this.appData.forEach(pData => content.appendChild(new Project(this, pData, true)));
  }

  showAllTasks() {
    let content = this.querySelector('.Site-Content');
    content.innerHTML = '';
    let tasks = [];
    // this.appData.forEach(pData => tasks.concat(pData.tasks));
    for(let pData of this.appData) {
      tasks = tasks.concat(pData.tasks);
    }

    let pseudo = {
      uid: 999,
      projectTitle: '[All Tasks]',
      sortMode: 1,
      tasks: tasks,
    };
    content.appendChild(new Project(this, pseudo, false));
  }

  showFilter() {
    let content = this.querySelector('.Site-Content');
    content.innerHTML = '(To be implemented)';
    let filter = null;
    //   if(filter) {
    //     //Create the appropriate pseudo-project based on filter
    //   }
    console.log('Showing filter dialog');
  }

  render() {
    this.innerHTML = `
    <header class="SiteHeader">
      <h1 class="SiteHeader-HeaderText">YATTA</h1>
      <div class="Filter-Container">
        <div class="Filter-Button Filter-Button_AllProjects">All Projects</div>
        <div class="Filter-Button Filter-Button_AllTasks">All Tasks</div>
        <div class="Filter-Button Filter-Button_Filter">Filter</div>
      </div>
    </header>
    <div class="Site-NewProject">+New Project</div>
    <div class="Site-Content"></div>
    `;

    this.showAllProjects();
    
    this.querySelector('.Site-NewProject').addEventListener('click', this.newProjectPopup)
    this.querySelector('.Filter-Button_AllProjects').addEventListener('click', this.clickedAllProjectsButton);
    this.querySelector('.Filter-Button_AllTasks').addEventListener('click', this.clickedAllTasksButton);
    this.querySelector('.Filter-Button_Filter').addEventListener('click', this.clickedFilterButton);
  }
}

customElements.define('app-element', App);