import Popup from './popup.js';

export default class NewProjectPopup extends Popup {
  constructor(parent) {
    super(parent);
    this.createProject = this.createProject.bind(this);
    this.keyPressed = this.keyPressed.bind(this);

    this.render();
  }

  connectedCallback() {
    this.addEventListener('keydown', this.keyPressed);
    this.querySelector('.Popup-CancelButton').addEventListener('click', this.removePopup);
    this.querySelector('.Popup-ConfirmButton').addEventListener('click', this.createProject);
  }

  keyPressed(e) {
    if(e.code === 'Escape') {
      this.removePopup();
    } else if (e.code === 'Enter') {
      this.createProject();
    }
  }

  inputFocus() {
    this.querySelector('.Popup-NewProjectInput').focus();
  }

  createProject(e) {
    const text = this.querySelector('.Popup-NewProjectInput').value;

    if(this.checkValidInput(text)) {
      this.parent.newProject(text);
    }
    this.removePopup();
  }

  checkValidInput(text) {
    if(text) return true;
  }

  render() {
    super.render();

    this.popup.classList.add('Popup-NewProject');
    this.popup.classList.add('Popup_Centered')

    this.popup.innerHTML = `
    <h2 class="Popup-Header">New project</h2>
    <input placeholder="Project name..." class="Popup-NewProjectInput" type="text">
    <div class="Project-PopupButtonsContainer">
      <button class="Project-PopupButton Popup-CancelButton">Cancel</button>
      <button class="Project-PopupButton Popup-ConfirmButton">Confirm</button>
    </div>
  `;
  }
}

customElements.define('new-project-popup', NewProjectPopup);