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

export function alphaSort(a,b) {
  if(a.state.text > b.state.text) {
    return 1;
  } else if (a.state.text < b.state.text) {
    return -1;
  }
  return 0;
}

export function reverseAlphaSort(a,b) {
  if(a.state.text < b.state.text) {
    return 1;
  } else if (a.state.text > b.state.text) {
    return -1;
  }
  return 0;
}

export function dateSort(a,b) {
  const dateA = new Date(convertToDateInput(a.state.date));
  const dateB = new Date(convertToDateInput(b.state.date));
  if(dateA < dateB) {
    return 1;
  } else if (dateA > dateB) {
    return -1;
  }
  return 0;
}

export function reverseDateSort(a,b) {
  const dateA = new Date(convertToDateInput(a.state.date));
  const dateB = new Date(convertToDateInput(b.state.date));
  if(dateA > dateB) {
    return 1;
  } else if (dateA < dateB) {
    return -1;
  }
  return 0;
}

export function prioritySort(a,b) {
  
}

export function reversePrioritySort(a,b) {
  
}