import Popup from './popup.js';

export default class ProjectPopupMenu extends Popup {
  constructor(parent) {
    super(parent);
    this.state = parent.state;
    this.renameButtonClicked = this.renameButtonClicked.bind(this);
    this.deleteButtonClicked = this.deleteButtonClicked.bind(this);

    this.render();
  }

  connectedCallback() {
    this.querySelector('.Project-DeleteButton').addEventListener('click', this.deleteButtonClicked);
    this.querySelector('.Project-RenameButton').addEventListener('click', this.renameButtonClicked);
  }

  renameButtonClicked(e) {
    this.parent.openRenamePopup(e);
  }

  deleteButtonClicked(e) {
    this.parent.deleteProjectConfirmPopup(e);
  }

  render() {
    super.render();

    this.popup.classList.add('Project-ControlsPopup');
    this.popup.innerHTML = `
      <ul class="Project-PopupControlsContainer">
        <li class="Project-RenameButton Project-PopupControlsButton">Rename Project</li>
        <li class="Project-DeleteButton Project-PopupControlsButton">Delete Project</li>
      </ul>
    `;
  }

}

customElements.define('project-popupmenu-element', ProjectPopupMenu);