import Popup from "./popup.js";

export default class ProjectRenamePopup extends Popup {
  constructor(parent) {
    super(parent);
    this.renameProject = this.renameProject.bind(this);
    this.keyPressed = this.keyPressed.bind(this);
    
    this.render();
  }

  connectedCallback() {
    this.addEventListener('keydown', this.keyPressed);
    this.querySelector('.Popup-CancelButton').addEventListener('click', this.removePopup);
    this.querySelector('.Popup-ConfirmButton').addEventListener('click', this.renameProject);
  }

  keyPressed(e) {
    if(e.code === 'Escape') {
      this.removePopup();
    } else if (e.code === 'Enter') {
      this.renameProject();
    }
  }

  renameProject(e) {
    const text = this.querySelector('.Project-RenamePopupInput').value;

    if(this.checkValidInput(text)) {
      this.parent.renameProject(text);
    }
    this.removePopup();
  }

  checkValidInput(text) {
    if(text) return true;
  }

  inputFocus() {
    this.querySelector('.Project-RenamePopupInput').focus();
  }

  render() {
    super.render();

    this.popup.classList.add('Project-RenamePopup');
    this.popup.classList.add('Popup_Centered');
    this.popup.innerHTML += `
      <h2 class="Popup-Header">Rename project</h2>
      <input placeholder="${this.parent.state.projectTitle}" class="Project-RenamePopupInput" type="text">
      <div class="Project-PopupButtonsContainer">
        <button class="Project-PopupButton Popup-CancelButton">Cancel</button>
        <button class="Project-PopupButton Popup-ConfirmButton">Confirm</button>
      </div>
    `;
  }
}

customElements.define('project-rename-element', ProjectRenamePopup);