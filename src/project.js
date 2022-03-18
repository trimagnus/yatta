import Task from './task.js';
import ProjectPopupMenu from './modals/projectPopupMenu.js';
import ProjectRenamePopup from './modals/projectRenamePopup.js';
import ProjectDeletePopup from './modals/projectDeletePopup.js';
import NewTaskPopup from './modals/newTaskPopup.js';
import { sortFunctions, sortIcons, MAX_SORT_MODES } from './common.js';
import storage from "./storage.js";

export default class Project extends HTMLElement {
  constructor(parent, state, allowControls=true) {
    super();
    this.parent = parent;
    this.state = state;
    this.allowControls = allowControls;
    this.tasks = state.tasks.map(taskState => new Task(this, taskState));

    this.navArrowClicked = this.navArrowClicked.bind(this);
    this.navDotsClicked = this.navDotsClicked.bind(this);
    this.newTaskClicked = this.newTaskClicked.bind(this);
    this.sortButtonClicked = this.sortButtonClicked.bind(this);

    this.render();

    this.popup = null;
  }

  sortButtonClicked() {
    this.state.sortMode += 1;
    if(this.state.sortMode > MAX_SORT_MODES) this.state.sortMode = 1;
    storage.updateProject(this.state.uid, this.state);
    this.render();
  }

  newTaskClicked(e) {
    this.openNewTaskPopup();
  }

  navArrowClicked(e) {
    const cTarget = e.currentTarget;

    const taskContainer = this.querySelector('.Project-Container');
    const arrow = cTarget.firstElementChild;

    taskContainer.classList.toggle('Project-Container_Hidden');
    arrow.classList.toggle('fa-angle-down')
    arrow.classList.toggle('fa-angle-up')
  }

  navDotsClicked(e) {
    this.openMenuPopup();
  }

  renameProject(text) {
    this.state.projectTitle = text;
    this.render();

    storage.updateProject(this.state.uid, this.state)
  }

  openMenuPopup() {
    this.popup = new ProjectPopupMenu(this);
    this.querySelector('.Project').appendChild(this.popup);
    document.querySelector('body').classList.add('ModalOpen');
  }

  openRenamePopup(e) {
    this.removePopup();
    this.popup = new ProjectRenamePopup(this);
    this.querySelector('.Project').appendChild(this.popup);
    this.popup.inputFocus();
    document.querySelector('body').classList.add('ModalOpen');
  }

  openNewTaskPopup(e) {
    this.removePopup();
    this.popup = new NewTaskPopup(this);
    this.querySelector('.Project').appendChild(this.popup);
    this.popup.inputFocus();
    document.querySelector('body').classList.add('ModalOpen');
  }

  deleteProjectConfirmPopup(e) {
    this.removePopup();
    this.popup = new ProjectDeletePopup(this);
    this.querySelector('.Project').appendChild(this.popup);
    this.popup.focus();
    document.querySelector('body').classList.add('ModalOpen');
  }

  removePopup() {
    if(this.popup) {
      this.popup.remove();
    }
    this.popup = null;
    document.querySelector('body').classList.remove('ModalOpen');
  }

  deleteProject() {
    storage.deleteProject(this.state.uid);
    this.remove();
  }

  createNewTask(text, date, priority) {
    const uid = storage.getNextTaskUID();
    const data = {
      uid: uid,
      puid: this.state.uid,
      priority: priority,
      date: date,
      text: text,
      completed: false
    };
    storage.newTask(this.state.uid, data);
    this.tasks.push(new Task(this, data));
    this.render();
    //Implement a scroll to added task feature

    // const lastTask = this.tasks[this.tasks.length-1];
    // console.log(lastTask.getBoundingClientRect())

    // window.scroll({
    //   bottom: lastTask.getBoundingClientRect().y,
    //   left: 0,
    //   behavior: 'smooth'
    // });
  }

  deleteTask(taskUID) {
    const index = this.tasks.findIndex(task => task.state.uid === taskUID);
    this.tasks.splice(index, 1);
    this.render();
  }

  getSortIcon() {
    return sortIcons[this.state.sortMode];
  }

  sortTasks() {
    const sortFunc = sortFunctions[this.state.sortMode];
    this.tasks.sort(sortFunc);
  }

  render() {
    this.innerHTML = `
      <div data-uid=${this.state.uid} class="Project">
        <div class="Project-HeaderContainer">
          <div class="Project-Header">
            <div class="Project-NavLeft">
              
            </div>
            <div class="Project-HeaderTextContainer">
              <div class="Project-HeaderText">${this.state.projectTitle}</div>
              <div class="Project-HeaderCount">${this.tasks.length}</div>
              <div class="Project-SortButton">
                ${this.getSortIcon()}
              </div>
            </div>
            <div class="Project-NavRight">
              
            </div>
          </div>
        </div>

        <div class="Project-Container">
          
        </div>
      </div
    `;

    this.sortTasks();
    this.projectContainer = this.querySelector('.Project-Container');
    this.projectContainer.prepend(...this.tasks);

    if(this.allowControls) {
      this.querySelector('.Project-NavLeft').innerHTML = `
        <div data-uid="${this.state.uid}" class="Project-NavArrow Project-NavIcon">
          <i class="fas fa-angle-down"></i>
        </div>
      `;
      this.querySelector('.Project-NavRight').innerHTML = `
        <div class="Project-NavIcon Project-NewTaskButton">
          <i class="fa-solid fa-plus"></i>
        </div>
        <div data-uid="${this.state.uid}" data-popup="false" class="Project-NavDots Project-NavIcon">
          <i class="fas fa-ellipsis-v"></i>
        </div>
      `;
      this.querySelector('.Project-NavArrow').addEventListener('click', this.navArrowClicked);
      this.querySelector('.Project-NavDots').addEventListener('click', this.navDotsClicked);
      this.querySelector('.Project-NewTaskButton').addEventListener('click', this.newTaskClicked);
    }
    this.querySelector('.Project-SortButton').addEventListener('click', this.sortButtonClicked);
  }
}

customElements.define('project-element', Project);