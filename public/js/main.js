import notis from 'notisjs';

(function() {

    let DOM = {};

    let cacheDOM = () => {
        DOM.error = document.querySelector('.error');
        DOM.datePicker = document.querySelector('.form__field--date .form__input');
    };

    let attachDatePicker = () => {
        if(DOM.datePicker) {
            flatpickr(DOM.datePicker, {
                enableTime: true,
                dateFormat: "Y-m-d H:i",
            });
        }
    };

    let init = () => {
        cacheDOM();
        attachDatePicker();
        notis.show({
            message: 'Fuckin A!',
            state: 'success',
            position: 'top-right',
            duration: 5000
        });
        if(DOM.error) {
            let goBack = document.querySelector('.goBack');

            goBack.addEventListener('click', ev => {
                ev.preventDefault();
                window.history.back();
            });
        }
    };

    window.addEventListener("DOMContentLoaded", init);

})()