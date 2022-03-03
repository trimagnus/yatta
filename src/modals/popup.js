// To extend the Popup class, super(parent) must be called and
// a render() function supplied, within which super.render() must
// be called first, and all internal html added to this.popup

export default class Popup extends HTMLElement{
  constructor(parent) {
    super();
    this.parent = parent;

    this.removePopup = this.removePopup.bind(this);

    //This is nessecary for the div to take focus and recieve keydown events
    this.tabIndex = "0";
  }

  removePopup(e) {
    if(e) e.stopImmediatePropagation();
    this.style.opacity = "0";
  
    setTimeout(()=>{
      this.parent.removePopup();
    },300);
  }

  render() {
    this.classList.add('Popup-Container');

    this.cover = document.createElement('div');
    this.cover.classList.add('Popup-Cover');
    this.appendChild(this.cover);

    this.popup = document.createElement('div');
    this.popup.classList.add('Popup');
    this.appendChild(this.popup);

    this.cover.addEventListener('click', this.removePopup);

    this.style.opacity = "0";

    setTimeout(() => {
      this.style.opacity = "1";
    }, 10);
  }
}