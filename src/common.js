export function convertFromDateInput(date) {
  let split = date.split('-');
  return `${split[1]}/${split[2]}/${split[0]}`;
}

export function convertToDateInput(date) {
  let split = date.split('/');
  if(split[2].length === 2) {
    split[2] = `20${split[2]}`;
  }
  return `${split[2]}-${split[0]}-${split[1]}`;
}