(function() {

    let DOM = {};

    let cacheDOM = () => {
        DOM.error = document.querySelector('.error');
    }

    let init = () => {
        cacheDOM();
        debugger;
        if(DOM.error) {
            let goBack = document.querySelector('.goBack');

            goBack.addEventListener('click', ev => {
                ev.preventDefault();
                window.history.back();
            });
        }
    }

    window.addEventListener("DOMContentLoaded", init);

})()