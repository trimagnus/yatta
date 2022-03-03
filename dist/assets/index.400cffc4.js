const b=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&o(u)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerpolicy&&(r.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?r.credentials="include":i.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}};b();var w={nextProjectUID:4,nextTaskUID:9,projects:[{uid:1,projectTitle:"This is a project",tasks:[{uid:1,priority:"High",date:"01/02/2022",text:"Buy bananas",completed:!1},{uid:2,priority:"Low",date:"01/02/2022",text:"Program more",completed:!0},{uid:3,priority:"Med",date:"01/02/2022",text:"Walk!",completed:!1},{uid:4,priority:"No",date:"01/02/2022",text:"This has no priority",completed:!1}]},{uid:2,projectTitle:"Another Project",tasks:[{uid:5,priority:"High",date:"01/02/2022",text:"Build a rocket",completed:!1},{uid:6,priority:"Low",date:"01/02/2022",text:"Run around!",completed:!1},{uid:7,priority:"Med",date:"01/02/2022",text:"Take over the world",completed:!1},{uid:8,priority:"No",date:"01/02/2022",text:"Do other stuff as I see fit",completed:!1}]},{uid:3,projectTitle:"Empty Project",tasks:[]}]};let n={};localStorage.length<1?n=w:n=JSON.parse(localStorage.getItem("data"));function p(s){return n.projects.findIndex(e=>e.uid===s)}function h(s,e){return n.projects[p(s)].tasks.findIndex(t=>t.uid===e)}function c(){localStorage.setItem("data",JSON.stringify(n))}function x(){const s=n.nextProjectUID++;return c(),s}function L(){const s=n.nextTaskUID++;return c(),s}function S(s,e){const t={uid:s,projectTitle:e,tasks:[]};n.projects.push(t),c()}function E(s,e){n.projects[p(s)]=e,c()}function B(s){const e=p(s);n.projects.splice(e,1),c()}function N(s,e){n.projects[p(s)].tasks.push(e),c()}function g(s,e,t){const o=p(s),i=h(s,e);n.projects[o].tasks[i]=t,c()}function q(s,e){const t=p(s),o=h(s,e);n.projects[t].tasks.splice(o,1),c()}function I(){return n}var a={newProject:S,updateProject:E,deleteProject:B,newTask:N,updateTask:g,deleteTask:q,retrieveData:I,getNextProjectUID:x,getNextTaskUID:L};class d extends HTMLElement{constructor(e){super();this.parent=e,this.removePopup=this.removePopup.bind(this),this.tabIndex="0"}removePopup(e){e&&e.stopImmediatePropagation(),this.style.opacity="0",setTimeout(()=>{this.parent.removePopup()},300)}render(){this.classList.add("Popup-Container"),this.cover=document.createElement("div"),this.cover.classList.add("Popup-Cover"),this.appendChild(this.cover),this.popup=document.createElement("div"),this.popup.classList.add("Popup"),this.appendChild(this.popup),this.cover.addEventListener("click",this.removePopup),this.style.opacity="0",setTimeout(()=>{this.style.opacity="1"},10)}}class D extends HTMLElement{constructor(){super();this.clickedPriority=this.clickedPriority.bind(this),this.render(),this.fields=this.querySelectorAll(".Task-PriorityField"),this.currentPriority=this.fields[0]}connectedCallback(){this.fields.forEach(e=>{e.addEventListener("click",this.clickedPriority)})}clickedPriority(e){this.changePriorityTarget(e.currentTarget)}changePriorityTarget(e){this.currentPriority.classList.remove("Task-PriorityField-Selected"),this.currentPriority=e,this.currentPriority.classList.add("Task-PriorityField-Selected")}setPriority(e){const t=this.querySelector(`[data-priority=${e}]`);this.changePriorityTarget(t)}getPriority(){return this.currentPriority.dataset.priority}render(){this.innerHTML=`
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
    `}}customElements.define("priority-picker",D);function P(s){let e=s.split("-");return`${e[1]}/${e[2]}/${e[0]}`}function H(s){let e=s.split("/");return e[2].length===2&&(e[2]=`20${e[2]}`),`${e[2]}-${e[0]}-${e[1]}`}class k extends d{constructor(e,t){super(e);this.state=t,this.updateTask=this.updateTask.bind(this),this.keyPressed=this.keyPressed.bind(this),this.deleteTask=this.deleteTask.bind(this),this.render()}connectedCallback(){this.addEventListener("keydown",this.keyPressed),this.querySelector(".Popup-CancelButton").addEventListener("click",this.removePopup),this.querySelector(".Popup-ConfirmButton").addEventListener("click",this.updateTask),this.querySelector(".Task-DeleteTaskButton").addEventListener("click",this.deleteTask)}keyPressed(e){e.code==="Escape"?this.removePopup():e.code==="Enter"&&this.updateTask()}updateTask(e){const t=this.querySelector(".Task-NewTaskTextInput").value;if(!t||!this.checkValidInput(t)){this.querySelector(".Task-NewTaskTextInput").classList.add("Task-TextError");return}const o=this.querySelector(".Task-DatePicker"),i=o.value?P(o.value):"";this.state.text=t,this.state.date=i,this.state.priority=this.querySelector("priority-picker").getPriority(),this.parent.updateTask(this.state),this.removePopup()}deleteTask(e){this.parent.deleteTask()}checkValidInput(e){if(e)return!0}inputFocus(){const e=this.querySelector(".Task-NewTaskTextInput");e.focus();const t=e.value;e.value="",e.value=t}render(){super.render(),this.popup.classList.add("Task-NewTaskPopup"),this.popup.classList.add("Popup_Centered"),this.popup.innerHTML+=`
      <h2 class="Popup-Header">Update Task</h2>
      <input placeholder="${this.state.text}" class="Task-NewTaskTextInput" type="text" value="${this.state.text}">
      
      <div class="Task-DatePickerContainer">
        <p>Date (Optional)</p>
        <input type="date" id="task-date" name="task-date" class="Task-DatePicker" value="${H(this.state.date)}">
      </div>

      <priority-picker></priority-picker>

      <div class="Project-PopupButtonsContainer">
        <button class="Project-PopupButton Popup-CancelButton">Cancel</button>
        <button class="Project-PopupButton Popup-ConfirmButton">Confirm</button>
      </div>

      <button class="Task-DeleteTaskButton">Delete Task</button>
    `,this.querySelector("priority-picker").setPriority(this.state.priority)}}customElements.define("task-editor-popup",k);class l extends HTMLElement{constructor(e,t){super();this.parent=e,this.state=t,this.clickedEditor=this.clickedEditor.bind(this),this.clickedCheckbox=this.clickedCheckbox.bind(this),this.render(),this.popup=null}clickedCheckbox(e){this.state.completed=!this.state.completed,this.render(),a.updateTask(this.parent.state.uid,this.state.uid,this.state)}clickedEditor(){this.removePopup(),this.popup=new k(this,this.state),this.querySelector(".Task").appendChild(this.popup),this.popup.inputFocus(),document.querySelector("body").classList.add("ModalOpen")}removePopup(){this.popup&&this.popup.remove(),this.popup=null,document.querySelector("body").classList.remove("ModalOpen")}updateTask(e){this.state=e,this.render(),a.updateTask(this.parent.state.uid,this.state.uid,this.state)}deleteTask(){a.deleteTask(this.parent.state.uid,this.state.uid),this.parent.deleteTask(this.state.uid),this.remove()}render(){this.innerHTML=`
    <div class="Task">
      <div class="Task-CheckboxContainer">
        <div class="Task-Checkbox Task-Checkbox_Priority-${this.state.priority} ${this.state.completed?"Task-Checkbox_Complete":""}"></div>
      </div>
      <div class="Task-CenterContainer">
        <div class="Task-Text ${this.state.completed?"Task-Text_Complete":""}">${this.state.text}</div>
        <div class="Task-Date ${this.state.completed?"Task-Date_Complete":""}">${this.state.date}</div>
      </div>
      
    </div>
    `,this.querySelector(".Task-CenterContainer").addEventListener("click",this.clickedEditor),this.querySelector(".Task-CheckboxContainer").addEventListener("click",this.clickedCheckbox)}}customElements.define("task-element",l);class v extends d{constructor(e){super(e);this.state=e.state,this.renameButtonClicked=this.renameButtonClicked.bind(this),this.deleteButtonClicked=this.deleteButtonClicked.bind(this),this.render()}connectedCallback(){this.querySelector(".Project-DeleteButton").addEventListener("click",this.deleteButtonClicked),this.querySelector(".Project-RenameButton").addEventListener("click",this.renameButtonClicked)}renameButtonClicked(e){this.parent.openRenamePopup(e)}deleteButtonClicked(e){this.parent.deleteProjectConfirmPopup(e)}render(){super.render(),this.popup.classList.add("Project-ControlsPopup"),this.popup.innerHTML=`
      <ul class="Project-PopupControlsContainer">
        <li class="Project-RenameButton Project-PopupControlsButton">Rename Project</li>
        <li class="Project-DeleteButton Project-PopupControlsButton">Delete Project</li>
      </ul>
    `}}customElements.define("project-popupmenu-element",v);class y extends d{constructor(e){super(e);this.renameProject=this.renameProject.bind(this),this.keyPressed=this.keyPressed.bind(this),this.render()}connectedCallback(){this.addEventListener("keydown",this.keyPressed),this.querySelector(".Popup-CancelButton").addEventListener("click",this.removePopup),this.querySelector(".Popup-ConfirmButton").addEventListener("click",this.renameProject)}keyPressed(e){e.code==="Escape"?this.removePopup():e.code==="Enter"&&this.renameProject()}renameProject(e){const t=this.querySelector(".Project-RenamePopupInput").value;this.checkValidInput(t)&&this.parent.renameProject(t),this.removePopup()}checkValidInput(e){if(e)return!0}inputFocus(){this.querySelector(".Project-RenamePopupInput").focus()}render(){super.render(),this.popup.classList.add("Project-RenamePopup"),this.popup.classList.add("Popup_Centered"),this.popup.innerHTML+=`
      <h2 class="Popup-Header">Rename project</h2>
      <input placeholder="${this.parent.state.projectTitle}" class="Project-RenamePopupInput" type="text">
      <div class="Project-PopupButtonsContainer">
        <button class="Project-PopupButton Popup-CancelButton">Cancel</button>
        <button class="Project-PopupButton Popup-ConfirmButton">Confirm</button>
      </div>
    `}}customElements.define("project-rename-element",y);class m extends d{constructor(e){super(e);this.deleteProject=this.deleteProject.bind(this),this.keyPressed=this.keyPressed.bind(this),this.render()}connectedCallback(){this.addEventListener("keydown",this.keyPressed),this.querySelector(".Popup-CancelButton").addEventListener("click",this.removePopup),this.querySelector(".Popup-ConfirmButton").addEventListener("click",this.deleteProject)}keyPressed(e){e.code==="Escape"?this.removePopup():e.code==="Enter"&&this.deleteProject()}deleteProject(e){this.removePopup(),this.parent.deleteProject()}render(){super.render(),this.popup.classList.add("Project-DeletePopup"),this.popup.classList.add("Popup_Centered"),this.popup.innerHTML=`
      <h2 class="Popup-Header">Delete project?</h2>
      <div class="Project-PopupButtonsContainer">
        <button class="Project-PopupButton Popup-CancelButton">Cancel</button>
        <button class="Project-PopupButton Popup-ConfirmButton">Confirm</button>
      </div>
    `}}customElements.define("project-delete-element",m);class T extends d{constructor(e){super(e);this.createNewTask=this.createNewTask.bind(this),this.keyPressed=this.keyPressed.bind(this),this.render()}connectedCallback(){this.addEventListener("keydown",this.keyPressed),this.querySelector(".Popup-CancelButton").addEventListener("click",this.removePopup),this.querySelector(".Popup-ConfirmButton").addEventListener("click",this.createNewTask)}keyPressed(e){e.code==="Escape"?this.removePopup():e.code==="Enter"&&this.createNewTask()}createNewTask(e){const t=this.querySelector(".Task-NewTaskTextInput").value;if(!t||!this.checkValidInput(t)){this.querySelector(".Task-NewTaskTextInput").classList.add("Task-TextError");return}const o=this.querySelector(".Task-DatePicker"),i=o.value?P(o.value):"",r=this.querySelector("priority-picker").getPriority();this.parent.createNewTask(t,i,r),this.removePopup()}checkValidInput(e){if(e)return!0}inputFocus(){this.querySelector(".Task-NewTaskTextInput").focus()}render(){super.render(),this.popup.classList.add("Task-NewTaskPopup"),this.popup.classList.add("Popup_Centered"),this.popup.innerHTML+=`
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
    `}}customElements.define("new-task-popup",T);class j extends HTMLElement{constructor(e,t){super();this.parent=e,this.state=t,this.tasks=t.tasks.map(o=>new l(this,o)),this.navArrowClicked=this.navArrowClicked.bind(this),this.navDotsClicked=this.navDotsClicked.bind(this),this.newTaskClicked=this.newTaskClicked.bind(this),this.render(),this.popup=null}newTaskClicked(e){this.openNewTaskPopup()}navArrowClicked(e){const t=e.currentTarget,o=this.querySelector(".Project-Container"),i=t.firstElementChild;o.classList.toggle("Project-Container_Hidden"),i.classList.toggle("fa-angle-down"),i.classList.toggle("fa-angle-up")}renameProject(e){this.state.projectTitle=e,this.render(),a.updateProject(this.state.uid,this.state)}navDotsClicked(e){this.openMenuPopup()}openMenuPopup(){this.popup=new v(this),this.querySelector(".Project").appendChild(this.popup),document.querySelector("body").classList.add("ModalOpen")}openRenamePopup(e){this.removePopup(),this.popup=new y(this),this.querySelector(".Project").appendChild(this.popup),this.popup.inputFocus(),document.querySelector("body").classList.add("ModalOpen")}openNewTaskPopup(e){this.removePopup(),this.popup=new T(this),this.querySelector(".Project").appendChild(this.popup),this.popup.inputFocus(),document.querySelector("body").classList.add("ModalOpen")}deleteProjectConfirmPopup(e){this.removePopup(),this.popup=new m(this),this.querySelector(".Project").appendChild(this.popup),this.popup.focus(),document.querySelector("body").classList.add("ModalOpen")}removePopup(){this.popup&&this.popup.remove(),this.popup=null,document.querySelector("body").classList.remove("ModalOpen")}deleteProject(){a.deleteProject(this.state.uid),this.remove()}createNewTask(e,t,o){const r={uid:a.getNextTaskUID(),priority:o,date:t,text:e,completed:!1};a.newTask(this.state.uid,r),this.tasks.push(new l(this,r)),this.render()}deleteTask(e){const t=this.tasks.findIndex(o=>o.state.uid===e);this.tasks.splice(t,1),this.render()}render(){this.innerHTML=`
      <div data-uid=${this.state.uid} class="Project">
        <div class="Project-HeaderContainer">
          <div class="Project-Header">
            <div class="Project-HeaderTextContainer">
              <div class="Project-HeaderText">${this.state.projectTitle}</div>
              <div class="Project-HeaderCount">${this.tasks.length}</div>
            </div>
            <div class="Project-Nav">
              <div data-uid="${this.state.uid}" class="Project-NavArrow Project-NavIcon">
                <i class="fas fa-angle-down"></i>
              </div>
              <div data-uid="${this.state.uid}" data-popup="false" class="Project-NavDots Project-NavIcon">
                <i class="fas fa-ellipsis-v"></i>
              </div>
            </div>
          </div>
        </div>

        <div class="Project-Container">
          <div class="Project-NewTaskButton">+New task</div>
        </div>
      </div
    `,this.projectContainer=this.querySelector(".Project-Container"),this.projectContainer.prepend(...this.tasks),this.querySelector(".Project-NavArrow").addEventListener("click",this.navArrowClicked),this.querySelector(".Project-NavDots").addEventListener("click",this.navDotsClicked),this.querySelector(".Project-NewTaskButton").addEventListener("click",this.newTaskClicked)}}customElements.define("project-element",j);class C extends d{constructor(e){super(e);this.createProject=this.createProject.bind(this),this.keyPressed=this.keyPressed.bind(this),this.render()}connectedCallback(){this.addEventListener("keydown",this.keyPressed),this.querySelector(".Popup-CancelButton").addEventListener("click",this.removePopup),this.querySelector(".Popup-ConfirmButton").addEventListener("click",this.createProject)}keyPressed(e){e.code==="Escape"?this.removePopup():e.code==="Enter"&&this.createProject()}inputFocus(){this.querySelector(".Popup-NewProjectInput").focus()}createProject(e){const t=this.querySelector(".Popup-NewProjectInput").value;this.checkValidInput(t)&&this.parent.newProject(t),this.removePopup()}checkValidInput(e){if(e)return!0}render(){super.render(),this.popup.classList.add("Popup-NewProject"),this.popup.classList.add("Popup_Centered"),this.popup.innerHTML=`
    <h2 class="Popup-Header">New project</h2>
    <input placeholder="Project name..." class="Popup-NewProjectInput" type="text">
    <div class="Project-PopupButtonsContainer">
      <button class="Project-PopupButton Popup-CancelButton">Cancel</button>
      <button class="Project-PopupButton Popup-ConfirmButton">Confirm</button>
    </div>
  `}}customElements.define("new-project-popup",C);class f extends HTMLElement{constructor(e){super();this.appData=e,this.newProjectPopup=this.newProjectPopup.bind(this),this.removePopup=this.removePopup.bind(this),this.render(),this.popup=null}newProjectPopup(){this.popup=new C(this),this.appendChild(this.popup),document.querySelector("body").classList.add("ModalOpen"),this.popup.inputFocus()}newProject(e){const t=a.getNextProjectUID();a.newProject(t,e),this.render(),window.scroll({top:document.body.scrollHeight,left:0,behavior:"smooth"})}removePopup(){this.popup&&this.popup.remove(),this.popup=null,document.querySelector("body").classList.remove("ModalOpen")}render(){this.innerHTML=`
    <header class="SiteHeader">
      <h1 class="SiteHeader-HeaderText">YATTA</h1>
    </header>
    <div class="Site-NewProject">+New Project</div>
    `,this.appData.forEach(e=>this.appendChild(new j(this,e))),this.querySelector(".Site-NewProject").addEventListener("click",this.newProjectPopup)}}customElements.define("app-element",f);let M=a.retrieveData();document.querySelector("body").appendChild(new f(M.projects));
