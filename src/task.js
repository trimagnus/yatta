import storage from "./storage.js";
import TaskEditorPopup from "./modals/taskEditorPopup.js";

export default class Task extends HTMLElement {
  constructor(parent, state) {
    super();
    this.parent = parent;
    this.state = state;
    this.clickedEditor = this.clickedEditor.bind(this);
    this.clickedCheckbox = this.clickedCheckbox.bind(this);
    this.render();

    this.popup = null;
  }

  clickedCheckbox(e) {
    this.state.completed = !this.state.completed;
    this.render();

    storage.updateTask(this.state.puid, this.state.uid, this.state)
  }

  clickedEditor() {
    this.removePopup();
    this.popup = new TaskEditorPopup(this, this.state);
    this.querySelector('.Task').appendChild(this.popup);
    this.popup.inputFocus();
    document.querySelector('body').classList.add('ModalOpen');
  }

  removePopup() {
    if(this.popup) {
      this.popup.remove();
    }
    this.popup = null;
    document.querySelector('body').classList.remove('ModalOpen');
  }

  updateTask(state) {
    this.state = state;
    this.state.puid = this.parent.state.uid;
    this.render();

    storage.updateTask(this.state.puid, this.state.uid, this.state);
  }

  deleteTask() {
    storage.deleteTask(this.state.puid, this.state.uid);
    this.parent.deleteTask(this.state.uid);
    this.remove();
  }

  render() {
    this.innerHTML = `
    <div class="Task">
      <div class="Task-CheckboxContainer">
        <div class="Task-Checkbox Task-Checkbox_Priority-${this.state.priority} ${this.state.completed ? 'Task-Checkbox_Complete' : ''}"></div>
      </div>
      <div class="Task-CenterContainer">
        <div class="Task-Text ${this.state.completed ? 'Task-Text_Complete' : ''}">${this.state.text}</div>
        <div class="Task-Date ${this.state.completed ? 'Task-Date_Complete' : ''}">${this.state.date}</div>
      </div>
      
    </div>
    `;

    this.querySelector('.Task-CenterContainer').addEventListener('click', this.clickedEditor);
    this.querySelector('.Task-CheckboxContainer').addEventListener('click', this.clickedCheckbox);
  }
}

customElements.define('task-element', Task);