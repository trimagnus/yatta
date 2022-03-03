import defaultData from "./defaultProjectData.js";

let data = {};

//Testing length here for simplicity
if(localStorage.length < 1) {
  data = defaultData;
} else {
  data = JSON.parse(localStorage.getItem('data'));
}

function _getProjectIndex(uid) {
  return data.projects.findIndex(p => p.uid === uid);
}

function _getTaskIndex(pUid, tUid) {
  return data.projects[_getProjectIndex(pUid)].tasks.findIndex(t => t.uid === tUid);
}

function _saveData() {
  localStorage.setItem('data', JSON.stringify(data));
}

function getNextProjectUID() {
  const newUID = data.nextProjectUID++;
  _saveData();
  return newUID;
}

function getNextTaskUID() {
  const newUID = data.nextTaskUID++;
  _saveData();
  return newUID;
}

function newProject(uid, title) {
  const p = {
    uid: uid,
    projectTitle: title,
    tasks: []
  };
  data.projects.push(p);
  _saveData();
}

function updateProject(uid, newData) {
  data.projects[_getProjectIndex(uid)] = newData;

  _saveData();
}

function deleteProject(uid) {
  const index = _getProjectIndex(uid);
  data.projects.splice(index, 1);

  _saveData();
}

function newTask(projectUID, taskData) {
  data.projects[_getProjectIndex(projectUID)].tasks.push(taskData);

  _saveData();
}

function updateTask(projectUID, taskUid, newData) {
  const pIndex = _getProjectIndex(projectUID)
  const tIndex = _getTaskIndex(projectUID, taskUid);
  data.projects[pIndex].tasks[tIndex] = newData;

  _saveData();
}

function deleteTask(projectUID, taskUid) {
  const pIndex = _getProjectIndex(projectUID)
  const tIndex = _getTaskIndex(projectUID, taskUid);

  data.projects[pIndex].tasks.splice(tIndex, 1);

  _saveData();
}

function retrieveData() {
  return data;
}

export default {
  newProject,
  updateProject,
  deleteProject,
  newTask,
  updateTask,
  deleteTask,
  retrieveData,
  getNextProjectUID,
  getNextTaskUID
}