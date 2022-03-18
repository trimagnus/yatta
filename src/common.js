//Input  1984-02-05
//Output 02-05-1984
export function convertFromDateInput(date) {
  if(!date) return;
  let split = date.split('-');
  return `${split[1]}/${split[2]}/${split[0]}`;
}

//Input  02-05-1984
//Output 1984-02-05
export function convertToDateInput(date) {
  if(!date) return;
  let split = date.split('/');
  if(split[2].length === 2) {
    split[2] = `20${split[2]}`;
  }
  return `${split[2]}-${split[0]}-${split[1]}`;
}

const PRIORITIES = {
  "No": 1,
  "Low": 2,
  "Med": 3,
  "High": 4
};

function alphaSort(a,b) {
  if(a.state.text > b.state.text) {
    return 1;
  } else if (a.state.text < b.state.text) {
    return -1;
  }
  return 0;
}

function reverseAlphaSort(a,b) {
  if(a.state.text < b.state.text) {
    return 1;
  } else if (a.state.text > b.state.text) {
    return -1;
  }
  return 0;
}

function dateSort(a,b) {
  const dateA = new Date(convertToDateInput(a.state.date));
  const dateB = new Date(convertToDateInput(b.state.date));
  if(dateA < dateB) {
    return 1;
  } else if (dateA > dateB) {
    return -1;
  }
  return 0;
}

function reverseDateSort(a,b) {
  const dateA = new Date(convertToDateInput(a.state.date));
  const dateB = new Date(convertToDateInput(b.state.date));
  if(dateA > dateB) {
    return 1;
  } else if (dateA < dateB) {
    return -1;
  }
  return 0;
}

function prioritySort(a,b) {
  const priA = PRIORITIES[a.state.priority];
  const priB = PRIORITIES[b.state.priority];
  if(priA < priB) {
    return 1;
  } else if (priA > priB) {
    return -1;
  }
  return 0;
}

function reversePrioritySort(a,b) {
  const priA = PRIORITIES[a.state.priority];
  const priB = PRIORITIES[b.state.priority];
  if(priA > priB) {
    return 1;
  } else if (priA < priB) {
    return -1;
  }
  return 0;
}

export const sortFunctions = {
  1: alphaSort,
  2: reverseAlphaSort,
  3: dateSort,
  4: reverseDateSort,
  5: prioritySort,
  6: reversePrioritySort
}

export const sortIcons = {
  1: '<i class="fa-solid fa-arrow-down-a-z"></i>',
  2: '<i class="fa-solid fa-arrow-up-a-z"></i>',
  3: '<i class="fa-solid fa-calendar-plus"></i>',
  4: '<i class="fa-solid fa-calendar-minus"></i>',
  5: '<i class="fa-solid fa-circle-exclamation"></i>',
  6: '<i class="fa-solid fa-exclamation"></i>'
}

export const MAX_SORT_MODES = Object.keys(sortFunctions).length;