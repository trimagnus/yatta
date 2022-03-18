const L=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const h of r.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&i(h)}).observe(document,{childList:!0,subtree:!0});function t(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerpolicy&&(r.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?r.credentials="include":o.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(o){if(o.ep)return;o.ep=!0;const r=t(o);fetch(o.href,r)}};L();var S={nextProjectUID:4,nextTaskUID:9,projects:[{uid:1,projectTitle:"This is a project",sortMode:1,tasks:[{uid:1,puid:1,priority:"High",date:"01/02/2022",text:"Buy bananas",completed:!1},{uid:2,puid:1,priority:"Low",date:"01/02/2022",text:"Program more",completed:!0},{uid:3,puid:1,priority:"Med",date:"01/02/2022",text:"Walk!",completed:!1},{uid:4,puid:1,priority:"No",date:"01/02/2022",text:"This has no priority",completed:!1}]},{uid:2,projectTitle:"Another Project",sortMode:1,tasks:[{uid:5,puid:2,priority:"High",date:"01/02/2022",text:"Build a rocket",completed:!1},{uid:6,puid:2,priority:"Low",date:"01/02/2022",text:"Run around!",completed:!1},{uid:7,puid:2,priority:"Med",date:"01/02/2022",text:"Take over the world",completed:!1},{uid:8,puid:2,priority:"No",date:"01/02/2022",text:"Do other stuff as I see fit",completed:!1}]},{uid:3,projectTitle:"Empty Project",sortMode:1,tasks:[]}]};let n={};localStorage.length<1?n=S:n=JSON.parse(localStorage.getItem("data"));function d(s){return n.projects.findIndex(e=>e.uid===s)}function v(s,e){return n.projects[d(s)].tasks.findIndex(t=>t.uid===e)}function c(){localStorage.setItem("data",JSON.stringify(n))}function B(){const s=n.nextProjectUID++;return c(),s}function E(){const s=n.nextTaskUID++;return c(),s}function g(s,e){const t={uid:s,projectTitle:e,sortMode:1,tasks:[]};n.projects.push(t),c()}function q(s,e){n.projects[d(s)]=e,c()}function I(s){const e=d(s);n.projects.splice(e,1),c()}function N(s,e){n.projects[d(s)].tasks.push(e),c()}function D(s,e,t){const i=d(s),o=v(s,e);n.projects[i].tasks[o]=t,c()}function M(s,e){const t=d(s),i=v(s,e);n.projects[t].tasks.splice(i,1),c()}function H(){return n}var a={newProject:g,updateProject:q,deleteProject:I,newTask:N,updateTask:D,deleteTask:M,retrieveData:H,getNextProjectUID:B,getNextTaskUID:E};class p extends HTMLElement{constructor(e){super();this.parent=e,this.removePopup=this.removePopup.bind(this),this.tabIndex="0"}removePopup(e){e&&e.stopImmediatePropagation(),this.style.opacity="0",setTimeout(()=>{this.parent.removePopup()},300)}render(){this.classList.add("Popup-Container"),this.cover=document.createElement("div"),this.cover.classList.add("Popup-Cover"),this.appendChild(this.cover),this.popup=document.createElement("div"),this.popup.classList.add("Popup"),this.appendChild(this.popup),this.cover.addEventListener("click",this.removePopup),this.style.opacity="0",setTimeout(()=>{this.style.opacity="1"},10)}}class F extends HTMLElement{constructor(){super();this.clickedPriority=this.clickedPriority.bind(this),this.render(),this.fields=this.querySelectorAll(".Task-PriorityField"),this.currentPriority=this.fields[0]}connectedCallback(){this.fields.forEach(e=>{e.addEventListener("click",this.clickedPriority)})}clickedPriority(e){this.changePriorityTarget(e.currentTarget)}changePriorityTarget(e){this.currentPriority.classList.remove("Task-PriorityField-Selected"),this.currentPriority=e,this.currentPriority.classList.add("Task-PriorityField-Selected")}setPriority(e){const t=this.querySelector(`[data-priority=${e}]`);this.changePriorityTarget(t)}getPriority(){return this.currentPriority.dataset.priority}render(){this.innerHTML=`
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
    `}}customElements.define("priority-picker",F);function y(s){if(!s)return;let e=s.split("-");return`${e[1]}/${e[2]}/${e[0]}`}function l(s){if(!s)return;let e=s.split("/");return e[2].length===2&&(e[2]=`20${e[2]}`),`${e[2]}-${e[0]}-${e[1]}`}const u={No:1,Low:2,Med:3,High:4};function A(s,e){return s.state.text>e.state.text?1:s.state.text<e.state.text?-1:0}function _(s,e){return s.state.text<e.state.text?1:s.state.text>e.state.text?-1:0}function $(s,e){const t=new Date(l(s.state.date)),i=new Date(l(e.state.date));return t<i?1:t>i?-1:0}function O(s,e){const t=new Date(l(s.state.date)),i=new Date(l(e.state.date));return t>i?1:t<i?-1:0}function R(s,e){const t=u[s.state.priority],i=u[e.state.priority];return t<i?1:t>i?-1:0}function U(s,e){const t=u[s.state.priority],i=u[e.state.priority];return t>i?1:t<i?-1:0}const T={1:A,2:_,3:$,4:O,5:R,6:U},V={1:'<i class="fa-solid fa-arrow-down-a-z"></i>',2:'<i class="fa-solid fa-arrow-up-a-z"></i>',3:'<i class="fa-solid fa-calendar-plus"></i>',4:'<i class="fa-solid fa-calendar-minus"></i>',5:'<i class="fa-solid fa-circle-exclamation"></i>',6:'<i class="fa-solid fa-exclamation"></i>'},z=Object.keys(T).length;class m extends p{constructor(e,t){super(e);this.state=t,this.updateTask=this.updateTask.bind(this),this.keyPressed=this.keyPressed.bind(this),this.deleteTask=this.deleteTask.bind(this),this.render()}connectedCallback(){this.addEventListener("keydown",this.keyPressed),this.querySelector(".Popup-CancelButton").addEventListener("click",this.removePopup),this.querySelector(".Popup-ConfirmButton").addEventListener("click",this.updateTask),this.querySelector(".Task-DeleteTaskButton").addEventListener("click",this.deleteTask)}keyPressed(e){e.code==="Escape"?this.removePopup():e.code==="Enter"&&this.updateTask()}updateTask(e){const t=this.querySelector(".Task-NewTaskTextInput").value;if(!t||!this.checkValidInput(t)){this.querySelector(".Task-NewTaskTextInput").classList.add("Task-TextError");return}const i=this.querySelector(".Task-DatePicker"),o=i.value?y(i.value):"";this.state.text=t,this.state.date=o,this.state.priority=this.querySelector("priority-picker").getPriority(),this.parent.updateTask(this.state),this.removePopup()}deleteTask(e){this.parent.deleteTask()}checkValidInput(e){if(e)return!0}inputFocus(){const e=this.querySelector(".Task-NewTaskTextInput");e.focus();const t=e.value;e.value="",e.value=t}render(){super.render(),this.popup.classList.add("Task-NewTaskPopup"),this.popup.classList.add("Popup_Centered"),this.popup.innerHTML+=`
      <h2 class="Popup-Header">Update Task</h2>
      <input placeholder="${this.state.text}" class="Task-NewTaskTextInput" type="text" value="${this.state.text}">
      
      <div class="Task-DatePickerContainer">
        <p>Date (Optional)</p>
        <input type="date" id="task-date" name="task-date" class="Task-DatePicker" value="${l(this.state.date)}">
      </div>

      <priority-picker></priority-picker>

      <div class="Project-PopupButtonsContainer">
        <button class="Project-PopupButton Popup-CancelButton">Cancel</button>
        <button class="Project-PopupButton Popup-ConfirmButton">Confirm</button>
      </div>

      <button class="Task-DeleteTaskButton">Delete Task</button>
    `,this.querySelector("priority-picker").setPriority(this.state.priority)}}customElements.define("task-editor-popup",m);class k extends HTMLElement{constructor(e,t){super();this.parent=e,this.state=t,this.clickedEditor=this.clickedEditor.bind(this),this.clickedCheckbox=this.clickedCheckbox.bind(this),this.render(),this.popup=null}clickedCheckbox(e){this.state.completed=!this.state.completed,this.render(),a.updateTask(this.state.puid,this.state.uid,this.state)}clickedEditor(){this.removePopup(),this.popup=new m(this,this.state),document.body.appendChild(this.popup),this.popup.inputFocus(),document.querySelector("body").classList.add("ModalOpen")}removePopup(){this.popup&&this.popup.remove(),this.popup=null,document.querySelector("body").classList.remove("ModalOpen")}updateTask(e){this.state=e,this.state.puid=this.parent.state.uid,this.render(),a.updateTask(this.state.puid,this.state.uid,this.state)}deleteTask(){a.deleteTask(this.state.puid,this.state.uid),this.parent.deleteTask(this.state.uid),this.remove()}render(){this.innerHTML=`
    <div class="Task">
      <div class="Task-CheckboxContainer">
        <div class="Task-Checkbox Task-Checkbox_Priority-${this.state.priority} ${this.state.completed?"Task-Checkbox_Complete":""}"></div>
      </div>
      <div class="Task-CenterContainer">
        <div class="Task-Text ${this.state.completed?"Task-Text_Complete":""}">${this.state.text}</div>
        <div class="Task-Date ${this.state.completed?"Task-Date_Complete":""}">${this.state.date}</div>
      </div>
      
    </div>
    `,this.querySelector(".Task-CenterContainer").addEventListener("click",this.clickedEditor),this.querySelector(".Task-CheckboxContainer").addEventListener("click",this.clickedCheckbox)}}customElements.define("task-element",k);class f extends p{constructor(e){super(e);this.state=e.state,this.renameButtonClicked=this.renameButtonClicked.bind(this),this.deleteButtonClicked=this.deleteButtonClicked.bind(this),this.render()}connectedCallback(){this.querySelector(".Project-DeleteButton").addEventListener("click",this.deleteButtonClicked),this.querySelector(".Project-RenameButton").addEventListener("click",this.renameButtonClicked)}renameButtonClicked(e){this.parent.openRenamePopup(e)}deleteButtonClicked(e){this.parent.deleteProjectConfirmPopup(e)}render(){super.render(),this.popup.classList.add("Project-ControlsPopup"),this.popup.innerHTML=`
      <ul class="Project-PopupControlsContainer">
        <li class="Project-RenameButton Project-PopupControlsButton">Rename Project</li>
        <li class="Project-DeleteButton Project-PopupControlsButton">Delete Project</li>
      </ul>
    `}}customElements.define("project-popupmenu-element",f);class j extends p{constructor(e){super(e);this.renameProject=this.renameProject.bind(this),this.keyPressed=this.keyPressed.bind(this),this.render()}connectedCallback(){this.addEventListener("keydown",this.keyPressed),this.querySelector(".Popup-CancelButton").addEventListener("click",this.removePopup),this.querySelector(".Popup-ConfirmButton").addEventListener("click",this.renameProject)}keyPressed(e){e.code==="Escape"?this.removePopup():e.code==="Enter"&&this.renameProject()}renameProject(e){const t=this.querySelector(".Project-RenamePopupInput").value;this.checkValidInput(t)&&this.parent.renameProject(t),this.removePopup()}checkValidInput(e){if(e)return!0}inputFocus(){this.querySelector(".Project-RenamePopupInput").focus()}render(){super.render(),this.popup.classList.add("Project-RenamePopup"),this.popup.classList.add("Popup_Centered"),this.popup.innerHTML+=`
      <h2 class="Popup-Header">Rename project</h2>
      <input placeholder="${this.parent.state.projectTitle}" class="Project-RenamePopupInput" type="text">
      <div class="Project-PopupButtonsContainer">
        <button class="Project-PopupButton Popup-CancelButton">Cancel</button>
        <button class="Project-PopupButton Popup-ConfirmButton">Confirm</button>
      </div>
    `}}customElements.define("project-rename-element",j);class C extends p{constructor(e){super(e);this.deleteProject=this.deleteProject.bind(this),this.keyPressed=this.keyPressed.bind(this),this.render()}connectedCallback(){this.addEventListener("keydown",this.keyPressed),this.querySelector(".Popup-CancelButton").addEventListener("click",this.removePopup),this.querySelector(".Popup-ConfirmButton").addEventListener("click",this.deleteProject)}keyPressed(e){e.code==="Escape"?this.removePopup():e.code==="Enter"&&this.deleteProject()}deleteProject(e){this.removePopup(),this.parent.deleteProject()}render(){super.render(),this.popup.classList.add("Project-DeletePopup"),this.popup.classList.add("Popup_Centered"),this.popup.innerHTML=`
      <h2 class="Popup-Header">Delete project?</h2>
      <div class="Project-PopupButtonsContainer">
        <button class="Project-PopupButton Popup-CancelButton">Cancel</button>
        <button class="Project-PopupButton Popup-ConfirmButton">Confirm</button>
      </div>
    `}}customElements.define("project-delete-element",C);class w extends p{constructor(e){super(e);this.createNewTask=this.createNewTask.bind(this),this.keyPressed=this.keyPressed.bind(this),this.render()}connectedCallback(){this.addEventListener("keydown",this.keyPressed),this.querySelector(".Popup-CancelButton").addEventListener("click",this.removePopup),this.querySelector(".Popup-ConfirmButton").addEventListener("click",this.createNewTask)}keyPressed(e){e.code==="Escape"?this.removePopup():e.code==="Enter"&&this.createNewTask()}createNewTask(e){const t=this.querySelector(".Task-NewTaskTextInput").value;if(!t||!this.checkValidInput(t)){this.querySelector(".Task-NewTaskTextInput").classList.add("Task-TextError");return}const i=this.querySelector(".Task-DatePicker"),o=i.value?y(i.value):"",r=this.querySelector("priority-picker").getPriority();this.parent.createNewTask(t,o,r),this.removePopup()}checkValidInput(e){if(e)return!0}inputFocus(){this.querySelector(".Task-NewTaskTextInput").focus()}render(){super.render(),this.popup.classList.add("Task-NewTaskPopup"),this.popup.classList.add("Popup_Centered"),this.popup.innerHTML+=`
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
    `}}customElements.define("new-task-popup",w);class P extends HTMLElement{constructor(e,t,i=!0){super();this.parent=e,this.state=t,this.allowControls=i,this.tasks=t.tasks.map(o=>new k(this,o)),this.navArrowClicked=this.navArrowClicked.bind(this),this.navDotsClicked=this.navDotsClicked.bind(this),this.newTaskClicked=this.newTaskClicked.bind(this),this.sortButtonClicked=this.sortButtonClicked.bind(this),this.render(),this.popup=null}sortButtonClicked(){this.state.sortMode+=1,this.state.sortMode>z&&(this.state.sortMode=1),a.updateProject(this.state.uid,this.state),this.render()}newTaskClicked(e){this.openNewTaskPopup()}navArrowClicked(e){const t=e.currentTarget,i=this.querySelector(".Project-Container"),o=t.firstElementChild;i.classList.toggle("Project-Container_Hidden"),o.classList.toggle("fa-angle-down"),o.classList.toggle("fa-angle-up")}navDotsClicked(e){this.openMenuPopup()}renameProject(e){this.state.projectTitle=e,this.render(),a.updateProject(this.state.uid,this.state)}openMenuPopup(){this.popup=new f(this),this.querySelector(".Project").appendChild(this.popup),document.querySelector("body").classList.add("ModalOpen")}openRenamePopup(e){this.removePopup(),this.popup=new j(this),document.body.appendChild(this.popup),this.popup.inputFocus(),document.querySelector("body").classList.add("ModalOpen")}openNewTaskPopup(e){this.removePopup(),this.popup=new w(this),document.body.appendChild(this.popup),this.popup.inputFocus(),document.querySelector("body").classList.add("ModalOpen")}deleteProjectConfirmPopup(e){this.removePopup(),this.popup=new C(this),document.body.appendChild(this.popup),this.popup.focus(),document.querySelector("body").classList.add("ModalOpen")}removePopup(){this.popup&&this.popup.remove(),this.popup=null,document.querySelector("body").classList.remove("ModalOpen")}deleteProject(){a.deleteProject(this.state.uid),this.remove()}createNewTask(e,t,i){const r={uid:a.getNextTaskUID(),puid:this.state.uid,priority:i,date:t,text:e,completed:!1};a.newTask(this.state.uid,r),this.tasks.push(new k(this,r)),this.render()}deleteTask(e){const t=this.tasks.findIndex(i=>i.state.uid===e);this.tasks.splice(t,1),this.render()}getSortIcon(){return V[this.state.sortMode]}sortTasks(){const e=T[this.state.sortMode];this.tasks.sort(e)}render(){this.innerHTML=`
      <div data-uid=${this.state.uid} class="Project">
        <div class="Project-HeaderContainer">
          <div class="Project-Header">
            <div class="Project-NavLeft">
              
            </div>
            <div class="Project-HeaderTextContainer">
              <div class="Project-HeaderText">${this.state.projectTitle}</div>
              <div class="Project-HeaderCount">${this.tasks.length}</div>
              <div class="Project-SortButton">
                ${this.getSortIcon()}
              </div>
            </div>
            <div class="Project-NavRight">
              
            </div>
          </div>
        </div>

        <div class="Project-Container">
          
        </div>
      </div
    `,this.sortTasks(),this.projectContainer=this.querySelector(".Project-Container"),this.projectContainer.prepend(...this.tasks),this.allowControls&&(this.querySelector(".Project-NavLeft").innerHTML=`
        <div data-uid="${this.state.uid}" class="Project-NavArrow Project-NavIcon">
          <i class="fas fa-angle-down"></i>
        </div>
      `,this.querySelector(".Project-NavRight").innerHTML=`
        <div class="Project-NavIcon Project-NewTaskButton">
          <i class="fa-solid fa-plus"></i>
        </div>
        <div data-uid="${this.state.uid}" data-popup="false" class="Project-NavDots Project-NavIcon">
          <i class="fas fa-ellipsis-v"></i>
        </div>
      `,this.querySelector(".Project-NavArrow").addEventListener("click",this.navArrowClicked),this.querySelector(".Project-NavDots").addEventListener("click",this.navDotsClicked),this.querySelector(".Project-NewTaskButton").addEventListener("click",this.newTaskClicked)),this.querySelector(".Project-SortButton").addEventListener("click",this.sortButtonClicked)}}customElements.define("project-element",P);class b extends p{constructor(e){super(e);this.createProject=this.createProject.bind(this),this.keyPressed=this.keyPressed.bind(this),this.render()}connectedCallback(){this.addEventListener("keydown",this.keyPressed),this.querySelector(".Popup-CancelButton").addEventListener("click",this.removePopup),this.querySelector(".Popup-ConfirmButton").addEventListener("click",this.createProject)}keyPressed(e){e.code==="Escape"?this.removePopup():e.code==="Enter"&&this.createProject()}inputFocus(){this.querySelector(".Popup-NewProjectInput").focus()}createProject(e){const t=this.querySelector(".Popup-NewProjectInput").value;this.checkValidInput(t)&&this.parent.newProject(t),this.removePopup()}checkValidInput(e){if(e)return!0}render(){super.render(),this.popup.classList.add("Popup_Centered"),this.popup.innerHTML=`
    <h2 class="Popup-Header">New project</h2>
    <input placeholder="Project name..." class="Popup-NewProjectInput" type="text">
    <div class="Project-PopupButtonsContainer">
      <button class="Project-PopupButton Popup-CancelButton">Cancel</button>
      <button class="Project-PopupButton Popup-ConfirmButton">Confirm</button>
    </div>
  `}}customElements.define("new-project-popup",b);class x extends HTMLElement{constructor(e){super();this.appData=e,this.newProjectPopup=this.newProjectPopup.bind(this),this.clickedAllProjectsButton=this.clickedAllProjectsButton.bind(this),this.clickedAllTasksButton=this.clickedAllTasksButton.bind(this),this.clickedFilterButton=this.clickedFilterButton.bind(this),this.removePopup=this.removePopup.bind(this),this.render(),this.popup=null}newProjectPopup(){this.popup=new b(this),document.body.appendChild(this.popup),document.querySelector("body").classList.add("ModalOpen"),this.popup.inputFocus()}newProject(e){const t=a.getNextProjectUID();a.newProject(t,e),this.render(),window.scroll({top:document.body.scrollHeight,left:0,behavior:"smooth"})}removePopup(){this.popup&&this.popup.remove(),this.popup=null,document.querySelector("body").classList.remove("ModalOpen")}clickedAllProjectsButton(){this.showAllProjects()}clickedAllTasksButton(){this.showAllTasks()}clickedFilterButton(){this.showFilter()}showAllProjects(){let e=this.querySelector(".Site-Content");e.innerHTML="",this.appData.forEach(t=>e.appendChild(new P(this,t,!0)))}showAllTasks(){let e=this.querySelector(".Site-Content");e.innerHTML="";let t=[];for(let o of this.appData)t=t.concat(o.tasks);let i={uid:999,projectTitle:"[All Tasks]",sortMode:1,tasks:t};e.appendChild(new P(this,i,!1))}showFilter(){let e=this.querySelector(".Site-Content");e.innerHTML="(To be implemented)",console.log("Showing filter dialog")}render(){this.innerHTML=`
    <header class="SiteHeader">
      <h1 class="SiteHeader-HeaderText">YATTA</h1>
      <div class="Filter-Container">
        <div class="Filter-Button Filter-Button_AllProjects">All Projects</div>
        <div class="Filter-Button Filter-Button_AllTasks">All Tasks</div>
        <div class="Filter-Button Filter-Button_Filter">Filter</div>
      </div>
    </header>
    <div class="Site-NewProject">+New Project</div>
    <div class="Site-Content"></div>
    `,this.showAllProjects(),this.querySelector(".Site-NewProject").addEventListener("click",this.newProjectPopup),this.querySelector(".Filter-Button_AllProjects").addEventListener("click",this.clickedAllProjectsButton),this.querySelector(".Filter-Button_AllTasks").addEventListener("click",this.clickedAllTasksButton),this.querySelector(".Filter-Button_Filter").addEventListener("click",this.clickedFilterButton)}}customElements.define("app-element",x);let J=a.retrieveData();document.querySelector("body").appendChild(new x(J.projects));
