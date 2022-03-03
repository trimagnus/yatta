import Popup from "./popup.js";
import PriorityPicker from "../priorityPicker.js";
import { convertToDateInput, convertFromDateInput } from "../common.js";

export default class TaskEditorPopup extends Popup {
  constructor(parent, state) {
    super(parent);

    this.state = state;
    this.updateTask = this.updateTask.bind(this);
    this.keyPressed = this.keyPressed.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    
    this.render();
  }

  connectedCallback() {
    this.addEventListener('keydown', this.keyPressed);
    this.querySelector('.Popup-CancelButton').addEventListener('click', this.removePopup);
    this.querySelector('.Popup-ConfirmButton').addEventListener('click', this.updateTask);
    this.querySelector('.Task-DeleteTaskButton').addEventListener('click', this.deleteTask);
  }

  keyPressed(e) {
    if(e.code === 'Escape') {
      this.removePopup();
    } else if (e.code === 'Enter') {
      this.updateTask();
    }
  }

  updateTask(e) {
    const text = this.querySelector('.Task-NewTaskTextInput').value;

    if(!text || !this.checkValidInput(text)) {
      this.querySelector('.Task-NewTaskTextInput').classList.add('Task-TextError');
      return;
    }

    const datePicker = this.querySelector('.Task-DatePicker');
    const date = datePicker.value ? convertFromDateInput(datePicker.value) : "";

    this.state.text = text;
    this.state.date = date;
    this.state.priority = this.querySelector('priority-picker').getPriority();
    this.parent.updateTask(this.state);
    this.removePopup();
  }

  deleteTask(e) {
    this.parent.deleteTask();
  }

  checkValidInput(text) {
    if(text) return true;
  }

  inputFocus() {
    const input = this.querySelector('.Task-NewTaskTextInput')
    input.focus();

    //Work around to put cursor at end of input field
    const val = input.value;
    input.value = '';
    input.value = val;
  }

  render() {
    super.render();

    this.popup.classList.add('Task-NewTaskPopup');
    this.popup.classList.add('Popup_Centered');

    this.popup.innerHTML += `
      <h2 class="Popup-Header">Update Task</h2>
      <input placeholder="${this.state.text}" class="Task-NewTaskTextInput" type="text" value="${this.state.text}">
      
      <div class="Task-DatePickerContainer">
        <p>Date (Optional)</p>
        <input type="date" id="task-date" name="task-date" class="Task-DatePicker" value="${convertToDateInput(this.state.date)}">
      </div>

      <priority-picker></priority-picker>

      <div class="Project-PopupButtonsContainer">
        <button class="Project-PopupButton Popup-CancelButton">Cancel</button>
        <button class="Project-PopupButton Popup-ConfirmButton">Confirm</button>
      </div>

      <button class="Task-DeleteTaskButton">Delete Task</button>
    `;
    this.querySelector('priority-picker').setPriority(this.state.priority);
  }
}

customElements.define('task-editor-popup', TaskEditorPopup);