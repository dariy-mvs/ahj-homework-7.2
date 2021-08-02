import { modalAddTicket, modalEditTicket } from './Modal';
import drowAllTickets from './DrawDocument';
import {
  changeStatus, deleteTicket, allTickets, ticketById,
} from './APIfunc';

// отрисовка имеющихся на сервере задач

document.addEventListener('DOMContentLoaded', () => {
  let ticketsInServ;
  allTickets().then((response) => {
    ticketsInServ = response;
    ticketsInServ.forEach((el) => {
      const ticket = drowAllTickets(el);
      document.querySelector('.tickets_list').insertAdjacentElement('beforeend', ticket);
    });
  });
});

document.querySelector('.tickets_list').addEventListener('click', (event) => {
  const { target } = event;
  const ticketElem = target.closest('.tickets_item');
  const id = ticketElem.dataset.ticketId;

  if (target.classList.contains('ticket_status')) {
    // если меняется статус задачи
    if (!target.classList.contains('done')) {
      const responseOk = changeStatus(true, id);
      responseOk.then((response) => {
        if (response.ok) {
          target.classList.add('done');
        } else {
          alert('Что-то пошло не так');
        }
      });
    } else {
      const responseOk = changeStatus(false, id);
      responseOk.then((response) => {
        if (response.ok) {
          target.classList.remove('done');
        } else {
          alert('Что-то пошло не так');
        }
      });
    }
  } else if (target.classList.contains('ticket_edit')) {
    // если редактируется задача
    ticketById(id).then((response) => {
      const { name, description, id: taskId } = response;
      const popup = modalEditTicket(name, description, taskId);
      document.body.appendChild(popup);
    });
  } else if (target.classList.contains('ticket_del')) {
    deleteTicket(id).then((response) => {
      if (response.ok) {
        window.location.reload();
      } else {
        alert('Что-то пошло не так');
      }
    });
  } else if (ticketElem.classList.contains('text_active')) {
    // если задача показана
    ticketElem.querySelector('.ticket_text').remove();
    ticketElem.classList.remove('text_active');
  } else {
    ticketById(id).then((response) => {
      const { description } = response;
      const descrElem = document.createElement('p');
      descrElem.classList.add('ticket_text');
      descrElem.textContent = description;
      ticketElem.querySelector('.ticket_box').insertAdjacentElement('beforeend', descrElem);
      ticketElem.classList.add('text_active');
    });
  }
});

document.querySelector('.add_ticket').addEventListener('click', () => {
  const popup = modalAddTicket();
  document.body.appendChild(popup);
});
