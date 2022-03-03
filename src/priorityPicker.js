export default class PriorityPicker extends HTMLElement {
  constructor() {
    super();
    this.clickedPriority = this.clickedPriority.bind(this);

    this.render();
    this.fields = this.querySelectorAll('.Task-PriorityField');
    this.currentPriority = this.fields[0];
  }

  connectedCallback() {
    this.fields.forEach(field => {
      field.addEventListener('click', this.clickedPriority);
    });
  }

  clickedPriority(e) {
    this.changePriorityTarget(e.currentTarget);
  }

  changePriorityTarget(newTarget) {
    this.currentPriority.classList.remove('Task-PriorityField-Selected');
    this.currentPriority = newTarget;
    this.currentPriority.classList.add('Task-PriorityField-Selected');
  }

  setPriority(value) {
    const target = this.querySelector(`[data-priority=${value}]`);
    this.changePriorityTarget(target);
  }

  getPriority() {
    return this.currentPriority.dataset.priority;
  }

  render() {
    this.innerHTML = `
    <div class="Task-PriorityContainerOuter">
      <p>Priority</p>
      <div class="Task-PriorityContainerInner">
        <div class="Task-PriorityContainer-None Task-PriorityField Task-PriorityField-Selected" data-priority="No">
          <p>None</p>
          <div class="Task-Checkbox Task-Checkbox_Priority-No"></div>
        </div>

        <div class="Task-PriorityContainer-Low Task-PriorityField" data-priority="Low">
          <p>Low</p>
          <div class="Task-Checkbox Task-Checkbox_Priority-Low"></div>
        </div>

        <div class="Task-PriorityContainer-Med Task-PriorityField" data-priority="Med">
          <p>Med</p>
          <div class="Task-Checkbox Task-Checkbox_Priority-Med"></div>
        </div>

        <div class="Task-PriorityContainer-High Task-PriorityField" data-priority="High">
          <p>High</p>
          <div class="Task-Checkbox Task-Checkbox_Priority-High"></div>
        </div>
      </div>
    </div>
    `;
  }
}

customElements.define('priority-picker', PriorityPicker);