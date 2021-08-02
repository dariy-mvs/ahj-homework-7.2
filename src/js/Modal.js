import { createTicket, editTicket } from './APIfunc';

export function modalCreate(typeModal) {
  let modalPopup;
  if (typeModal === 'edit') {
    modalPopup = document.createElement('form');
    modalPopup.classList.add('modal__edit');
    modalPopup.innerHTML = '<h4 class="modal__title"></h4>'
    + '<label for="" class="modal__field">'
      + '<span class="modal__field_descr">Краткое описание</span>'
      + '<input type="text" name="taskName" class="modal__field_input task_title">'
    + '</label>'
    + '<label for="" class="modal__field">'
      + '<span class="modal__field_descr">Подробное описание</span>'
      + '<textarea type="text" name="taskDescr" class="modal__field_input task_descr"></textarea>'
    + '</label>'
    + '<div class="buttons__box">'
      + '<button class="modal__esc">Отмена</button>'
      + '<button class="modal__ok">ОК</button>'
    + '</div>';
  } else if (typeModal === 'delete') {
    modalPopup = document.createElement('div');
    modalPopup.classList.add('modal__edit');
    modalPopup.innerHTML = '<h4 class="modal__title">Удалить тикет</h4>'
      + '<span class="modal__field_descr">Вы действительно хотите удалить этот тикет?</span>'
      + '<div class="buttons__box">'
        + '<button class="modal__esc">Отмена</button>'
        + '<button class="modal__ok">ОК</button>'
      + '</div>';
  }
  modalPopup.querySelector('.modal__esc').addEventListener('click', () => {
    modalPopup.remove();
  });
  return modalPopup;
}

export function modalAddTicket() {
  const addTicketPopup = modalCreate('edit');
  addTicketPopup.querySelector('.modal__title').textContent = 'Новый тикет';
  addTicketPopup.querySelector('.modal__ok').addEventListener('click', () => {
    const formTicket = new FormData(addTicketPopup);
    formTicket.append('created', new Date());
    createTicket(formTicket);
  });
  return addTicketPopup;
}

export function modalEditTicket(titleValue, descrValue, id) {
  const ticketPopup = modalCreate('edit');
  ticketPopup.querySelector('.modal__title').textContent = 'Редактировать тикет';
  ticketPopup.querySelector('.task_title').value = titleValue;
  ticketPopup.querySelector('.task_descr').value = descrValue;

  ticketPopup.querySelector('.modal__ok').addEventListener('click', () => {
    const formTicket = new FormData(ticketPopup);
    formTicket.append('id', id);
    editTicket(formTicket);
  });
  return ticketPopup;
}
