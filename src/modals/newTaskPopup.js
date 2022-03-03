import Popup from "./popup.js";
import PriorityPicker from "../priorityPicker.js";
import { convertFromDateInput } from '../common.js';

export default class NewTaskPopup extends Popup {
  constructor(parent) {
    super(parent);
    this.createNewTask = this.createNewTask.bind(this);
    this.keyPressed = this.keyPressed.bind(this);
    
    this.render();
  }

  connectedCallback() {
    this.addEventListener('keydown', this.keyPressed);
    this.querySelector('.Popup-CancelButton').addEventListener('click', this.removePopup);
    this.querySelector('.Popup-ConfirmButton').addEventListener('click', this.createNewTask);
  }

  keyPressed(e) {
    if(e.code === 'Escape') {
      this.removePopup();
    } else if (e.code === 'Enter') {
      this.createNewTask();
    }
  }

  createNewTask(e) {
    const text = this.querySelector('.Task-NewTaskTextInput').value;

    if(!text || !this.checkValidInput(text)) {
      this.querySelector('.Task-NewTaskTextInput').classList.add('Task-TextError');
      return;
    }
    const datePicker = this.querySelector('.Task-DatePicker');
    const date = datePicker.value ? convertFromDateInput(datePicker.value) : "";

    const priority = this.querySelector('priority-picker').getPriority();
    this.parent.createNewTask(text, date, priority);
    this.removePopup();
  }

  checkValidInput(text) {
    if(text) return true;
  }

  inputFocus() {
    this.querySelector('.Task-NewTaskTextInput').focus();
  }

  render() {
    super.render();

    this.popup.classList.add('Task-NewTaskPopup');
    this.popup.classList.add('Popup_Centered');

    this.popup.innerHTML += `
      <h2 class="Popup-Header">New Task</h2>
      <input placeholder="Task details..." class="Task-NewTaskTextInput" type="text">
      
      <div class="Task-DatePickerContainer">
        <p>Date (Optional)</p>
        <input type="date" id="task-date" name="task-date" class="Task-DatePicker">
      </div>

      <priority-picker></priority-picker>

      <div class="Project-PopupButtonsContainer">
        <button class="Project-PopupButton Popup-CancelButton">Cancel</button>
        <button class="Project-PopupButton Popup-ConfirmButton">Confirm</button>
      </div>
    `;
  }
}

customElements.define('new-task-popup', NewTaskPopup);