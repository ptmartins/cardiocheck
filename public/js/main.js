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