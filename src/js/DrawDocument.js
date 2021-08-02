export default function drowAllTickets(ticket) {
  const { id, name, status } = ticket;
  let { created } = ticket;
  const ticketItem = document.createElement('li');
  ticketItem.className = 'tickets_item';
  ticketItem.dataset.ticketId = id;
  created = new Date(created);
  const createdDate = `${created.getDate()}.${created.getMonth() + 1}.${created.getFullYear()}`;
  const createdTime = `${created.getHours()}:${created.getMinutes()}`;
  ticketItem.innerHTML = '<div class="ticket_status"></div>'
  + '<div class="ticket_box">'
    + `<h4 class="ticket_title">${name}</h4>`
    + '</div>'
    + `<span class="ticket_date">${createdDate}</span>`
    + `<span class="ticket_time">${createdTime}</span>`
    + '<button class="ticket_edit"></button>'
    + '<button class="ticket_del"></button>';
  if (status === 'true') {
    ticketItem.querySelector('.ticket_status').classList.add('done');
  }
  return ticketItem;
}
