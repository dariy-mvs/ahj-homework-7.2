export async function changeStatus(status, id) {
  return fetch(`https://t1hw7.herokuapp.com/?method=status&status=${status}&id=${id}`).then((response) => response.json());
}

export function createTicket(formData) {
  return fetch('https://t1hw7.herokuapp.com/', {
    method: 'POST',
    body: formData,
  }).then((response) => response.json());
}

export function deleteTicket(id) {
  return fetch(`https://t1hw7.herokuapp.com/?method=delete&id=${id}`).then((response) => response.json());
}

export function editTicket(formData) {
  return fetch('https://t1hw7.herokuapp.com/', {
    method: 'PUT',
    body: formData,
  }).then((response) => response.json());
}

export function allTickets() {
  return fetch('https://t1hw7.herokuapp.com/?method=allTickets').then((response) => response.json());
}

export function ticketById(id) {
  return fetch(`https://t1hw7.herokuapp.com/?method=ticketById&id=${id}`).then((response) => response.json());
}
