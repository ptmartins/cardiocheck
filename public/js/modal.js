(function(modal) {

    let init = (title, content) => {
        let overlay = document.createElement('DIV');
        let modal = document.createElement('DIV');
        let header = document.createElement('DIV');
        let body = document.createElement('DIV');
        let footer = document.createElement('DIV');
        let _title = document.createElement('H2');
        let close = document.createElement('SPAN');
        let btnMain = document.createElement('BUTTON');
        let btnClose = document.createElement('BUTTON');

        overlay.className = 'modal-overlay';
        modal.className = 'modal';
        header.className = 'modal__header';
        body.className = 'modal__body';
        footer.className = 'modal__footer';
        _title.className = 'modal__title';
        close.className = 'modal__close';
        btnMain.className = 'modal__btn modal__btn--main';
        btnClose.className = 'modal__btn modal__btn--cancel';

        _title.textContent = title || '';
        close.textContent = 'X';
        btnMain.textContent = 'Accept';
        btnClose.textContent = 'Cancel';

        header.append(_title, close);
        body.innerHTML = content;
        footer.append(btnMain, btnClose);
        modal.append(header, body, footer);
        overlay.appendChild(modal);

        document.body.appendChild(overlay);
    } 

    modal.init = init;

})(window.modal = window.modal || {}); 