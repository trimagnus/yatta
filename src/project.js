import Task from './task.js';
import ProjectPopupMenu from './modals/projectPopupMenu.js';
import ProjectRenamePopup from './modals/projectRenamePopup.js';
import ProjectDeletePopup from './modals/projectDeletePopup.js';
import NewTaskPopup from './modals/newTaskPopup.js';
import storage from "./storage.js";

const sortState = {
  ALPHA: 1,
  REVERSE_ALPHA: 2,
  DATE: 3,
  REVERSE_DATE: 4,
  PRIORITY: 5,
  REVERSE_PRIORITY: 6
};

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
    console.log('sort me')
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

  renameProject(text) {
    this.state.projectTitle = text;
    this.render();

    storage.updateProject(this.state.uid, this.state)
  }

  navDotsClicked(e) {
    this.openMenuPopup();
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
                <i class="fa-solid fa-arrow-down-a-z"></i>
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


    //Run sort based on sort mode!
    this.tasks.sort((a,b) => {
      if(a.state.text > b.state.text) {
        return 1;
      } else if (a.state.text < b.state.text) {
        return -1;
      }
      return 0;
    });
    //

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
      this.querySelector('.Project-SortButton').addEventListener('click', this.sortButtonClicked);
    }
  }
}

customElements.define('project-element', Project);