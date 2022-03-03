import Popup from "./popup.js";

export default class ProjectDeletePopup extends Popup {
  constructor(parent) {
    super(parent);
    this.deleteProject = this.deleteProject.bind(this);
    this.keyPressed = this.keyPressed.bind(this);

    this.render();
  }

  connectedCallback() {
    this.addEventListener('keydown', this.keyPressed);
    this.querySelector('.Popup-CancelButton').addEventListener('click', this.removePopup);
    this.querySelector('.Popup-ConfirmButton').addEventListener('click', this.deleteProject);
  }

  keyPressed(e) {
    if(e.code === 'Escape') {
      this.removePopup();
    } else if (e.code === 'Enter') {
      this.deleteProject();
    }
  }

  deleteProject(e) {
    this.removePopup();
    this.parent.deleteProject();
  }

  render() {
    super.render()

    this.popup.classList.add('Project-DeletePopup');
    this.popup.classList.add('Popup_Centered');
    this.popup.innerHTML = `
      <h2 class="Popup-Header">Delete project?</h2>
      <div class="Project-PopupButtonsContainer">
        <button class="Project-PopupButton Popup-CancelButton">Cancel</button>
        <button class="Project-PopupButton Popup-ConfirmButton">Confirm</button>
      </div>
    `;
  }
}

customElements.define('project-delete-element', ProjectDeletePopup);